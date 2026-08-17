// ==========================================================================
// CA Inter Prep Tracker — Complete Application Bundle
// Universal bundle support: Works natively via file:// protocol & localhost
// ==========================================================================

(function () {
  'use strict';

  // ------------------------------------------------------------------------
  // 1. DATA: Papers Metadata & Full Exact Seed Syllabus (6 Papers)
  // ------------------------------------------------------------------------
  const PAPERS_METADATA = [
    {
      id: "paper1",
      code: "Paper 1",
      name: "Advanced Accounting",
      shortName: "Adv. Accounts",
      icon: "📊",
      color: "#ffb7b2",
      accent: "#ff6f69"
    },
    {
      id: "paper2",
      code: "Paper 2",
      name: "Corporate and Other Laws",
      shortName: "Corp. Laws",
      icon: "⚖️",
      color: "#b5ead7",
      accent: "#48bb78"
    },
    {
      id: "paper3",
      code: "Paper 3",
      name: "Taxation",
      shortName: "Taxation",
      icon: "📑",
      color: "#c7ceea",
      accent: "#6b8af7"
    },
    {
      id: "paper4",
      code: "Paper 4",
      name: "Cost and Management Accounting",
      shortName: "Costing",
      icon: "🧮",
      color: "#ffdac1",
      accent: "#f6ad55"
    },
    {
      id: "paper5",
      code: "Paper 5",
      name: "Auditing and Ethics",
      shortName: "Audit & Ethics",
      icon: "🔍",
      color: "#e2f0cb",
      accent: "#38a169"
    },
    {
      id: "paper6",
      code: "Paper 6",
      name: "Financial Management and Strategic Management",
      shortName: "FM & SM",
      icon: "📈",
      color: "#e8dff5",
      accent: "#9f7aea"
    }
  ];

  const INITIAL_SYLLABUS = {
    paper1: [
      { id: "p1_1", title: "Chapter 1: Introduction to Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_2", title: "Chapter 2: Framework for Preparation and Presentation of Financial Statements", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_3", title: "Chapter 3: Applicability of Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_4", title: "Chapter 4: Presentation & Disclosures Based Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_5", title: "Unit 1: Accounting Standard 1 Disclosure of Accounting Policies", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_6", title: "Unit 2: Accounting Standard 3 Cash Flow Statement", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_7", title: "Unit 3: Accounting Standard 17 Segment Reporting", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_8", title: "Unit 4: Accounting Standard 18 Related Party Disclosures", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_9", title: "Unit 5: Accounting Standard 20 Earnings Per Share", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_10", title: "Unit 6: Accounting Standard 24 Discontinuing Operations", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_11", title: "Unit 7: Accounting Standard 25 Interim Financial Reporting", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_12", title: "Chapter 5: Assets Based Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_13", title: "Unit 1: Accounting Standard 2 Valuation of Inventory", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_14", title: "Unit 2: Accounting Standard 10 Property, Plant and Equipment", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_15", title: "Unit 3: Accounting Standard 13 Accounting for Investments", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_16", title: "Unit 4: Accounting Standard 16 Borrowing Costs", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_17", title: "Unit 5: Accounting Standard 19 Leases", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_18", title: "Unit 6: Accounting Standard 26 Intangible Assets", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_19", title: "Unit 7: Accounting Standard 28 Impairment of Assets", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_20", title: "Chapter 6: Liabilities Based Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_21", title: "Unit 1: Accounting Standard 15 Employee Benefits", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_22", title: "Unit 2: AS 29 (Revised) Provisions, Contingent Liabilities and Contingent Assets", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_23", title: "Chapter 7: Accounting Standards Based on Items Impacting Financial Statement", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_24", title: "Unit 1: Accounting Standard 4 Contingencies and Events occurring after the Balance Sheet Date", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_25", title: "Unit 2: Accounting Standard 5 Net Profit or Loss for the Period, Prior Period Items and Changes in Accounting Policies", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_26", title: "Unit 3: Accounting Standard 11 The Effects of Changes in Foreign Exchange Rates", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_27", title: "Unit 4: Accounting Standard 22 Accounting for Taxes on Income", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_28", title: "Chapter 8: Revenue Based Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_29", title: "Unit 1: Accounting Standard 7 Construction Contracts", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_30", title: "Unit 2: Accounting Standard 9 Revenue Recognition", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_31", title: "Chapter 9: Other Accounting Standards", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_32", title: "Unit 1: Accounting Standard 12 Accounting for Government Grants", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_33", title: "Unit 2: Accounting Standard 14 Accounting for Amalgamations", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_34", title: "Chapter 10: Accounting Standards for Consolidated Financial Statement", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_35", title: "Unit 1: Accounting Standard 21 Consolidated Financial Statements", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_36", title: "Unit 2: Accounting Standard 23 Accounting for Investments in Associates in Consolidated Financial Statements", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_37", title: "Unit 3: Accounting Standard 27 Financial Reporting of Interests in Joint Ventures", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p1_38", title: "Chapter 11: Financial Statements of Companies", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_39", title: "Unit 1: Preparation of Financial Statements", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_40", title: "Unit 2: Cash Flow Statement", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_41", title: "Annexure", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p1_42", title: "Chapter 12: Buyback of Securities", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_43", title: "Chapter 13: Amalgamation of Companies", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_44", title: "Chapter 14: Internal Reconstruction", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p1_45", title: "Chapter 15: Accounting for Branches including Foreign Branches", status: "Not Started", revisions: 0, notes: "", priority: "High" }
    ],
    paper2: [
      { id: "p2_1", title: "Chapter 1: Preliminary", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p2_2", title: "Chapter 2: Incorporation of Company and Matters Incidental Thereto", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_3", title: "Chapter 3: Prospectus and Allotment of Securities", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_4", title: "Chapter 4: Share Capital and Debentures", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_5", title: "Chapter 5: Acceptance of Deposits by Companies", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p2_6", title: "Chapter 6: Registration of Charges", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p2_7", title: "Chapter 7: Management & Administration", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_8", title: "Chapter 8: Declaration and Payment of Dividend", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p2_9", title: "Chapter 9: Accounts of Companies", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_10", title: "Chapter 10: Audit and Auditors", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_11", title: "Chapter 11: Companies Incorporated Outside India", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p2_12", title: "Chapter 12: The Limited Liability Partnership Act, 2008", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_13", title: "Chapter 1: The General Clauses Act, 1897", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_14", title: "Chapter 2: Interpretation of Statutes", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p2_15", title: "Chapter 3: The Foreign Exchange Management Act, 1999", status: "Not Started", revisions: 0, notes: "", priority: "High" }
    ],
    paper3: [
      { id: "p3_1", title: "Chapter 1: Basic Concepts", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_2", title: "Chapter 2: Residence and Scope of Total Income", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_3", title: "Chapter 3: Heads of Income", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_4", title: "Unit 1: Salaries", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_5", title: "Unit 2: Income from House Property", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_6", title: "Unit 3: Profits and Gains of Business or Profession", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_7", title: "Unit 4: Capital Gains", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_8", title: "Unit 5: Income from Other Sources", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_9", title: "Chapter 4: Income of Other Persons included in Assessee's Total Income", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_10", title: "Chapter 5: Aggregation of Income, Set-Off and Carry Forward of Losses", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_11", title: "Chapter 6: Deductions from Gross Total Income", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_12", title: "Chapter 7: Advance Tax, Tax Deduction at Source and Tax Collection at Source", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_13", title: "Chapter 8: Provisions for filing Return of Income and Self Assessment", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_14", title: "Chapter 9: Income Tax Liability - Computation and Optimisation", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_15", title: "Chapter 1: GST in India - An Introduction", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p3_16", title: "Chapter 2: Supply under GST", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_17", title: "Chapter 3: Charge of GST", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_18", title: "Chapter 4: Place of Supply", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_19", title: "Chapter 5: Exemptions from GST", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_20", title: "Chapter 6: Time of Supply", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_21", title: "Chapter 7: Value of Supply", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_22", title: "Chapter 8: Input Tax Credit", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_23", title: "Chapter 9: Registration", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_24", title: "Chapter 10: Tax Invoice; Credit and Debit Notes", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_25", title: "Chapter 11: Accounts and Records", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p3_26", title: "Chapter 12: E-Way Bill", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_27", title: "Chapter 13: Payment of Tax", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p3_28", title: "Chapter 14: Tax Deduction at Source and Collection of Tax at Source", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p3_29", title: "Chapter 15: Returns", status: "Not Started", revisions: 0, notes: "", priority: "Medium" }
    ],
    paper4: [
      { id: "p4_1", title: "Chapter 1: Introduction to Cost and Management Accounting", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p4_2", title: "Chapter 2: Material Cost", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_3", title: "Chapter 3: Employee Cost and Direct Expenses", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_4", title: "Chapter 4: Overheads – Absorption Costing Method", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_5", title: "Chapter 5: Activity Based Costing", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_6", title: "Chapter 6: Cost Sheet", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_7", title: "Chapter 7: Cost Accounting Systems", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p4_8", title: "Chapter 8: Unit & Batch Costing", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p4_9", title: "Chapter 9: Job Costing", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p4_10", title: "Chapter 10: Process & Operation Costing", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_11", title: "Chapter 11: Joint Products and By Products", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p4_12", title: "Chapter 12: Service Costing", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_13", title: "Chapter 13: Standard Costing", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_14", title: "Chapter 14: Marginal Costing", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p4_15", title: "Chapter 15: Budgets and Budgetary Control", status: "Not Started", revisions: 0, notes: "", priority: "High" }
    ],
    paper5: [
      { id: "p5_1", title: "Chapter 1: Nature, Objective and Scope of Audit", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_2", title: "Chapter 2: Audit Strategy, Audit Planning and Audit Programme", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_3", title: "Chapter 3: Risk Assessment and Internal Control", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_4", title: "Chapter 4: Audit Evidence", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_5", title: "Chapter 5: Audit of Items of Financial Statements", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_6", title: "Chapter 6: Audit Documentation", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p5_7", title: "Chapter 7: Completion and Review", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_8", title: "Chapter 8: Audit Report", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_9", title: "Chapter 9: Special Features of Audit of Different Type of Entities", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_10", title: "Chapter 10: Audit of Banks", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p5_11", title: "Chapter 11: Ethics and Terms of Audit Engagements", status: "Not Started", revisions: 0, notes: "", priority: "High" }
    ],
    paper6: [
      { id: "p6_1", title: "Chapter 1: Scope and Objectives of Financial Management", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p6_2", title: "Chapter 2: Types of Financing", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p6_3", title: "Chapter 3: Financial Analysis and Planning – Ratio Analysis", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_4", title: "Chapter 4: Cost of Capital", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_5", title: "Chapter 5: Financing Decisions – Capital Structure", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_6", title: "Chapter 6: Financing Decisions – Leverages", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_7", title: "Chapter 7: Investment Decisions", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_8", title: "Chapter 8: Dividend Decision", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p6_9", title: "Chapter 9: Management of Working Capital", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_10", title: "Unit I: Introduction to Working Capital Management", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p6_11", title: "Unit II: Treasury and Cash Management", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p6_12", title: "Unit III: Management of Inventory", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_13", title: "Unit IV: Management of Receivables", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_14", title: "Unit V: Management of Payables (Creditors)", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p6_15", title: "Unit VI: Financing of Working Capital", status: "Not Started", revisions: 0, notes: "", priority: "Medium" },
      { id: "p6_16", title: "Chapter 1: Introduction to Strategic Management", status: "Not Started", revisions: 0, notes: "", priority: "Low" },
      { id: "p6_17", title: "Chapter 2: Strategic Analysis: External Environment", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_18", title: "Chapter 3: Strategic Analysis: Internal Environment", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_19", title: "Chapter 4: Strategic Choices", status: "Not Started", revisions: 0, notes: "", priority: "High" },
      { id: "p6_20", title: "Chapter 5: Strategy Implementation and Evaluation", status: "Not Started", revisions: 0, notes: "", priority: "High" }
    ]
  };

  const MOTIVATIONAL_QUOTES = [
    { quote: "Success is not final, failure is not fatal: it is the courage to continue that counts.", author: "Winston Churchill", category: "Perseverance" },
    { quote: "It does not matter how slowly you go as long as you do not stop.", author: "Confucius", category: "Consistency" },
    { quote: "You have power over your mind - not outside events. Realize this, and you will find strength.", author: "Marcus Aurelius", category: "Mindset" },
    { quote: "Arise, awake, and stop not till the goal is reached.", author: "Swami Vivekananda", category: "Drive" },
    { quote: "The future belongs to those who believe in the beauty of their dreams.", author: "Eleanor Roosevelt", category: "Vision" },
    { quote: "Dream, dream, dream. Dreams transform into thoughts and thoughts result in action.", author: "Dr. A.P.J. Abdul Kalam", category: "Action" },
    { quote: "Discipline is the bridge between goals and accomplishment.", author: "Jim Rohn", category: "Discipline" },
    { quote: "Our greatest glory is not in never falling, but in rising every time we fall.", author: "Oliver Goldsmith", category: "Resilience" },
    { quote: "Genius is one percent inspiration and ninety-nine percent perspiration.", author: "Thomas A. Edison", category: "Hard Work" },
    { quote: "We are what we repeatedly do. Excellence, then, is not an act, but a habit.", author: "Will Durant (on Aristotle)", category: "Habits" },
    { quote: "It always seems impossible until it's done.", author: "Nelson Mandela", category: "Perseverance" },
    { quote: "Don't watch the clock; do what it does. Keep going.", author: "Sam Levenson", category: "Focus" },
    { quote: "Difficulties strengthen the mind, as labor does the body.", author: "Seneca", category: "Strength" },
    { quote: "Small daily improvements over time lead to stunning results.", author: "Robin Sharma", category: "Consistency" },
    { quote: "The secret of getting ahead is getting started.", author: "Mark Twain", category: "Initiative" },
    { quote: "There are no secrets to success. It is the result of preparation, hard work, and learning from failure.", author: "Colin Powell", category: "Preparation" },
    { quote: "Perseverance is not a long race; it is many short races one after the other.", author: "Walter Bagehot", category: "Perseverance" },
    { quote: "Believe you can and you're halfway there.", author: "Theodore Roosevelt", category: "Confidence" },
    { quote: "Energy and persistence conquer all things.", author: "Benjamin Franklin", category: "Persistence" },
    { quote: "Action is the foundational key to all success.", author: "Pablo Picasso", category: "Action" },
    { quote: "The expert in anything was once a beginner.", author: "Helen Hayes", category: "Growth" },
    { quote: "Patience and perseverance have a magical effect before which difficulties disappear and obstacles vanish.", author: "John Quincy Adams", category: "Patience" },
    { quote: "Through perseverance many people win success out of what seemed destined to be certain failure.", author: "Benjamin Disraeli", category: "Resilience" },
    { quote: "Continuous effort - not strength or intelligence - is the key to unlocking our potential.", author: "Winston Churchill", category: "Effort" },
    { quote: "Live as if you were to die tomorrow. Learn as if you were to live forever.", author: "Mahatma Gandhi", category: "Learning" },
    { quote: "Success isn't always about greatness. It's about consistency. Consistent hard work leads to success.", author: "Dwayne Johnson", category: "Consistency" },
    { quote: "A river cuts through rock, not because of its power, but because of its persistence.", author: "James N. Watkins", category: "Persistence" },
    { quote: "What we achieve inwardly will change outer reality.", author: "Plutarch", category: "Mindset" },
    { quote: "Quality is not an act, it is a habit.", author: "Aristotle", category: "Habits" },
    { quote: "Never give up on a dream just because of the time it will take to accomplish it. The time will pass anyway.", author: "Earl Nightingale", category: "Patience" },
    { quote: "The man who moves a mountain begins by carrying away small stones.", author: "Confucius", category: "Step by Step" },
    { quote: "In the middle of every difficulty lies opportunity.", author: "Albert Einstein", category: "Perspective" },
    { quote: "Your time is limited, so don't waste it living someone else's life.", author: "Steve Jobs", category: "Focus" },
    { quote: "Success usually comes to those who are too busy to be looking for it.", author: "Henry David Thoreau", category: "Dedication" },
    { quote: "Hard work beats talent when talent doesn't work hard.", author: "Tim Notke", category: "Hard Work" }
  ];

  // ------------------------------------------------------------------------
  // 2. AUDIO & CONFETTI ENGINE
  // ------------------------------------------------------------------------
  class KawaiiAudio {
    constructor() {
      this.ctx = null;
      this.enabled = true;
    }

    initContext() {
      if (!this.ctx) {
        const AudioContextClass = window.AudioContext || window.webkitAudioContext;
        if (AudioContextClass) this.ctx = new AudioContextClass();
      }
      if (this.ctx && this.ctx.state === 'suspended') {
        this.ctx.resume();
      }
    }

    playPop() {
      if (!this.enabled) return;
      try {
        this.initContext();
        if (!this.ctx) return;
        const osc = this.ctx.createOscillator();
        const gain = this.ctx.createGain();
        osc.type = 'sine';
        osc.frequency.setValueAtTime(440, this.ctx.currentTime);
        osc.frequency.exponentialRampToValueAtTime(880, this.ctx.currentTime + 0.08);
        gain.gain.setValueAtTime(0.12, this.ctx.currentTime);
        gain.gain.exponentialRampToValueAtTime(0.001, this.ctx.currentTime + 0.08);
        osc.connect(gain);
        gain.connect(this.ctx.destination);
        osc.start();
        osc.stop(this.ctx.currentTime + 0.08);
      } catch (e) {}
    }

    playCheck() {
      if (!this.enabled) return;
      try {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [523.25, 659.25, 783.99, 1046.5];
        notes.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(freq, now + i * 0.06);
          gain.gain.setValueAtTime(0.1, now + i * 0.06);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.06 + 0.15);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.06);
          osc.stop(now + i * 0.06 + 0.15);
        });
      } catch (e) {}
    }

    playChime() {
      if (!this.enabled) return;
      try {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const melody = [698.46, 880.00, 1046.50, 1318.51, 1567.98];
        melody.forEach((freq, i) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'sine';
          osc.frequency.setValueAtTime(freq, now + i * 0.14);
          gain.gain.setValueAtTime(0.15, now + i * 0.14);
          gain.gain.exponentialRampToValueAtTime(0.001, now + i * 0.14 + 0.6);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + i * 0.14);
          osc.stop(now + i * 0.14 + 0.6);
        });
      } catch (e) {}
    }

    playCelebration() {
      if (!this.enabled) return;
      try {
        this.initContext();
        if (!this.ctx) return;
        const now = this.ctx.currentTime;
        const notes = [
          { f: 523.25, t: 0 },
          { f: 659.25, t: 0.1 },
          { f: 783.99, t: 0.2 },
          { f: 1046.50, t: 0.3 },
          { f: 880.00, t: 0.45 },
          { f: 1046.50, t: 0.6 }
        ];
        notes.forEach(({ f, t }) => {
          const osc = this.ctx.createOscillator();
          const gain = this.ctx.createGain();
          osc.type = 'triangle';
          osc.frequency.setValueAtTime(f, now + t);
          gain.gain.setValueAtTime(0.12, now + t);
          gain.gain.exponentialRampToValueAtTime(0.001, now + t + 0.35);
          osc.connect(gain);
          gain.connect(this.ctx.destination);
          osc.start(now + t);
          osc.stop(now + t + 0.35);
        });
      } catch (e) {}
    }
  }

  const sound = new KawaiiAudio();

  function triggerConfetti() {
    const count = 55;
    const colors = ['#FFB7B2', '#FFDAC1', '#E2F0CB', '#B5EAD7', '#C7CEEA', '#E8DFF5', '#FF9AA2', '#FDE2E4'];
    const shapes = ['🌸', '✨', '💖', '⭐', '🍬', '🎀', '●', '★'];

    const container = document.createElement('div');
    container.style.position = 'fixed';
    container.style.inset = '0';
    container.style.pointerEvents = 'none';
    container.style.zIndex = '99999';
    container.style.overflow = 'hidden';
    document.body.appendChild(container);

    for (let i = 0; i < count; i++) {
      const el = document.createElement('div');
      const isEmoji = Math.random() > 0.5;
      const shape = shapes[Math.floor(Math.random() * shapes.length)];
      const color = colors[Math.floor(Math.random() * colors.length)];

      el.style.position = 'absolute';
      el.style.left = `${Math.random() * 100}%`;
      el.style.top = '-20px';
      el.style.fontSize = isEmoji ? `${14 + Math.random() * 16}px` : `${8 + Math.random() * 10}px`;
      el.style.color = color;
      el.style.userSelect = 'none';
      el.textContent = isEmoji ? shape : '●';

      const duration = 2.5 + Math.random() * 2;
      const horizontalDrift = (Math.random() - 0.5) * 200;
      const rotation = Math.random() * 720 - 360;

      el.animate([
        { transform: 'translate(0, 0) rotate(0deg)', opacity: 1 },
        { transform: `translate(${horizontalDrift}px, ${window.innerHeight + 50}px) rotate(${rotation}deg)`, opacity: 0.1 }
      ], {
        duration: duration * 1000,
        easing: 'cubic-bezier(0.25, 0.46, 0.45, 0.94)',
        delay: Math.random() * 300
      });

      container.appendChild(el);
    }

    setTimeout(() => container.remove(), 5000);
  }

  // ------------------------------------------------------------------------
  // 3. STORE & LOCALSTORAGE STATE MANAGER
  // ------------------------------------------------------------------------
  const STORAGE_KEY = 'cainter_prep_tracker_v1';

  class Store {
    constructor() {
      this.listeners = new Set();
      this.state = this.loadState();
      this.checkAndUpdateStreak();
    }

    getDefaultState() {
      const syllabus = JSON.parse(JSON.stringify(INITIAL_SYLLABUS));
      const today = new Date();
      const defaultExam = new Date(today.getFullYear(), 10, 2); // Nov 2nd
      if (defaultExam < today) defaultExam.setFullYear(today.getFullYear() + 1);
      const defaultDateStr = defaultExam.toISOString().split('T')[0];

      return {
        examDate: defaultDateStr,
        syllabus: syllabus,
        mockTests: [],
        timerSessions: [],
        timerSettings: {
          focusMinutes: 25,
          breakMinutes: 5,
          soundEnabled: true,
          confettiEnabled: true
        },
        streak: {
          count: 1,
          lastActiveDate: new Date().toISOString().split('T')[0],
          longestStreak: 1
        },
        currentQuoteIndex: Math.floor(Math.random() * 30)
      };
    }

    loadState() {
      try {
        const raw = localStorage.getItem(STORAGE_KEY);
        if (!raw) return this.getDefaultState();
        const parsed = JSON.parse(raw);
        const defaultState = this.getDefaultState();
        const syllabus = { ...defaultState.syllabus, ...(parsed.syllabus || {}) };
        return {
          ...defaultState,
          ...parsed,
          syllabus: syllabus,
          timerSettings: { ...defaultState.timerSettings, ...(parsed.timerSettings || {}) },
          streak: { ...defaultState.streak, ...(parsed.streak || {}) }
        };
      } catch (e) {
        return this.getDefaultState();
      }
    }

    saveState() {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(this.state));
        this.notify();
      } catch (e) {}
    }

    subscribe(listener) {
      this.listeners.add(listener);
      return () => this.listeners.delete(listener);
    }

    notify() {
      for (const listener of this.listeners) {
        try { listener(this.state); } catch (err) {}
      }
    }

    getState() {
      return this.state;
    }

    checkAndUpdateStreak() {
      const today = new Date().toISOString().split('T')[0];
      const lastActive = this.state.streak.lastActiveDate;

      if (!lastActive) {
        this.state.streak.lastActiveDate = today;
        this.state.streak.count = 1;
        this.state.streak.longestStreak = 1;
        this.saveState();
        return;
      }

      if (lastActive === today) return;

      const lastDate = new Date(lastActive);
      const currentDate = new Date(today);
      const diffTime = currentDate - lastDate;
      const diffDays = Math.round(diffTime / (1000 * 60 * 60 * 24));

      if (diffDays === 1) {
        this.state.streak.count = (this.state.streak.count || 0) + 1;
        this.state.streak.longestStreak = Math.max(this.state.streak.count, this.state.streak.longestStreak || 1);
        this.state.streak.lastActiveDate = today;
        this.saveState();
      } else if (diffDays > 1) {
        this.state.streak.count = 1;
        this.state.streak.lastActiveDate = today;
        this.saveState();
      }
    }

    recordActivity() {
      this.checkAndUpdateStreak();
    }

    setExamDate(dateStr) {
      this.state.examDate = dateStr;
      this.recordActivity();
      this.saveState();
    }

    updateChapterStatus(paperId, chapterId, status) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.status = status;
        this.recordActivity();
        this.saveState();
      }
    }

    updateChapterRevision(paperId, chapterId, delta) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.revisions = Math.max(0, (chapter.revisions || 0) + delta);
        this.recordActivity();
        this.saveState();
      }
    }

    resetChapterRevision(paperId, chapterId) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.revisions = 0;
        this.recordActivity();
        this.saveState();
      }
    }

    updateChapterNotes(paperId, chapterId, notes) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.notes = notes;
        this.recordActivity();
        this.saveState();
      }
    }

    updateChapterPriority(paperId, chapterId, priority) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.priority = priority;
        this.recordActivity();
        this.saveState();
      }
    }

    updateChapterTitle(paperId, chapterId, newTitle) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const chapter = paper.find(c => c.id === chapterId);
      if (chapter) {
        chapter.title = newTitle.trim();
        this.recordActivity();
        this.saveState();
      }
    }

    addChapter(paperId, title, priority = "Medium") {
      if (!this.state.syllabus[paperId]) {
        this.state.syllabus[paperId] = [];
      }
      const newChapter = {
        id: `${paperId}_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        title: title.trim(),
        status: "Not Started",
        revisions: 0,
        notes: "",
        priority: priority
      };
      this.state.syllabus[paperId].push(newChapter);
      this.recordActivity();
      this.saveState();
      return newChapter;
    }

    deleteChapter(paperId, chapterId) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      this.state.syllabus[paperId] = paper.filter(c => c.id !== chapterId);
      this.recordActivity();
      this.saveState();
    }

    moveChapter(paperId, chapterId, direction) {
      const paper = this.state.syllabus[paperId];
      if (!paper) return;
      const index = paper.findIndex(c => c.id === chapterId);
      if (index === -1) return;
      const targetIndex = direction === 'up' ? index - 1 : index + 1;
      if (targetIndex < 0 || targetIndex >= paper.length) return;
      const temp = paper[index];
      paper[index] = paper[targetIndex];
      paper[targetIndex] = temp;
      this.recordActivity();
      this.saveState();
    }

    addMockTest({ paperId, date, marksScored, totalMarks, notes }) {
      const scored = parseFloat(marksScored) || 0;
      const total = parseFloat(totalMarks) || 100;
      const percentage = total > 0 ? ((scored / total) * 100).toFixed(1) : 0;
      const newTest = {
        id: `test_${Date.now()}_${Math.random().toString(36).substr(2, 4)}`,
        paperId,
        date: date || new Date().toISOString().split('T')[0],
        marksScored: scored,
        totalMarks: total,
        percentage: parseFloat(percentage),
        notes: (notes || '').trim(),
        createdAt: new Date().toISOString()
      };
      this.state.mockTests.unshift(newTest);
      this.recordActivity();
      this.saveState();
      return newTest;
    }

    updateMockTest(testId, { paperId, date, marksScored, totalMarks, notes }) {
      const test = this.state.mockTests.find(t => t.id === testId);
      if (!test) return;
      const scored = parseFloat(marksScored) || 0;
      const total = parseFloat(totalMarks) || 100;
      const percentage = total > 0 ? ((scored / total) * 100).toFixed(1) : 0;
      test.paperId = paperId;
      test.date = date;
      test.marksScored = scored;
      test.totalMarks = total;
      test.percentage = parseFloat(percentage);
      test.notes = (notes || '').trim();
      this.recordActivity();
      this.saveState();
    }

    deleteMockTest(testId) {
      this.state.mockTests = this.state.mockTests.filter(t => t.id !== testId);
      this.recordActivity();
      this.saveState();
    }

    logTimerSession({ durationMinutes, paperId, chapterTitle, type = "focus" }) {
      const session = {
        id: `session_${Date.now()}`,
        timestamp: new Date().toISOString(),
        date: new Date().toISOString().split('T')[0],
        durationMinutes: Math.round(durationMinutes),
        paperId: paperId || "general",
        chapterTitle: chapterTitle || "General Study",
        type
      };
      this.state.timerSessions.unshift(session);
      this.recordActivity();
      this.saveState();
      return session;
    }

    deleteTimerSession(sessionId) {
      this.state.timerSessions = this.state.timerSessions.filter(s => s.id !== sessionId);
      this.saveState();
    }

    updateTimerSettings(settings) {
      this.state.timerSettings = { ...this.state.timerSettings, ...settings };
      this.saveState();
    }

    setNextQuote(totalQuotes) {
      this.state.currentQuoteIndex = ((this.state.currentQuoteIndex || 0) + 1) % totalQuotes;
      this.saveState();
    }

    getPaperStats(paperId) {
      const chapters = this.state.syllabus[paperId] || [];
      const total = chapters.length;
      if (total === 0) return { total: 0, done: 0, inProgress: 0, notStarted: 0, percent: 0, revisions: 0 };
      const done = chapters.filter(c => c.status === 'Done').length;
      const inProgress = chapters.filter(c => c.status === 'In Progress').length;
      const notStarted = chapters.filter(c => c.status === 'Not Started').length;
      const revisions = chapters.reduce((sum, c) => sum + (c.revisions || 0), 0);
      const percent = Math.round((done / total) * 100);
      return { total, done, inProgress, notStarted, percent, revisions };
    }

    getOverallStats() {
      let totalChapters = 0;
      let doneChapters = 0;
      let inProgressChapters = 0;
      let notStartedChapters = 0;
      let totalRevisions = 0;

      PAPERS_METADATA.forEach(p => {
        const stats = this.getPaperStats(p.id);
        totalChapters += stats.total;
        doneChapters += stats.done;
        inProgressChapters += stats.inProgress;
        notStartedChapters += stats.notStarted;
        totalRevisions += stats.revisions;
      });

      const percent = totalChapters > 0 ? Math.round((doneChapters / totalChapters) * 100) : 0;
      const mockTestsCount = this.state.mockTests.length;
      const avgMockScore = mockTestsCount > 0
        ? (this.state.mockTests.reduce((acc, t) => acc + t.percentage, 0) / mockTestsCount).toFixed(1)
        : 0;

      const totalStudyMinutes = this.state.timerSessions
        .filter(s => s.type === 'focus')
        .reduce((sum, s) => sum + (s.durationMinutes || 0), 0);
      const totalStudyHours = (totalStudyMinutes / 60).toFixed(1);

      return {
        totalChapters,
        doneChapters,
        inProgressChapters,
        notStartedChapters,
        percent,
        totalRevisions,
        mockTestsCount,
        avgMockScore,
        totalStudyMinutes,
        totalStudyHours,
        streakCount: this.state.streak.count || 1,
        longestStreak: this.state.streak.longestStreak || 1
      };
    }

    getPaperMockStats(paperId) {
      const tests = this.state.mockTests.filter(t => t.paperId === paperId);
      if (tests.length === 0) return { count: 0, avg: 0, highest: 0 };
      const avg = (tests.reduce((acc, t) => acc + t.percentage, 0) / tests.length).toFixed(1);
      const highest = Math.max(...tests.map(t => t.percentage)).toFixed(1);
      return { count: tests.length, avg, highest };
    }

    exportDataJSON() {
      const dataStr = JSON.stringify(this.state, null, 2);
      const blob = new Blob([dataStr], { type: 'application/json' });
      const url = URL.createObjectURL(blob);
      const link = document.createElement('a');
      link.href = url;
      const dateStr = new Date().toISOString().split('T')[0];
      link.download = `ca_inter_prep_tracker_backup_${dateStr}.json`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
      URL.revokeObjectURL(url);
    }

    importDataJSON(jsonString) {
      try {
        const parsed = JSON.parse(jsonString);
        if (!parsed || typeof parsed !== 'object') throw new Error('Invalid JSON structure');
        if (!parsed.syllabus && !parsed.mockTests) throw new Error('Backup file does not contain CA Inter Tracker data');

        const defaultState = this.getDefaultState();
        this.state = {
          ...defaultState,
          ...parsed,
          syllabus: { ...defaultState.syllabus, ...(parsed.syllabus || {}) },
          timerSettings: { ...defaultState.timerSettings, ...(parsed.timerSettings || {}) },
          streak: { ...defaultState.streak, ...(parsed.streak || {}) }
        };
        this.saveState();
        return { success: true, message: 'Data imported successfully! ✨' };
      } catch (e) {
        return { success: false, message: e.message || 'Failed to parse backup JSON file.' };
      }
    }

    resetAllData() {
      localStorage.removeItem(STORAGE_KEY);
      this.state = this.getDefaultState();
      this.saveState();
    }
  }

  const store = new Store();

  // ------------------------------------------------------------------------
  // 4. ROUTER
  // ------------------------------------------------------------------------
  class Router {
    constructor(routes, defaultRoute = 'dashboard') {
      this.routes = routes;
      this.defaultRoute = defaultRoute;
      this.currentRoute = null;
      window.addEventListener('hashchange', () => this.handleRoute());
    }

    init() {
      this.handleRoute();
    }

    getCurrentRoute() {
      const hash = window.location.hash.replace(/^#\/?/, '').trim();
      return hash || this.defaultRoute;
    }

    navigate(route) {
      window.location.hash = `#${route}`;
    }

    handleRoute() {
      let route = this.getCurrentRoute();
      if (!this.routes[route]) route = this.defaultRoute;
      this.currentRoute = route;

      document.querySelectorAll('.nav-link').forEach(link => {
        const target = link.getAttribute('data-route');
        if (target === route) {
          link.classList.add('active');
        } else {
          link.classList.remove('active');
        }
      });

      const viewHandler = this.routes[route];
      if (typeof viewHandler === 'function') viewHandler();

      const mainContent = document.getElementById('main-content');
      if (mainContent) mainContent.scrollTop = 0;
    }
  }

  // ------------------------------------------------------------------------
  // 5. VIEW: DASHBOARD
  // ------------------------------------------------------------------------
  let countdownTimerInterval = null;

  function renderDashboard() {
    const container = document.getElementById('main-content');
    if (!container) return;

    const state = store.getState();
    const overallStats = store.getOverallStats();
    const quoteIndex = (state.currentQuoteIndex || 0) % MOTIVATIONAL_QUOTES.length;
    const currentQuote = MOTIVATIONAL_QUOTES[quoteIndex] || MOTIVATIONAL_QUOTES[0];

    container.innerHTML = `
      <div class="view-wrapper fade-in">
        <div class="dashboard-header">
          <div class="welcome-text">
            <div class="greeting-badge"><span class="pulse-dot"></span> Welcome Back, Future CA! 🌸</div>
            <h1 class="page-title">CA Inter Prep Tracker <span class="sparkle-emoji">✨</span></h1>
            <p class="page-subtitle">Your aesthetic, stress-free companion to conquer your CA Intermediate journey with flying colors!</p>
          </div>
          <div class="header-streak-badge" title="Daily study streak">
            <span class="streak-icon">🔥</span>
            <div class="streak-info">
              <span class="streak-count">${overallStats.streakCount} Day${overallStats.streakCount === 1 ? '' : 's'}</span>
              <span class="streak-label">Study Streak</span>
            </div>
          </div>
        </div>

        <div class="countdown-card kawaii-card">
          <div class="countdown-header">
            <div class="countdown-title-wrap">
              <span class="badge-icon">⏳</span>
              <div>
                <h2 class="card-title">CA Exam Countdown</h2>
                <span class="countdown-target-text" id="target-date-display">Target Date: ${formatDate(state.examDate)}</span>
              </div>
            </div>
            <button class="btn btn-secondary btn-sm" id="btn-edit-exam-date">
              <span>📅</span> Edit Date
            </button>
          </div>

          <div id="countdown-clock-container" class="countdown-clock-container"></div>

          <div id="date-edit-picker-container" class="date-edit-container hidden">
            <label for="exam-date-input" class="form-label">Select Your Exam Start Date:</label>
            <div class="date-input-group">
              <input type="date" id="exam-date-input" class="form-input" value="${state.examDate || ''}" />
              <button class="btn btn-primary btn-sm" id="btn-save-exam-date">Save Date 🌸</button>
              <button class="btn btn-ghost btn-sm" id="btn-cancel-exam-date">Cancel</button>
            </div>
          </div>
        </div>

        <div class="quote-card kawaii-card">
          <div class="quote-content">
            <div class="quote-badge">
              <span>✨ Daily Inspiration</span>
              <span class="quote-tag">${currentQuote.category}</span>
            </div>
            <blockquote class="quote-text">"${currentQuote.quote}"</blockquote>
            <cite class="quote-author">— ${currentQuote.author}</cite>
          </div>
          <button class="btn-icon-quote" id="btn-next-quote" title="Inspire me with another quote!">
            <span>🌸</span> Next Quote
          </button>
        </div>

        <div class="stats-overview-grid">
          <div class="stat-card kawaii-card stat-progress">
            <div class="stat-icon-wrapper" style="background: rgba(255, 183, 178, 0.25); color: #e55353;">
              <span>📊</span>
            </div>
            <div class="stat-body">
              <span class="stat-value">${overallStats.percent}%</span>
              <span class="stat-label">Syllabus Completed</span>
              <div class="stat-subtext">${overallStats.doneChapters} of ${overallStats.totalChapters} chapters done</div>
            </div>
          </div>

          <div class="stat-card kawaii-card stat-revisions">
            <div class="stat-icon-wrapper" style="background: rgba(232, 223, 245, 0.3); color: #805ad5;">
              <span>⭐</span>
            </div>
            <div class="stat-body">
              <span class="stat-value">${overallStats.totalRevisions}</span>
              <span class="stat-label">Total Revisions</span>
              <div class="stat-subtext">Across all subjects</div>
            </div>
          </div>

          <div class="stat-card kawaii-card stat-mocks">
            <div class="stat-icon-wrapper" style="background: rgba(181, 234, 215, 0.3); color: #2f855a;">
              <span>📝</span>
            </div>
            <div class="stat-body">
              <span class="stat-value">${overallStats.avgMockScore}%</span>
              <span class="stat-label">Mock Test Avg</span>
              <div class="stat-subtext">${overallStats.mockTestsCount} tests attempted</div>
            </div>
          </div>

          <div class="stat-card kawaii-card stat-timer">
            <div class="stat-icon-wrapper" style="background: rgba(199, 206, 234, 0.3); color: #4c51bf;">
              <span>⏱️</span>
            </div>
            <div class="stat-body">
              <span class="stat-value">${overallStats.totalStudyHours} hrs</span>
              <span class="stat-label">Focus Time Logged</span>
              <div class="stat-subtext">${state.timerSessions.filter(s => s.type === 'focus').length} Pomodoro sessions</div>
            </div>
          </div>
        </div>

        <div class="section-header">
          <div>
            <h2 class="section-title">Subject Breakdown & Progress 📚</h2>
            <p class="section-desc">Track completion rate across all 6 CA Intermediate papers</p>
          </div>
          <a href="#syllabus" class="btn btn-ghost btn-sm">View Full Syllabus →</a>
        </div>

        <div class="papers-grid">
          ${PAPERS_METADATA.map(paper => {
            const stats = store.getPaperStats(paper.id);
            return `
              <div class="paper-card kawaii-card" data-paper-id="${paper.id}">
                <div class="paper-card-top">
                  <div class="paper-icon-tag" style="background: ${paper.color};">
                    <span>${paper.icon}</span>
                  </div>
                  <div class="paper-info">
                    <span class="paper-code">${paper.code}</span>
                    <h3 class="paper-name">${paper.name}</h3>
                  </div>
                </div>
                <div class="paper-card-progress">
                  <div class="progress-info-row">
                    <span class="progress-percent">${stats.percent}% Done</span>
                    <span class="progress-fraction">${stats.done}/${stats.total} Chapters</span>
                  </div>
                  <div class="cute-progress-bar">
                    <div class="cute-progress-fill" style="width: ${stats.percent}%; background: linear-gradient(90deg, ${paper.color}, ${paper.accent});"></div>
                  </div>
                </div>
                <div class="paper-card-footer">
                  <div class="paper-quick-stats">
                    <span class="badge badge-rev">⭐ ${stats.revisions} Revs</span>
                    <span class="badge badge-prog">🔄 ${stats.inProgress} Ongoing</span>
                  </div>
                  <button class="btn btn-sm btn-paper-jump" data-paper="${paper.id}">Open 🌸</button>
                </div>
              </div>
            `;
          }).join('')}
        </div>

        <div class="quick-actions-bar">
          <div class="quick-actions-title">🌸 Quick Jump:</div>
          <div class="quick-actions-buttons">
            <a href="#syllabus" class="btn btn-outline btn-sm">📚 Syllabus Editor</a>
            <a href="#mock-tests" class="btn btn-outline btn-sm">📝 Log Mock Test</a>
            <a href="#timer" class="btn btn-outline btn-sm">⏱️ Study Timer</a>
            <a href="#settings" class="btn btn-outline btn-sm">⚙️ Backup & Settings</a>
          </div>
        </div>
      </div>
    `;

    startCountdownTicker();
    setupDashboardEvents();
  }

  function formatDate(dateStr) {
    if (!dateStr) return 'Not Set';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric', weekday: 'short' });
    } catch (e) { return dateStr; }
  }

  function startCountdownTicker() {
    if (countdownTimerInterval) clearInterval(countdownTimerInterval);
    updateCountdownClock();
    countdownTimerInterval = setInterval(updateCountdownClock, 1000);
  }

  function updateCountdownClock() {
    const container = document.getElementById('countdown-clock-container');
    if (!container) {
      if (countdownTimerInterval) clearInterval(countdownTimerInterval);
      return;
    }

    const state = store.getState();
    if (!state.examDate) {
      container.innerHTML = `
        <div class="countdown-empty-state">
          <p>No exam date selected yet! Set your target date to begin the countdown.</p>
        </div>
      `;
      return;
    }

    const target = new Date(state.examDate + 'T09:00:00').getTime();
    const now = new Date().getTime();
    const diff = target - now;

    if (diff <= 0) {
      const diffDays = Math.abs(Math.floor(diff / (1000 * 60 * 60 * 24)));
      if (diffDays === 0) {
        container.innerHTML = `
          <div class="countdown-celebration-state">
            <span class="huge-emoji">🌸💪✨</span>
            <div class="exam-day-banner">It's Exam Day! You've got this! Breathe and believe in yourself! 🌟</div>
          </div>
        `;
      } else {
        container.innerHTML = `
          <div class="countdown-celebration-state">
            <span class="huge-emoji">🎉🏆📚</span>
            <div class="exam-day-banner">Exam cycle underway or completed! Outstanding effort! Time for the next milestone! 💖</div>
          </div>
        `;
      }
      return;
    }

    const days = Math.floor(diff / (1000 * 60 * 60 * 24));
    const hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((diff % (1000 * 60)) / 1000);

    container.innerHTML = `
      <div class="countdown-units-grid">
        <div class="countdown-unit-box unit-days">
          <span class="unit-number">${days}</span>
          <span class="unit-label">DAYS</span>
        </div>
        <div class="countdown-colon">:</div>
        <div class="countdown-unit-box unit-hours">
          <span class="unit-number">${String(hours).padStart(2, '0')}</span>
          <span class="unit-label">HOURS</span>
        </div>
        <div class="countdown-colon">:</div>
        <div class="countdown-unit-box unit-minutes">
          <span class="unit-number">${String(minutes).padStart(2, '0')}</span>
          <span class="unit-label">MINUTES</span>
        </div>
        <div class="countdown-colon">:</div>
        <div class="countdown-unit-box unit-seconds">
          <span class="unit-number">${String(seconds).padStart(2, '0')}</span>
          <span class="unit-label">SECONDS</span>
        </div>
      </div>
    `;
  }

  function setupDashboardEvents() {
    const btnEditDate = document.getElementById('btn-edit-exam-date');
    const datePickerContainer = document.getElementById('date-edit-picker-container');
    const btnSaveDate = document.getElementById('btn-save-exam-date');
    const btnCancelDate = document.getElementById('btn-cancel-exam-date');
    const dateInput = document.getElementById('exam-date-input');

    if (btnEditDate && datePickerContainer) {
      btnEditDate.addEventListener('click', () => {
        sound.playPop();
        datePickerContainer.classList.toggle('hidden');
        if (!datePickerContainer.classList.contains('hidden') && dateInput) dateInput.focus();
      });
    }

    if (btnCancelDate && datePickerContainer) {
      btnCancelDate.addEventListener('click', () => {
        sound.playPop();
        datePickerContainer.classList.add('hidden');
      });
    }

    if (btnSaveDate && dateInput) {
      btnSaveDate.addEventListener('click', () => {
        if (dateInput.value) {
          store.setExamDate(dateInput.value);
          sound.playCheck();
          datePickerContainer.classList.add('hidden');
          const targetDisplay = document.getElementById('target-date-display');
          if (targetDisplay) targetDisplay.textContent = `Target Date: ${formatDate(dateInput.value)}`;
          updateCountdownClock();
        }
      });
    }

    const btnNextQuote = document.getElementById('btn-next-quote');
    if (btnNextQuote) {
      btnNextQuote.addEventListener('click', () => {
        sound.playPop();
        store.setNextQuote(MOTIVATIONAL_QUOTES.length);
        renderDashboard();
      });
    }

    document.querySelectorAll('.btn-paper-jump, .paper-card').forEach(el => {
      el.addEventListener('click', () => {
        const paperId = el.getAttribute('data-paper') || el.getAttribute('data-paper-id');
        if (paperId) {
          sound.playPop();
          window.selectedSyllabusPaper = paperId;
          window.location.hash = '#syllabus';
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 6. VIEW: SYLLABUS EDITOR
  // ------------------------------------------------------------------------
  let currentPaperTab = 'paper1';
  let currentStatusFilter = 'all';
  let currentPriorityFilter = 'all';
  let searchQuery = '';
  let expandedNotes = new Set();

  function renderSyllabus() {
    const container = document.getElementById('main-content');
    if (!container) return;

    if (window.selectedSyllabusPaper) {
      currentPaperTab = window.selectedSyllabusPaper;
      window.selectedSyllabusPaper = null;
    }

    const state = store.getState();
    const overallStats = store.getOverallStats();
    const currentPaper = PAPERS_METADATA.find(p => p.id === currentPaperTab) || PAPERS_METADATA[0];
    const paperStats = store.getPaperStats(currentPaper.id);
    const rawChapters = state.syllabus[currentPaper.id] || [];

    const filteredChapters = rawChapters.filter(ch => {
      if (currentStatusFilter !== 'all' && ch.status !== currentStatusFilter) return false;
      if (currentPriorityFilter !== 'all' && (ch.priority || 'Medium') !== currentPriorityFilter) return false;
      if (searchQuery) {
        const q = searchQuery.toLowerCase();
        const titleMatch = (ch.title || '').toLowerCase().includes(q);
        const notesMatch = (ch.notes || '').toLowerCase().includes(q);
        if (!titleMatch && !notesMatch) return false;
      }
      return true;
    });

    container.innerHTML = `
      <div class="view-wrapper fade-in">
        <div class="syllabus-top-header">
          <div class="header-titles">
            <div class="greeting-badge">📚 Interactive Tracker</div>
            <h1 class="page-title">CA Inter Syllabus Editor 🌸</h1>
            <p class="page-subtitle">Track status, revisions, notes & priorities line-by-line for every paper.</p>
          </div>
          <div class="syllabus-header-actions">
            <button class="btn btn-primary btn-sm" id="btn-open-add-chapter-modal">
              <span>➕</span> Add New Chapter
            </button>
          </div>
        </div>

        <div class="overall-progress-card kawaii-card">
          <div class="overall-prog-top">
            <div class="overall-prog-title">
              <span class="badge-icon">🎯</span>
              <div>
                <h3 class="card-title">Overall CA Inter Progress</h3>
                <span class="card-subtitle">${overallStats.doneChapters} of ${overallStats.totalChapters} total chapters marked Done (${overallStats.percent}%)</span>
              </div>
            </div>
            <div class="overall-prog-badges">
              <span class="badge badge-rev">⭐ ${overallStats.totalRevisions} Revisions Logged</span>
              <span class="badge badge-prog">🔄 ${overallStats.inProgressChapters} In Progress</span>
            </div>
          </div>
          <div class="cute-progress-bar cute-progress-bar-lg">
            <div class="cute-progress-fill" style="width: ${overallStats.percent}%; background: linear-gradient(90deg, #ffb7b2, #b5ead7, #c7ceea);"></div>
          </div>
        </div>

        <div class="paper-tabs-scroller">
          <div class="paper-tabs-list">
            ${PAPERS_METADATA.map(p => {
              const pStats = store.getPaperStats(p.id);
              const isActive = p.id === currentPaperTab;
              return `
                <button class="paper-tab-btn ${isActive ? 'active' : ''}" data-paper-id="${p.id}" style="${isActive ? `border-bottom-color: ${p.accent}; background: rgba(255, 255, 255, 0.9);` : ''}">
                  <span class="tab-icon">${p.icon}</span>
                  <div class="tab-text">
                    <span class="tab-code">${p.code}</span>
                    <span class="tab-title">${p.shortName}</span>
                  </div>
                  <span class="tab-badge" style="background: ${p.color};">${pStats.percent}%</span>
                </button>
              `;
            }).join('')}
          </div>
        </div>

        <div class="active-paper-card kawaii-card" style="border-top: 4px solid ${currentPaper.accent};">
          <div class="active-paper-info-row">
            <div class="active-paper-title-wrap">
              <span class="huge-paper-icon" style="background: ${currentPaper.color};">${currentPaper.icon}</span>
              <div>
                <span class="active-paper-code">${currentPaper.code}</span>
                <h2 class="active-paper-name">${currentPaper.name}</h2>
              </div>
            </div>
            <div class="active-paper-stats-chips">
              <div class="stat-chip"><span class="chip-label">Done</span><span class="chip-val chip-done">${paperStats.done}/${paperStats.total}</span></div>
              <div class="stat-chip"><span class="chip-label">Ongoing</span><span class="chip-val chip-prog">${paperStats.inProgress}</span></div>
              <div class="stat-chip"><span class="chip-label">Revisions</span><span class="chip-val chip-rev">⭐ ${paperStats.revisions}</span></div>
            </div>
          </div>
          <div class="paper-progress-bar-wrap">
            <div class="cute-progress-bar">
              <div class="cute-progress-fill" style="width: ${paperStats.percent}%; background: linear-gradient(90deg, ${currentPaper.color}, ${currentPaper.accent});"></div>
            </div>
          </div>
        </div>

        <div class="syllabus-controls-bar kawaii-card">
          <div class="search-input-wrap">
            <span class="search-icon">🔍</span>
            <input type="text" id="syllabus-search-input" class="form-input search-input" placeholder="Search chapters, standards, or notes..." value="${searchQuery}" />
            ${searchQuery ? `<button class="btn-clear-search" id="btn-clear-search">×</button>` : ''}
          </div>

          <div class="filter-group">
            <label class="filter-label">Status:</label>
            <select id="syllabus-status-filter" class="form-select">
              <option value="all" ${currentStatusFilter === 'all' ? 'selected' : ''}>All Statuses</option>
              <option value="Not Started" ${currentStatusFilter === 'Not Started' ? 'selected' : ''}>⚪ Not Started</option>
              <option value="In Progress" ${currentStatusFilter === 'In Progress' ? 'selected' : ''}>🟡 In Progress</option>
              <option value="Done" ${currentStatusFilter === 'Done' ? 'selected' : ''}>🟢 Done</option>
            </select>
          </div>

          <div class="filter-group">
            <label class="filter-label">Priority:</label>
            <select id="syllabus-priority-filter" class="form-select">
              <option value="all" ${currentPriorityFilter === 'all' ? 'selected' : ''}>All Priorities</option>
              <option value="High" ${currentPriorityFilter === 'High' ? 'selected' : ''}>🔥 High Priority</option>
              <option value="Medium" ${currentPriorityFilter === 'Medium' ? 'selected' : ''}>✨ Medium</option>
              <option value="Low" ${currentPriorityFilter === 'Low' ? 'selected' : ''}>🌱 Low</option>
            </select>
          </div>

          <div class="bulk-helpers">
            <button class="btn btn-ghost btn-sm" id="btn-mark-all-done" title="Mark all chapters in this paper as Done">✨ Mark All Done</button>
          </div>
        </div>

        <div class="chapters-container">
          ${filteredChapters.length === 0 ? `
            <div class="empty-state kawaii-card">
              <span class="empty-emoji">🌸</span>
              <h3>No chapters match your filter</h3>
              <p>Try resetting the search or filter criteria to see all chapters in this paper.</p>
              <button class="btn btn-secondary btn-sm" id="btn-reset-filters">Reset Filters</button>
            </div>
          ` : `
            <div class="chapter-rows-list">
              ${filteredChapters.map((ch, idx) => {
                const isNotesExpanded = expandedNotes.has(ch.id);
                const priorityClass = `priority-${(ch.priority || 'Medium').toLowerCase()}`;
                const statusClass = `status-${(ch.status || 'Not Started').replace(/\s+/g, '-').toLowerCase()}`;

                return `
                  <div class="chapter-row kawaii-card ${statusClass}" data-chapter-id="${ch.id}">
                    <div class="chapter-row-main">
                      <div class="chapter-reorder-handles">
                        <button class="btn-reorder btn-move-up" data-chapter-id="${ch.id}" title="Move up">▲</button>
                        <span class="chapter-line-num">${idx + 1}</span>
                        <button class="btn-reorder btn-move-down" data-chapter-id="${ch.id}" title="Move down">▼</button>
                      </div>

                      <div class="chapter-title-col">
                        <div class="chapter-title-wrap">
                          <span class="chapter-title-text">${escapeHtml(ch.title)}</span>
                          <button class="btn-icon-inline btn-edit-title" data-chapter-id="${ch.id}" title="Edit Chapter Title">✏️</button>
                        </div>
                        <div class="chapter-sub-meta">
                          <div class="priority-dropdown-wrap">
                            <span class="priority-badge ${priorityClass}">
                              ${ch.priority === 'High' ? '🔥 High' : ch.priority === 'Low' ? '🌱 Low' : '✨ Medium'}
                            </span>
                            <select class="select-priority-inline" data-chapter-id="${ch.id}">
                              <option value="High" ${ch.priority === 'High' ? 'selected' : ''}>🔥 High</option>
                              <option value="Medium" ${ch.priority === 'Medium' || !ch.priority ? 'selected' : ''}>✨ Medium</option>
                              <option value="Low" ${ch.priority === 'Low' ? 'selected' : ''}>🌱 Low</option>
                            </select>
                          </div>

                          <button class="btn-toggle-notes ${ch.notes ? 'has-notes' : ''}" data-chapter-id="${ch.id}">
                            <span>📝</span> ${ch.notes ? 'Notes Added' : 'Add Note'} ${isNotesExpanded ? '▲' : '▼'}
                          </button>
                        </div>
                      </div>

                      <div class="chapter-tracking-controls">
                        <div class="status-selector-wrap">
                          <label class="tracking-label">Status</label>
                          <select class="form-select status-select-control ${statusClass}" data-chapter-id="${ch.id}">
                            <option value="Not Started" ${ch.status === 'Not Started' ? 'selected' : ''}>⚪ Not Started</option>
                            <option value="In Progress" ${ch.status === 'In Progress' ? 'selected' : ''}>🟡 In Progress</option>
                            <option value="Done" ${ch.status === 'Done' ? 'selected' : ''}>🟢 Done</option>
                          </select>
                        </div>

                        <div class="revision-control-wrap">
                          <label class="tracking-label">Revisions</label>
                          <div class="revision-btn-group">
                            <button class="btn-rev-action btn-rev-minus" data-chapter-id="${ch.id}" title="Decrease revision count" ${ch.revisions <= 0 ? 'disabled' : ''}>-</button>
                            <span class="revision-count-pill" title="Current revision count">⭐ ${ch.revisions || 0}</span>
                            <button class="btn-rev-action btn-rev-plus" data-chapter-id="${ch.id}" title="+1 Revision">+1</button>
                            ${ch.revisions > 0 ? `<button class="btn-rev-action btn-rev-reset" data-chapter-id="${ch.id}" title="Reset revisions">↺</button>` : ''}
                          </div>
                        </div>

                        <div class="chapter-actions-col">
                          <button class="btn-delete-chapter" data-chapter-id="${ch.id}" title="Delete this chapter line">🗑️</button>
                        </div>
                      </div>
                    </div>

                    <div class="chapter-notes-panel ${isNotesExpanded ? 'expanded' : 'collapsed'}" id="notes-panel-${ch.id}">
                      <div class="notes-panel-inner">
                        <label class="notes-label">🌸 Study Notes / Formulas / Doubts for this chapter:</label>
                        <textarea class="form-textarea chapter-notes-input" data-chapter-id="${ch.id}" placeholder="Type key sections, formulas, doubts, or memory mnemonics here...">${escapeHtml(ch.notes || '')}</textarea>
                        <div class="notes-panel-footer">
                          <span class="notes-status-msg" id="notes-msg-${ch.id}">Auto-saves as you type</span>
                        </div>
                      </div>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>

        <div class="add-chapter-bar kawaii-card">
          <h4 class="add-bar-title">Add custom chapter or topic to ${currentPaper.name}:</h4>
          <div class="add-chapter-inline-form">
            <input type="text" id="inline-new-chapter-title" class="form-input" placeholder="e.g. Chapter X: Practice Case Studies & RTPs" />
            <select id="inline-new-chapter-priority" class="form-select">
              <option value="High">🔥 High Priority</option>
              <option value="Medium" selected>✨ Medium Priority</option>
              <option value="Low">🌱 Low Priority</option>
            </select>
            <button class="btn btn-primary" id="btn-add-inline-chapter">➕ Add Chapter</button>
          </div>
        </div>
      </div>

      <div id="modal-edit-chapter" class="modal-overlay hidden">
        <div class="modal-card kawaii-card">
          <div class="modal-header">
            <h3 class="modal-title">✏️ Edit Chapter Title</h3>
            <button class="modal-close" id="btn-close-edit-modal">×</button>
          </div>
          <div class="modal-body">
            <input type="hidden" id="edit-modal-chapter-id" />
            <label class="form-label">Chapter / Unit Name:</label>
            <input type="text" id="edit-modal-title-input" class="form-input" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" id="btn-cancel-edit-modal">Cancel</button>
            <button class="btn btn-primary" id="btn-save-edit-modal">Save Changes 🌸</button>
          </div>
        </div>
      </div>

      <div id="modal-delete-chapter" class="modal-overlay hidden">
        <div class="modal-card kawaii-card">
          <div class="modal-header">
            <h3 class="modal-title">🗑️ Delete Chapter?</h3>
            <button class="modal-close" id="btn-close-delete-modal">×</button>
          </div>
          <div class="modal-body">
            <p id="delete-modal-msg">Are you sure you want to delete this chapter from your syllabus?</p>
            <input type="hidden" id="delete-modal-chapter-id" />
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" id="btn-cancel-delete-modal">Keep Chapter</button>
            <button class="btn btn-danger" id="btn-confirm-delete-modal">Yes, Delete 🗑️</button>
          </div>
        </div>
      </div>
    `;

    setupSyllabusEvents(currentPaper.id);
  }

  function escapeHtml(str) {
    if (!str) return '';
    return str.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function setupSyllabusEvents(paperId) {
    document.querySelectorAll('.paper-tab-btn').forEach(btn => {
      btn.addEventListener('click', () => {
        const pid = btn.getAttribute('data-paper-id');
        if (pid && pid !== currentPaperTab) {
          sound.playPop();
          currentPaperTab = pid;
          renderSyllabus();
        }
      });
    });

    const searchInput = document.getElementById('syllabus-search-input');
    if (searchInput) {
      searchInput.addEventListener('input', (e) => {
        searchQuery = e.target.value;
        renderSyllabus();
      });
    }

    const btnClearSearch = document.getElementById('btn-clear-search');
    if (btnClearSearch) {
      btnClearSearch.addEventListener('click', () => {
        searchQuery = '';
        renderSyllabus();
      });
    }

    const statusFilter = document.getElementById('syllabus-status-filter');
    if (statusFilter) {
      statusFilter.addEventListener('change', (e) => {
        currentStatusFilter = e.target.value;
        renderSyllabus();
      });
    }

    const priorityFilter = document.getElementById('syllabus-priority-filter');
    if (priorityFilter) {
      priorityFilter.addEventListener('change', (e) => {
        currentPriorityFilter = e.target.value;
        renderSyllabus();
      });
    }

    const btnResetFilters = document.getElementById('btn-reset-filters');
    if (btnResetFilters) {
      btnResetFilters.addEventListener('click', () => {
        currentStatusFilter = 'all';
        currentPriorityFilter = 'all';
        searchQuery = '';
        renderSyllabus();
      });
    }

    document.querySelectorAll('.status-select-control').forEach(select => {
      select.addEventListener('change', (e) => {
        const cid = select.getAttribute('data-chapter-id');
        const newStatus = select.value;
        store.updateChapterStatus(paperId, cid, newStatus);
        if (newStatus === 'Done') {
          sound.playCheck();
          const pStats = store.getPaperStats(paperId);
          if (pStats.percent === 100) {
            triggerConfetti();
            sound.playCelebration();
          }
        } else {
          sound.playPop();
        }
        renderSyllabus();
      });
    });

    document.querySelectorAll('.btn-rev-plus').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playCheck();
        store.updateChapterRevision(paperId, cid, 1);
        renderSyllabus();
      });
    });

    document.querySelectorAll('.btn-rev-minus').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playPop();
        store.updateChapterRevision(paperId, cid, -1);
        renderSyllabus();
      });
    });

    document.querySelectorAll('.btn-rev-reset').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playPop();
        store.resetChapterRevision(paperId, cid);
        renderSyllabus();
      });
    });

    document.querySelectorAll('.select-priority-inline').forEach(select => {
      select.addEventListener('change', (e) => {
        const cid = select.getAttribute('data-chapter-id');
        sound.playPop();
        store.updateChapterPriority(paperId, cid, e.target.value);
        renderSyllabus();
      });
    });

    document.querySelectorAll('.btn-toggle-notes').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playPop();
        if (expandedNotes.has(cid)) expandedNotes.delete(cid);
        else expandedNotes.add(cid);
        const panel = document.getElementById(`notes-panel-${cid}`);
        if (panel) {
          panel.classList.toggle('expanded', expandedNotes.has(cid));
          panel.classList.toggle('collapsed', !expandedNotes.has(cid));
        }
      });
    });

    document.querySelectorAll('.chapter-notes-input').forEach(textarea => {
      textarea.addEventListener('input', (e) => {
        const cid = textarea.getAttribute('data-chapter-id');
        const msg = document.getElementById(`notes-msg-${cid}`);
        if (msg) msg.textContent = 'Saving...';
        clearTimeout(textarea._saveTimeout);
        textarea._saveTimeout = setTimeout(() => {
          store.updateChapterNotes(paperId, cid, e.target.value);
          if (msg) msg.textContent = 'Saved ✨';
        }, 400);
      });
    });

    document.querySelectorAll('.btn-move-up').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playPop();
        store.moveChapter(paperId, cid, 'up');
        renderSyllabus();
      });
    });

    document.querySelectorAll('.btn-move-down').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        sound.playPop();
        store.moveChapter(paperId, cid, 'down');
        renderSyllabus();
      });
    });

    const modalEdit = document.getElementById('modal-edit-chapter');
    const editTitleInput = document.getElementById('edit-modal-title-input');
    const editIdInput = document.getElementById('edit-modal-chapter-id');
    const btnSaveEdit = document.getElementById('btn-save-edit-modal');
    const btnCancelEdit = document.getElementById('btn-cancel-edit-modal');
    const btnCloseEdit = document.getElementById('btn-close-edit-modal');

    document.querySelectorAll('.btn-edit-title').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        const paper = store.getState().syllabus[paperId] || [];
        const ch = paper.find(c => c.id === cid);
        if (ch && modalEdit && editTitleInput && editIdInput) {
          sound.playPop();
          editIdInput.value = cid;
          editTitleInput.value = ch.title;
          modalEdit.classList.remove('hidden');
          editTitleInput.focus();
        }
      });
    });

    if (btnCancelEdit && modalEdit) btnCancelEdit.addEventListener('click', () => modalEdit.classList.add('hidden'));
    if (btnCloseEdit && modalEdit) btnCloseEdit.addEventListener('click', () => modalEdit.classList.add('hidden'));
    if (btnSaveEdit && editTitleInput && editIdInput && modalEdit) {
      btnSaveEdit.addEventListener('click', () => {
        const cid = editIdInput.value;
        const val = editTitleInput.value.trim();
        if (val && cid) {
          store.updateChapterTitle(paperId, cid, val);
          sound.playCheck();
          modalEdit.classList.add('hidden');
          renderSyllabus();
        }
      });
    }

    const modalDelete = document.getElementById('modal-delete-chapter');
    const deleteIdInput = document.getElementById('delete-modal-chapter-id');
    const deleteMsg = document.getElementById('delete-modal-msg');
    const btnConfirmDelete = document.getElementById('btn-confirm-delete-modal');
    const btnCancelDelete = document.getElementById('btn-cancel-delete-modal');
    const btnCloseDelete = document.getElementById('btn-close-delete-modal');

    document.querySelectorAll('.btn-delete-chapter').forEach(btn => {
      btn.addEventListener('click', () => {
        const cid = btn.getAttribute('data-chapter-id');
        const paper = store.getState().syllabus[paperId] || [];
        const ch = paper.find(c => c.id === cid);
        if (ch && modalDelete && deleteIdInput) {
          sound.playPop();
          deleteIdInput.value = cid;
          if (deleteMsg) deleteMsg.textContent = `Are you sure you want to remove "${ch.title}" from this syllabus?`;
          modalDelete.classList.remove('hidden');
        }
      });
    });

    if (btnCancelDelete && modalDelete) btnCancelDelete.addEventListener('click', () => modalDelete.classList.add('hidden'));
    if (btnCloseDelete && modalDelete) btnCloseDelete.addEventListener('click', () => modalDelete.classList.add('hidden'));
    if (btnConfirmDelete && deleteIdInput && modalDelete) {
      btnConfirmDelete.addEventListener('click', () => {
        const cid = deleteIdInput.value;
        if (cid) {
          store.deleteChapter(paperId, cid);
          sound.playPop();
          modalDelete.classList.add('hidden');
          renderSyllabus();
        }
      });
    }

    const btnAddInline = document.getElementById('btn-add-inline-chapter');
    const inlineTitleInput = document.getElementById('inline-new-chapter-title');
    const inlinePrioritySelect = document.getElementById('inline-new-chapter-priority');
    const btnOpenAddModal = document.getElementById('btn-open-add-chapter-modal');

    if (btnAddInline && inlineTitleInput) {
      btnAddInline.addEventListener('click', () => {
        const val = inlineTitleInput.value.trim();
        if (val) {
          const priority = inlinePrioritySelect ? inlinePrioritySelect.value : 'Medium';
          store.addChapter(paperId, val, priority);
          sound.playCheck();
          inlineTitleInput.value = '';
          renderSyllabus();
        }
      });
    }

    if (btnOpenAddModal && inlineTitleInput) {
      btnOpenAddModal.addEventListener('click', () => {
        inlineTitleInput.focus();
        inlineTitleInput.scrollIntoView({ behavior: 'smooth', block: 'center' });
      });
    }

    const btnMarkAllDone = document.getElementById('btn-mark-all-done');
    if (btnMarkAllDone) {
      btnMarkAllDone.addEventListener('click', () => {
        const paper = store.getState().syllabus[paperId] || [];
        if (paper.length === 0) return;
        paper.forEach(ch => { ch.status = 'Done'; });
        store.recordActivity();
        store.saveState();
        sound.playCelebration();
        triggerConfetti();
        renderSyllabus();
      });
    }
  }

  // ------------------------------------------------------------------------
  // 7. VIEW: MOCK TESTS
  // ------------------------------------------------------------------------
  function renderMockTests() {
    const container = document.getElementById('main-content');
    if (!container) return;

    const state = store.getState();
    const mockTests = state.mockTests || [];
    const overallStats = store.getOverallStats();
    const todayStr = new Date().toISOString().split('T')[0];

    container.innerHTML = `
      <div class="view-wrapper fade-in">
        <div class="mock-header">
          <div>
            <div class="greeting-badge">📝 Performance Tracker</div>
            <h1 class="page-title">CA Inter Mock Test Log 🌸</h1>
            <p class="page-subtitle">Record test scores, track percentage progression, and target weak areas.</p>
          </div>
        </div>

        <div class="mock-stats-grid">
          <div class="mock-stat-card kawaii-card">
            <span class="mock-stat-icon">🎯</span>
            <div class="mock-stat-info">
              <span class="mock-stat-num">${overallStats.mockTestsCount}</span>
              <span class="mock-stat-lbl">Mock Tests Attempted</span>
            </div>
          </div>

          <div class="mock-stat-card kawaii-card">
            <span class="mock-stat-icon">📊</span>
            <div class="mock-stat-info">
              <span class="mock-stat-num">${overallStats.avgMockScore}%</span>
              <span class="mock-stat-lbl">Overall Average Score</span>
            </div>
          </div>

          <div class="mock-stat-card kawaii-card">
            <span class="mock-stat-icon">🌟</span>
            <div class="mock-stat-info">
              <span class="mock-stat-num">${getHighestScore(mockTests)}%</span>
              <span class="mock-stat-lbl">Personal Best Score</span>
            </div>
          </div>
        </div>

        <div class="mock-paper-breakdown kawaii-card">
          <h3 class="breakdown-title">📚 Average Score by Paper</h3>
          <div class="paper-scores-grid">
            ${PAPERS_METADATA.map(p => {
              const pMock = store.getPaperMockStats(p.id);
              return `
                <div class="paper-score-pill" style="border-left-color: ${p.accent}; background: rgba(255, 255, 255, 0.75);">
                  <div class="pill-top">
                    <span class="pill-code">${p.code}</span>
                    <span class="pill-name">${p.shortName}</span>
                  </div>
                  <div class="pill-stats">
                    <span class="pill-avg">${pMock.count > 0 ? `${pMock.avg}%` : 'No tests'}</span>
                    <span class="pill-count">${pMock.count} test${pMock.count === 1 ? '' : 's'}</span>
                  </div>
                </div>
              `;
            }).join('')}
          </div>
        </div>

        <div class="mock-form-card kawaii-card" id="mock-form-section">
          <div class="form-card-header">
            <h2 class="card-title" id="form-header-title">🌸 Log New Mock Test</h2>
            <span class="card-subtitle">Fill in your test results below to save into your local history</span>
          </div>

          <form id="form-mock-test" class="mock-test-form">
            <input type="hidden" id="mock-edit-id" value="" />
            <div class="form-grid">
              <div class="form-field">
                <label class="form-label" for="mock-paper-select">Select Paper: *</label>
                <select id="mock-paper-select" class="form-select" required>
                  ${PAPERS_METADATA.map(p => `<option value="${p.id}">${p.code}: ${p.name}</option>`).join('')}
                </select>
              </div>

              <div class="form-field">
                <label class="form-label" for="mock-date-input">Test Date: *</label>
                <input type="date" id="mock-date-input" class="form-input" value="${todayStr}" required />
              </div>

              <div class="form-field">
                <label class="form-label" for="mock-score-input">Marks Scored: *</label>
                <input type="number" id="mock-score-input" class="form-input" min="0" max="200" step="0.5" placeholder="e.g. 68" required />
              </div>

              <div class="form-field">
                <label class="form-label" for="mock-total-input">Total Marks: *</label>
                <input type="number" id="mock-total-input" class="form-input" min="1" max="200" step="1" value="100" required />
              </div>
            </div>

            <div class="score-preview-box" id="score-preview-box">
              <span class="preview-label">Calculated Score:</span>
              <span class="preview-value" id="score-calc-preview">0.0%</span>
            </div>

            <div class="form-field">
              <label class="form-label" for="mock-notes-input">Notes & Key Learnings (Optional):</label>
              <textarea id="mock-notes-input" class="form-textarea" rows="2" placeholder="e.g. Lost marks in AS 16 calculation. Need to revise Cash Flow formats and GST value of supply provisions..."></textarea>
            </div>

            <div class="form-actions-row">
              <button type="submit" class="btn btn-primary" id="btn-submit-mock">
                <span id="btn-submit-text">💾 Save Mock Test 🌸</span>
              </button>
              <button type="button" class="btn btn-ghost hidden" id="btn-cancel-mock-edit">
                Cancel Edit
              </button>
            </div>
          </form>
        </div>

        <div class="mock-history-section">
          <div class="section-header">
            <div>
              <h2 class="section-title">Logged Mock Tests (${mockTests.length})</h2>
              <p class="section-desc">Sorted newest test first</p>
            </div>
          </div>

          ${mockTests.length === 0 ? `
            <div class="empty-state kawaii-card">
              <span class="empty-emoji">📝</span>
              <h3>No mock tests logged yet!</h3>
              <p>Attempt your first mock paper and log your score above to visualize your progress.</p>
            </div>
          ` : `
            <div class="mock-cards-list">
              ${mockTests.map(test => {
                const paper = PAPERS_METADATA.find(p => p.id === test.paperId) || PAPERS_METADATA[0];
                const scoreBadgeClass = test.percentage >= 60 ? 'score-distinction' : test.percentage >= 40 ? 'score-pass' : 'score-fail';
                const scoreStatusText = test.percentage >= 60 ? 'Exemption / High Score 🌟' : test.percentage >= 40 ? 'Cleared / Passing 🌸' : 'Needs Practice 🌱';

                return `
                  <div class="mock-test-item-card kawaii-card" data-id="${test.id}">
                    <div class="mock-item-main">
                      <div class="mock-item-paper-tag" style="background: ${paper.color};">
                        <span class="tag-icon">${paper.icon}</span>
                        <div>
                          <span class="tag-code">${paper.code}</span>
                          <h3 class="tag-title">${paper.name}</h3>
                        </div>
                      </div>

                      <div class="mock-item-score-block">
                        <div class="score-fraction">
                          <span class="score-obtained">${test.marksScored}</span>
                          <span class="score-slash">/</span>
                          <span class="score-max">${test.totalMarks}</span>
                        </div>
                        <div class="score-percent-badge ${scoreBadgeClass}">
                          ${test.percentage}%
                        </div>
                      </div>

                      <div class="mock-item-meta">
                        <div class="mock-date-pill">📅 ${formatMockDate(test.date)}</div>
                        <div class="mock-status-pill">${scoreStatusText}</div>
                      </div>

                      <div class="mock-item-actions">
                        <button class="btn-icon btn-edit-mock" data-id="${test.id}" title="Edit Test">✏️</button>
                        <button class="btn-icon btn-delete-mock" data-id="${test.id}" title="Delete Test">🗑️</button>
                      </div>
                    </div>

                    ${test.notes ? `
                      <div class="mock-item-notes">
                        <span class="notes-icon">📝</span>
                        <p class="notes-text">${escapeHtml(test.notes)}</p>
                      </div>
                    ` : ''}
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    setupMockTestEvents();
  }

  function getHighestScore(tests) {
    if (!tests || tests.length === 0) return 0;
    return Math.max(...tests.map(t => t.percentage || 0)).toFixed(1);
  }

  function formatMockDate(dateStr) {
    if (!dateStr) return '';
    try {
      const d = new Date(dateStr + 'T00:00:00');
      return d.toLocaleDateString(undefined, { year: 'numeric', month: 'short', day: 'numeric' });
    } catch (e) { return dateStr; }
  }

  function setupMockTestEvents() {
    const form = document.getElementById('form-mock-test');
    const scoreInput = document.getElementById('mock-score-input');
    const totalInput = document.getElementById('mock-total-input');
    const calcPreview = document.getElementById('score-calc-preview');
    const editIdInput = document.getElementById('mock-edit-id');
    const paperSelect = document.getElementById('mock-paper-select');
    const dateInput = document.getElementById('mock-date-input');
    const notesInput = document.getElementById('mock-notes-input');
    const btnCancelEdit = document.getElementById('btn-cancel-mock-edit');
    const formHeaderTitle = document.getElementById('form-header-title');
    const btnSubmitText = document.getElementById('btn-submit-text');

    function updateCalcPreview() {
      const scored = parseFloat(scoreInput.value) || 0;
      const total = parseFloat(totalInput.value) || 100;
      if (total > 0 && calcPreview) {
        const pct = ((scored / total) * 100).toFixed(1);
        calcPreview.textContent = `${pct}% (${scored} / ${total})`;
      }
    }

    if (scoreInput) scoreInput.addEventListener('input', updateCalcPreview);
    if (totalInput) totalInput.addEventListener('input', updateCalcPreview);

    if (form) {
      form.addEventListener('submit', (e) => {
        e.preventDefault();
        const scored = parseFloat(scoreInput.value);
        const total = parseFloat(totalInput.value);
        const paperId = paperSelect.value;
        const date = dateInput.value;
        const notes = notesInput.value;
        const editId = editIdInput.value;

        if (isNaN(scored) || isNaN(total) || total <= 0) return;

        if (editId) {
          store.updateMockTest(editId, { paperId, date, marksScored: scored, totalMarks: total, notes });
          sound.playCheck();
        } else {
          store.addMockTest({ paperId, date, marksScored: scored, totalMarks: total, notes });
          const pct = (scored / total) * 100;
          if (pct >= 60) {
            triggerConfetti();
            sound.playCelebration();
          } else {
            sound.playCheck();
          }
        }
        renderMockTests();
      });
    }

    if (btnCancelEdit) {
      btnCancelEdit.addEventListener('click', () => {
        renderMockTests();
      });
    }

    document.querySelectorAll('.btn-edit-mock').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        const test = store.getState().mockTests.find(t => t.id === id);
        if (!test) return;

        sound.playPop();
        if (editIdInput) editIdInput.value = test.id;
        if (paperSelect) paperSelect.value = test.paperId;
        if (dateInput) dateInput.value = test.date;
        if (scoreInput) scoreInput.value = test.marksScored;
        if (totalInput) totalInput.value = test.totalMarks;
        if (notesInput) notesInput.value = test.notes || '';
        if (formHeaderTitle) formHeaderTitle.textContent = '✏️ Edit Mock Test Entry';
        if (btnSubmitText) btnSubmitText.textContent = '💾 Update Test 🌸';
        if (btnCancelEdit) btnCancelEdit.classList.remove('hidden');

        updateCalcPreview();
        const formSection = document.getElementById('mock-form-section');
        if (formSection) formSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
      });
    });

    document.querySelectorAll('.btn-delete-mock').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        if (confirm('Are you sure you want to delete this mock test entry? 🌸')) {
          sound.playPop();
          store.deleteMockTest(id);
          renderMockTests();
        }
      });
    });
  }

  // ------------------------------------------------------------------------
  // 8. VIEW: POMODORO TIMER
  // ------------------------------------------------------------------------
  let timerInterval = null;
  let timerState = {
    mode: 'focus',
    isRunning: false,
    timeLeft: 25 * 60,
    totalDuration: 25 * 60,
    selectedPaper: 'paper1',
    selectedChapter: ''
  };

  function renderTimer() {
    const container = document.getElementById('main-content');
    if (!container) return;

    const state = store.getState();
    const focusMinutes = state.timerSettings.focusMinutes || 25;
    const breakMinutes = state.timerSettings.breakMinutes || 5;

    if (!timerState.isRunning && timerState.timeLeft === 25 * 60 && timerState.mode === 'focus') {
      timerState.timeLeft = focusMinutes * 60;
      timerState.totalDuration = focusMinutes * 60;
    }

    const paperChapters = state.syllabus[timerState.selectedPaper] || [];
    const sessions = state.timerSessions || [];
    const todayStr = new Date().toISOString().split('T')[0];
    const todayMinutes = sessions
      .filter(s => s.date === todayStr && s.type === 'focus')
      .reduce((sum, s) => sum + (s.durationMinutes || 0), 0);

    container.innerHTML = `
      <div class="view-wrapper fade-in">
        <div class="timer-header">
          <div>
            <div class="greeting-badge">⏱️ Focus Sanctuary</div>
            <h1 class="page-title">CA Inter Study Timer 🌸</h1>
            <p class="page-subtitle">Stay immersed in deep study with cute Pomodoro intervals and tagged chapter logging.</p>
          </div>
        </div>

        <div class="timer-main-card kawaii-card">
          <div class="timer-mode-tabs">
            <button class="timer-mode-btn ${timerState.mode === 'focus' ? 'active focus-active' : ''}" id="btn-mode-focus">
              <span>🌸</span> Focus (${focusMinutes}m)
            </button>
            <button class="timer-mode-btn ${timerState.mode === 'break' ? 'active break-active' : ''}" id="btn-mode-break">
              <span>☕</span> Short Break (${breakMinutes}m)
            </button>
          </div>

          <div class="timer-tagging-section">
            <label class="tagging-title">📚 Tag What You're Studying:</label>
            <div class="tagging-inputs-grid">
              <div class="tag-input-wrap">
                <label class="tag-sublabel">Paper:</label>
                <select id="timer-paper-select" class="form-select">
                  <option value="general">🌸 General / Mixed Revision</option>
                  ${PAPERS_METADATA.map(p => `
                    <option value="${p.id}" ${timerState.selectedPaper === p.id ? 'selected' : ''}>${p.code}: ${p.name}</option>
                  `).join('')}
                </select>
              </div>

              <div class="tag-input-wrap">
                <label class="tag-sublabel">Chapter / Topic:</label>
                <select id="timer-chapter-select" class="form-select" ${timerState.selectedPaper === 'general' ? 'disabled' : ''}>
                  <option value="">(Select specific chapter)</option>
                  ${paperChapters.map(ch => `
                    <option value="${escapeHtml(ch.title)}" ${timerState.selectedChapter === ch.title ? 'selected' : ''}>${escapeHtml(ch.title)}</option>
                  `).join('')}
                </select>
              </div>
            </div>
          </div>

          <div class="timer-display-wrap">
            <div class="timer-circle-container">
              <svg class="timer-svg" viewBox="0 0 240 240">
                <circle class="timer-circle-bg" cx="120" cy="120" r="105"></circle>
                <circle class="timer-circle-progress" id="timer-svg-progress" cx="120" cy="120" r="105" style="stroke-dashoffset: ${getStrokeOffset()};"></circle>
              </svg>
              <div class="timer-center-content">
                <span class="timer-mode-label" id="timer-status-text">${timerState.mode === 'focus' ? 'FOCUS TIME 🌸' : 'RELAX BREAK ☕'}</span>
                <div class="timer-digits" id="timer-digits-display">${formatTime(timerState.timeLeft)}</div>
                <span class="timer-tag-display" id="timer-active-tag">${getActiveTagText()}</span>
              </div>
            </div>
          </div>

          <div class="timer-controls-row">
            <button class="btn btn-primary btn-lg ${timerState.isRunning ? 'btn-pause' : 'btn-start'}" id="btn-timer-toggle">
              <span>${timerState.isRunning ? '⏸️ Pause' : '▶️ Start Study Session 🌸'}</span>
            </button>
            <button class="btn btn-secondary" id="btn-timer-reset" title="Reset current interval">
              <span>↺</span> Reset
            </button>
          </div>

          <div class="timer-quick-durations">
            <span class="quick-dur-label">⚙️ Quick Timers:</span>
            <button class="btn-dur-chip" data-min="15">15m</button>
            <button class="btn-dur-chip" data-min="25">25m</button>
            <button class="btn-dur-chip" data-min="45">45m</button>
            <button class="btn-dur-chip" data-min="60">60m</button>
          </div>
        </div>

        <div class="timer-history-container">
          <div class="section-header">
            <div>
              <h2 class="section-title">Today's Focus Log (${(todayMinutes / 60).toFixed(1)} hrs total) 📚</h2>
              <p class="section-desc">Completed Pomodoro focus sessions are automatically recorded</p>
            </div>
          </div>

          ${sessions.length === 0 ? `
            <div class="empty-state kawaii-card">
              <span class="empty-emoji">⏱️</span>
              <h3>No study sessions logged yet!</h3>
              <p>Start your first focus timer to record your productive hours.</p>
            </div>
          ` : `
            <div class="sessions-list">
              ${sessions.slice(0, 15).map(session => {
                const isToday = session.date === todayStr;
                const paper = PAPERS_METADATA.find(p => p.id === session.paperId);
                const paperBadge = paper ? `<span class="session-paper-badge" style="background: ${paper.color};">${paper.code}</span>` : `<span class="session-paper-badge">General</span>`;

                return `
                  <div class="session-log-card kawaii-card">
                    <div class="session-log-left">
                      <span class="session-icon">${session.type === 'focus' ? '🌸' : '☕'}</span>
                      <div>
                        <div class="session-title-row">
                          ${paperBadge}
                          <span class="session-topic">${escapeHtml(session.chapterTitle || 'Study Session')}</span>
                        </div>
                        <span class="session-time">${formatSessionTime(session.timestamp)} • ${isToday ? 'Today' : session.date}</span>
                      </div>
                    </div>
                    <div class="session-log-right">
                      <span class="session-duration-badge">+${session.durationMinutes} mins</span>
                      <button class="btn-delete-session" data-id="${session.id}" title="Delete session log">×</button>
                    </div>
                  </div>
                `;
              }).join('')}
            </div>
          `}
        </div>
      </div>
    `;

    setupTimerEvents();
  }

  function formatTime(totalSeconds) {
    const mins = Math.floor(totalSeconds / 60);
    const secs = totalSeconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  }

  function formatSessionTime(isoStr) {
    if (!isoStr) return '';
    try {
      const d = new Date(isoStr);
      return d.toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' });
    } catch (e) { return ''; }
  }

  function getActiveTagText() {
    if (timerState.selectedPaper === 'general') return 'General Study';
    const paper = PAPERS_METADATA.find(p => p.id === timerState.selectedPaper);
    if (!paper) return 'Study Focus';
    if (timerState.selectedChapter) return `${paper.code} - ${timerState.selectedChapter.substring(0, 24)}...`;
    return paper.code;
  }

  function getStrokeOffset() {
    const radius = 105;
    const circumference = 2 * Math.PI * radius;
    if (!timerState.totalDuration || timerState.totalDuration <= 0) return 0;
    const progress = (timerState.totalDuration - timerState.timeLeft) / timerState.totalDuration;
    return circumference * (1 - progress);
  }

  function updateTimerVisuals() {
    const digitsEl = document.getElementById('timer-digits-display');
    const progressCircle = document.getElementById('timer-svg-progress');
    const toggleBtn = document.getElementById('btn-timer-toggle');

    if (digitsEl) digitsEl.textContent = formatTime(timerState.timeLeft);
    if (progressCircle) progressCircle.style.strokeDashoffset = `${getStrokeOffset()}`;
    if (toggleBtn) toggleBtn.innerHTML = `<span>${timerState.isRunning ? '⏸️ Pause' : '▶️ Start Study Session 🌸'}</span>`;
  }

  function tickTimer() {
    if (timerState.timeLeft > 0) {
      timerState.timeLeft--;
      updateTimerVisuals();
    } else {
      clearInterval(timerInterval);
      timerInterval = null;
      timerState.isRunning = false;

      if (timerState.mode === 'focus') {
        sound.playChime();
        triggerConfetti();

        const durationMins = Math.round(timerState.totalDuration / 60);
        store.logTimerSession({
          durationMinutes: durationMins,
          paperId: timerState.selectedPaper,
          chapterTitle: timerState.selectedChapter || 'Focus Session',
          type: 'focus'
        });

        alert('🌸 Fabulous job! Your focus session is complete. Time for a well-deserved break! 🍵✨');

        const state = store.getState();
        const breakMinutes = state.timerSettings.breakMinutes || 5;
        timerState.mode = 'break';
        timerState.timeLeft = breakMinutes * 60;
        timerState.totalDuration = breakMinutes * 60;
      } else {
        sound.playPop();
        alert('☕ Break is over! Ready to jump back into another focused study session? 🌸');
        const state = store.getState();
        const focusMinutes = state.timerSettings.focusMinutes || 25;
        timerState.mode = 'focus';
        timerState.timeLeft = focusMinutes * 60;
        timerState.totalDuration = focusMinutes * 60;
      }
      renderTimer();
    }
  }

  function setupTimerEvents() {
    const toggleBtn = document.getElementById('btn-timer-toggle');
    const resetBtn = document.getElementById('btn-timer-reset');
    const focusTab = document.getElementById('btn-mode-focus');
    const breakTab = document.getElementById('btn-mode-break');
    const paperSelect = document.getElementById('timer-paper-select');
    const chapterSelect = document.getElementById('timer-chapter-select');

    if (toggleBtn) {
      toggleBtn.addEventListener('click', () => {
        sound.playPop();
        if (timerState.isRunning) {
          clearInterval(timerInterval);
          timerInterval = null;
          timerState.isRunning = false;
        } else {
          timerState.isRunning = true;
          if (!timerInterval) timerInterval = setInterval(tickTimer, 1000);
        }
        updateTimerVisuals();
      });
    }

    if (resetBtn) {
      resetBtn.addEventListener('click', () => {
        sound.playPop();
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        timerState.isRunning = false;
        const state = store.getState();
        const mins = timerState.mode === 'focus' ? (state.timerSettings.focusMinutes || 25) : (state.timerSettings.breakMinutes || 5);
        timerState.timeLeft = mins * 60;
        timerState.totalDuration = mins * 60;
        updateTimerVisuals();
      });
    }

    if (focusTab) {
      focusTab.addEventListener('click', () => {
        sound.playPop();
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        timerState.isRunning = false;
        timerState.mode = 'focus';
        const mins = store.getState().timerSettings.focusMinutes || 25;
        timerState.timeLeft = mins * 60;
        timerState.totalDuration = mins * 60;
        renderTimer();
      });
    }

    if (breakTab) {
      breakTab.addEventListener('click', () => {
        sound.playPop();
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        timerState.isRunning = false;
        timerState.mode = 'break';
        const mins = store.getState().timerSettings.breakMinutes || 5;
        timerState.timeLeft = mins * 60;
        timerState.totalDuration = mins * 60;
        renderTimer();
      });
    }

    if (paperSelect) {
      paperSelect.addEventListener('change', (e) => {
        timerState.selectedPaper = e.target.value;
        timerState.selectedChapter = '';
        renderTimer();
      });
    }

    if (chapterSelect) {
      chapterSelect.addEventListener('change', (e) => {
        timerState.selectedChapter = e.target.value;
        const activeTag = document.getElementById('timer-active-tag');
        if (activeTag) activeTag.textContent = getActiveTagText();
      });
    }

    document.querySelectorAll('.btn-dur-chip').forEach(btn => {
      btn.addEventListener('click', () => {
        sound.playPop();
        const mins = parseInt(btn.getAttribute('data-min'), 10) || 25;
        if (timerInterval) {
          clearInterval(timerInterval);
          timerInterval = null;
        }
        timerState.isRunning = false;
        timerState.timeLeft = mins * 60;
        timerState.totalDuration = mins * 60;
        store.updateTimerSettings({ focusMinutes: mins });
        renderTimer();
      });
    });

    document.querySelectorAll('.btn-delete-session').forEach(btn => {
      btn.addEventListener('click', () => {
        const id = btn.getAttribute('data-id');
        sound.playPop();
        store.deleteTimerSession(id);
        renderTimer();
      });
    });
  }

  // ------------------------------------------------------------------------
  // 9. VIEW: SETTINGS & BACKUP
  // ------------------------------------------------------------------------
  function renderSettings() {
    const container = document.getElementById('main-content');
    if (!container) return;

    const state = store.getState();
    const focusMin = state.timerSettings.focusMinutes || 25;
    const breakMin = state.timerSettings.breakMinutes || 5;

    container.innerHTML = `
      <div class="view-wrapper fade-in">
        <div class="settings-header">
          <div>
            <div class="greeting-badge">⚙️ Preferences & Data Backup</div>
            <h1 class="page-title">Settings & Storage 🌸</h1>
            <p class="page-subtitle">Configure parameters, backup your progress, or restore previous data.</p>
          </div>
        </div>

        <div class="settings-grid">
          <div class="settings-card kawaii-card">
            <div class="settings-card-header">
              <span class="settings-card-icon">📅</span>
              <div>
                <h2 class="card-title">Target Exam Date</h2>
                <span class="card-subtitle">Used for the live countdown on your dashboard</span>
              </div>
            </div>
            <div class="settings-card-body">
              <div class="form-field">
                <label class="form-label" for="settings-exam-date">Target Date (First Exam Paper):</label>
                <div class="inline-input-group">
                  <input type="date" id="settings-exam-date" class="form-input" value="${state.examDate || ''}" />
                  <button class="btn btn-primary btn-sm" id="btn-save-settings-date">Save Date 🌸</button>
                </div>
              </div>
            </div>
          </div>

          <div class="settings-card kawaii-card">
            <div class="settings-card-header">
              <span class="settings-card-icon">⏱️</span>
              <div>
                <h2 class="card-title">Study Timer Preferences</h2>
                <span class="card-subtitle">Set custom focus & short break intervals</span>
              </div>
            </div>
            <div class="settings-card-body">
              <div class="form-grid">
                <div class="form-field">
                  <label class="form-label" for="settings-focus-min">Focus Duration (Minutes):</label>
                  <input type="number" id="settings-focus-min" class="form-input" min="5" max="180" value="${focusMin}" />
                </div>
                <div class="form-field">
                  <label class="form-label" for="settings-break-min">Break Duration (Minutes):</label>
                  <input type="number" id="settings-break-min" class="form-input" min="1" max="60" value="${breakMin}" />
                </div>
              </div>
              <button class="btn btn-secondary btn-sm" id="btn-save-timer-settings">Save Timer Settings ✨</button>
            </div>
          </div>

          <div class="settings-card kawaii-card">
            <div class="settings-card-header">
              <span class="settings-card-icon">🌸</span>
              <div>
                <h2 class="card-title">Sounds & Aesthetics</h2>
                <span class="card-subtitle">Toggle cute celebratory audio bells and sparkles</span>
              </div>
            </div>
            <div class="settings-card-body">
              <div class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">Web Audio Sound Effects</span>
                  <span class="toggle-desc">Plays gentle marimba chimes and button pops</span>
                </div>
                <label class="switch">
                  <input type="checkbox" id="toggle-sound" checked />
                  <span class="slider round"></span>
                </label>
              </div>
              <div class="toggle-row">
                <div class="toggle-info">
                  <span class="toggle-title">Pastel Sparkle Confetti</span>
                  <span class="toggle-desc">Celebrates when chapters or timer sessions finish</span>
                </div>
                <label class="switch">
                  <input type="checkbox" id="toggle-confetti" checked />
                  <span class="slider round"></span>
                </label>
              </div>
            </div>
          </div>

          <div class="settings-card kawaii-card">
            <div class="settings-card-header">
              <span class="settings-card-icon">💾</span>
              <div>
                <h2 class="card-title">Data Backup (Export / Import)</h2>
                <span class="card-subtitle">Keep your data safe or transfer between computer and phone</span>
              </div>
            </div>
            <div class="settings-card-body">
              <p class="backup-note">
                All your syllabus notes, revision counts, mock tests, and study logs are stored purely in your browser's local storage. Export a backup anytime!
              </p>
              <div class="backup-buttons-row">
                <button class="btn btn-primary" id="btn-export-data">
                  <span>⬇️</span> Export Data (Download JSON) 🌸
                </button>

                <label class="btn btn-secondary btn-file-upload" for="input-import-json">
                  <span>⬆️</span> Import Data (Upload JSON)
                  <input type="file" id="input-import-json" accept=".json" class="hidden-file-input" />
                </label>
              </div>
              <div id="import-status-msg" class="import-status-msg hidden"></div>
            </div>
          </div>

          <div class="settings-card kawaii-card settings-card-danger">
            <div class="settings-card-header">
              <span class="settings-card-icon">⚠️</span>
              <div>
                <h2 class="card-title text-danger">Reset All Data</h2>
                <span class="card-subtitle">Erase all progress and restore original syllabus seed</span>
              </div>
            </div>
            <div class="settings-card-body">
              <p class="danger-desc">
                Need a completely fresh start? This will reset all 6 papers to "Not Started", clear all revisions, delete all mock tests, and reset the countdown.
              </p>
              <button class="btn btn-danger" id="btn-open-reset-modal">
                <span>🗑️</span> Reset All Data
              </button>
            </div>
          </div>
        </div>
      </div>

      <div id="modal-confirm-reset" class="modal-overlay hidden">
        <div class="modal-card kawaii-card modal-card-danger">
          <div class="modal-header">
            <h3 class="modal-title">⚠️ Confirm Full Reset</h3>
            <button class="modal-close" id="btn-close-reset-modal">×</button>
          </div>
          <div class="modal-body">
            <div class="reset-warning-banner">
              <span class="warn-icon">🛑</span>
              <p><strong>Are you sure? This will erase your exam date, all chapter progress, revision counts, notes, priority tags, mock test records, and study timer logs.</strong></p>
            </div>
            <p class="reset-subtext">All 6 CA Intermediate papers will be restored to their original seed structure with 0% completion.</p>
          </div>
          <div class="modal-footer">
            <button class="btn btn-ghost" id="btn-cancel-reset-modal">Cancel, Keep My Data 🌸</button>
            <button class="btn btn-danger" id="btn-confirm-reset-all">Yes, Erase & Reset Everything 🗑️</button>
          </div>
        </div>
      </div>
    `;

    setupSettingsEvents();
  }

  function setupSettingsEvents() {
    const btnSaveDate = document.getElementById('btn-save-settings-date');
    const dateInput = document.getElementById('settings-exam-date');
    if (btnSaveDate && dateInput) {
      btnSaveDate.addEventListener('click', () => {
        if (dateInput.value) {
          store.setExamDate(dateInput.value);
          sound.playCheck();
          alert('Exam target date saved! 🌸');
        }
      });
    }

    const btnSaveTimer = document.getElementById('btn-save-timer-settings');
    const focusInput = document.getElementById('settings-focus-min');
    const breakInput = document.getElementById('settings-break-min');
    if (btnSaveTimer && focusInput && breakInput) {
      btnSaveTimer.addEventListener('click', () => {
        const focusMinutes = parseInt(focusInput.value, 10) || 25;
        const breakMinutes = parseInt(breakInput.value, 10) || 5;
        store.updateTimerSettings({ focusMinutes, breakMinutes });
        sound.playCheck();
        alert('Timer durations updated! ✨');
      });
    }

    const btnExport = document.getElementById('btn-export-data');
    if (btnExport) {
      btnExport.addEventListener('click', () => {
        sound.playCheck();
        store.exportDataJSON();
      });
    }

    const inputImport = document.getElementById('input-import-json');
    const importMsg = document.getElementById('import-status-msg');
    if (inputImport) {
      inputImport.addEventListener('change', (e) => {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (evt) => {
          const content = evt.target.result;
          const res = store.importDataJSON(content);
          if (importMsg) {
            importMsg.classList.remove('hidden');
            if (res.success) {
              importMsg.className = 'import-status-msg status-success';
              importMsg.textContent = res.message;
              sound.playCelebration();
              triggerConfetti();
              setTimeout(() => renderSettings(), 1200);
            } else {
              importMsg.className = 'import-status-msg status-error';
              importMsg.textContent = `❌ ${res.message}`;
            }
          }
        };
        reader.readAsText(file);
      });
    }

    const modalReset = document.getElementById('modal-confirm-reset');
    const btnOpenReset = document.getElementById('btn-open-reset-modal');
    const btnCloseReset = document.getElementById('btn-close-reset-modal');
    const btnCancelReset = document.getElementById('btn-cancel-reset-modal');
    const btnConfirmReset = document.getElementById('btn-confirm-reset-all');

    if (btnOpenReset && modalReset) {
      btnOpenReset.addEventListener('click', () => {
        sound.playPop();
        modalReset.classList.remove('hidden');
      });
    }

    if (btnCloseReset && modalReset) btnCloseReset.addEventListener('click', () => modalReset.classList.add('hidden'));
    if (btnCancelReset && modalReset) btnCancelReset.addEventListener('click', () => modalReset.classList.add('hidden'));
    if (btnConfirmReset && modalReset) {
      btnConfirmReset.addEventListener('click', () => {
        store.resetAllData();
        sound.playPop();
        modalReset.classList.add('hidden');
        alert('All tracker data has been reset to default state! 🌸');
        window.location.hash = '#dashboard';
      });
    }
  }

  // ------------------------------------------------------------------------
  // 10. APP BOOTSTRAP
  // ------------------------------------------------------------------------
  document.addEventListener('DOMContentLoaded', () => {
    const routes = {
      'dashboard': renderDashboard,
      'syllabus': renderSyllabus,
      'mock-tests': renderMockTests,
      'timer': renderTimer,
      'settings': renderSettings
    };

    const router = new Router(routes, 'dashboard');
    window.appRouter = router;

    document.querySelectorAll('.nav-link').forEach(link => {
      link.addEventListener('click', (e) => {
        e.preventDefault();
        const route = link.getAttribute('data-route');
        if (route) {
          sound.playPop();
          router.navigate(route);
        }
      });
    });

    document.addEventListener('click', () => sound.initContext(), { once: true });
    router.init();
  });

})();
