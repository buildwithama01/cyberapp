export interface AssessmentQuestion {
  id: string;
  question: string;
  options: string[];
  correctAnswer: number;
  explanation: string;
}

export interface SectionAssessment {
  sectionId: string;
  title: string;
  questions: AssessmentQuestion[];
}

export const SECTION_ASSESSMENTS: SectionAssessment[] = [
  {
    sectionId: "s1",
    title: "Section 1 Assessment",
    questions: [
      {
        id: "s1-q1",
        question: "What is the main benefit of using Figma?",
        options: [
          "It only works without an internet connection",
          "It makes collaborative design easier",
          "It replaces every design tool",
          "It is only used for presentations",
        ],
        correctAnswer: 1,
        explanation:
          "Figma is built around collaborative interface design, so teams can work together in one shared file.",
      },
      {
        id: "s1-q2",
        question: "Where can you access a Figma file?",
        options: [
          "Only on one computer",
          "In a web browser",
          "Only by email",
          "Only offline",
        ],
        correctAnswer: 1,
        explanation:
          "Figma files can be opened in a web browser, making them easy to access across devices.",
      },
      {
        id: "s1-q3",
        question: "What should you do before starting a new design?",
        options: [
          "Delete the toolbar",
          "Understand the project goal",
          "Export an image",
          "Close the file",
        ],
        correctAnswer: 1,
        explanation:
          "Understanding the project goal gives the design a clear direction before work begins.",
      },
    ],
  },
  {
    sectionId: "s2",
    title: "Section 2 Assessment",
    questions: [
      {
        id: "s2-q1",
        question: "What is a frame used for in Figma?",
        options: [
          "Organizing a design screen",
          "Changing your password",
          "Sending an email",
          "Installing a font",
        ],
        correctAnswer: 0,
        explanation:
          "Frames define the boundaries of screens and help organize interface layouts.",
      },
      {
        id: "s2-q2",
        question: "Which tool helps you create a basic shape?",
        options: ["Shape tool", "Comment tool", "Hand tool", "Share tool"],
        correctAnswer: 0,
        explanation:
          "The shape tool creates rectangles, circles, lines, and other foundational design elements.",
      },
    ],
  },
];

export const getAssessment = (sectionId?: string) =>
  SECTION_ASSESSMENTS.find(
    (assessment) => assessment.sectionId === sectionId,
  ) ?? SECTION_ASSESSMENTS[0];
