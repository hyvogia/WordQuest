import { useContext, useState } from "react";
import { UsersContext } from "./UsersContext";
import { useNavigate } from "react-router";

export default function Login() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const [login, setLogin] = useState("");

    const { setCurrentUser } = useContext(UsersContext);

    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();

        if (login === "Sign Up") {
            setName("");
            setPass("");
            navigate("/signup");
            return;
        }

        const user: string = name;
        const pwd: string = pass;
        if (!user || !pwd) {
            alert("Please fill in all fields");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(user)}`, { method: "GET" });

            if (!res.ok) {
                if (res.status === 404) {
                    alert("User not found");
                } else if (res.status >= 500) {
                    alert("Server error, please try again");
                } else {
                    const txt = await res.text();
                    alert("Server error: " + txt);
                }
                return;
            }

            const payload = await res.json();
            const found = payload?.data ?? payload;
            if (!found) {
                alert("Unexpected server response");
                return;
            }

            setCurrentUser(found);
            setName("");
            setPass("");
            navigate("/game");
        } catch (err) {
            console.error("Login error (fetch failed):", err);
            alert("Failed to connect to server — check backend is running and URL/port are correct.");
        }
    };

    return (
        <div className="space-page flex items-center justify-center">
            <div className="space-card">
                <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="space-badge">Orbital Access</span>
                    <div className="floating-orb h-10 w-10 rounded-full border border-cyan-200/40 bg-cyan-300/20 blur-[1px]" />
                </div>

                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">WordQuest Mission Control</h1>
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-200/80 md:text-base">
                    Enter your credentials to launch from the upper atmosphere into deep-space quiz mode.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        className="space-field"
                        type="text"
                        value={name}
                        onChange={e => setName(e.target.value)}
                        placeholder="Username" />
                    <input
                        className="space-field"
                        type="password"
                        value={pass}
                        onChange={e => setPass(e.target.value)}
                        placeholder="Password" />

                    <div className="mt-6 grid grid-cols-1 gap-3 sm:grid-cols-2">
                        <button
                            className="space-btn space-btn-secondary w-full py-3"
                            onClick={() => setLogin("Sign Up")}>
                            Sign Up
                        </button>
                        <button
                            className="space-btn w-full py-3"
                            onClick={() => setLogin("Join Game")}>
                            Join Game
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}