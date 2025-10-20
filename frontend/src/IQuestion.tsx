export interface IOption {
  key: string;
  value: string;
}

export interface IQuestion {
  question: string;
  options: IOption[];
  answer: string;
}