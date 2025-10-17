import { BrowserRouter, Route, Routes } from "react-router";
//import Hello from "./components/Hello";

function Login() {
  return (
    <div className="m-2 flex flex-col items-center justify-center min-h-screen">
      <h1>Login</h1>
      <form className="m-2 flex flex-col items-center justify-center">
        <input className="p-2 m-2 border rounded" placeholder="username" />
        <input className="p-2 m-2 border rounded" placeholder="password" />
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
  return (
    <div className="m-2 flex flex-row justify-center">
      <div>
        <button className="m-2 p-2 border rounded">Back</button>
      </div>
      <div>
        <h6 className="m-2 p-2">Name</h6>
      </div>
      <div className="m-2 flex flex-col items-center justify-center min-h-screen">
        <h1 className="m-2">Question Title</h1>
        <p className="m-2">Question content</p>
        <div>
          <div className="m-2">
            <button className="m-2 p-2 border rounded">Question A</button>
            <button className="m-2 p-2 border rounded">Question B</button>
          </div>
          <div className="m-2">
            <button className="m-2 p-2 border rounded">Question C</button>
            <button className="m-2 p-2 border rounded">Question D</button>
          </div>
        </div>
      </div>
      <div>
        <h6 className="m-2 p-2">Score</h6>
      </div>
      <div>

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
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return <Main />
}
