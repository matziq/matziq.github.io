/**
 * Linger Longer Potluck shared-signup backend for Google Apps Script.
 *
 * Recommended setup:
 * 1. Create a Google Sheet.
 * 2. Open Extensions > Apps Script.
 * 3. Paste this file into Code.gs.
 * 4. Run setup once from the Apps Script editor and authorize it.
 * 5. Deploy as a Web app with access set to Anyone.
 * 6. Paste the Web app /exec URL into SHARED_BACKEND_URL in sign_up_sheet.html.
 *
 * Public page responses intentionally omit email and phone. Those stay in the
 * private Google Sheet for organizers.
 */

const SPREADSHEET_ID = ""; // Optional: leave blank when the script is bound to the Google Sheet.

const SHEET_NAMES = {
  settings: "Settings",
  categories: "Categories",
  signups: "Signups"
};

const DEFAULT_EVENT = {
  title: "Linger Longer Potluck Sign-Up",
  note: "Please sign up to bring something to share. Thank you for helping make this a warm, welcoming meal!",
  date: "Date TBD",
  location: "Location TBD",
  organizerEmail: "",
  heroImage: ""
};

const DEFAULT_CATEGORIES = [
  { id: "appetizer", name: "Appetizer", needed: 5, icon: "🥨" },
  { id: "salad", name: "Salad", needed: 5, icon: "🥗" },
  { id: "side-dish", name: "Side Dish", needed: 6, icon: "🍲" },
  { id: "main-dish", name: "Main Dish", needed: 6, icon: "🍛" },
  { id: "dessert", name: "Dessert", needed: 5, icon: "🧁" },
  { id: "beverage", name: "Beverage", needed: 4, icon: "🥤" },
  { id: "clean-up-help", name: "Clean-Up Help", needed: 4, icon: "🧹" }
];

const SETTINGS_HEADERS = ["Key", "Value"];
const CATEGORY_HEADERS = ["CategoryId", "Name", "Needed", "Icon", "Active"];
const SIGNUP_HEADERS = ["Timestamp", "SignupId", "CategoryId", "Category", "Name", "Email", "Phone", "Item", "UserAgent"];

function setup() {
  ensureWorkbook_();
}

function doGet(e) {
  try {
    ensureWorkbook_();
    const action = getParam_(e, "action") || "list";

    if (action === "list") {
      return jsonp_(buildPublicPayload_(), e);
    }

    return jsonp_({ success: false, error: `Unknown action: ${action}` }, e);
  } catch (error) {
    return jsonp_({ success: false, error: String(error && error.message ? error.message : error) }, e);
  }
}

function doPost(e) {
  try {
    ensureWorkbook_();
    const action = getParam_(e, "action") || "signup";

    if (action === "signup") {
      return htmlPostMessage_(handleSignup_(e));
    }

    return htmlPostMessage_({ success: false, error: `Unknown action: ${action}` });
  } catch (error) {
    return htmlPostMessage_({ success: false, error: String(error && error.message ? error.message : error) });
  }
}

function handleSignup_(e) {
  const lock = LockService.getScriptLock();
  lock.waitLock(10000);

  try {
    const categoryId = clean_(getParam_(e, "categoryId"));
    const name = clean_(getParam_(e, "name"));
    const email = clean_(getParam_(e, "email"));
    const phone = clean_(getParam_(e, "phone"));
    const item = clean_(getParam_(e, "item"));
    const userAgent = clean_(getParam_(e, "userAgent"));

    if (!categoryId || !name || !email || !phone || !item) {
      return { success: false, error: "Please provide category, name, email, phone, and item." };
    }

    const categories = readCategories_();
    const category = categories.find((cat) => cat.id === categoryId && cat.active);
    if (!category) {
      return { success: false, error: "That category is not available anymore. Please refresh and choose another category." };
    }

    const signups = readSignupRows_();
    const countForCategory = signups.filter((entry) => String(entry.CategoryId) === categoryId).length;
    if (countForCategory >= category.needed) {
      return { success: false, error: `${category.name} is already full. Please choose another category.`, payload: buildPublicPayload_() };
    }

    const ss = getSpreadsheet_();
    const sheet = ss.getSheetByName(SHEET_NAMES.signups);
    const signupId = Utilities.getUuid();
    sheet.appendRow([new Date(), signupId, category.id, category.name, name, email, phone, item, userAgent]);

    return {
      success: true,
      message: `Thanks, ${name}! You are signed up for ${category.name}.`,
      payload: buildPublicPayload_()
    };
  } finally {
    lock.releaseLock();
  }
}

function buildPublicPayload_() {
  const categories = readCategories_().filter((cat) => cat.active);
  const activeCategoryIds = new Set(categories.map((cat) => cat.id));
  const signups = readSignupRows_()
    .filter((entry) => activeCategoryIds.has(String(entry.CategoryId)))
    .map((entry) => ({
      id: String(entry.SignupId || ""),
      categoryId: String(entry.CategoryId || ""),
      name: String(entry.Name || ""),
      item: String(entry.Item || ""),
      createdAt: stringifyDate_(entry.Timestamp)
    }));

  return {
    success: true,
    event: readSettings_(),
    categories,
    signups,
    serverTime: new Date().toISOString()
  };
}

