import {
  createContext,
  useContext,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react'
import Papa from 'papaparse'
import {
  ArrowDownToLine,
  BookOpenCheck,
  BriefcaseBusiness,
  Building2,
  Calculator,
  CalendarDays,
  Car,
  CarFront,
  Check,
  CheckCircle2,
  ChevronRight,
  CircleDollarSign,
  CircleHelp,
  ClipboardCheck,
  FileText,
  Flower2,
  Home,
  Landmark,
  LayoutDashboard,
  MapPin,
  Menu,
  Plus,
  ReceiptText,
  Search,
  ShieldCheck,
  Trash2,
  TrendingUp,
  Upload,
  X,
} from 'lucide-react'
import './index.css'

type Page =
  | 'dashboard'
  | 'expenses'
  | 'mileage'
  | 'vehicle-guide'
  | 'home-office'
  | 'planner'
  | 'deductibility'
  | 'compliance'

type Expense = {
  id: string
  date: string
  vendor: string
  category: string
  amount: number
  businessUse: number
  note: string
}

type Trip = {
  id: string
  date: string
  purpose: string
  miles: number
  from: string
  to: string
}

type ChecklistState = Record<string, boolean>

type HelpTopic = {
  id: string
  title: string
  category: string
  summary: string
  sections: { title: string; body: string }[]
  records?: string[]
  example?: string
  link?: { label: string; url: string }
}

type StoredState = {
  expenses: Expense[]
  trips: Trip[]
  mileageRate: number
  officeSqFt: number
  homeSqFt: number
  annualHomeCosts: number
  method: 'simplified' | 'actual'
  projectedRevenue: number
  completed: ChecklistState
}

const STORAGE_KEY = 'desert-ledger-v1'

const defaults: StoredState = {
  expenses: [],
  trips: [],
  mileageRate: 0.76,
  officeSqFt: 0,
  homeSqFt: 0,
  annualHomeCosts: 0,
  method: 'simplified',
  projectedRevenue: 0,
  completed: {},
}

const expenseCategories = [
  'Advertising',
  'Contract labor',
  'Equipment & supplies',
  'Insurance',
  'Legal & professional',
  'Meals',
  'Office expense',
  'Rent & utilities',
  'Software & subscriptions',
  'Travel',
  'Vehicle',
  'Other',
]

const navItems: { id: Page; label: string; icon: typeof Home }[] = [
  { id: 'dashboard', label: 'Overview', icon: LayoutDashboard },
  { id: 'expenses', label: 'Expenses', icon: ReceiptText },
  { id: 'mileage', label: 'Mileage', icon: Car },
  { id: 'vehicle-guide', label: 'Buying a vehicle', icon: CarFront },
  { id: 'home-office', label: 'Home office', icon: Home },
  { id: 'planner', label: 'Tax planner', icon: Calculator },
  { id: 'deductibility', label: 'Deduction FAQ', icon: BookOpenCheck },
  { id: 'compliance', label: 'AZ compliance', icon: ShieldCheck },
]

const complianceItems = [
  {
    id: 'entity',
    title: 'File Articles of Organization',
    detail: 'Form the LLC with the Arizona Corporation Commission and appoint an Arizona statutory agent.',
    link: 'https://www.azcc.gov/corporations',
    source: 'Arizona Corporation Commission',
  },
  {
    id: 'publication',
    title: 'Confirm publication is satisfied',
    detail:
      'For a known place of business in Maricopa County, the ACC publishes the notice on its website. Goodyear is in Maricopa County; confirm your filing record.',
    link: 'https://www.azcc.gov/corporations/limited-liability-companies',
    source: 'Arizona Corporation Commission',
  },
  {
    id: 'ein',
    title: 'Get a federal EIN',
    detail: 'Apply directly with the IRS. It is free and commonly needed for banking, payroll, and tax filings.',
    link: 'https://www.irs.gov/businesses/small-businesses-self-employed/get-an-employer-identification-number',
    source: 'IRS',
  },
  {
    id: 'bank',
    title: 'Separate business finances',
    detail: 'Open a business bank account and card. Keep owner contributions and draws clearly labeled.',
    link: 'https://www.sba.gov/business-guide/launch-your-business/open-business-bank-account',
    source: 'U.S. Small Business Administration',
  },
  {
    id: 'tpt',
    title: 'Determine TPT licensing',
    detail:
      'Arizona Transaction Privilege Tax applies to specific business activities, not all services. Use AZTaxes/JT-1 and verify the Goodyear jurisdiction and business code.',
    link: 'https://azdor.gov/business/transaction-privilege-tax',
    source: 'Arizona Department of Revenue',
  },
  {
    id: 'city',
    title: 'Check Goodyear licensing',
    detail: 'Confirm local business registration, zoning, home-occupation, and regulated-activity requirements.',
    link: 'https://www.goodyearaz.gov/business/business-licenses',
    source: 'City of Goodyear',
  },
  {
    id: 'classification',
    title: 'Choose federal tax treatment',
    detail:
      'A single-member LLC is generally disregarded by default. Review partnership, S corporation, or C corporation elections with a tax professional before electing.',
    link: 'https://www.irs.gov/businesses/small-businesses-self-employed/limited-liability-company-llc',
    source: 'IRS',
  },
  {
    id: 'books',
    title: 'Set a monthly close routine',
    detail: 'Reconcile bank accounts, attach receipts, review categories, and document business purpose every month.',
    link: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping',
    source: 'IRS',
  },
]

const deadlines = [
  { date: 'Sep 15, 2026', label: 'Federal Q3 estimated tax', context: '2026 Form 1040-ES' },
  { date: 'Jan 15, 2027', label: 'Federal Q4 estimated tax', context: '2026 Form 1040-ES' },
  { date: 'Jan 31, 2027', label: '1099/W-2 furnishing deadline', context: 'If applicable' },
  { date: 'Apr 15, 2027', label: 'Individual return & Q1 estimate', context: 'Confirm current IRS/AZDOR dates' },
]

type DeductionFaq = {
  title: string
  category: string
  status: 'Usually' | 'Sometimes' | 'Generally no'
  answer: string
  records: string
}

const deductionFaqs: DeductionFaq[] = [
  {
    title: 'Home office',
    category: 'Office',
    status: 'Sometimes',
    answer: 'A space used regularly and exclusively for business may qualify. It generally must be a principal place of business, client meeting place, or separate business structure.',
    records: 'Photos, measurements, floor plan, expense statements, and a written description of use.',
  },
  {
    title: 'Business vehicle and mileage',
    category: 'Vehicle',
    status: 'Sometimes',
    answer: 'The business-use share may be deductible using the standard mileage or actual-expense method. Personal use and normal commuting are not business deductions.',
    records: 'Contemporaneous mileage log, business purpose, odometer readings, receipts, title, and financing records.',
  },
  {
    title: 'Business meals',
    category: 'Travel',
    status: 'Sometimes',
    answer: 'Qualifying business meals are commonly subject to a 50% limit. The taxpayer or employee must generally be present and the meal cannot be lavish or extravagant.',
    records: 'Itemized receipt, attendees, business relationship, date, location, and specific business discussion.',
  },
  {
    title: 'Entertainment and event tickets',
    category: 'Travel',
    status: 'Generally no',
    answer: 'Entertainment expenses are generally nondeductible even when business is discussed. Separately stated qualifying food and beverages may receive different treatment.',
    records: 'Itemized invoices separating food from entertainment and documentation of business purpose.',
  },
  {
    title: 'Business travel',
    category: 'Travel',
    status: 'Sometimes',
    answer: 'Transportation, lodging, and certain incidental costs may qualify when travel is primarily for business and requires being away from the tax home. Personal extensions must be separated.',
    records: 'Itinerary, receipts, meeting agenda, destination, dates, and allocation between business and personal days.',
  },
  {
    title: 'Computer, camera, and equipment',
    category: 'Equipment',
    status: 'Usually',
    answer: 'The business-use share of ordinary and necessary equipment may be deductible through depreciation, Section 179, bonus depreciation, or other applicable treatment.',
    records: 'Invoice, placed-in-service date, serial number, business-use percentage, and disposition details.',
  },
  {
    title: 'Phone and internet',
    category: 'Office',
    status: 'Sometimes',
    answer: 'The documented business-use share may qualify. The base cost of the first residential telephone line has special limits.',
    records: 'Bills, business-use allocation method, and sample usage support.',
  },
  {
    title: 'Software and subscriptions',
    category: 'Office',
    status: 'Usually',
    answer: 'Software and subscriptions used for the business are generally deductible, although long-term licenses and implementation costs can require different treatment.',
    records: 'Invoices, subscription term, user list, and business purpose.',
  },
  {
    title: 'Startup and organization costs',
    category: 'Formation',
    status: 'Sometimes',
    answer: 'Limited first-year deductions may be available, with remaining qualifying costs amortized. Costs incurred before the business begins need separate tracking.',
    records: 'Formation invoices, launch date, pre-opening expense ledger, and legal or accounting statements.',
  },
  {
    title: 'Legal and accounting fees',
    category: 'Professional',
    status: 'Usually',
    answer: 'Fees directly related to operating the business are generally deductible. Formation, acquisition, defense of title, and long-term benefit costs may need capitalization.',
    records: 'Engagement letter, detailed invoice, matter description, and proof of payment.',
  },
  {
    title: 'Education and training',
    category: 'Professional',
    status: 'Sometimes',
    answer: 'Education that maintains or improves skills in an existing trade may qualify. Education that meets minimum requirements or prepares you for a new trade generally does not.',
    records: 'Course description, syllabus, receipt, and explanation of connection to current work.',
  },
  {
    title: 'Clothing and grooming',
    category: 'General',
    status: 'Generally no',
    answer: 'Everyday clothing is generally personal even when required for work. Protective gear or a uniform unsuitable for ordinary wear may qualify.',
    records: 'Uniform policy, photos, receipts, and explanation of why the item is unsuitable for everyday use.',
  },
  {
    title: 'Advertising and website costs',
    category: 'Marketing',
    status: 'Usually',
    answer: 'Ordinary advertising, design, hosting, and promotional costs are generally deductible. Certain long-lived website development or asset-acquisition costs can require capitalization.',
    records: 'Campaign invoices, contracts, creative deliverables, dates, and business purpose.',
  },
  {
    title: 'Client and employee gifts',
    category: 'Marketing',
    status: 'Sometimes',
    answer: 'Business gifts are generally limited to $25 per recipient per year for federal income-tax purposes, with specific incidental-cost and entity rules.',
    records: 'Recipient, business relationship, date, item, cost, and purpose.',
  },
  {
    title: 'Health insurance',
    category: 'People',
    status: 'Sometimes',
    answer: 'Self-employed health-insurance treatment depends on eligibility, business profit, entity tax classification, and whether coverage is established under the business.',
    records: 'Policy, premium statements, proof of payment, payroll treatment if applicable, and coverage months.',
  },
  {
    title: 'Contractors and freelancers',
    category: 'People',
    status: 'Usually',
    answer: 'Ordinary contractor payments are generally deductible, but worker classification and Form 1099 reporting rules must be handled correctly.',
    records: 'Contract, Form W-9, invoices, payment history, work product, and Form 1099 filing records.',
  },
]

const helpTopics: HelpTopic[] = [
  {
    id: 'overview',
    title: 'How the workspace works',
    category: 'Getting started',
    summary: 'Understand what Pink Wave stores, calculates, and exports.',
    sections: [
      { title: 'Local-first storage', body: 'Your entries are saved in this browser on this device. The app does not send them to a server. Clearing browser data can erase the workspace.' },
      { title: 'Planning calculations', body: 'Dashboard amounts combine the expenses, mileage, and home-office estimates entered here. They are planning figures, not filed tax-return amounts.' },
      { title: 'A simple routine', body: 'Enter or import expenses, log mileage as trips happen, reconcile monthly, export backups, and review estimates before each quarterly payment date.' },
    ],
    records: ['Export a JSON backup regularly', 'Keep source receipts outside this app', 'Reconcile totals to business bank and card statements'],
  },
  {
    id: 'expense-tracking',
    title: 'Recording business expenses',
    category: 'Expenses',
    summary: 'Learn what each expense field means and what evidence supports a deduction.',
    sections: [
      { title: 'Amount versus deductible amount', body: 'Amount is what Pink Wave paid. The deductible amount is the amount multiplied by the business-use percentage. The percentage should reflect a supportable allocation, not a guess.' },
      { title: 'Category', body: 'Categories organize records for review; a category does not make an item deductible. The underlying facts, timing, business purpose, and special tax rules control treatment.' },
      { title: 'Business purpose', body: 'Write a specific connection to Pink Wave operations. “Client planning meeting” is stronger than “business.” For meals and travel, include who, where, and why.' },
    ],
    records: ['Itemized receipt or invoice', 'Proof of payment', 'Date and vendor', 'Written business purpose', 'Business-use allocation for mixed purchases'],
    example: 'Example: A $120 phone bill used 70% for documented business activity is entered as $120 with 70% business use, producing an $84 planning amount.',
    link: { label: 'IRS recordkeeping guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping' },
  },
  {
    id: 'expense-import',
    title: 'Importing expense files',
    category: 'Expenses',
    summary: 'Prepare CSV, TSV, or JSON files and understand validation and duplicate checks.',
    sections: [
      { title: 'Accepted columns', body: 'The importer recognizes common names for date, vendor/payee/merchant, amount/total/debit, category, business-use percentage, and business purpose/note/memo. Date, vendor, and a positive amount are required.' },
      { title: 'Preview before saving', body: 'Nothing is added until you confirm the preview. Invalid rows are listed and skipped. Unknown categories are safely assigned to Other for later review.' },
      { title: 'Duplicate prevention', body: 'A row is treated as a duplicate when its date, normalized vendor, and amount match an existing record or another row in the same import.' },
    ],
    records: ['Use one header row', 'Use YYYY-MM-DD dates when possible', 'Represent business use as 0 through 100', 'Review Other-category records after import'],
    example: 'CSV header: Date,Vendor,Category,Amount,Business Use %,Business Purpose',
  },
  {
    id: 'mileage',
    title: 'Business mileage and commuting',
    category: 'Vehicles',
    summary: 'Know which trips to log, which trips are personal, and how the estimate is calculated.',
    sections: [
      { title: 'Business transportation', body: 'Trips between business locations, to clients, to suppliers, or for other specific business purposes may qualify. Document each trip when it occurs.' },
      { title: 'Commuting', body: 'Travel between home and a regular work location is generally personal commuting. A qualifying principal-place-of-business home office can affect treatment of trips to other work locations.' },
      { title: 'Rate calculation', body: 'The workspace applies the IRS business mileage rate by trip date: 72.5 cents per mile for January through June 2026 and 76 cents beginning July 1, 2026.' },
    ],
    records: ['Trip date', 'Starting point and destination', 'Business purpose', 'Business miles', 'Beginning and ending annual odometer readings'],
    link: { label: 'IRS standard mileage rates', url: 'https://www.irs.gov/tax-professionals/standard-mileage-rates' },
  },
  {
    id: 'vehicle-purchase',
    title: 'Buying a vehicle through the LLC',
    category: 'Vehicles',
    summary: 'Understand title ownership, loans, business use, depreciation, and personal use.',
    sections: [
      { title: 'Ownership is not deductibility', body: 'Putting Pink Wave on the title may support separation and insurance planning, but it does not turn personal use into business use. A default single-member LLC is generally disregarded for federal income tax.' },
      { title: 'Purchase and financing', body: 'The vehicle is generally recorded as an asset. Loan principal reduces a liability rather than creating an immediate expense. Business-use interest and operating costs can have separate treatment.' },
      { title: 'Depreciation choices', body: 'MACRS, Section 179, bonus depreciation, luxury-auto limits, vehicle weight, placed-in-service date, and qualified business use can all affect the deduction. A later drop in business use can cause recapture.' },
    ],
    records: ['Purchase agreement and title', 'Loan statements', 'Insurance policy', 'Placed-in-service date', 'Mileage log', 'Operating-cost receipts', 'Vehicle disposition records'],
    example: 'An 80% business-use vehicle does not create a deduction for the other 20% personal use. The calculator shows business-use planning figures, not an automatic first-year write-off.',
    link: { label: 'IRS Publication 463', url: 'https://www.irs.gov/publications/p463' },
  },
  {
    id: 'home-office',
    title: 'Home-office deduction',
    category: 'Deductions',
    summary: 'Compare simplified and actual methods after checking eligibility.',
    sections: [
      { title: 'Eligibility first', body: 'The space generally must be used regularly and exclusively for business and meet a principal-place-of-business, client-meeting, or separate-structure test. A deduction method cannot fix an ineligible space.' },
      { title: 'Simplified method', body: 'The federal simplified method generally uses $5 per square foot up to 300 square feet, subject to income limitations. The workspace applies that basic planning formula.' },
      { title: 'Actual-expense method', body: 'Direct expenses and the business share of indirect home costs can be relevant. Depreciation, mortgage interest, taxes, casualty losses, carryovers, and income limits require return-level analysis.' },
    ],
    records: ['Office measurements and floor plan', 'Photos showing exclusive use', 'Rent or mortgage records', 'Utilities and insurance', 'Repairs and maintenance', 'Prior-year carryovers'],
    link: { label: 'IRS home-office guidance', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/home-office-deduction' },
  },
  {
    id: 'estimated-taxes',
    title: 'Estimated tax planning',
    category: 'Tax planning',
    summary: 'Use the reserve model without mistaking it for a completed tax calculation.',
    sections: [
      { title: 'What the planner does', body: 'It subtracts tracked deductions from projected business revenue, then applies your chosen federal, Arizona, and cushion percentages to the remaining projected profit.' },
      { title: 'What it does not do', body: 'It does not calculate filing-status brackets, household income, self-employment tax, qualified business income, credits, safe-harbor payments, Arizona adjustments, or prior withholding.' },
      { title: 'Payment timing', body: 'Estimated taxes are generally paid in four installments, but the periods are not equal calendar quarters. Weekend, holiday, disaster, fiscal-year, and annualized-income rules can change dates or amounts.' },
    ],
    records: ['Year-to-date profit and loss', 'Prior-year federal and Arizona returns', 'Household withholding', 'Estimated payments already made', 'Expected credits and other income'],
    link: { label: 'IRS estimated taxes', url: 'https://www.irs.gov/businesses/small-businesses-self-employed/estimated-taxes' },
  },
  {
    id: 'deductibility',
    title: 'Using the deduction FAQ',
    category: 'Deductions',
    summary: 'Interpret “usually,” “sometimes,” and “generally no” correctly.',
    sections: [
      { title: 'Usually', body: 'The category is commonly deductible when it is ordinary, necessary, properly timed, business-related, and documented. Capitalization or other limits can still apply.' },
      { title: 'Sometimes', body: 'Eligibility depends heavily on facts, allocation, entity treatment, substantiation, or a special limitation. Read the detailed explanation before recording a business-use share.' },
      { title: 'Generally no', body: 'The expense is normally personal or specifically disallowed. Narrow exceptions may exist, but the business name on a receipt does not override the rule.' },
    ],
    records: ['Receipt plus business purpose', 'Support for any allocation', 'Evidence of special eligibility', 'Tax-professional conclusion for uncertain items'],
  },
  {
    id: 'llc-compliance',
    title: 'Arizona LLC compliance',
    category: 'Arizona LLC',
    summary: 'Separate entity formation from tax, licensing, payroll, and local obligations.',
    sections: [
      { title: 'Entity maintenance', body: 'Arizona LLCs generally do not file annual reports with the Arizona Corporation Commission, unlike corporations. Keep the statutory agent and address current and preserve formation records.' },
      { title: 'TPT and local licensing', body: 'Arizona Transaction Privilege Tax applies to specified business classifications rather than every service. Goodyear licensing, zoning, home-occupation, and regulated-activity rules can apply separately.' },
      { title: 'Federal classification', body: 'A single-member LLC is generally disregarded by default. Partnership, S corporation, and C corporation treatment involve different filings, payroll, deadlines, and operating requirements.' },
    ],
    records: ['Articles of Organization', 'EIN confirmation', 'Operating agreement', 'Licenses and registrations', 'Tax elections', 'Owner contributions and distributions'],
    link: { label: 'Arizona Corporation Commission', url: 'https://www.azcc.gov/corporations' },
  },
  {
    id: 'backups',
    title: 'Backups and data privacy',
    category: 'Getting started',
    summary: 'Protect your records and understand what the exported file contains.',
    sections: [
      { title: 'Browser storage', body: 'The app saves data using local browser storage. Data can differ between browsers, browser profiles, private windows, and devices.' },
      { title: 'JSON backup', body: 'Export backup creates a readable JSON file containing expense, mileage, calculator, and checklist data. Store it securely because it can contain sensitive business information.' },
      { title: 'Source documents', body: 'A backup preserves entries, not receipt images or external statements. Keep source documents in a separate secure filing system and follow applicable retention guidance.' },
    ],
    records: ['Create periodic dated backups', 'Keep an encrypted second copy', 'Test that backup files can be opened', 'Retain receipts separately'],
  },
]

function currency(value: number) {
  return new Intl.NumberFormat('en-US', { style: 'currency', currency: 'USD' }).format(value || 0)
}

function today() {
  return new Date().toISOString().slice(0, 10)
}

function makeId() {
  return `${Date.now()}-${Math.random().toString(36).slice(2)}`
}

function mileageRateForDate(date: string, fallback: number) {
  if (date >= '2026-07-01' && date <= '2026-12-31') return 0.76
  if (date >= '2026-01-01' && date <= '2026-06-30') return 0.725
  return fallback
}

function normalizeDate(value: unknown) {
  const text = String(value ?? '').trim()
  if (/^\d{4}-\d{2}-\d{2}/.test(text)) return text.slice(0, 10)
  const parsed = new Date(text)
  if (Number.isNaN(parsed.getTime())) return ''
  const year = parsed.getFullYear()
  const month = String(parsed.getMonth() + 1).padStart(2, '0')
  const day = String(parsed.getDate()).padStart(2, '0')
  return `${year}-${month}-${day}`
}

function parseNumber(value: unknown) {
  const text = String(value ?? '').trim()
  const accountingNegative = text.startsWith('(') && text.endsWith(')')
  const parsed = Number(text.replaceAll(',', '').replaceAll('$', '').replaceAll('%', '').replace(/[()]/g, ''))
  if (!Number.isFinite(parsed)) return Number.NaN
  return accountingNegative ? -parsed : parsed
}

function normalizeImportedExpense(row: unknown, rowNumber: number) {
  if (!row || typeof row !== 'object') {
    return { error: `Row ${rowNumber}: expected an expense record.` }
  }
  const normalized = Object.fromEntries(
    Object.entries(row as Record<string, unknown>).map(([key, value]) => [
      key.toLowerCase().replace(/[^a-z0-9]/g, ''),
      value,
    ]),
  )
  const get = (...keys: string[]) => keys.map((key) => normalized[key]).find((value) => value !== undefined)
  const date = normalizeDate(get('date', 'transactiondate', 'purchasedate'))
  const vendor = String(get('vendor', 'payee', 'merchant', 'supplier', 'description', 'name') ?? '').trim()
  const rawAmount = parseNumber(get('amount', 'total', 'debit', 'charge', 'cost'))
  const amount = Math.abs(rawAmount)
  const rawBusinessUse = get('businessuse', 'businessusepercent', 'businesspercentage', 'deductiblepercent')
  const businessUse = rawBusinessUse === undefined || rawBusinessUse === '' ? 100 : parseNumber(rawBusinessUse)
  const rawCategory = String(get('category', 'expensecategory', 'type') ?? 'Other').trim()
  const category =
    expenseCategories.find((item) => item.toLowerCase() === rawCategory.toLowerCase()) ?? 'Other'
  const note = String(get('businesspurpose', 'purpose', 'note', 'notes', 'memo') ?? '').trim()

  if (!date) return { error: `Row ${rowNumber}: missing or invalid date.` }
  if (!vendor) return { error: `Row ${rowNumber}: missing vendor or payee.` }
  if (!Number.isFinite(amount) || amount <= 0) return { error: `Row ${rowNumber}: missing or invalid amount.` }
  if (!Number.isFinite(businessUse) || businessUse < 0 || businessUse > 100) {
    return { error: `Row ${rowNumber}: business use must be from 0 to 100.` }
  }

  return {
    expense: { id: makeId(), date, vendor, category, amount, businessUse, note } satisfies Expense,
  }
}

function loadState(): StoredState {
  try {
    const stored = localStorage.getItem(STORAGE_KEY)
    return stored ? { ...defaults, ...JSON.parse(stored) } : defaults
  } catch {
    return defaults
  }
}

function downloadFile(name: string, content: string, type: string) {
  const url = URL.createObjectURL(new Blob([content], { type }))
  const anchor = document.createElement('a')
  anchor.href = url
  anchor.download = name
  anchor.click()
  URL.revokeObjectURL(url)
}

const HelpContext = createContext<{ openHelp: (topicId?: string) => void } | null>(null)

function useHelp() {
  const context = useContext(HelpContext)
  if (!context) throw new Error('Help controls must be rendered inside HelpContext.')
  return context
}

function App() {
  const [page, setPage] = useState<Page>('dashboard')
  const [mobileOpen, setMobileOpen] = useState(false)
  const [state, setState] = useState<StoredState>(loadState)
  const [activeHelp, setActiveHelp] = useState<string | null>(null)

  useEffect(() => {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }, [state])

  const totals = useMemo(() => {
    const expenses = state.expenses.reduce(
      (sum, item) => sum + item.amount * (item.businessUse / 100),
      0,
    )
    const miles = state.trips.reduce((sum, trip) => sum + trip.miles, 0)
    const mileage = state.trips.reduce(
      (sum, trip) => sum + trip.miles * mileageRateForDate(trip.date, state.mileageRate),
      0,
    )
    const officeRatio =
      state.homeSqFt > 0 ? Math.min(state.officeSqFt / state.homeSqFt, 1) : 0
    const simplified = Math.min(state.officeSqFt, 300) * 5
    const actual = state.annualHomeCosts * officeRatio
    const homeOffice = state.method === 'simplified' ? simplified : actual
    const totalDeductions = expenses + mileage + homeOffice
    const projectedProfit = Math.max(state.projectedRevenue - totalDeductions, 0)
    return {
      expenses,
      miles,
      mileage,
      officeRatio,
      simplified,
      actual,
      homeOffice,
      totalDeductions,
      projectedProfit,
    }
  }, [state])

  const navigate = (destination: Page) => {
    setPage(destination)
    setMobileOpen(false)
    window.scrollTo({ top: 0, behavior: 'smooth' })
  }

  const exportBackup = () => {
    downloadFile(
      `pink-wave-tax-backup-${today()}.json`,
      JSON.stringify(state, null, 2),
      'application/json',
    )
  }

  const pageTitle = navItems.find((item) => item.id === page)?.label ?? 'Overview'
  const openHelp = (topicId = 'index') => setActiveHelp(topicId)

  return (
    <HelpContext.Provider value={{ openHelp }}>
      <div className="app-shell">
        <aside className={`sidebar ${mobileOpen ? 'sidebar-open' : ''}`}>
        <div className="brand">
          <div className="brand-mark" aria-hidden="true">
            <Flower2 size={22} />
          </div>
          <div>
            <strong>Pink Wave, LLC</strong>
            <span>Arizona tax workspace</span>
          </div>
          <button className="icon-button mobile-close" onClick={() => setMobileOpen(false)} aria-label="Close menu">
            <X size={20} />
          </button>
        </div>

        <nav aria-label="Primary navigation">
          <p className="nav-eyebrow">Workspace</p>
          {navItems.map((item) => {
            const Icon = item.icon
            return (
              <button
                key={item.id}
                className={`nav-item ${page === item.id ? 'active' : ''}`}
                onClick={() => navigate(item.id)}
                aria-current={page === item.id ? 'page' : undefined}
              >
                <Icon size={19} />
                <span>{item.label}</span>
              </button>
            )
          })}
        </nav>

        <div className="sidebar-card">
          <MapPin size={18} />
          <div>
            <strong>Goodyear, Arizona</strong>
            <span>Maricopa County - 2026 workspace</span>
          </div>
        </div>

        <div className="sidebar-footer">
          <button className="text-button" onClick={exportBackup}>
            <ArrowDownToLine size={17} />
            Export backup
          </button>
          <p>Stored only in this browser.</p>
        </div>
        </aside>

        {mobileOpen && <button className="sidebar-scrim" onClick={() => setMobileOpen(false)} aria-label="Close menu" />}

        <main className="main">
          <header className="topbar">
          <div className="topbar-title">
            <button className="icon-button menu-button" onClick={() => setMobileOpen(true)} aria-label="Open menu">
              <Menu size={21} />
            </button>
            <div>
              <span>Pink Wave, LLC</span>
              <strong>{pageTitle}</strong>
            </div>
          </div>
            <div className="topbar-actions">
              <span className="local-badge"><ShieldCheck size={15} /> Local & private</span>
              <button className="secondary-button compact help-center-button" onClick={() => openHelp()}>
                <CircleHelp size={17} /> <span>Help center</span>
              </button>
              <button className="primary-button compact" onClick={() => navigate('expenses')} aria-label="Add expense">
                <Plus size={17} /> Add expense
              </button>
            </div>
          </header>

          <div className="content">
          {page === 'dashboard' && (
            <Dashboard state={state} totals={totals} navigate={navigate} setState={setState} />
          )}
          {page === 'expenses' && <Expenses state={state} setState={setState} total={totals.expenses} />}
          {page === 'mileage' && <Mileage state={state} setState={setState} totals={totals} />}
          {page === 'vehicle-guide' && <VehicleGuide />}
          {page === 'home-office' && <HomeOffice state={state} setState={setState} totals={totals} />}
          {page === 'planner' && <Planner state={state} setState={setState} totals={totals} />}
          {page === 'deductibility' && <DeductionFaq />}
          {page === 'compliance' && <Compliance state={state} setState={setState} />}
          </div>
        </main>
      </div>
      {activeHelp && (
        <HelpModal
          topicId={activeHelp}
          onSelect={setActiveHelp}
          onClose={() => setActiveHelp(null)}
        />
      )}
    </HelpContext.Provider>
  )
}

function HelpModal({
  topicId,
  onSelect,
  onClose,
}: {
  topicId: string
  onSelect: (topicId: string) => void
  onClose: () => void
}) {
  const [query, setQuery] = useState('')
  const closeButton = useRef<HTMLButtonElement>(null)
  const dialog = useRef<HTMLElement>(null)
  const topic = helpTopics.find((item) => item.id === topicId)
  const normalizedQuery = query.trim().toLowerCase()
  const filteredTopics = helpTopics.filter((item) =>
    `${item.title} ${item.category} ${item.summary} ${item.sections.map((section) => section.body).join(' ')}`
      .toLowerCase()
      .includes(normalizedQuery),
  )

  useEffect(() => {
    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    closeButton.current?.focus()
    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === 'Escape') onClose()
      if (event.key === 'Tab' && dialog.current) {
        const controls = Array.from(
          dialog.current.querySelectorAll<HTMLElement>('button, a, input, [tabindex]:not([tabindex="-1"])'),
        ).filter((element) => !element.hasAttribute('disabled'))
        const first = controls[0]
        const last = controls.at(-1)
        if (event.shiftKey && document.activeElement === first) {
          event.preventDefault()
          last?.focus()
        } else if (!event.shiftKey && document.activeElement === last) {
          event.preventDefault()
          first?.focus()
        }
      }
    }
    window.addEventListener('keydown', handleKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', handleKeyDown)
    }
  }, [onClose])

  return (
    <div
      className="help-overlay"
      onMouseDown={(event) => {
        if (event.target === event.currentTarget) onClose()
      }}
    >
      <section ref={dialog} className="help-dialog" role="dialog" aria-modal="true" aria-labelledby="help-dialog-title">
        <header className="help-dialog-header">
          <div className="help-dialog-title">
            <span><Flower2 size={20} /></span>
            <div>
              <small>Pink Wave guide</small>
              <h2 id="help-dialog-title">{topic ? topic.title : 'Help center'}</h2>
            </div>
          </div>
          <button ref={closeButton} className="icon-button" onClick={onClose} aria-label="Close help">
            <X size={20} />
          </button>
        </header>

        {topic ? (
          <div className="help-topic">
            <button className="help-back" onClick={() => onSelect('index')}>
              <ChevronRight size={16} /> All help topics
            </button>
            <p className="help-summary">{topic.summary}</p>
            <div className="help-sections">
              {topic.sections.map((section) => (
                <article key={section.title}>
                  <h3>{section.title}</h3>
                  <p>{section.body}</p>
                </article>
              ))}
            </div>
            {topic.example && (
              <div className="help-example">
                <Calculator size={18} />
                <div><strong>Example</strong><p>{topic.example}</p></div>
              </div>
            )}
            {topic.records && (
              <div className="help-records">
                <div><ClipboardCheck size={18} /><strong>Records to keep</strong></div>
                <ul>{topic.records.map((record) => <li key={record}>{record}</li>)}</ul>
              </div>
            )}
            {topic.link && (
              <a className="help-source" href={topic.link.url} target="_blank" rel="noreferrer">
                {topic.link.label} <ChevronRight size={15} />
              </a>
            )}
            <p className="help-disclaimer">Educational guidance only. Apply current law to Pink Wave's specific facts with a qualified tax or legal professional.</p>
          </div>
        ) : (
          <div className="help-index">
            <p>Choose a topic or search for a field, calculation, or tax concept.</p>
            <label className="help-search">
              <Search size={18} />
              <input
                autoFocus
                value={query}
                onChange={(event) => setQuery(event.target.value)}
                placeholder="Search expenses, mileage, home office..."
              />
            </label>
            <div className="help-topic-list">
              {filteredTopics.map((item) => (
                <button key={item.id} onClick={() => onSelect(item.id)}>
                  <span>{item.category}</span>
                  <strong>{item.title}</strong>
                  <p>{item.summary}</p>
                  <ChevronRight size={17} />
                </button>
              ))}
            </div>
            {filteredTopics.length === 0 && (
              <div className="help-empty"><Search size={22} /><strong>No matching help topic</strong><p>Try a broader term.</p></div>
            )}
          </div>
        )}
      </section>
    </div>
  )
}

