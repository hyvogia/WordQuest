import { createContext, useState } from "react";

export interface IScoreContext {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const initScoreContext = {
  score: 0,
  setScore: () => { }
}

export const ScoreContext = createContext<IScoreContext>(initScoreContext);

export function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  )
}