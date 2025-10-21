import { useContext, useState } from "react";
import { ScoreContext } from "./ScoresContext";
import { UsersContext } from "./UsersContext";
import { useNavigate } from "react-router";

export default function Summary() {
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
        <div className="m-2 flex flex-col items-center justify-center min-h-screen font-sans text-gray-800">
            <h1 className="text-3xl font-semibold mb-8">
                Final Result for {currentUser?.username ?? "Player"}
            </h1>

            <div className="m-4 px-10 py-6 flex flex-row items-center justify-center bg-gray-50 border border-gray-300 rounded-xl shadow-sm">
                <p className="text-xl font-medium text-gray-700">
                    You've got {score}/10
                </p>
            </div>

            <form onSubmit={handleAnswer} className="mt-4">
                <div className="flex flex-row space-x-4">
                    <button
                        className="w-36 py-3 rounded-md bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 shadow-sm"
                        onClick={() => setFinal("Exit")}>
                        Exit Game
                    </button>

                    <button
                        className="w-36 py-3 rounded-md bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 shadow-sm"
                        onClick={() => setFinal("Continue")}>
                        Continue
                    </button>
                </div>
            </form>
        </div>
    );

}