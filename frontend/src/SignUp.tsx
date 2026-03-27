import { useState } from "react";
import { useNavigate } from "react-router";

export default function SignUp() {
    const [name, setName] = useState("");
    const [pass, setPass] = useState("");
    const navigate = useNavigate();

    const BASE_URL = import.meta.env.VITE_API_URL || "http://localhost:3001/api/v1";

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        const user = name.trim();
        const pwd = pass.trim();
        if (!user || !pwd) {
            alert("Please enter a username and password");
            return;
        }

        try {
            const res = await fetch(`${BASE_URL}/users/${encodeURIComponent(user)}`, { method: "GET" });

            if (res.ok) {
                alert("Username already taken");
                return;
            }

            if (res.status !== 404) {
                const txt = await res.text();
                try {
                    const data = JSON.parse(txt);
                    alert("Server error: " + (data.message || txt));
                } catch {
                    alert("Server error: " + txt);
                }
                return;
            }

            const createRes = await fetch(`${BASE_URL}/users`, {
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({ username: user, password: pwd })
            });

            if (!createRes.ok) {
                const errTxt = await createRes.text();
                alert("Failed to sign up: " + errTxt);
                return;
            }

            alert("Sign up successfully!");
            setName("");
            setPass("");
            navigate("/");
        } catch (err) {
            console.warn("failed to save user to backend:", err);
            alert("Network error - check backend is running and URL/port are correct.");
        }
    };


    return (
        <div className="space-page flex items-center justify-center">
            <div className="space-card">
                <div className="mb-6 flex items-center justify-between gap-3">
                    <span className="space-badge">New Cadet</span>
                    <div className="floating-orb h-10 w-10 rounded-full border border-indigo-200/40 bg-indigo-300/25 blur-[1px]" />
                </div>

                <h1 className="mb-2 text-3xl font-semibold tracking-tight text-slate-100 md:text-4xl">Create Your Starfleet Profile</h1>
                <p className="mb-8 max-w-lg text-sm leading-relaxed text-slate-200/80 md:text-base">
                    Secure your identity, then jump into orbit and start conquering WordQuest missions.
                </p>

                <form className="space-y-4" onSubmit={handleSubmit}>
                    <input
                        className="space-field"
                        placeholder="Username"
                        value={name}
                        onChange={e => setName(e.target.value)} />

                    <input
                        className="space-field"
                        type="password"
                        placeholder="Password"
                        value={pass}
                        onChange={e => setPass(e.target.value)} />

                    <button className="space-btn mt-5 w-full py-3">Sign Up</button>
                </form>
            </div>
        </div>
    );

}