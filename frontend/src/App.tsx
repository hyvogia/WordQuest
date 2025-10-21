import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import { UsersProvider, UsersContext } from "./UsersContext";
import type { IQuestion } from "./IQuestion";
import { ScoreContext, ScoreProvider } from "./ScoresContext";
import Login from "./Login";

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
  const [, setAnswer] = useState<string>("");
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
