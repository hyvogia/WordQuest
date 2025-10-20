import { createContext, useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
//import Hello from "./components/Hello";

interface IUser {
  username: string;
  password: string;
}

interface IUsersContext {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const initialUsersContext: IUsersContext = {
  currentUser: null,
  setCurrentUser: () => { }
};

const UsersContext = createContext<IUsersContext>(initialUsersContext);

function UsersProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  return (
    <UsersContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UsersContext.Provider>
  );
}

interface IOption {
  key: string;
  value: string;
}

interface IQuestion {
  question: string;
  options: IOption[];
  answer: string;
}

interface IScoreContext {
  score: number;
  setScore: React.Dispatch<React.SetStateAction<number>>;
}

const initScoreContext = {
  score: 0,
  setScore: () => { }
}

const ScoreContext = createContext<IScoreContext>(initScoreContext);

function ScoreProvider({ children }: { children: React.ReactNode }) {
  const [score, setScore] = useState(0);
  return (
    <ScoreContext.Provider value={{ score, setScore }}>
      {children}
    </ScoreContext.Provider>
  )
}

let users: IUser[] = [
  { username: "Andrew", password: "andrew123" },
  { username: "Bill", password: "bill123" },
  { username: "Carol", password: "carol123" }
];

const questions = {
  active: false,
  content: [
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
    {
      question: "Find the synonym of 'difficult':",
      options: [
        { key: "A", value: "Easy" },
        { key: "B", value: "Simple" },
        { key: "C", value: "Hard" },
        { key: "D", value: "Light" }
      ],
      answer: "C"
    },
    {
      question: "Find the synonym of 'friend':",
      options: [
        { key: "A", value: "Enemy" },
        { key: "B", value: "Pal" },
        { key: "C", value: "Stranger" },
        { key: "D", value: "Opponent" }
      ],
      answer: "B"
    },
    {
      question: "Find the synonym of 'angry':",
      options: [
        { key: "A", value: "Irate" },
        { key: "B", value: "Gentle" },
        { key: "C", value: "Patient" },
        { key: "D", value: "Polite" }
      ],
      answer: "A"
    },
    {
      question: "Find the synonym of 'clean':",
      options: [
        { key: "A", value: "Dirty" },
        { key: "B", value: "Pure" },
        { key: "C", value: "Messy" },
        { key: "D", value: "Untidy" }
      ],
      answer: "B"
    },
    {
      question: "Find the synonym of 'lazy':",
      options: [
        { key: "A", value: "Active" },
        { key: "B", value: "Energetic" },
        { key: "C", value: "Idle" },
        { key: "D", value: "Busy" }
      ],
      answer: "C"
    },
    {
      question: "Find the synonym of 'old':",
      options: [
        { key: "A", value: "Ancient" },
        { key: "B", value: "Young" },
        { key: "C", value: "Modern" },
        { key: "D", value: "Fresh" }
      ],
      answer: "A"
    },
    {
      question: "Find the synonym of 'rich':",
      options: [
        { key: "A", value: "Poor" },
        { key: "B", value: "Wealthy" },
        { key: "C", value: "Cheap" },
        { key: "D", value: "Humble" }
      ],
      answer: "B"
    },
    {
      question: "Find the synonym of 'sad':",
      options: [
        { key: "A", value: "Miserable" },
        { key: "B", value: "Joyful" },
        { key: "C", value: "Pleased" },
        { key: "D", value: "Happy" }
      ],
      answer: "A"
    },
    {
      question: "Find the synonym of 'easy':",
      options: [
        { key: "A", value: "Hard" },
        { key: "B", value: "Difficult" },
        { key: "C", value: "Simple" },
        { key: "D", value: "Complicated" }
      ],
      answer: "C"
    },
    {
      question: "Find the synonym of 'hungry':",
      options: [
        { key: "A", value: "Thirsty" },
        { key: "B", value: "Full" },
        { key: "C", value: "Starving" },
        { key: "D", value: "Satisfied" }
      ],
      answer: "C"
    }
  ]
};


function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const [login, setLogin] = useState("");

  const { setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (login === "Sign Up") {
      setName("");
      setPass("");
      navigate("/signup");
      return;
    }

    if (!name || !pass) {
      alert("Error: Invalid input");
      return
    }

    try {
      const res = await fetch(`http://localhost:3001/api/v1/users/${encodeURIComponent(name)}`, {
        method: "GET"
      });

      if (!res.ok) {
        const txt = await res.text();
        try {
          const data = JSON.parse(txt);
          alert("Server error: " + (data.message || txt));
          return
        } catch {
          alert("Server error: " + txt);
          return
        }
      }

      const payload = await res.json();
      const found = payload?.data ?? payload;
      setCurrentUser(found);
      navigate("/game");
    } catch (err) {
      console.error("Login error (fetch failed):", err);
      alert("Failed to connect to server — check backend is running and URL/port are correct.");
    }
  }

  return (
    <div
      className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Login</h1>
      <form className="m-2 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <input
          className="p-2 m-2 border rounded"
          type="text" value={name}
          onChange={e => setName(e.target.value)}
          placeholder="username" />
        <input
          className="p-2 m-2 border rounded"
          type="text" value={pass}
          onChange={e => setPass(e.target.value)}
          placeholder="password" />

        <div>
          <button
            className="m-2 border p-2 rounded"
            onClick={() => setLogin("Sign Up")}>
            Sign Up
          </button>
          <button
            className="m-2 border p-2 rounded"
            onClick={() => setLogin("Join Game")}>
            Join Game
          </button>
        </div>
      </form>
    </div>
  )
}

