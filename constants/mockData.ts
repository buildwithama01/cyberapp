// ============================================================================
// mockData.ts — Mirror real DB schema
// UI-only config (tabs, onboarding slides, menu items) is kept but clearly
// separated and NOT treated as DB-mapped data.
// ============================================================================

// ============================================================================
// UI CONFIG — Not persisted in DB
// ============================================================================

export const COURSE_TABS = ["Ongoing", "Completed"];
export const COURSE_DETAILS_TABS = ["About", "Lessons", "Reviews"];

export const ONBOARDING_SLIDES = [
  {
    id: "1",
    title: "We provide the best learning courses!",
    buttonText: "Next",
  },
  {
    id: "2",
    title: "Learn anytime and anywhere easily and conveniently",
    buttonText: "Next",
  },
  {
    id: "3",
    title: "Let's improve your skills together on Cybergate right now!",
    buttonText: "Get Started",
  },
];

export const RECENT_SEARCHES: string[] = [
  "CRM Management",
  "Full-Stack Web Developer",
  "Learn UX User Persona",
  "3D Blender and UI/UX",
  "Digital Entrepreneurship",
  "3D Icons Set Blender",
  "Flutter Mobile Apps",
  "3D Design Illustration",
];

export const CHECKOUT_OPTIONS = [
  { title: "Delivery", option: "Select Method" },
  { title: "Payment", option: "Mastercard" },
  { title: "Promo Code", option: "Pick Discount" },
  { title: "Total Cost", option: 13.97 },
];

export const PROFILE_MENU_ITEMS = [
  {
    id: "1",
    title: "Edit Profile",
    iconFamily: "Feather",
    iconName: "user",
    route: "/editprofile",
  },
  {
    id: "2",
    title: "Notification",
    iconFamily: "Ionicons",
    iconName: "notifications-outline",
    route: "/notification",
  },
  {
    id: "3",
    title: "Security",
    iconFamily: "Ionicons",
    iconName: "shield-checkmark-outline",
    route: "/",
  },
  {
    id: "4",
    title: "Privacy Policy",
    iconFamily: "Octicons",
    iconName: "note",
    route: "/(screens)/privacypolicy",
  },
  {
    id: "5",
    title: "Help Center",
    iconFamily: "FontAwesome5",
    iconName: "headset",
    route: "/(screens)/helpcenter",
  },
  {
    id: "6",
    title: "About",
    iconFamily: "Feather",
    iconName: "info",
    route: "/(screens)/about",
  },
];

export const HELP_CONTACT_OPTIONS = [
  {
    id: "cs",
    icon: "headset-outline",
    label: "Customer Service",
    route: "/(screens)/customerservice",
  },
  { id: "wa", icon: "logo-whatsapp", label: "WhatsApp" },
  { id: "web", icon: "globe-outline", label: "Website" },
  { id: "fb", icon: "logo-facebook", label: "Facebook" },
  { id: "tw", icon: "logo-twitter", label: "Twitter" },
  { id: "ig", icon: "logo-instagram", label: "Instagram" },
];

// ============================================================================
// APP CONFIG — maps to `app_settings` table (single row)
// ============================================================================

export interface AppConfig {
  name: string;
  tagline: string;
  version: string;
  descriptionTitle: string;
  description: string;
  copyright: string;
  privacyPolicy: PrivacyPolicySection[];
}

export interface PrivacyPolicySection {
  title: string;
  paragraphs: string[];
}

