// In-memory & Prisma fallback database for ALDER

export interface GoalItem {
  id: string;
  title: string;
  category: string;
  icon: string;
  targetAmount: number;
  savedAmount: number;
  targetDate: string;
  color: string;
}

export interface TransactionItem {
  id: string;
  title: string;
  amount: number;
  type: "INCOME" | "EXPENSE";
  category: string;
  date: string;
  notes?: string;
}

export interface InvestmentItem {
  id: string;
  assetName: string;
  category: string;
  investedAmount: number;
  currentValue: number;
  returnsPct: number;
  riskLevel: "Low" | "Moderate" | "High";
  monthlySIP: number;
}

export interface CommunityJourneyItem {
  id: string;
  authorName: string;
  avatar: string;
  age: number;
  profession: string;
  location: string;
  salaryRange: string;
  netWorth: string;
  storyTitle: string;
  story: string;
  savingsRate: number;
  matchPct: number;
  likesCount: number;
  tags: string[];
  createdAt: string;
}

export interface BudgetItem {
  id: string;
  name: string;
  allocated: number;
  spent: number;
  icon: string;
}

// Global state container
const initialData = {
  user: {
    name: "Aditya Sharma",
    email: "aditya@alder.com",
    avatar: "AS",
    monthlySalary: 85000,
    totalBalance: 482500,
    monthlySaving: 33000,
    financialScore: 84,
  },
  goals: [
    {
      id: "g1",
      title: "Buy a Home",
      category: "Home",
      icon: "Home",
      targetAmount: 2000000,
      savedAmount: 840000,
      targetDate: "Dec 2028",
      color: "blue",
    },
    {
      id: "g2",
      title: "Higher Education",
      category: "Education",
      icon: "GraduationCap",
      targetAmount: 800000,
      savedAmount: 320000,
      targetDate: "Jun 2027",
      color: "teal",
    },
    {
      id: "g3",
      title: "Emergency Fund",
      category: "Emergency",
      icon: "ShieldCheck",
      targetAmount: 500000,
      savedAmount: 450000,
      targetDate: "Dec 2026",
      color: "purple",
    },
    {
      id: "g4",
      title: "Retirement Corpus",
      category: "Retirement",
      icon: "PiggyBank",
      targetAmount: 15000000,
      savedAmount: 1200000,
      targetDate: "Jan 2045",
      color: "orange",
    },
  ] as GoalItem[],

  transactions: [
    {
      id: "t1",
      title: "Software Engineering Salary",
      amount: 85000,
      type: "INCOME",
      category: "Salary",
      date: "2026-10-01",
      notes: "Monthly paycheck",
    },
    {
      id: "t2",
      title: "Freelance UI Design",
      amount: 15000,
      type: "INCOME",
      category: "Side Project",
      date: "2026-10-03",
      notes: "Client project payout",
    },
    {
      id: "t3",
      title: "Apartment Rent",
      amount: 22000,
      type: "EXPENSE",
      category: "Housing",
      date: "2026-10-02",
      notes: "Monthly rent",
    },
    {
      id: "t4",
      title: "SIP - Index Fund",
      amount: 20000,
      type: "EXPENSE",
      category: "Investment",
      date: "2026-10-04",
      notes: "Automated SIP investment",
    },
    {
      id: "t5",
      title: "Organic Groceries",
      amount: 6500,
      type: "EXPENSE",
      category: "Food",
      date: "2026-10-03",
      notes: "Supermarket shopping",
    },
    {
      id: "t6",
      title: "Wi-Fi & Electricity",
      amount: 3500,
      type: "EXPENSE",
      category: "Utilities",
      date: "2026-10-02",
      notes: "Utility payments",
    },
  ] as TransactionItem[],

  investments: [
    {
      id: "i1",
      assetName: "HDFC Nifty 50 Index Fund",
      category: "Mutual Funds",
      investedAmount: 180000,
      currentValue: 215000,
      returnsPct: 19.4,
      riskLevel: "Moderate",
      monthlySIP: 10000,
    },
    {
      id: "i2",
      assetName: "Parag Parikh Flexi Cap Fund",
      category: "Mutual Funds",
      investedAmount: 120000,
      currentValue: 148000,
      returnsPct: 23.3,
      riskLevel: "Moderate",
      monthlySIP: 10000,
    },
    {
      id: "i3",
      assetName: "Sovereign Gold Bonds (SGB)",
      category: "Gold",
      investedAmount: 60000,
      currentValue: 72000,
      returnsPct: 20.0,
      riskLevel: "Low",
      monthlySIP: 0,
    },
    {
      id: "i4",
      assetName: "Tata Consultancy Services (TCS)",
      category: "Equity Stocks",
      investedAmount: 45000,
      currentValue: 47500,
      returnsPct: 5.5,
      riskLevel: "High",
      monthlySIP: 0,
    },
  ] as InvestmentItem[],

  budgets: [
    { id: "b1", name: "Housing", allocated: 25000, spent: 22000, icon: "Home" },
    { id: "b2", name: "Investments", allocated: 25000, spent: 20000, icon: "TrendingUp" },
    { id: "b3", name: "Food & Dining", allocated: 12000, spent: 6500, icon: "Utensils" },
    { id: "b4", name: "Utilities & Bills", allocated: 5000, spent: 3500, icon: "Zap" },
    { id: "b5", name: "Shopping & Misc", allocated: 8000, spent: 4200, icon: "ShoppingBag" },
  ] as BudgetItem[],

  journeys: [
    {
      id: "j1",
      authorName: "Priya N.",
      avatar: "PN",
      age: 26,
      profession: "Software Engineer",
      location: "Bengaluru",
      salaryRange: "₹12L - ₹15L",
      netWorth: "₹14.5L",
      storyTitle: "Saving 45% of income towards first home DP in 3 years",
      story:
        "I automated my savings on salary day. 20% goes into Nifty index funds, 15% into flexicap, and 10% into high-yield RD for my house downpayment. Cooking at home and cutting random subscriptions made the biggest difference.",
      savingsRate: 45,
      matchPct: 94,
      likesCount: 38,
      tags: ["Home Buying", "Automated SIP", "Frugal Living"],
      createdAt: "2 days ago",
    },
    {
      id: "j2",
      authorName: "Rahul K.",
      avatar: "RK",
      age: 28,
      profession: "Product Designer",
      location: "Mumbai",
      salaryRange: "₹10L - ₹12L",
      netWorth: "₹9.2L",
      storyTitle: "How I paid off ₹4.5L education loan while building emergency fund",
      story:
        "Instead of aggressively dumping 100% savings into the loan, I split 70% to loan prepayments and 30% into an emergency liquid fund. This prevented me from taking credit card debt when unexpected medical expenses hit.",
      savingsRate: 35,
      matchPct: 89,
      likesCount: 29,
      tags: ["Debt Free", "Emergency Fund", "Loan Payoff"],
      createdAt: "4 days ago",
    },
    {
      id: "j3",
      authorName: "Ananya M.",
      avatar: "AM",
      age: 29,
      profession: "Data Analyst",
      location: "Pune",
      salaryRange: "₹8L - ₹10L",
      netWorth: "₹11.0L",
      storyTitle: "From zero savings to ₹10L net worth using 50-30-20 rule",
      story:
        "I used to live paycheck to paycheck. Shifting my perspective from 'saving what is left after spending' to 'spending what is left after saving' completely transformed my net worth graph in 24 months.",
      savingsRate: 40,
      matchPct: 92,
      likesCount: 45,
      tags: ["Budgeting", "50-30-20 Rule", "Index Funds"],
      createdAt: "1 week ago",
    },
    {
      id: "j4",
      authorName: "Vikram S.",
      avatar: "VS",
      age: 32,
      profession: "Senior Architect",
      location: "Hyderabad",
      salaryRange: "₹20L - ₹25L",
      netWorth: "₹42.0L",
      storyTitle: "My asset allocation strategy across Stocks, Gold, and Real Estate",
      story:
        "Diversification saved my portfolio during market pullbacks. Keeping 60% in equities, 15% in SGB gold, 15% debt funds, and 10% cash buffer gives me peace of mind while generating 14% CAGR.",
      savingsRate: 55,
      matchPct: 83,
      likesCount: 62,
      tags: ["Asset Allocation", "FIRE Journey", "High Income"],
      createdAt: "2 weeks ago",
    },
  ] as CommunityJourneyItem[],
};

