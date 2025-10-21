import { useContext, useEffect, useState } from "react";
import type { IQuestion } from "./IQuestion";
import { ScoreContext } from "./ScoresContext";
import { UsersContext } from "./UsersContext";
import { useNavigate } from "react-router";

export default function Game() {
    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";
    const QUESTION_COUNT = 10;

    const [, setAnswer] = useState<string>("");
    const [questionState, setQuestionState] = useState<number>(0);
    const [selectedQuestions, setSelectedQuestions] = useState<IQuestion[]>([]);
    const [loading, setLoading] = useState<boolean>(true);
    const [submitting, setSubmitting] = useState<boolean>(false);

    const { score, setScore } = useContext(ScoreContext);
    const { currentUser, setCurrentUser } = useContext(UsersContext);

    const navigate = useNavigate();

    useEffect(() => {
        let mounted = true;
        const ac = new AbortController();

        (async () => {
            try {
                const res = await fetch(`${BASE_URL}/questions`, { signal: ac.signal });
                if (!res.ok) {
                    console.error("Questions fetch failed:", res.status);
                    if (mounted) setSelectedQuestions([]);
                    return;
                }
                const payload = await res.json().catch(() => null);
                if (!mounted) return;

                const data = payload && (payload.data ?? payload);
                if (Array.isArray(data)) {
                    const shuffled = [...data].sort(() => Math.random() - 0.5).slice(0, QUESTION_COUNT);
                    setSelectedQuestions(shuffled);
                } else {
                    setSelectedQuestions([]);
                }
            } catch (err) {
                if ((err as any).name !== "AbortError") {
                    console.error("Failed to fetch questions", err);
                    if (mounted) setSelectedQuestions([]);
                }
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
            ac.abort();
        };
    }, []);

    const submitAnswer = async (choice: "A" | "B" | "C" | "D") => {
        if (submitting) return;
        if (!selectedQuestions.length) return;

        const currentIndex = questionState;
        const current = selectedQuestions[currentIndex];
        if (!current) return;

        const correct = choice === current.answer;
        const newScore = correct ? score + 1 : score;

        if (correct) setScore(prev => prev + 1);

        const isLast = currentIndex === selectedQuestions.length - 1;

        setSubmitting(true);
        try {
            if (isLast) {
                try {
                    await fetch(`${BASE_URL}/scores`, {
                        method: "POST",
                        headers: { "Content-Type": "application/json" },
                        body: JSON.stringify({ username: currentUser?.username ?? "Guest", score: newScore })
                    });
                } catch (err) {
                    console.warn("failed to upsert score to backend:", err);
                } finally {
                    navigate("/summary");
                }
            } else {
                setQuestionState(prev => prev + 1);
                if (!correct) alert("Wrong answer!");
            }
        } finally {
            setAnswer("");
            if (!isLast) setSubmitting(false);
        }
    };

    const handleExit = () => {
        const ok = window.confirm("You are about to log out. Your progress will be lost. Do you want to continue?");
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