export const APP_CONFIG: AppConfig = {
  name: "Cybergate",
  tagline: "Learn. Grow. Achieve.",
  version: "Version 1.0.0",
  descriptionTitle: "About Cybergate",
  description:
    "Cybergate helps you build practical skills through accessible, focused courses designed for learning at your own pace.",
  copyright: "© 2026 Cybergate. All rights reserved.",
  privacyPolicy: [
    {
      title: "1. Types of Data We Collect",
      paragraphs: [
        "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      ],
    },
    {
      title: "2. Use of Your Personal Data",
      paragraphs: [
        "Magna etiam tempor orci eu lobortis elementum nibh. Vulputate enim nulla aliquet porttitor lacus.",
      ],
    },
    {
      title: "3. Disclosure of Your Personal Data",
      paragraphs: [
        "Consequat id porta nibh venenatis cras sed felis.",
        "Massa tempor nec feugiat nisl pretium fusce id.",
      ],
    },
    {
      title: "4. Security of Your Personal Data",
      paragraphs: [
        "We use appropriate technical and organizational measures to protect personal information from unauthorized access.",
      ],
    },
  ],
};

// ============================================================================
// USERS — maps to `users` table
// ============================================================================

export interface User {
  id: string;
  fullName: string;
  username: string;
  email: string;
  phoneNumber: string; // store as full international string
  countryCode: string; // for phone input UI only
  callingCode: string; // for phone input UI only
  dateOfBirth: string;
  gender: string;
  avatarUrl?: string;
  bio?: string;
}

export const CURRENT_USER: User = {
  id: "u_1",
  fullName: "Andrew Ainsley",
  username: "andrew_ainsley",
  email: "andrew_ainsley@yourdomain.com",
  phoneNumber: "+1 111 467 378 399",
  countryCode: "US",
  callingCode: "1",
  dateOfBirth: "12/27/1995",
  gender: "Male",
  avatarUrl: "https://picsum.photos/seed/andrew/200/200",
};

// ============================================================================
// COURSES — maps to `courses` + `course_sections` + `lessons` tables
// ============================================================================

export interface Course {
  id: string;
  imageUri: string; // URI string, not require()
  name: string;
  category: string;
  price: number;
  originalPrice?: number;
  rating: number;
  totalStudents: string;
  // Detail fields (same table, loaded on course detail screen)
  mentorId: string;
  durationHours: number;
  totalLessons: number;
  hasCertificate: boolean;
  about: string[];
  tools: string[];
  reviewsCount: string;
}

export const MOCK_COURSES: Course[] = [
  {
    id: "3d-design",
    imageUri: "https://picsum.photos/seed/3ddesign/200/200",
    name: "3D Design Illustration",
    category: "3D Design",
    price: 48,
    originalPrice: 80,
    rating: 4.8,
    totalStudents: "8,289",
    mentorId: "m_1",
    durationHours: 2.5,
    totalLessons: 124,
    hasCertificate: true,
    about: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
    ],
    tools: ["Blender"],
    reviewsCount: "4,479",
  },
  {
    id: "digital-entrepreneur",
    imageUri: "https://picsum.photos/seed/entrepreneur/200/200",
    name: "Digital Entrepreneurship",
    category: "Entrepreneurship",
    price: 39,
    rating: 4.9,
    totalStudents: "6,182",
    mentorId: "m_2",
    durationHours: 3,
    totalLessons: 98,
    hasCertificate: true,
    about: ["Lorem ipsum dolor sit amet, consectetur adipiscing elit."],
    tools: ["Notion", "Canva"],
    reviewsCount: "3,210",
  },
  {
    id: "ui-ux",
    imageUri: "https://picsum.photos/seed/uiux/200/200",
    name: "Learn UX User Persona",
    category: "UI/UX Design",
    price: 42,
    originalPrice: 75,
    rating: 4.7,
    totalStudents: "7,938",
    mentorId: "m_1",
    durationHours: 2.5,
    totalLessons: 124,
    hasCertificate: true,
    about: [
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do eiusmod tempor incididunt ut labore et dolore magna aliqua.",
      "Lorem ipsum dolor sit amet, consectetur adipiscing elit. Read more...",
    ],
    tools: ["Figma"],
    reviewsCount: "4,479",
  },
  {
    id: "wordpress",
    imageUri: "https://picsum.photos/seed/wordpress/200/200",
    name: "WordPress Website Development",
    category: "Web Development",
    price: 45,
    originalPrice: 70,
    rating: 4.8,
    totalStudents: "5,642",
    mentorId: "m_2",
    durationHours: 3,
    totalLessons: 146,
    hasCertificate: true,
    about: [
      "Learn how to build, customize, and manage professional WordPress websites.",
      "Build practical websites with themes, plugins, and reusable content workflows.",
    ],
    tools: ["WordPress", "Elementor"],
    reviewsCount: "2,840",
  },
];

export const COURSE_CATEGORIES = [
  { label: "All" },
  { label: "3D Design" },
  { label: "Business" },
  { label: "UI/UX Design" },
  { label: "Entrepreneurship" },
];

// ============================================================================
// MENTORS — maps to `mentors` table (or `users` with role = mentor)
// ============================================================================

export interface Mentor {
  id: string;
  name: string;
  profession: string;
  avatarUri: string;
}

export const MENTORS: Mentor[] = [
  {
    id: "m_1",
    name: "Jonathan Williams",
    profession: "Senior UI/UX Designer at Google",
    avatarUri: "https://picsum.photos/seed/jonathan/200/200",
  },
  {
    id: "m_2",
    name: "Sandra Lee",
    profession: "Entrepreneur & Business Coach",
    avatarUri: "https://picsum.photos/seed/sandra/200/200",
  },
];