// Global in-memory cache
const dbStore = { ...initialData };

export const db = {
  getUser: () => dbStore.user,
  getGoals: () => dbStore.goals,
  addGoal: (goal: Omit<GoalItem, "id">) => {
    const newGoal: GoalItem = {
      ...goal,
      id: "g-" + Date.now(),
    };
    dbStore.goals.unshift(newGoal);
    return newGoal;
  },
  updateGoalProgress: (id: string, savedAmount: number) => {
    const goal = dbStore.goals.find((g) => g.id === id);
    if (goal) {
      goal.savedAmount = savedAmount;
    }
    return goal;
  },

  getTransactions: () => dbStore.transactions,
  addTransaction: (tx: Omit<TransactionItem, "id">) => {
    const newTx: TransactionItem = {
      ...tx,
      id: "t-" + Date.now(),
    };
    dbStore.transactions.unshift(newTx);
    if (tx.type === "INCOME") {
      dbStore.user.totalBalance += tx.amount;
    } else {
      dbStore.user.totalBalance -= tx.amount;
    }
    return newTx;
  },

  getInvestments: () => dbStore.investments,
  addInvestment: (inv: Omit<InvestmentItem, "id">) => {
    const newInv: InvestmentItem = {
      ...inv,
      id: "i-" + Date.now(),
    };
    dbStore.investments.unshift(newInv);
    return newInv;
  },

  getBudgets: () => dbStore.budgets,
  getJourneys: () => dbStore.journeys,
  addJourney: (j: Omit<CommunityJourneyItem, "id" | "likesCount" | "createdAt">) => {
    const newJourney: CommunityJourneyItem = {
      ...j,
      id: "j-" + Date.now(),
      likesCount: 1,
      createdAt: "Just now",
    };
    dbStore.journeys.unshift(newJourney);
    return newJourney;
  },
  likeJourney: (id: string) => {
    const journey = dbStore.journeys.find((j) => j.id === id);
    if (journey) {
      journey.likesCount += 1;
    }
    return journey;
  },
};
