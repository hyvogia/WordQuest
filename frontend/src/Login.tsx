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
        <div className="m-2 flex flex-col items-center justify-center min-h-screen font-sans text-gray-800">
            <h1 className="text-3xl font-semibold mb-8">Login</h1>
            <form
                className="m-2 flex flex-col items-center justify-center space-y-4"
                onSubmit={handleSubmit}>
                <input
                    className="w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-gray-700"
                    type="text"
                    value={name}
                    onChange={e => setName(e.target.value)}
                    placeholder="Username"/>
                <input
                    className="w-64 p-3 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-300 placeholder-gray-400 text-gray-700"
                    type="password"
                    value={pass}
                    onChange={e => setPass(e.target.value)}
                    placeholder="Password"/>
                <div className="flex flex-row space-x-4 mt-4">
                    <button
                        className="w-32 py-3 rounded-md bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 shadow-sm"
                        onClick={() => setLogin("Sign Up")}>
                        Sign Up
                    </button>
                    <button
                        className="w-32 py-3 rounded-md bg-gray-100 hover:bg-gray-200 text-lg font-medium text-gray-800 shadow-sm"
                        onClick={() => setLogin("Join Game")}>
                        Join Game
                    </button>
                </div>
            </form>
        </div>
    );
}