// ============================================================================
// COURSE SECTIONS & LESSONS — maps to `course_sections` + `lessons` tables
// ============================================================================

export interface Lesson {
  id: string;
  courseId: string;
  sectionId: string;
  number: string;
  title: string;
  duration: string;
  isUnlocked: boolean;
}

export interface LessonSection {
  id: string;
  courseId: string;
  title: string;
  totalDuration: string;
  lessons: Lesson[];
}

export const COURSE_LESSONS_DATA: LessonSection[] = [
  {
    id: "s1",
    courseId: "ui-ux",
    title: "Section 1 - Introduction",
    totalDuration: "15 mins",
    lessons: [
      {
        id: "l1",
        courseId: "ui-ux",
        sectionId: "s1",
        number: "01",
        title: "Why Using Figma",
        duration: "10 mins",
        isUnlocked: true,
      },
      {
        id: "l2",
        courseId: "ui-ux",
        sectionId: "s1",
        number: "02",
        title: "Set up Your Figma Account",
        duration: "5 mins",
        isUnlocked: false,
      },
    ],
  },
  {
    id: "s2",
    courseId: "ui-ux",
    title: "Section 2 - Figma Basic",
    totalDuration: "60 mins",
    lessons: [
      {
        id: "l3",
        courseId: "ui-ux",
        sectionId: "s2",
        number: "03",
        title: "Take a Look Figma Interface",
        duration: "15 mins",
        isUnlocked: false,
      },
      {
        id: "l4",
        courseId: "ui-ux",
        sectionId: "s2",
        number: "04",
        title: "Working with Frame & Layer",
        duration: "10 mins",
        isUnlocked: false,
      },
      {
        id: "l5",
        courseId: "ui-ux",
        sectionId: "s2",
        number: "05",
        title: "Working with Text & Grids",
        duration: "10 mins",
        isUnlocked: false,
      },
      {
        id: "l6",
        courseId: "ui-ux",
        sectionId: "s2",
        number: "06",
        title: "Using Figma Plugins",
        duration: "25 mins",
        isUnlocked: false,
      },
    ],
  },
  {
    id: "s3",
    courseId: "ui-ux",
    title: "Section 3 - Let's Practice",
    totalDuration: "75 mins",
    lessons: [
      {
        id: "l7",
        courseId: "ui-ux",
        sectionId: "s3",
        number: "07",
        title: "Let's Design a Sign-Up Form",
        duration: "35 mins",
        isUnlocked: false,
      },
      {
        id: "l8",
        courseId: "ui-ux",
        sectionId: "s3",
        number: "08",
        title: "Let's Create a Prototype",
        duration: "20 mins",
        isUnlocked: false,
      },
      {
        id: "l9",
        courseId: "ui-ux",
        sectionId: "s3",
        number: "09",
        title: "Sharing Work with Team",
        duration: "8 mins",
        isUnlocked: false,
      },
      {
        id: "l10",
        courseId: "ui-ux",
        sectionId: "s3",
        number: "10",
        title: "Exporting Assets",
        duration: "12 mins",
        isUnlocked: false,
      },
    ],
  },
];

// ============================================================================
// ENROLLMENTS — maps to `enrollments` table
// This is the join between users and courses, replacing MY_COURSES_DATA
// ============================================================================

export interface Enrollment {
  id: string;
  userId: string;
  courseId: string;
  currentLesson: number;
  totalLessons: number;
  enrolledAt: string;
  completedAt?: string;
  // Certificate is issued on completion — no separate CERTIFICATE_RECORD needed
  certificateId?: string;
  certificateIssuedAt?: string;
}

export const ENROLLMENTS: Enrollment[] = [
  {
    id: "e_1",
    userId: "u_1",
    courseId: "ui-ux",
    currentLesson: 112,
    totalLessons: 124,
    enrolledAt: "2024-11-01",
    certificateId: undefined,
    certificateIssuedAt: undefined,
  },
  {
    id: "e_2",
    userId: "u_1",
    courseId: "wordpress",
    currentLesson: 146,
    totalLessons: 146,
    enrolledAt: "2024-10-15",
    completedAt: "2024-12-20",
    certificateId: "SK123456789",
    certificateIssuedAt: "December 20, 2024",
  },
  {
    id: "e_3",
    userId: "u_1",
    courseId: "3d-design",
    currentLesson: 30,
    totalLessons: 119,
    enrolledAt: "2024-12-01",
  },
  {
    id: "e_4",
    userId: "u_1",
    courseId: "digital-entrepreneur",
    currentLesson: 82,
    totalLessons: 137,
    enrolledAt: "2024-11-20",
  },
];

