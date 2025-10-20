// src/userModel.ts
export interface IUser {
  username: string;
  password: string;
}

export interface IScore {
  username: string;
  score: number;
}

export interface IOption {
  key: string;
  value: string;
}

export interface IQuestion {
  question: string;
  options: IOption[];
  answer: string;
}

export const users: IUser[] = [
  { username: "Andrew", password: "andrew123" },
  { username: "Bill", password: "bill123" },
  { username: "Carol", password: "carol123" }
];

export const scores: IScore[] = [
  // example: { username: "Andrew", score: 0 }
];

export const questions: IQuestion[] = [
  {
    question: "Find the synonym of 'happy':",
    options: [
      { key: "A", value: "Joyful" },
      { key: "B", value: "Angry" },
      { key: "C", value: "Sad" },
      { key: "D", value: "Tired" }
    ],
    answer: "A"
  },
  {
    question: "Find the synonym of 'brave':",
    options: [
      { key: "A", value: "Cowardly" },
      { key: "B", value: "Fearless" },
      { key: "C", value: "Weak" },
      { key: "D", value: "Shy" }
    ],
    answer: "B"
  },
  {
    question: "Find the synonym of 'begin':",
    options: [
      { key: "A", value: "Stop" },
      { key: "B", value: "Continue" },
      { key: "C", value: "Start" },
      { key: "D", value: "Delay" }
    ],
    answer: "C"
  },
  {
    question: "Find the synonym of 'quick':",
    options: [
      { key: "A", value: "Fast" },
      { key: "B", value: "Slow" },
      { key: "C", value: "Late" },
      { key: "D", value: "Careful" }
    ],
    answer: "A"
  },
  {
    question: "Find the synonym of 'beautiful':",
    options: [
      { key: "A", value: "Ugly" },
      { key: "B", value: "Pretty" },
      { key: "C", value: "Plain" },
      { key: "D", value: "Rough" }
    ],
    answer: "B"
  },
  {
    question: "Find the synonym of 'angry':",
    options: [
      { key: "A", value: "Calm" },
      { key: "B", value: "Furious" },
      { key: "C", value: "Happy" },
      { key: "D", value: "Relaxed" }
    ],
    answer: "B"
  },
  {
    question: "Find the synonym of 'smart':",
    options: [
      { key: "A", value: "Clever" },
      { key: "B", value: "Dull" },
      { key: "C", value: "Lazy" },
      { key: "D", value: "Forgetful" }
    ],
    answer: "A"
  },
  {
    question: "Find the synonym of 'tiny':",
    options: [
      { key: "A", value: "Huge" },
      { key: "B", value: "Small" },
      { key: "C", value: "Wide" },
      { key: "D", value: "Thick" }
    ],
    answer: "B"
  },
  {
    question: "Find the synonym of 'cold':",
    options: [
      { key: "A", value: "Hot" },
      { key: "B", value: "Freezing" },
      { key: "C", value: "Warm" },
      { key: "D", value: "Burning" }
    ],
    answer: "B"
  },
  {
    question: "Find the synonym of 'strong':",
    options: [
      { key: "A", value: "Powerful" },
      { key: "B", value: "Weak" },
      { key: "C", value: "Tired" },
      { key: "D", value: "Fragile" }
    ],
    answer: "A"
  },
  // (remaining questions can be appended; keep consistent shape)
];
