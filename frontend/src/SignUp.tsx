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
            navigate("/login");
        } catch (err) {
            console.warn("failed to save user to backend:", err);
            alert("Network error - check backend is running and URL/port are correct.");
        }
    };


    return (
        <div className="m-2 flex flex-col items-center justify-center min-h-screen">
            <h1>Register</h1>
            <form
                className="m-2 flex flex-col items-center justify-center"
                onSubmit={handleSubmit}>
                <input
                    className="p-2 m-2 border rounded"
                    placeholder="username"
                    value={name}
                    onChange={e => setName(e.target.value)}
                />
                <input
                    className="p-2 m-2 border rounded"
                    type="password"
                    placeholder="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                />
                <button className="m-2 border p-2 rounded">Sign Up</button>
            </form>
        </div>
    )
}