// ============================================================================
// LESSON PROGRESS — maps to `lesson_progress` table
// ============================================================================

export interface LessonProgress {
  id: string;
  enrollmentId: string;
  lessonId: string;
  completedAt?: string;
}

// ============================================================================
// REVIEWS — maps to `course_reviews` table
// ============================================================================

export interface Review {
  id: string;
  courseId: string;
  userId: string;
  name: string; // denormalized for display
  avatarUri: string;
  rating: number;
  comment: string;
  likes: number;
  createdAt: string;
}

export interface CourseReviewsMeta {
  courseId: string;
  overallRating: number;
  totalReviews: string;
  ratingFilters: Array<"All" | number>;
}

export const COURSE_REVIEWS_META: CourseReviewsMeta = {
  courseId: "ui-ux",
  overallRating: 4.8,
  totalReviews: "4,479",
  ratingFilters: ["All", 5, 4, 3, 2, 1],
};

export const COURSE_REVIEWS_DATA: Review[] = [
  {
    id: "r1",
    courseId: "ui-ux",
    userId: "u_ext_1",
    name: "Marielle Wigington",
    avatarUri: "https://picsum.photos/seed/marielle/80/80",
    rating: 5,
    comment:
      "The course is very good, the explanation of the mentor is very clear and easy to understand 😍😎",
    likes: 948,
    createdAt: "2024-12-01",
  },
  {
    id: "r2",
    courseId: "ui-ux",
    userId: "u_ext_2",
    name: "Tanner Stafford",
    avatarUri: "https://picsum.photos/seed/tanner/80/80",
    rating: 4,
    comment: "Extraordinary! I just finished it and it really helped 👍",
    likes: 836,
    createdAt: "2024-12-01",
  },
  {
    id: "r3",
    courseId: "ui-ux",
    userId: "u_ext_3",
    name: "Lauralee Quintero",
    avatarUri: "https://picsum.photos/seed/lauralee/80/80",
    rating: 5,
    comment:
      "Awesome! this is what I was looking for, I recommend to everyone ❤️❤️",
    likes: 724,
    createdAt: "2024-11-24",
  },
  {
    id: "r4",
    courseId: "ui-ux",
    userId: "u_ext_4",
    name: "Chieko Chute",
    avatarUri: "https://picsum.photos/seed/chieko/80/80",
    rating: 5,
    comment:
      "Extraordinary! I just finished it and it really helped Thanks a lot! 🙌🙌",
    likes: 597,
    createdAt: "2024-12-01",
  },
  {
    id: "r5",
    courseId: "ui-ux",
    userId: "u_ext_5",
    name: "Clinton Mcclure",
    avatarUri: "https://picsum.photos/seed/clinton/80/80",
    rating: 4,
    comment:
      "The quality of the courses and mentors is very good and the explanations are very easy to understand. 💯💯💯",
    likes: 472,
    createdAt: "2024-12-08",
  },
];

// ============================================================================
// TRANSACTIONS — maps to `transactions` table
// Receipt is a derived view, not a separate entity
// ============================================================================

export interface Transaction {
  id: string;
  userId: string;
  courseId: string;
  courseName: string; // denormalized for display
  courseImageUri: string;
  amount: number;
  currency: string;
  paymentMethod: string;
  status: "Paid" | "Pending" | "Failed";
  createdAt: string;
}

export const TRANSACTIONS_DATA: Transaction[] = [
  {
    id: "SK7263727399",
    userId: "u_1",
    courseId: "ui-ux",
    courseName: "Mastering Figma A to Z",
    courseImageUri: "https://picsum.photos/seed/figma/200/200",
    amount: 40.0,
    currency: "USD",
    paymentMethod: "Credit Card",
    status: "Paid",
    createdAt: "2024-12-14T14:27:45",
  },
  {
    id: "SK7263727400",
    userId: "u_1",
    courseId: "3d-design",
    courseName: "Mastering Blender 3D",
    courseImageUri: "https://picsum.photos/seed/blender3d/200/200",
    amount: 48.0,
    currency: "USD",
    paymentMethod: "Credit Card",
    status: "Paid",
    createdAt: "2024-12-10T10:00:00",
  },
  {
    id: "SK7263727401",
    userId: "u_1",
    courseId: "digital-entrepreneur",
    courseName: "Build Personal Branding",
    courseImageUri: "https://picsum.photos/seed/branding/200/200",
    amount: 39.0,
    currency: "USD",
    paymentMethod: "Credit Card",
    status: "Paid",
    createdAt: "2024-12-05T09:15:00",
  },
];