function SignUp() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();

  const { currentUser, setCurrentUser } = useContext(UsersContext);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!name.trim() || !pass) {
      alert("Please enter a username and password");
      return;
    }
    //const exists = users.some(u => u.username.toLowerCase() === name.trim().toLowerCase());

    const res = await fetch(`http://localhost:3001/api/v1/users/${encodeURIComponent(name)}`, {
      method: "GET"
    });

    if (!res.ok) {
      const txt = await res.text();
      try {
        const data = JSON.parse(txt);
        alert("Server error: " + (data.message || txt));
        return
      } catch {
        alert("Server error: " + txt);
        return
      }
    }

    const payload = await res.json();
    const found = payload?.data ?? payload;
    setCurrentUser(found);

    if (name === currentUser?.username) {
      alert("Username already taken");
      return;
    }
    else {
      //users.push({ username: name, password: pass });
      try {
        await fetch("http://localhost:3001/api/v1/users", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: name, password: pass })
        });
      } catch (err) {
        console.warn("failed to save user to backend (backend optional):", err);
      }
    }

    alert("Sign up sucessfully!")
    navigate("/");
  };

  return (
    <div className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Register</h1>
      <form
        className="m-2 flex flex-col items-center justify-center"
        onSubmit={handleSubmit}>
        <input
          className="p-2 m-2 border rounded"
          placeholder="username"
          value={name}
          onChange={e => setName(e.target.value)}
        />
        <input
          className="p-2 m-2 border rounded"
          type="password"
          placeholder="password"
          value={pass}
          onChange={e => setPass(e.target.value)}
        />
        <button className="m-2 border p-2 rounded">Sign Up</button>
      </form>
    </div>
  )
}

