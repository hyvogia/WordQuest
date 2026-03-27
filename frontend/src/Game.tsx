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


    if (loading) {
        return (
            <div className="space-page flex items-center justify-center">
                <div className="space-card text-center">
                    <span className="space-badge">Calibration</span>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-100">Loading question constellation...</h2>
                </div>
            </div>
        );
    }
    if (!selectedQuestions.length) {
        return (
            <div className="space-page flex items-center justify-center">
                <div className="space-card text-center">
                    <span className="space-badge">Signal Lost</span>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-100">No questions available.</h2>
                </div>
            </div>
        );
    }

    const q = selectedQuestions[questionState];
    if (!q) {
        return (
            <div className="space-page flex items-center justify-center">
                <div className="space-card text-center">
                    <span className="space-badge">Transition</span>
                    <h2 className="mt-4 text-2xl font-semibold text-slate-100">Loading next question...</h2>
                </div>
            </div>
        );
    }

    const optionA = q.options.find(o => o.key === "A")?.value;
    const optionB = q.options.find(o => o.key === "B")?.value;
    const optionC = q.options.find(o => o.key === "C")?.value;
    const optionD = q.options.find(o => o.key === "D")?.value;


    return (
        <div className="space-page flex items-center justify-center py-6">
            <div className="space-card w-full max-w-5xl">
                <div className="mb-6 flex flex-wrap items-center justify-between gap-3">
                    <button
                        className="space-btn space-btn-secondary px-4 py-2 text-sm"
                        onClick={handleExit}>
                        Exit Mission
                    </button>

                    <div className="flex items-center gap-2 text-xs uppercase tracking-[0.12em] text-slate-300">
                        <span className="h-2 w-2 rounded-full bg-cyan-300 shadow-[0_0_10px_rgba(88,205,255,0.9)]" />
                        Orbit Stable
                    </div>
                </div>

                <div className="mb-7 grid grid-cols-1 gap-3 md:grid-cols-3">
                    <div className="rounded-xl border border-slate-200/20 bg-slate-900/30 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.09em] text-slate-300/80">Pilot</p>
                        <p className="mt-1 font-semibold text-cyan-100">{currentUser?.username ?? "Guest"}</p>
                    </div>

                    <div className="rounded-xl border border-slate-200/20 bg-slate-900/30 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.09em] text-slate-300/80">Progress</p>
                        <p className="mt-1 font-semibold text-cyan-100">Question {questionState + 1} / {selectedQuestions.length}</p>
                    </div>

                    <div className="rounded-xl border border-slate-200/20 bg-slate-900/30 px-4 py-3">
                        <p className="text-xs uppercase tracking-[0.09em] text-slate-300/80">Score</p>
                        <p className="mt-1 font-semibold text-cyan-100">{score} / {QUESTION_COUNT}</p>
                    </div>
                </div>

                <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="space-badge">Deep Space Question</span>
                    <div className="floating-orb h-9 w-9 rounded-full border border-cyan-200/40 bg-cyan-200/20" />
                </div>

                <h1 className="mb-8 text-2xl font-semibold leading-tight text-slate-100 md:text-4xl">
                    {q.question}
                </h1>

                <div className="grid grid-cols-1 gap-3 md:grid-cols-2">
                    <button
                        type="button"
                        className="question-btn disabled:cursor-not-allowed"
                        onClick={() => submitAnswer("A")}
                        disabled={submitting}>
                        <span className="mr-2 text-cyan-300">A.</span> {optionA}
                    </button>

                    <button
                        type="button"
                        className="question-btn disabled:cursor-not-allowed"
                        onClick={() => submitAnswer("B")}
                        disabled={submitting}>
                        <span className="mr-2 text-cyan-300">B.</span> {optionB}
                    </button>

                    <button
                        type="button"
                        className="question-btn disabled:cursor-not-allowed"
                        onClick={() => submitAnswer("C")}
                        disabled={submitting}>
                        <span className="mr-2 text-cyan-300">C.</span> {optionC}
                    </button>

                    <button
                        type="button"
                        className="question-btn disabled:cursor-not-allowed"
                        onClick={() => submitAnswer("D")}
                        disabled={submitting}>
                        <span className="mr-2 text-cyan-300">D.</span> {optionD}
                    </button>
                </div>
            </div>
        </div>
    );

}