// ============================================================================
// NOTIFICATIONS — maps to `notifications` table
// ============================================================================

export interface AppNotification {
  id: string;
  userId: string;
  title: string;
  description: string;
  iconName: string;
  iconBgColor: string;
  createdAt: string; // used to derive "Today / Yesterday / date" grouping in UI
  isRead: boolean;
}

export const NOTIFICATIONS_DATA: AppNotification[] = [
  {
    id: "1",
    userId: "u_1",
    title: "Payment Successful!",
    description: "You have made a course payment",
    iconName: "wallet-outline",
    iconBgColor: "#3B82F6",
    createdAt: "2024-12-22T09:00:00",
    isRead: false,
  },
  {
    id: "2",
    userId: "u_1",
    title: "Today's Special Offers",
    description: "You get a special promo today!",
    iconName: "star-outline",
    iconBgColor: "#F59E0B",
    createdAt: "2024-12-22T08:00:00",
    isRead: false,
  },
  {
    id: "3",
    userId: "u_1",
    title: "New Category Courses!",
    description: "Now the 3D design course is available",
    iconName: "grid-outline",
    iconBgColor: "#FF4D6D",
    createdAt: "2024-12-21T10:00:00",
    isRead: true,
  },
  {
    id: "4",
    userId: "u_1",
    title: "Credit Card Connected!",
    description: "Credit Card has been linked!",
    iconName: "card-outline",
    iconBgColor: "#3B82F6",
    createdAt: "2024-12-21T09:00:00",
    isRead: true,
  },
  {
    id: "5",
    userId: "u_1",
    title: "Account Setup Successful!",
    description: "Your account has been created!",
    iconName: "person-outline",
    iconBgColor: "#22C55E",
    createdAt: "2024-12-22T07:00:00",
    isRead: true,
  },
];

// ============================================================================
// SUPPORT / CHAT — maps to `support_messages` table
// ============================================================================

export interface SupportMessage {
  id: string;
  userId: string;
  text: string;
  sentAt: string;
  isUser: boolean;
}

export const INITIAL_SUPPORT_MESSAGES: SupportMessage[] = [
  {
    id: "1",
    userId: "u_1",
    text: "Hello, good morning.",
    sentAt: "09:41",
    isUser: false,
  },
  {
    id: "2",
    userId: "u_1",
    text: "I am a Customer Service, is there anything I can help you with?",
    sentAt: "09:41",
    isUser: false,
  },
  {
    id: "3",
    userId: "u_1",
    text: "Hi, I'm having problems with my course payment.",
    sentAt: "09:41",
    isUser: true,
  },
  {
    id: "4",
    userId: "u_1",
    text: "Can you help me?",
    sentAt: "09:41",
    isUser: true,
  },
  {
    id: "5",
    userId: "u_1",
    text: "Of course...",
    sentAt: "09:41",
    isUser: false,
  },
  {
    id: "6",
    userId: "u_1",
    text: "Can you tell me the problem you are having? so I can help solve it",
    sentAt: "10:00",
    isUser: false,
  },
];

// ============================================================================
// HELP CENTER — maps to `help_categories` + `help_articles` tables
// ============================================================================

export const HELP_CATEGORIES = [
  { label: "General" },
  { label: "Account" },
  { label: "Course" },
  { label: "Payment" },
];

export interface HelpArticle {
  id: string;
  category: string;
  question: string;
  answer: string;
}

export const HELP_ARTICLES: HelpArticle[] = [
  {
    id: "elera",
    category: "General",
    question: "What is Cybergate?",
    answer:
      "Cybergate is a learning platform that helps you discover practical courses and build skills at your own pace.",
  },
  {
    id: "use-elera",
    category: "General",
    question: "How to use Cybergate?",
    answer:
      "Browse a course, open its details, and enroll to start learning. Your active courses are available from the home screen.",
  },
  {
    id: "create-course",
    category: "Course",
    question: "Can I create my own course?",
    answer:
      "Course creation is not available yet, but you can contact our support team to register your interest.",
  },
  {
    id: "free",
    category: "Payment",
    question: "Is Cybergate free to use?",
    answer:
      "You can explore the platform for free. Individual courses may have their own enrollment price.",
  },
  {
    id: "offer",
    category: "Payment",
    question: "How to make offer on Cybergate?",
    answer:
      "Open the course you are interested in and check the available purchase options before completing checkout.",
  },
];
