import { useState } from "react";
import { useNavigate } from "react-router-dom";
import {signUpService} from "../service/authService.jsx";


export default function SignupComponent() {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [errorMessage, setErrorMessage] = useState("");

    const navigate = useNavigate();

    const handleEmailChange = (e) => setEmail(e.target.value);
    const handlePasswordChange = (e) => setPassword(e.target.value);

    const handleSubmit = async (e) => {
        e.preventDefault();

        // Basic validation
        if (!email || !password) {
            setErrorMessage("Both fields are required.");
            return;
        }

        try {
            // Call the signup service to create a new user
            const response = await signUpService(email, password);
            if (response.status === 201) {
                setErrorMessage("");
                navigate(`/dashboard/${email}`);
            } else {
                setErrorMessage("Signup failed. Please try again.");
            }
        } catch (error) {
            console.error("Signup error:", error);
            setErrorMessage("An error occurred during signup. Please try again.");
        }
    };

    return (
        <div className="flex-grow flex items-start px-6 py-12">
            <div className="w-full max-w-md p-8">
                <h1 className="text-2xl font-bold text-gray-800 text-left mb-8">
                    Create an Account
                </h1>

                {/* Error Message */}
                {errorMessage && (
                    <div className="mb-4 text-red-500 text-sm">
                        {errorMessage}
                    </div>
                )}

                {/* Signup Form */}
                <form className="space-y-6" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="email"
                            placeholder="Email ID"
                            className="w-full px-4 py-2 border border-gray-300 rounded focus:outline-none focus:ring focus:ring-blue-200"
                            value={email}
                            onChange={handleEmailChange}
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
                            Sign up to create an account
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
}
