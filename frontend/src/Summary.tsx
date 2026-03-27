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
        <div className="space-page flex items-center justify-center">
            <div className="space-card text-center">
                <div className="mb-5 flex justify-center">
                    <span className="space-badge">Mission Debrief</span>
                </div>

                <h1 className="mb-3 text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">
                    Final Result for {currentUser?.username ?? "Player"}
                </h1>

                <p className="mx-auto mb-7 max-w-xl text-sm text-slate-200/80 md:text-base">
                    Atmospheric re-entry complete. Review your score and decide your next launch.
                </p>

                <div className="mx-auto mb-8 flex max-w-md flex-row items-center justify-center rounded-2xl border border-cyan-200/35 bg-cyan-300/10 px-7 py-5 shadow-[0_18px_36px_rgba(0,0,0,0.35)]">
                    <p className="text-2xl font-semibold tracking-tight text-sky-100">
                        You scored {score}/10
                    </p>
                </div>

                <form onSubmit={handleAnswer} className="mt-2">
                    <div className="grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            className="space-btn space-btn-secondary w-full py-3"
                            onClick={() => setFinal("Exit")}>
                            Exit Game
                        </button>

                        <button
                            className="space-btn w-full py-3"
                            onClick={() => setFinal("Continue")}>
                            Continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );

}