type Totals = {
  expenses: number
  miles: number
  mileage: number
  officeRatio: number
  simplified: number
  actual: number
  homeOffice: number
  totalDeductions: number
  projectedProfit: number
}

function Dashboard({
  state,
  totals,
  navigate,
  setState,
}: {
  state: StoredState
  totals: Totals
  navigate: (page: Page) => void
  setState: React.Dispatch<React.SetStateAction<StoredState>>
}) {
  const completedCount = complianceItems.filter((item) => state.completed[item.id]).length

  return (
    <>
      <section className="page-heading dashboard-heading">
        <div className="sakura-field" aria-hidden="true">
          <Flower2 className="sakura-one" size={118} strokeWidth={0.7} />
          <Flower2 className="sakura-two" size={72} strokeWidth={0.8} />
          <Flower2 className="sakura-three" size={44} strokeWidth={1} />
        </div>
        <div>
          <p className="eyebrow">Pink Wave, LLC - 2026 tax year</p>
          <h1>Let your business bloom.</h1>
          <p>A calm, clear tax workspace for Pink Wave, LLC.</p>
        </div>
        <div className="page-actions">
          <HelpButton topicId="overview" label="How this works" />
          <button className="secondary-button" onClick={() => navigate('compliance')}>
            Review LLC checklist <ChevronRight size={17} />
          </button>
        </div>
      </section>

      <section className="metric-grid" aria-label="Tax summary">
        <Metric icon={TrendingUp} label="Projected revenue" value={currency(state.projectedRevenue)} action="Set in planner" onClick={() => navigate('planner')} />
        <Metric icon={ReceiptText} label="Expense deductions" value={currency(totals.expenses)} action={`${state.expenses.length} records`} onClick={() => navigate('expenses')} />
        <Metric icon={Car} label="Business mileage" value={totals.miles.toFixed(1)} action={currency(totals.mileage)} onClick={() => navigate('mileage')} />
        <Metric icon={CircleDollarSign} label="Tracked deductions" value={currency(totals.totalDeductions)} action="Planning estimate" onClick={() => navigate('planner')} emphasis />
      </section>

      <div className="dashboard-grid">
        <section className="panel setup-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Launch checklist</span>
              <h2>Arizona LLC setup</h2>
            </div>
            <div className="panel-heading-actions">
              <HelpButton topicId="llc-compliance" />
              <div className="progress-ring">{completedCount}/{complianceItems.length}</div>
            </div>
          </div>
          <div className="progress-track" aria-label={`${completedCount} of ${complianceItems.length} complete`}>
            <span style={{ width: `${(completedCount / complianceItems.length) * 100}%` }} />
          </div>
          <div className="mini-checklist">
            {complianceItems.slice(0, 4).map((item) => (
              <label key={item.id}>
                <input
                  type="checkbox"
                  checked={Boolean(state.completed[item.id])}
                  onChange={(event) =>
                    setState((current) => ({
                      ...current,
                      completed: { ...current.completed, [item.id]: event.target.checked },
                    }))
                  }
                />
                <span className="custom-check"><Check size={13} /></span>
                <span>{item.title}</span>
              </label>
            ))}
          </div>
          <button className="panel-link" onClick={() => navigate('compliance')}>
            View all requirements <ChevronRight size={16} />
          </button>
        </section>

        <section className="panel deadline-panel">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Calendar</span>
              <h2>Upcoming dates</h2>
            </div>
            <div className="panel-heading-actions"><HelpButton topicId="estimated-taxes" /><CalendarDays size={21} /></div>
          </div>
          <div className="deadline-list">
            {deadlines.slice(0, 3).map((deadline) => (
              <div className="deadline" key={deadline.date}>
                <div className="date-tile">
                  <strong>{deadline.date.split(' ')[1].replace(',', '')}</strong>
                  <span>{deadline.date.split(' ')[0]}</span>
                </div>
                <div>
                  <strong>{deadline.label}</strong>
                  <span>{deadline.context}</span>
                </div>
              </div>
            ))}
          </div>
          <p className="fine-print">Dates can shift for weekends, holidays, disasters, and filing extensions. Verify before paying.</p>
        </section>
      </div>

      <section className="panel quick-start">
        <div className="panel-heading">
          <div>
            <span className="section-kicker">Start here</span>
            <h2>Build defensible records</h2>
          </div>
        </div>
        <div className="quick-grid">
          <QuickAction icon={ReceiptText} title="Capture expenses" copy="Record amount, category, business-use share, and purpose." onClick={() => navigate('expenses')} />
          <QuickAction icon={Car} title="Log each trip" copy="Document date, destination, miles, and a specific business purpose." onClick={() => navigate('mileage')} />
          <QuickAction icon={Home} title="Measure your office" copy="Compare the simplified and actual-expense home-office methods." onClick={() => navigate('home-office')} />
          <QuickAction icon={Calculator} title="Plan cash reserves" copy="Estimate profit and create a quarterly tax savings target." onClick={() => navigate('planner')} />
          <QuickAction icon={CarFront} title="Buying a vehicle" copy="Understand LLC ownership, business use, depreciation, and mileage choices." onClick={() => navigate('vehicle-guide')} />
          <QuickAction icon={BookOpenCheck} title="Is it deductible?" copy="Search practical guidance for common business purchases and records." onClick={() => navigate('deductibility')} />
        </div>
      </section>

      <Disclaimer />
    </>
  )
}

