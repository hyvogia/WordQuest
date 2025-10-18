import { createContext, useState } from "react";
import { BrowserRouter, Link, Route, Routes, useNavigate } from "react-router";
//import Hello from "./components/Hello";

interface IUser {
  username: string;
  password: string;
}

interface IContext {
  username: IUser[],
  setUserName: (user: IUser[]) => void;
}

const initialUserContext = {
  username: [],
  setUserName: () => []
}

const UsersContext = createContext<IContext>(initialUserContext);

const users = [
  {
    username: "Andrew",
    password: "andrew123"
  },
  {
    username: "Bill",
    password: "bill123"
  }
]

const questions = [
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
  }
];



function Login() {
  const [name, setName] = useState("");
  const [pass, setPass] = useState("");
  const navigate = useNavigate();
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    for (let i = 0; i < users.length; i++) {
      if (name === users[i].username && pass === users[i].password) {
        navigate("/game");
      }
    }
  }

  return (
    <div
      className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Login</h1>
      <form className="m-2 flex flex-col items-center justify-center" onSubmit={handleSubmit}>
        <input className="p-2 m-2 border rounded" type="text" value={name} onChange={e => setName(e.target.value)} placeholder="username" />
        <input className="p-2 m-2 border rounded" type="text" value={pass} onChange={e => setPass(e.target.value)} placeholder="password" />
        <button className="m-2 border p-2 rounded">Join Game</button>
      </form>
    </div>
  )
}

function SignUp() {
  return (
    <div className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Register</h1>
      <form className="m-2 flex flex-col items-center justify-center">
        <input className="p-2 m-2 border rounded" placeholder="username" />
        <input className="p-2 m-2 border rounded" placeholder="password" />
        <button className="m-2 border p-2 rounded">Sign Up</button>
      </form>
    </div>
  )
}

function Game() {
  const [answer, setAnswer] = useState("");
  const [score, setScore] = useState(0);
  const handleAnswer = (e: React.FormEvent) => {
    e.preventDefault();
    if (answer === questions[0].answer) {
      setScore(prev => prev + 1)
    }
  }
  return (
    <div className="m-2 flex flex-row justify-center">
      <div>
        <button className="m-2 p-2 border rounded">Back</button>
      </div>
      <div>
          <h6 className="m-2 p-2">Name</h6>
        </div>
      <form onSubmit={handleAnswer}>
        <div className="m-2 flex flex-col items-center justify-center min-h-screen">
          <h1 className="m-2">
            {
              questions[0].question
            }
          </h1>
          <div className="flex flex-row">
            <div className="m-2 flex flex-col items-center">
              <button className="m-2 p-2 border rounded" id="A" onClick={() => setAnswer("A")}>
                {questions[0].options.find(o => o.key === "A")?.value}
              </button>
              <button className="m-2 p-2 border rounded" id="B" onClick={(e) => setAnswer((e.target as HTMLButtonElement).id)}>
                {questions[0].options.find(o => o.key === "B")?.value}
              </button>
            </div>
            <div className="m-2 flex flex-col items-center">
              <button className="m-2 p-2 border rounded" id="C" onClick={(e) => setAnswer((e.target as HTMLButtonElement).id)}>
                {questions[0].options.find(o => o.key === "C")?.value}
              </button>
              <button className="m-2 p-2 border rounded" id="D" onClick={(e) => setAnswer((e.target as HTMLButtonElement).id)}>
                {questions[0].options.find(o => o.key === "D")?.value}
              </button>
            </div>
          </div>
        </div>
      </form>
      <div>
        <h6 className="m-2 p-2">Score: {score}</h6>
      </div>
      <div>

      </div>
    </div>
  )
}

function Summary() {
  return (
    <div className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Final Result</h1>
      <div className="m-2 p-10 flex flex-row items-center justify-center border rounded">
        <div className="m-10">
          <p>Answered correct</p>
        </div>
        <div>
          <p>Answered incorrect</p>
        </div>
      </div>
      <div>
        <button className="m-2 border p-2 rounded">Exit Game</button>
        <button className="m-2 border p-2 rounded">Next Level</button>
      </div>
    </div>
  )
}

function Main() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/game" element={<Game />} />
        <Route path="/summary" element={<Summary />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return <Main />
}
