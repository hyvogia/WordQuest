import { useContext, useEffect, useState } from "react";
import { BrowserRouter, Route, Routes, useNavigate } from "react-router";
import { UsersProvider, UsersContext } from "./UsersContext";
import { ScoreContext, ScoreProvider } from "./ScoresContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Game from "./Game";

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