function Metric({
  icon: Icon,
  label,
  value,
  action,
  onClick,
  emphasis = false,
}: {
  icon: typeof Home
  label: string
  value: string
  action: string
  onClick: () => void
  emphasis?: boolean
}) {
  return (
    <button className={`metric-card ${emphasis ? 'metric-emphasis' : ''}`} onClick={onClick}>
      <span className="metric-icon"><Icon size={19} /></span>
      <span className="metric-label">{label}</span>
      <strong>{value}</strong>
      <span className="metric-action">{action} <ChevronRight size={14} /></span>
    </button>
  )
}

function QuickAction({ icon: Icon, title, copy, onClick }: { icon: typeof Home; title: string; copy: string; onClick: () => void }) {
  return (
    <button className="quick-action" onClick={onClick}>
      <span><Icon size={20} /></span>
      <strong>{title}</strong>
      <p>{copy}</p>
      <ChevronRight className="quick-chevron" size={17} />
    </button>
  )
}

function Expenses({ state, setState, total }: { state: StoredState; setState: React.Dispatch<React.SetStateAction<StoredState>>; total: number }) {
  const importInput = useRef<HTMLInputElement>(null)
  const [importPreview, setImportPreview] = useState<{
    fileName: string
    expenses: Expense[]
    errors: string[]
  } | null>(null)
  const [importMessage, setImportMessage] = useState<{ kind: 'success' | 'error'; text: string } | null>(null)
  const [form, setForm] = useState({
    date: today(),
    vendor: '',
    category: expenseCategories[0],
    amount: '',
    businessUse: '100',
    note: '',
  })

  const submit = (event: FormEvent) => {
    event.preventDefault()
    const amount = Number(form.amount)
    const businessUse = Number(form.businessUse)
    if (!form.vendor.trim() || amount <= 0 || businessUse < 0 || businessUse > 100) return
    setState((current) => ({
      ...current,
      expenses: [
        { id: makeId(), date: form.date, vendor: form.vendor.trim(), category: form.category, amount, businessUse, note: form.note.trim() },
        ...current.expenses,
      ],
    }))
    setForm({ date: today(), vendor: '', category: form.category, amount: '', businessUse: '100', note: '' })
  }

  const exportCsv = () => {
    const rows = [
      ['Date', 'Vendor', 'Category', 'Amount', 'Business Use %', 'Deductible Amount', 'Business Purpose'],
      ...state.expenses.map((item) => [
        item.date,
        item.vendor,
        item.category,
        item.amount.toFixed(2),
        item.businessUse.toString(),
        (item.amount * item.businessUse / 100).toFixed(2),
        item.note,
      ]),
    ]
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n')
    downloadFile(`expenses-${today()}.csv`, csv, 'text/csv')
  }

  const handleImport = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]
    event.target.value = ''
    if (!file) return
    setImportMessage(null)

    try {
      const text = await file.text()
      const extension = file.name.split('.').pop()?.toLowerCase()
      let rows: unknown[]
      const parserErrors: string[] = []

      if (extension === 'json') {
        const parsed: unknown = JSON.parse(text)
        if (Array.isArray(parsed)) {
          rows = parsed
        } else if (parsed && typeof parsed === 'object' && Array.isArray((parsed as { expenses?: unknown }).expenses)) {
          rows = (parsed as { expenses: unknown[] }).expenses
        } else {
          throw new Error('JSON must contain an expense array or a Pink Wave backup with an expenses array.')
        }
      } else if (extension === 'csv' || extension === 'tsv') {
        const parsed = Papa.parse<Record<string, unknown>>(text, {
          header: true,
          skipEmptyLines: 'greedy',
          ...(extension === 'tsv' ? { delimiter: '\t' } : {}),
        })
        rows = parsed.data
        parserErrors.push(
          ...parsed.errors.map((error) => `Row ${(error.row ?? 0) + 2}: ${error.message}`),
        )
      } else {
        throw new Error('Choose a .csv, .tsv, or .json file.')
      }

      const expenses: Expense[] = []
      const validationErrors = [...parserErrors]
      rows.forEach((row, index) => {
        const normalized = normalizeImportedExpense(row, index + 2)
        if (normalized.expense) expenses.push(normalized.expense)
        if (normalized.error) validationErrors.push(normalized.error)
      })

      if (expenses.length === 0) {
        throw new Error(validationErrors[0] ?? 'No valid expense rows were found.')
      }
      setImportPreview({ fileName: file.name, expenses, errors: validationErrors })
    } catch (error) {
      const message = error instanceof Error ? error.message : 'The expense file could not be read.'
      setImportPreview(null)
      setImportMessage({ kind: 'error', text: message })
    }
  }

  const confirmImport = () => {
    if (!importPreview) return
    const known = new Set(
      state.expenses.map((item) => `${item.date}|${item.vendor.toLowerCase()}|${item.amount.toFixed(2)}`),
    )
    const fresh = importPreview.expenses.filter((item) => {
      const key = `${item.date}|${item.vendor.toLowerCase()}|${item.amount.toFixed(2)}`
      if (known.has(key)) return false
      known.add(key)
      return true
    })
    const duplicateCount = importPreview.expenses.length - fresh.length
    if (fresh.length > 0) {
      setState((current) => ({ ...current, expenses: [...fresh, ...current.expenses] }))
    }
    setImportPreview(null)
    setImportMessage({
      kind: fresh.length > 0 ? 'success' : 'error',
      text:
        fresh.length > 0
          ? `Imported ${fresh.length} expense${fresh.length === 1 ? '' : 's'}${duplicateCount ? `; skipped ${duplicateCount} duplicate${duplicateCount === 1 ? '' : 's'}` : ''}.`
          : 'No expenses were imported because every valid row already exists.',
    })
  }

  return (
    <>
      <PageHeading
        eyebrow="Deduction records"
        title="Business expenses"
        copy="Keep the receipt and record who, what, when, amount, and business purpose."
        helpId="expense-tracking"
        action={
          <div className="page-actions">
            <input
              ref={importInput}
              className="visually-hidden"
              type="file"
              accept=".csv,.tsv,.json,text/csv,text/tab-separated-values,application/json"
              onChange={handleImport}
              aria-label="Import expense file"
            />
            <HelpButton topicId="expense-import" label="Import guide" />
            <button className="secondary-button" onClick={() => importInput.current?.click()}><Upload size={17} /> Import</button>
            <button className="secondary-button" onClick={exportCsv}><ArrowDownToLine size={17} /> Export CSV</button>
          </div>
        }
      />
      {importMessage && (
        <div className={`import-message ${importMessage.kind}`} role="status">
          {importMessage.kind === 'success' ? <CheckCircle2 size={18} /> : <X size={18} />}
          <span>{importMessage.text}</span>
          <button onClick={() => setImportMessage(null)} aria-label="Dismiss import message"><X size={16} /></button>
        </div>
      )}
      {importPreview && (
        <section className="panel import-preview">
          <div className="panel-heading">
            <div>
              <span className="section-kicker">Import preview</span>
              <h2>{importPreview.fileName}</h2>
              <p>{importPreview.expenses.length} valid expense{importPreview.expenses.length === 1 ? '' : 's'} ready to add.</p>
            </div>
            <div className="page-actions">
              <button className="secondary-button compact" onClick={() => setImportPreview(null)}>Cancel</button>
              <button className="primary-button compact" onClick={confirmImport}><Upload size={16} /> Import records</button>
            </div>
          </div>
          <div className="import-table-wrap">
            <table className="import-table">
              <thead><tr><th>Date</th><th>Vendor</th><th>Category</th><th>Business use</th><th>Amount</th></tr></thead>
              <tbody>
                {importPreview.expenses.slice(0, 6).map((item) => (
                  <tr key={item.id}><td>{item.date}</td><td>{item.vendor}</td><td>{item.category}</td><td>{item.businessUse}%</td><td>{currency(item.amount)}</td></tr>
                ))}
              </tbody>
            </table>
          </div>
          {importPreview.expenses.length > 6 && <p className="field-help">Plus {importPreview.expenses.length - 6} more valid rows.</p>}
          {importPreview.errors.length > 0 && (
            <div className="import-errors">
              <strong>{importPreview.errors.length} row issue{importPreview.errors.length === 1 ? '' : 's'} will be skipped</strong>
              {importPreview.errors.slice(0, 4).map((error) => <span key={error}>{error}</span>)}
              {importPreview.errors.length > 4 && <span>Plus {importPreview.errors.length - 4} more.</span>}
            </div>
          )}
        </section>
      )}
      <div className="form-layout">
        <section className="panel entry-panel">
          <div className="panel-heading"><div><span className="section-kicker">New record</span><h2>Add an expense</h2></div><div className="panel-heading-actions"><HelpButton topicId="expense-tracking" /><ReceiptText size={21} /></div></div>
          <form onSubmit={submit} className="entry-form">
            <div className="field-row">
              <Field label="Date"><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
              <Field label="Amount"><div className="input-prefix"><span>$</span><input type="number" min="0.01" step="0.01" required placeholder="0.00" value={form.amount} onChange={(e) => setForm({ ...form, amount: e.target.value })} /></div></Field>
            </div>
            <Field label="Vendor or payee"><input required placeholder="Who did you pay?" value={form.vendor} onChange={(e) => setForm({ ...form, vendor: e.target.value })} /></Field>
            <div className="field-row">
              <Field label="Category"><select value={form.category} onChange={(e) => setForm({ ...form, category: e.target.value })}>{expenseCategories.map((category) => <option key={category}>{category}</option>)}</select></Field>
              <Field label="Business use"><div className="input-suffix"><input type="number" min="0" max="100" required value={form.businessUse} onChange={(e) => setForm({ ...form, businessUse: e.target.value })} /><span>%</span></div></Field>
            </div>
            <Field label="Business purpose"><textarea rows={3} placeholder="What was the ordinary and necessary business reason?" value={form.note} onChange={(e) => setForm({ ...form, note: e.target.value })} /></Field>
            <button className="primary-button full-button" type="submit"><Plus size={18} /> Save expense</button>
          </form>
        </section>

        <section className="panel records-panel">
          <div className="panel-heading">
            <div><span className="section-kicker">2026 records</span><h2>Expense ledger</h2></div>
            <strong className="panel-total">{currency(total)}</strong>
          </div>
          {state.expenses.length === 0 ? (
            <EmptyState icon={ReceiptText} title="No expenses yet" copy="Your saved expense records will appear here." />
          ) : (
            <div className="record-list">
              {state.expenses.map((item) => (
                <div className="record" key={item.id}>
                  <div className="record-icon"><ReceiptText size={18} /></div>
                  <div className="record-main">
                    <strong>{item.vendor}</strong>
                    <span>{item.date} - {item.category}{item.note ? ` - ${item.note}` : ''}</span>
                  </div>
                  <div className="record-amount">
                    <strong>{currency(item.amount * item.businessUse / 100)}</strong>
                    <span>{item.businessUse}% of {currency(item.amount)}</span>
                  </div>
                  <button className="delete-button" aria-label={`Delete ${item.vendor} expense`} onClick={() => setState((current) => ({ ...current, expenses: current.expenses.filter((expense) => expense.id !== item.id) }))}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <InfoStrip icon={FileText} title="Documentation rule" copy="Keep receipts, invoices, statements, and proof of payment. A bank statement alone may not show business purpose or what was purchased." link="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping" />
    </>
  )
}

function Mileage({ state, setState, totals }: { state: StoredState; setState: React.Dispatch<React.SetStateAction<StoredState>>; totals: Totals }) {
  const [form, setForm] = useState({ date: today(), purpose: '', miles: '', from: '', to: '' })
  const submit = (event: FormEvent) => {
    event.preventDefault()
    const miles = Number(form.miles)
    if (!form.purpose.trim() || miles <= 0) return
    setState((current) => ({ ...current, trips: [{ id: makeId(), date: form.date, purpose: form.purpose.trim(), miles, from: form.from.trim(), to: form.to.trim() }, ...current.trips] }))
    setForm({ date: today(), purpose: '', miles: '', from: '', to: '' })
  }
  const exportCsv = () => {
    const rows = [
      ['Date', 'From', 'To', 'Business Purpose', 'Miles', 'Rate', 'Estimated Deduction'],
      ...state.trips.map((trip) => {
        const rate = mileageRateForDate(trip.date, state.mileageRate)
        return [trip.date, trip.from, trip.to, trip.purpose, trip.miles, rate, (trip.miles * rate).toFixed(2)]
      }),
    ]
    downloadFile(`mileage-${today()}.csv`, rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n'), 'text/csv')
  }
  return (
    <>
      <PageHeading eyebrow="Vehicle records" title="Mileage log" copy="A contemporaneous log is stronger than reconstructing trips at tax time." helpId="mileage" action={<button className="secondary-button" onClick={exportCsv}><ArrowDownToLine size={17} /> Export CSV</button>} />
      <section className="metric-grid three">
        <SummaryCard label="Business miles" value={totals.miles.toFixed(1)} />
        <SummaryCard label="2026 IRS business rates" value="72.5c / 76c per mi" />
        <SummaryCard label="Estimated deduction" value={currency(totals.mileage)} accent />
      </section>
      <div className="form-layout">
        <section className="panel entry-panel">
          <div className="panel-heading"><div><span className="section-kicker">New trip</span><h2>Log mileage</h2></div><div className="panel-heading-actions"><HelpButton topicId="mileage" /><Car size={21} /></div></div>
          <form onSubmit={submit} className="entry-form">
            <div className="field-row">
              <Field label="Date"><input type="date" required value={form.date} onChange={(e) => setForm({ ...form, date: e.target.value })} /></Field>
              <Field label="Miles"><input type="number" min="0.1" step="0.1" required placeholder="0.0" value={form.miles} onChange={(e) => setForm({ ...form, miles: e.target.value })} /></Field>
            </div>
            <div className="field-row">
              <Field label="From"><input placeholder="Starting location" value={form.from} onChange={(e) => setForm({ ...form, from: e.target.value })} /></Field>
              <Field label="To"><input placeholder="Destination" value={form.to} onChange={(e) => setForm({ ...form, to: e.target.value })} /></Field>
            </div>
            <Field label="Business purpose"><textarea rows={3} required placeholder="Example: Client planning meeting" value={form.purpose} onChange={(e) => setForm({ ...form, purpose: e.target.value })} /></Field>
            <button className="primary-button full-button" type="submit"><Plus size={18} /> Save trip</button>
          </form>
          <div className="rate-editor">
            <div><strong>Fallback mileage rate</strong><span>2026 trips automatically use 72.5 cents through June 30 and 76 cents beginning July 1. Set the fallback for another tax year.</span></div>
            <div className="input-prefix rate-input"><span>$</span><input aria-label="Mileage rate" type="number" min="0" step="0.005" value={state.mileageRate} onChange={(e) => setState((current) => ({ ...current, mileageRate: Number(e.target.value) }))} /></div>
          </div>
        </section>
        <section className="panel records-panel">
          <div className="panel-heading"><div><span className="section-kicker">Trip history</span><h2>Mileage records</h2></div><span className="count-badge">{state.trips.length} trips</span></div>
          {state.trips.length === 0 ? <EmptyState icon={Car} title="No trips logged" copy="Business trips you save will appear here." /> : (
            <div className="record-list">
              {state.trips.map((trip) => (
                <div className="record" key={trip.id}>
                  <div className="record-icon"><Car size={18} /></div>
                  <div className="record-main"><strong>{trip.purpose}</strong><span>{trip.date}{trip.from || trip.to ? ` - ${trip.from || '-'} to ${trip.to || '-'}` : ''}</span></div>
                  <div className="record-amount"><strong>{trip.miles.toFixed(1)} mi</strong><span>{currency(trip.miles * mileageRateForDate(trip.date, state.mileageRate))}</span></div>
                  <button className="delete-button" aria-label={`Delete ${trip.purpose} trip`} onClick={() => setState((current) => ({ ...current, trips: current.trips.filter((item) => item.id !== trip.id) }))}><Trash2 size={17} /></button>
                </div>
              ))}
            </div>
          )}
        </section>
      </div>
      <InfoStrip icon={Car} title="2026 has two business mileage rates" copy="The IRS rate is 72.5 cents per mile from January through June and 76 cents from July through December. Commuting is generally personal, not business mileage." link="https://www.irs.gov/tax-professionals/standard-mileage-rates" />
    </>
  )
}

function VehicleGuide() {
  const [purchasePrice, setPurchasePrice] = useState(40000)
  const [businessUse, setBusinessUse] = useState(80)
  const [annualMiles, setAnnualMiles] = useState(12000)
  const [annualOperating, setAnnualOperating] = useState(6500)
  const [annualInterest, setAnnualInterest] = useState(1800)
  const ratio = Math.min(Math.max(businessUse, 0), 100) / 100
  const businessBasis = purchasePrice * ratio
  const operatingShare = (annualOperating + annualInterest) * ratio
  const mileageEstimate = annualMiles * 0.76

  return (
    <>
      <PageHeading
        eyebrow="LLC vehicle ownership"
        title="Buying a car through Pink Wave"
        copy="The LLC name on the title does not make every mile or payment deductible. Tax treatment follows business use, method choice, entity classification, and documentation."
        helpId="vehicle-purchase"
      />
      <section className="law-callout vehicle-callout">
        <div><CarFront size={24} /></div>
        <div>
          <strong>Start with the business purpose, not the write-off</strong>
          <p>A vehicle should fit a real operating need. Personal use remains personal, and loan principal is not an immediate expense. The purchase generally creates a depreciable asset.</p>
        </div>
      </section>

      <div className="vehicle-layout">
        <section className="panel">
          <div className="panel-heading"><div><span className="section-kicker">Planning worksheet</span><h2>Estimate business-use figures</h2></div><div className="panel-heading-actions"><HelpButton topicId="vehicle-purchase" /><Calculator size={21} /></div></div>
          <div className="entry-form">
            <div className="field-row">
              <Field label="Purchase price"><div className="input-prefix"><span>$</span><input type="number" min="0" value={purchasePrice || ''} onChange={(event) => setPurchasePrice(Number(event.target.value))} /></div></Field>
              <Field label="Expected business use"><div className="input-suffix"><input type="number" min="0" max="100" value={businessUse} onChange={(event) => setBusinessUse(Number(event.target.value))} /><span>%</span></div></Field>
            </div>
            <div className="field-row">
              <Field label="Annual business miles"><input type="number" min="0" value={annualMiles || ''} onChange={(event) => setAnnualMiles(Number(event.target.value))} /></Field>
              <Field label="Annual operating costs"><div className="input-prefix"><span>$</span><input type="number" min="0" value={annualOperating || ''} onChange={(event) => setAnnualOperating(Number(event.target.value))} /></div></Field>
            </div>
            <Field label="Annual business loan interest"><div className="input-prefix"><span>$</span><input type="number" min="0" value={annualInterest || ''} onChange={(event) => setAnnualInterest(Number(event.target.value))} /></div></Field>
            <p className="field-help">Operating costs can include fuel, maintenance, insurance, registration, and repairs. Enter total mixed-use costs; the planner applies the business-use share.</p>
          </div>
        </section>
        <section className="vehicle-results">
          <span className="section-kicker">Conversation with your tax professional</span>
          <div className="vehicle-result-primary">
            <span>Business-use cost basis</span>
            <strong>{currency(businessBasis)}</strong>
            <p>This is not an automatic first-year deduction.</p>
          </div>
          <div className="vehicle-comparison">
            <div><span>Actual-cost amount before depreciation</span><strong>{currency(operatingShare)}</strong><small>Business share of entered operating costs and interest</small></div>
            <div><span>Standard-mileage planning amount</span><strong>{currency(mileageEstimate)}</strong><small>Uses the July-December 2026 rate; method rules apply</small></div>
          </div>
        </section>
      </div>

      <section className="panel ownership-steps">
        <div className="panel-heading"><div><span className="section-kicker">How it works</span><h2>From purchase to tax return</h2></div><CarFront size={21} /></div>
        <div className="step-grid">
          <GuideStep number="01" title="Choose the owner" copy="If Pink Wave is on the title, confirm the lender, insurer, and Arizona MVD will title and cover the vehicle in the LLC name. Liability and insurance decisions are separate from tax deductibility." />
          <GuideStep number="02" title="Document the business use" copy="Record starting and ending odometer readings and every business trip. Keep personal and commuting miles separate. A reasonable business-use percentage must be supported by mileage." />
          <GuideStep number="03" title="Select a tax method" copy="Actual expenses can include the business share of operating costs and depreciation. Standard mileage uses an IRS rate. Choosing standard mileage in the first year can preserve more future flexibility for an owned vehicle." />
          <GuideStep number="04" title="Record the asset and loan" copy="The vehicle purchase and loan belong on the balance sheet. Loan principal reduces the liability; it is not a vehicle expense. Business-use interest can have separate treatment." />
          <GuideStep number="05" title="Review depreciation options" copy="Section 179, bonus depreciation, MACRS, luxury-auto limits, and special SUV limits can apply. More than 50% qualified business use is important for some accelerated deductions and later decline can trigger recapture." />
          <GuideStep number="06" title="Handle personal use" copy="Only business use is deductible. Personal use of an employer-provided vehicle can create taxable fringe-benefit reporting for employees, including owner-employees of a corporation." />
        </div>
      </section>

      <section className="vehicle-notes">
        <article><strong>Single-member LLC</strong><p>A default disregarded LLC does not create a separate federal income-tax taxpayer. Titling the car in the LLC alone does not change the federal business-use analysis.</p></article>
        <article><strong>Heavy vehicles</strong><p>A vehicle over 6,000 pounds GVWR is not automatically a full write-off. Section 179 limits, listed-property rules, business-use tests, and the placed-in-service year still matter.</p></article>
        <article><strong>Sale or trade-in</strong><p>Track proceeds, adjusted basis, accumulated depreciation, and business-use history. A sale can create gain, loss, or depreciation recapture.</p></article>
      </section>

      <div className="source-row">
        <a href="https://www.irs.gov/publications/p463" target="_blank" rel="noreferrer">IRS Publication 463 <ChevronRight size={15} /></a>
        <a href="https://www.irs.gov/publications/p946" target="_blank" rel="noreferrer">IRS Publication 946 <ChevronRight size={15} /></a>
        <a href="https://azdot.gov/mvd/services/vehicle-services/title-and-registration" target="_blank" rel="noreferrer">Arizona MVD title and registration <ChevronRight size={15} /></a>
      </div>
      <Disclaimer />
    </>
  )
}

function HomeOffice({ state, setState, totals }: { state: StoredState; setState: React.Dispatch<React.SetStateAction<StoredState>>; totals: Totals }) {
  return (
    <>
      <PageHeading eyebrow="Workspace deduction" title="Home office calculator" copy="Compare methods after confirming the space is used regularly and exclusively for your trade or business." helpId="home-office" />
      <div className="calculator-layout">
        <section className="panel calculator-panel">
          <div className="panel-heading"><div><span className="section-kicker">Your workspace</span><h2>Enter measurements</h2></div><div className="panel-heading-actions"><HelpButton topicId="home-office" /><Home size={21} /></div></div>
          <div className="entry-form">
            <div className="field-row">
              <Field label="Office area (sq. ft.)"><input type="number" min="0" value={state.officeSqFt || ''} placeholder="0" onChange={(e) => setState((current) => ({ ...current, officeSqFt: Number(e.target.value) }))} /></Field>
              <Field label="Total home area (sq. ft.)"><input type="number" min="0" value={state.homeSqFt || ''} placeholder="0" onChange={(e) => setState((current) => ({ ...current, homeSqFt: Number(e.target.value) }))} /></Field>
            </div>
            <Field label="Annual indirect home expenses"><div className="input-prefix"><span>$</span><input type="number" min="0" value={state.annualHomeCosts || ''} placeholder="Mortgage interest or rent, utilities, insurance, repairs..." onChange={(e) => setState((current) => ({ ...current, annualHomeCosts: Number(e.target.value) }))} /></div></Field>
            <p className="field-help">Actual-expense treatment can differ by cost. Direct office expenses, depreciation, mortgage interest, taxes, casualty losses, carryovers, and income limitations need return-level analysis.</p>
          </div>
          <div className="method-toggle" role="group" aria-label="Home office method">
            <button className={state.method === 'simplified' ? 'selected' : ''} onClick={() => setState((current) => ({ ...current, method: 'simplified' }))}><CheckCircle2 size={17} /> Simplified</button>
            <button className={state.method === 'actual' ? 'selected' : ''} onClick={() => setState((current) => ({ ...current, method: 'actual' }))}><Building2 size={17} /> Actual expenses</button>
          </div>
        </section>
        <section className="result-card">
          <span className="section-kicker">Planning result</span>
          <p>Selected method</p>
          <h2>{currency(totals.homeOffice)}</h2>
          <div className="result-lines">
            <div><span>Simplified method</span><strong>{currency(totals.simplified)}</strong></div>
            <div><span>Actual method estimate</span><strong>{currency(totals.actual)}</strong></div>
            <div><span>Business-use area</span><strong>{(totals.officeRatio * 100).toFixed(1)}%</strong></div>
          </div>
          <p className="result-note">The simplified method is generally $5 per square foot, up to 300 square feet. This tool uses that federal planning formula; it does not apply income limitations or carryovers.</p>
        </section>
      </div>
      <section className="panel eligibility-panel">
        <div className="panel-heading"><div><span className="section-kicker">Eligibility screen</span><h2>Questions to document</h2></div><ClipboardCheck size={21} /></div>
        <div className="eligibility-grid">
          <Eligibility title="Exclusive use" copy="Is the specific area used only for business, apart from limited statutory exceptions?" />
          <Eligibility title="Regular use" copy="Do you use the space consistently, rather than occasionally or incidentally?" />
          <Eligibility title="Business connection" copy="Is it your principal place of business, a place to meet clients, or a separate business structure?" />
        </div>
      </section>
      <InfoStrip icon={Home} title="Method choice matters" copy="The simplified method and actual-expense method have different recordkeeping and depreciation consequences. Compare them annually with a qualified tax professional." link="https://www.irs.gov/businesses/small-businesses-self-employed/home-office-deduction" />
    </>
  )
}

function Planner({ state, setState, totals }: { state: StoredState; setState: React.Dispatch<React.SetStateAction<StoredState>>; totals: Totals }) {
  const [federalRate, setFederalRate] = useState(15)
  const [azRate, setAzRate] = useState(2.5)
  const [cushion, setCushion] = useState(5)
  const combined = federalRate + azRate + cushion
  const annualReserve = totals.projectedProfit * combined / 100
  const quarterly = annualReserve / 4
  return (
    <>
      <PageHeading eyebrow="Cash-flow planning" title="Estimated tax planner" copy="Create a savings target from projected net business profit. This is a reserve model, not a completed tax return." helpId="estimated-taxes" />
      <div className="planner-grid">
        <section className="panel planner-inputs">
          <div className="panel-heading"><div><span className="section-kicker">Assumptions</span><h2>Set your plan</h2></div><div className="panel-heading-actions"><HelpButton topicId="estimated-taxes" /><Calculator size={21} /></div></div>
          <div className="entry-form">
            <Field label="Projected gross business revenue"><div className="input-prefix"><span>$</span><input type="number" min="0" value={state.projectedRevenue || ''} placeholder="0" onChange={(e) => setState((current) => ({ ...current, projectedRevenue: Number(e.target.value) }))} /></div></Field>
            <div className="field-row">
              <Field label="Federal reserve"><div className="input-suffix"><input type="number" min="0" max="100" step="0.5" value={federalRate} onChange={(e) => setFederalRate(Number(e.target.value))} /><span>%</span></div></Field>
              <Field label="Arizona reserve"><div className="input-suffix"><input type="number" min="0" max="100" step="0.1" value={azRate} onChange={(e) => setAzRate(Number(e.target.value))} /><span>%</span></div></Field>
            </div>
            <Field label="Planning cushion"><div className="input-suffix"><input type="number" min="0" max="100" step="0.5" value={cushion} onChange={(e) => setCushion(Number(e.target.value))} /><span>%</span></div></Field>
            <p className="field-help">Federal income tax depends on filing status and all household income. Self-employment tax uses its own calculation. Arizona adjustments and credits may change state tax. Customize these reserve percentages with your tax professional.</p>
          </div>
        </section>
        <section className="reserve-card">
          <span className="section-kicker">Quarterly target</span>
          <h2>{currency(quarterly)}</h2>
          <p>Set aside approximately {combined.toFixed(1)}% of projected tracked profit.</p>
          <div className="reserve-breakdown">
            <div><span>Projected revenue</span><strong>{currency(state.projectedRevenue)}</strong></div>
            <div><span>Tracked deductions</span><strong>- {currency(totals.totalDeductions)}</strong></div>
            <div><span>Projected business profit</span><strong>{currency(totals.projectedProfit)}</strong></div>
            <div className="reserve-total"><span>Annual reserve</span><strong>{currency(annualReserve)}</strong></div>
          </div>
        </section>
      </div>
      <section className="panel">
        <div className="panel-heading"><div><span className="section-kicker">Payment calendar</span><h2>Estimated tax cadence</h2></div><CalendarDays size={21} /></div>
        <div className="quarter-grid">
          {[
            ['Q1', 'Apr 15', 'Jan 1 - Mar 31'],
            ['Q2', 'Jun 15', 'Apr 1 - May 31'],
            ['Q3', 'Sep 15', 'Jun 1 - Aug 31'],
            ['Q4', 'Jan 15', 'Sep 1 - Dec 31'],
          ].map(([quarter, date, period]) => (
            <div className="quarter" key={quarter}><span>{quarter}</span><strong>{date}</strong><p>{period}</p><small>{currency(quarterly)} target</small></div>
          ))}
        </div>
        <p className="fine-print panel-footnote">Standard individual estimated-tax dates shown. Due dates may shift and fiscal-year filers differ. Verify IRS Form 1040-ES and Arizona Form 140ES instructions for the relevant year.</p>
      </section>
      <Disclaimer />
    </>
  )
}

function Compliance({ state, setState }: { state: StoredState; setState: React.Dispatch<React.SetStateAction<StoredState>> }) {
  const completedCount = complianceItems.filter((item) => state.completed[item.id]).length
  return (
    <>
      <PageHeading eyebrow="Goodyear - Maricopa County" title="Arizona LLC compliance" copy="A guided starting point for formation, tax registration, and recordkeeping." helpId="llc-compliance" action={<span className="completion-pill"><CheckCircle2 size={17} /> {completedCount} of {complianceItems.length} complete</span>} />
      <section className="law-callout">
        <div><ShieldCheck size={24} /></div>
        <div><strong>Key Arizona distinction</strong><p>Arizona LLCs generally do not file annual reports with the Arizona Corporation Commission. Corporations do. Your LLC can still have federal, state, city, licensing, payroll, and TPT obligations.</p></div>
      </section>
      <section className="compliance-list">
        {complianceItems.map((item, index) => (
          <article className={`compliance-item ${state.completed[item.id] ? 'completed' : ''}`} key={item.id}>
            <label className="compliance-check">
              <input type="checkbox" checked={Boolean(state.completed[item.id])} onChange={(event) => setState((current) => ({ ...current, completed: { ...current.completed, [item.id]: event.target.checked } }))} />
              <span><Check size={16} /></span>
            </label>
            <div className="compliance-number">{String(index + 1).padStart(2, '0')}</div>
            <div className="compliance-content">
              <h2>{item.title}</h2>
              <p>{item.detail}</p>
              <a href={item.link} target="_blank" rel="noreferrer">{item.source} <ChevronRight size={15} /></a>
            </div>
          </article>
        ))}
      </section>
      <section className="panel tax-map">
        <div className="panel-heading"><div><span className="section-kicker">Obligation map</span><h2>Which taxes may apply?</h2></div><Landmark size={21} /></div>
        <div className="tax-map-grid">
          <TaxType title="Federal income & self-employment" tag="Usually" copy="A default single-member LLC usually reports business activity on the owner's federal return. Net earnings may be subject to self-employment tax." />
          <TaxType title="Arizona individual income tax" tag="Usually" copy="Pass-through business income generally flows to the Arizona individual return, subject to Arizona additions, subtractions, credits, and available elections." />
          <TaxType title="Transaction Privilege Tax" tag="Activity-based" copy="TPT is imposed on sellers for specified business classifications. Taxable retail, contracting, lodging, and other activities can require licensing and location-specific rates." />
          <TaxType title="Payroll & unemployment" tag="If hiring" copy="Employees can trigger federal and Arizona withholding, unemployment insurance, new-hire reporting, workers' compensation, and payroll filings." />
          <TaxType title="S corporation filings" tag="If elected" copy="An S election changes payroll, federal return, reasonable-compensation, and Arizona filing considerations. Election deadlines and eligibility rules apply." />
          <TaxType title="Use tax & property" tag="Sometimes" copy="Untaxed taxable purchases may create use-tax obligations. Business personal property can have county reporting considerations depending on assets and exemptions." />
        </div>
      </section>
      <Disclaimer />
    </>
  )
}

function DeductionFaq() {
  const categories = ['All', ...Array.from(new Set(deductionFaqs.map((item) => item.category))).sort()]
  const [category, setCategory] = useState('All')
  const [query, setQuery] = useState('')
  const normalizedQuery = query.trim().toLowerCase()
  const filtered = deductionFaqs.filter(
    (item) =>
      (category === 'All' || item.category === category) &&
      (!normalizedQuery ||
        `${item.title} ${item.answer} ${item.records}`.toLowerCase().includes(normalizedQuery)),
  )

  return (
    <>
      <PageHeading
        eyebrow="Practical tax-law guide"
        title="Is this deductible?"
        copy="Search common Pink Wave purchases and see the main federal rule, common limitation, and records to keep."
        helpId="deductibility"
      />
      <section className="faq-tools">
        <label className="faq-search">
          <Search size={18} />
          <input value={query} onChange={(event) => setQuery(event.target.value)} placeholder="Search meals, equipment, travel, gifts..." />
        </label>
        <div className="faq-filters" role="group" aria-label="Deduction categories">
          {categories.map((item) => (
            <button key={item} className={category === item ? 'selected' : ''} onClick={() => setCategory(item)}>{item}</button>
          ))}
        </div>
      </section>

      <section className="deduction-principle">
        <div><BookOpenCheck size={22} /></div>
        <div>
          <strong>The starting rule: ordinary and necessary</strong>
          <p>A business expense generally must be common and accepted in the trade and helpful and appropriate for the business. Personal, capital, mixed-use, and specifically limited expenses need additional analysis.</p>
        </div>
      </section>

      {filtered.length > 0 ? (
        <section className="faq-grid">
          {filtered.map((item) => (
            <details className="faq-item" key={item.title}>
              <summary>
                <span className={`faq-status ${item.status === 'Usually' ? 'usually' : item.status === 'Sometimes' ? 'sometimes' : 'no'}`}>{item.status}</span>
                <strong>{item.title}</strong>
                <span className="faq-category">{item.category}</span>
                <ChevronRight size={18} />
              </summary>
              <div className="faq-answer">
                <p>{item.answer}</p>
                <div><ClipboardCheck size={17} /><span><strong>Keep:</strong> {item.records}</span></div>
              </div>
            </details>
          ))}
        </section>
      ) : (
        <section className="panel no-results">
          <Search size={24} />
          <strong>No matching guidance</strong>
          <p>Try a broader search or select All.</p>
        </section>
      )}

      <section className="panel faq-boundaries">
        <div className="panel-heading"><div><span className="section-kicker">Before claiming a deduction</span><h2>Five questions to answer</h2></div><BookOpenCheck size={21} /></div>
        <ol>
          <li><span>1</span><div><strong>Business connection</strong><p>What specific revenue-producing activity or operating need does it support?</p></div></li>
          <li><span>2</span><div><strong>Personal or mixed use</strong><p>Is any part personal, commuting, family-related, or otherwise nondeductible?</p></div></li>
          <li><span>3</span><div><strong>Current expense or asset</strong><p>Does it create a benefit beyond this year that may need capitalization or depreciation?</p></div></li>
          <li><span>4</span><div><strong>Special limitation</strong><p>Do meals, gifts, vehicles, home offices, entertainment, travel, or related-party rules limit it?</p></div></li>
          <li><span>5</span><div><strong>Evidence</strong><p>Would the receipt plus your written business purpose explain the deduction to an independent reviewer?</p></div></li>
        </ol>
      </section>

      <div className="source-row">
        <a href="https://www.irs.gov/publications/p535" target="_blank" rel="noreferrer">IRS Publication 535 archive <ChevronRight size={15} /></a>
        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/deducting-business-expenses" target="_blank" rel="noreferrer">IRS deducting business expenses <ChevronRight size={15} /></a>
        <a href="https://www.irs.gov/businesses/small-businesses-self-employed/recordkeeping" target="_blank" rel="noreferrer">IRS recordkeeping <ChevronRight size={15} /></a>
      </div>
      <Disclaimer />
    </>
  )
}

function PageHeading({
  eyebrow,
  title,
  copy,
  action,
  helpId,
}: {
  eyebrow: string
  title: string
  copy: string
  action?: React.ReactNode
  helpId?: string
}) {
  return (
    <section className="page-heading">
      <div><p className="eyebrow">{eyebrow}</p><h1>{title}</h1><p>{copy}</p></div>
      {(action || helpId) && <div className="page-actions">{helpId && <HelpButton topicId={helpId} label="Explain this" />}{action}</div>}
    </section>
  )
}

function HelpButton({ topicId, label }: { topicId: string; label?: string }) {
  const { openHelp } = useHelp()
  return (
    <button
      className={label ? 'secondary-button help-trigger-labeled' : 'help-trigger'}
      onClick={(event) => {
        event.stopPropagation()
        openHelp(topicId)
      }}
      aria-label={label ?? 'Explain this section'}
      title={label ?? 'Explain this section'}
    >
      <CircleHelp size={label ? 17 : 18} />
      {label && <span>{label}</span>}
    </button>
  )
}

function Field({ label, children }: { label: string; children: React.ReactNode }) {
  return <label className="field"><span>{label}</span>{children}</label>
}

function SummaryCard({ label, value, accent = false }: { label: string; value: string; accent?: boolean }) {
  return <div className={`summary-card ${accent ? 'accent' : ''}`}><span>{label}</span><strong>{value}</strong></div>
}

function EmptyState({ icon: Icon, title, copy }: { icon: typeof Home; title: string; copy: string }) {
  return <div className="empty-state"><span><Icon size={23} /></span><strong>{title}</strong><p>{copy}</p></div>
}

function Eligibility({ title, copy }: { title: string; copy: string }) {
  return <div className="eligibility-item"><span><CheckCircle2 size={19} /></span><div><strong>{title}</strong><p>{copy}</p></div></div>
}

function TaxType({ title, tag, copy }: { title: string; tag: string; copy: string }) {
  return <div className="tax-type"><span>{tag}</span><h3>{title}</h3><p>{copy}</p></div>
}

function GuideStep({ number, title, copy }: { number: string; title: string; copy: string }) {
  return <article className="guide-step"><span>{number}</span><div><h3>{title}</h3><p>{copy}</p></div></article>
}

function InfoStrip({ icon: Icon, title, copy, link }: { icon: typeof Home; title: string; copy: string; link: string }) {
  return (
    <section className="info-strip">
      <span><Icon size={20} /></span>
      <div><strong>{title}</strong><p>{copy}</p></div>
      <a href={link} target="_blank" rel="noreferrer">Official guidance <ChevronRight size={15} /></a>
    </section>
  )
}

function Disclaimer() {
  return (
    <section className="disclaimer">
      <BriefcaseBusiness size={18} />
      <p><strong>Planning tool, not tax or legal advice.</strong> Rules depend on facts and change over time. Information is a structured starting point as of July 30, 2026; verify current IRS, Arizona Department of Revenue, Arizona Corporation Commission, Maricopa County, and City of Goodyear guidance with qualified professionals.</p>
    </section>
  )
}

export default App