function ensureWorkbook_() {
  const ss = getSpreadsheet_();
  ensureSheet_(ss, SHEET_NAMES.settings, SETTINGS_HEADERS);
  ensureSheet_(ss, SHEET_NAMES.categories, CATEGORY_HEADERS);
  ensureSheet_(ss, SHEET_NAMES.signups, SIGNUP_HEADERS);
  seedSettings_(ss.getSheetByName(SHEET_NAMES.settings));
  seedCategories_(ss.getSheetByName(SHEET_NAMES.categories));
}

function getSpreadsheet_() {
  if (SPREADSHEET_ID) {
    return SpreadsheetApp.openById(SPREADSHEET_ID);
  }

  const active = SpreadsheetApp.getActiveSpreadsheet();
  if (!active) {
    throw new Error("No active spreadsheet found. Bind this script to a Google Sheet or set SPREADSHEET_ID.");
  }
  return active;
}

function ensureSheet_(ss, sheetName, headers) {
  let sheet = ss.getSheetByName(sheetName);
  if (!sheet) {
    sheet = ss.insertSheet(sheetName);
  }

  if (sheet.getLastRow() === 0) {
    sheet.appendRow(headers);
    sheet.setFrozenRows(1);
    return sheet;
  }

  const currentHeaders = sheet.getRange(1, 1, 1, headers.length).getValues()[0];
  const missingHeaders = headers.some((header, index) => currentHeaders[index] !== header);
  if (missingHeaders) {
    sheet.getRange(1, 1, 1, headers.length).setValues([headers]);
    sheet.setFrozenRows(1);
  }

  return sheet;
}

function seedSettings_(sheet) {
  if (sheet.getLastRow() > 1) return;

  Object.keys(DEFAULT_EVENT).forEach((key) => {
    sheet.appendRow([key, DEFAULT_EVENT[key]]);
  });
}

function seedCategories_(sheet) {
  if (sheet.getLastRow() > 1) return;

  DEFAULT_CATEGORIES.forEach((cat) => {
    sheet.appendRow([cat.id, cat.name, cat.needed, cat.icon, true]);
  });
}

function readSettings_() {
  const sheet = getSpreadsheet_().getSheetByName(SHEET_NAMES.settings);
  const values = sheet.getDataRange().getValues().slice(1);
  const event = Object.assign({}, DEFAULT_EVENT);

  values.forEach((row) => {
    const key = String(row[0] || "").trim();
    if (key && Object.prototype.hasOwnProperty.call(event, key)) {
      event[key] = String(row[1] || "").trim();
    }
  });

  return event;
}

function readCategories_() {
  const rows = readObjectRows_(getSpreadsheet_().getSheetByName(SHEET_NAMES.categories));
  return rows
    .map((row) => ({
      id: clean_(row.CategoryId),
      name: clean_(row.Name),
      needed: Math.max(0, Number(row.Needed) || 0),
      icon: clean_(row.Icon) || "🍽️",
      active: String(row.Active).toLowerCase() !== "false"
    }))
    .filter((cat) => cat.id && cat.name);
}

function readSignupRows_() {
  return readObjectRows_(getSpreadsheet_().getSheetByName(SHEET_NAMES.signups));
}

function readObjectRows_(sheet) {
  const values = sheet.getDataRange().getValues();
  if (values.length < 2) return [];

  const headers = values[0].map((header) => String(header || "").trim());
  return values.slice(1)
    .filter((row) => row.some((cell) => String(cell || "").trim() !== ""))
    .map((row) => {
      const item = {};
      headers.forEach((header, index) => {
        item[header] = row[index];
      });
      return item;
    });
}

function jsonp_(payload, e) {
  const callback = sanitizeCallback_(getParam_(e, "callback"));
  const json = JSON.stringify(payload).replace(/</g, "\\u003c");

  if (callback) {
    return ContentService
      .createTextOutput(`${callback}(${json});`)
      .setMimeType(ContentService.MimeType.JAVASCRIPT);
  }

  return ContentService
    .createTextOutput(json)
    .setMimeType(ContentService.MimeType.JSON);
}

function htmlPostMessage_(payload) {
  const safePayload = Object.assign({ source: "linger-longer-potluck" }, payload);
  const json = JSON.stringify(safePayload).replace(/</g, "\\u003c");
  return HtmlService
    .createHtmlOutput(`<!doctype html><html><body><script>window.parent.postMessage(${json}, "*");</script></body></html>`)
    .setXFrameOptionsMode(HtmlService.XFrameOptionsMode.ALLOWALL);
}

function getParam_(e, name) {
  return e && e.parameter && Object.prototype.hasOwnProperty.call(e.parameter, name) ? e.parameter[name] : "";
}

function clean_(value) {
  return String(value || "").trim().slice(0, 500);
}

function sanitizeCallback_(value) {
  const callback = String(value || "").trim();
  return /^[A-Za-z_$][0-9A-Za-z_$]*(\.[A-Za-z_$][0-9A-Za-z_$]*)*$/.test(callback) ? callback : "";
}

function stringifyDate_(value) {
  if (Object.prototype.toString.call(value) === "[object Date]" && !Number.isNaN(value.getTime())) {
    return value.toISOString();
  }
  return String(value || "");
}