function Game() {
  const [answer, setAnswer] = useState<string>("");
  const [questionState, setQuestionState] = useState<number>(0);
  const [selectedQuestions, setSelectedQuestions] = useState<IQuestion[]>([]);
  const [loading, setLoading] = useState<boolean>(true);
  const [submitting, setSubmitting] = useState<boolean>(false);

  const { score, setScore } = useContext(ScoreContext);
  const { currentUser, setCurrentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  // fetch questions from backend once on mount
  useEffect(() => {
    let mounted = true;
    (async () => {
      try {
        const res = await fetch("http://localhost:3001/api/v1/questions");
        const payload = await res.json();
        if (!mounted) return;
        if (payload && payload.success && Array.isArray(payload.data)) {
          const arr = [...payload.data] as IQuestion[];
          const shuffled = arr.sort(() => Math.random() - 0.5).slice(0, 2); // adjust slice to 10 when ready
          setSelectedQuestions(shuffled);
        } else {
          setSelectedQuestions([]);
        }
      } catch (err) {
        console.error("Failed to fetch questions", err);
        setSelectedQuestions([]);
      } finally {
        if (mounted) setLoading(false);
      }
    })();
    return () => { mounted = false; };
  }, []);

  const submitAnswer = async (choice: "A" | "B" | "C" | "D") => {
    if (submitting) return;
    if (!selectedQuestions.length) return;

    const currentIndex = questionState;
    const current = selectedQuestions[currentIndex];
    if (!current) return; // defensive

    const correct = choice === current.answer;
    const newScore = correct ? score + 1 : score;

    if (correct) setScore(prev => prev + 1);

    const isLast = currentIndex === selectedQuestions.length - 1;

    if (isLast) {
      setSubmitting(true);
      try {
        await fetch("http://localhost:3001/api/v1/scores", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ username: currentUser?.username ?? "Guest", score: newScore })
        });
      } catch (err) {
        console.warn("failed to upsert score to backend:", err);
      } finally {
        // navigate after attempt (do not increment questionState)
        navigate("/summary");
      }
    } else {
      // advance only when not last
      setQuestionState(prev => prev + 1);
      if (!correct) alert("Wrong answer!");
    }

    // reset selected answer state if you still use it
    setAnswer("");
  };

  const handleExit = () => {
    const ok = window.confirm("You are about to log out. Your progress will be loss. Do you want to continue?");
    if (!ok) return;
    setCurrentUser(null);
    setScore(0);
    setQuestionState(0);
    setAnswer("");
    navigate("/");
  };

  if (loading) return <div className="m-2 p-4">Loading questions...</div>;
  if (!selectedQuestions.length) return <div className="m-2 p-4">No questions available.</div>;

  const q = selectedQuestions[questionState];
  if (!q) return <div className="m-2 p-4">Loading next question...</div>;

  return (
    <div className="m-2 flex flex-row justify-center">
      <div>
        <button
          className="m-2 p-2 border rounded"
          onClick={handleExit}>
          Exit
        </button>
      </div>

      <div>
        <h6 className="m-2 p-2">Name: {currentUser?.username ?? "Guest"}</h6>
      </div>

      <div className="m-2 flex flex-col items-center justify-center min-h-screen">
        <h1 className="m-2">{q.question}</h1>
        <div className="flex flex-row">
          <div className="m-2 flex flex-col items-center">
            <button
              type="button"
              className="m-2 p-2 border rounded"
              onClick={() => submitAnswer("A")}
              disabled={submitting}
            >
              {q.options.find(o => o.key === "A")?.value}
            </button>

            <button
              type="button"
              className="m-2 p-2 border rounded"
              onClick={() => submitAnswer("B")}
              disabled={submitting}
            >
              {q.options.find(o => o.key === "B")?.value}
            </button>
          </div>

          <div className="m-2 flex flex-col items-center">
            <button
              type="button"
              className="m-2 p-2 border rounded"
              onClick={() => submitAnswer("C")}
              disabled={submitting}
            >
              {q.options.find(o => o.key === "C")?.value}
            </button>

            <button
              type="button"
              className="m-2 p-2 border rounded"
              onClick={() => submitAnswer("D")}
              disabled={submitting}
            >
              {q.options.find(o => o.key === "D")?.value}
            </button>
          </div>
        </div>
      </div>

      <div>
        <h6 className="m-2 p-2">Score: {score}/10</h6>
      </div>
    </div>
  );
}

function Summary() {
  const [final, setFinal] = useState("");

  const { score, setScore } = useContext(ScoreContext);
  const { currentUser } = useContext(UsersContext);

  const navigate = useNavigate();

  let allAnswered: boolean = false;
  console.log(allAnswered);
  if (questions.active === true && questions.active === true) {
    allAnswered = true;
  }

  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (final === "Exit") {
      setScore(0);
      navigate("/");
    } else {
      setScore(0);
      navigate("/game")
    }
  }
  return (
    <div className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Final Result for {currentUser?.username ?? "Player"}</h1>
      <div className="m-2 p-10 flex flex-row items-center justify-center border rounded">
        <p>You've got {score}/10</p>
      </div>
      <form onSubmit={handleAnswer}>
        <div>
          <button
            className="m-2 border p-2 rounded"
            onClick={() => setFinal("Exit")}>
            Exit Game
          </button>
          <button
            className="m-2 border p-2 rounded"
            onClick={() => setFinal("Continue")}>
            Continue
          </button>
        </div>
      </form>
    </div>
  )
}

function Main() {

  return (
    <BrowserRouter>
      <UsersProvider>
        <ScoreProvider>
          <Routes>
            <Route path="/" element={<Login />} />
            <Route path="/signup" element={<SignUp />} />
            <Route path="/game" element={<Game />} />
            <Route path="/summary" element={<Summary />} />
          </Routes>
        </ScoreProvider>
      </UsersProvider>
    </BrowserRouter>
  )
}

export default function App() {
  return <Main />
}
