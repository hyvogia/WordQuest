import { BrowserRouter, Route, Routes } from "react-router";
import { UsersProvider } from "./UsersContext";
import { ScoreProvider } from "./ScoresContext";
import Login from "./Login";
import SignUp from "./SignUp";
import Game from "./Game";
import Summary from "./Summary";

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
