export interface SurveyData {
  fullName: string;
  firmName: string;
  services: string[];
  servicesOther: string;
  phoneNumber: string;
  winIn90Days: string;
  winIn90DaysOther: string;
  currentSituation: string;
  currentSituationOther: string;
  newClientsPerMonth: string;
  hasMetaAds: string;
  softwarePersonOnCall: string;
  bookingSystem: string;
  bookingSystemOther: string;
}

export const initialSurveyData: SurveyData = {
  fullName: "",
  firmName: "",
  services: [],
  servicesOther: "",
  phoneNumber: "",
  winIn90Days: "",
  winIn90DaysOther: "",
  currentSituation: "",
  currentSituationOther: "",
  newClientsPerMonth: "",
  hasMetaAds: "",
  softwarePersonOnCall: "",
  bookingSystem: "",
  bookingSystemOther: "",
};

export interface StepConfig {
  id: number;
  question: string;
  subtitle?: string;
  type: "text" | "phone" | "multi-select" | "single-choice" | "dropdown" | "yes-no" | "booking";
  field: keyof SurveyData;
  required: boolean;
  options?: string[];
  hasOther?: boolean;
  otherField?: keyof SurveyData;
  conditional?: {
    field: keyof SurveyData;
    value: string;
  };
}

export const surveySteps: StepConfig[] = [
  {
    id: 1,
    question: "What is your full name?",
    type: "text",
    field: "fullName",
    required: false,
  },
  {
    id: 2,
    question: "What is your firm name?",
    type: "text",
    field: "firmName",
    required: false,
  },
  {
    id: 3,
    question: "What services do you offer your clients?",
    subtitle: "Select all that apply",
    type: "multi-select",
    field: "services",
    required: false,
    options: [
      "Tax returns",
      "Bookkeeping",
      "CFO / advisory",
      "Business tax",
    ],
    hasOther: true,
    otherField: "servicesOther",
  },
  {
    id: 4,
    question: "What is your contact phone number?",
    type: "phone",
    field: "phoneNumber",
    required: true,
  },
  {
    id: 5,
    question: "What would make this engagement a clear win for you in 90 days?",
    subtitle: "Not \"more leads\" — be concrete",
    type: "single-choice",
    field: "winIn90Days",
    required: false,
    options: [
      "Consistently receiving the agreed number of booked consultation calls each month",
      "Having a predictable system for getting new consultation calls instead of relying on referrals",
      "Feeling confident that our calendar is consistently filled with qualified prospects",
      "Less stress around where the next client is coming from",
      "Seeing that paid ads can reliably generate booked calls for our firm",
    ],
    hasOther: true,
    otherField: "winIn90DaysOther",
  },
  {
    id: 6,
    question: "What best describes your current situation?",
    type: "single-choice",
    field: "currentSituation",
    required: false,
    options: [
      "We get clients, but lead flow is inconsistent and unpredictable",
      "Most of our clients come from referrals and word of mouth",
      "We want to grow but don't have a reliable system to do so",
      "We've tried paid ads before, but results were inconsistent or unclear",
      "We're ready to invest in predictable growth and systems",
    ],
    hasOther: true,
    otherField: "currentSituationOther",
  },
  {
    id: 7,
    question: "How many new clients are you able to take on per month?",
    type: "dropdown",
    field: "newClientsPerMonth",
    required: false,
    options: ["1-3", "4-6", "7-10", "10+"],
  },
  {
    id: 8,
    question: "Do you have an existing Meta Ads account?",
    type: "yes-no",
    field: "hasMetaAds",
    required: false,
  },
  {
    id: 9,
    question: "Will the person with access to any software be on the call?",
    type: "yes-no",
    field: "softwarePersonOnCall",
    required: false,
  },
  {
    id: 10,
    question: "What booking system do you use?",
    type: "single-choice",
    field: "bookingSystem",
    required: true,
    options: [
      "Zoom",
      "Google Meets",
      "Slack",
      "Microsoft Teams",
    ],
    hasOther: true,
    otherField: "bookingSystemOther",
  },
  {
    id: 11,
    question: "If other, which booking systems are you currently using?",
    type: "text",
    field: "bookingSystemOther",
    required: false,
    conditional: {
      field: "bookingSystem",
      value: "Other",
    },
  },
  {
    id: 12,
    question: "Book Your AI Consultation Call",
    subtitle: "Select a time that works best for you",
    type: "booking",
    field: "fullName",
    required: false,
  },
];
