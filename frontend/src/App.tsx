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

function Main() {

  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Login />} />
      </Routes>
    </BrowserRouter>
  )
}

export default function App() {
  return <Main />
}
