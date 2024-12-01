import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function LoginComponent() {
    const { login } = useAuth();
    const [username, setUsername] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");
    const navigate = useNavigate();

    const handleUsernameChange = (e) => setUsername(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // vasic validation
        if (!username || !password) {
            setErrorMessage("Both fields are required.");
            return;
        }

        try {
            await login(username, password);
            setErrorMessage("");
            navigate(`/dashboard/${username}`);
        } catch (error) {
            setErrorMessage(error.message);
        }

    };

    return (
        <div className="flex-grow flex items-start px-6 py-12">
            <div className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-left mb-8">
                    Welcome to To-do App
                </h1>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Login Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            value={username}
                            onChange={handleUsernameChange}
                        />
                    </div>
                    <div>
                        <input
                            type="password"
                            placeholder="Password"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            value={password}
                            onChange={handlePasswordChange}
                        />
                    </div>
                    <div>
                        <button
                            type="submit"
                            className="w-full py-2 bg-indigo-500 text-white font-medium rounded hover:bg-indigo-600"
                        >
                            Sign in to continue
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
