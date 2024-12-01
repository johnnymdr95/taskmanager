import PropTypes from 'prop-types'; // Import PropTypes
import { useState } from "react";
import { executeJwtAuthenticationService } from "../service/authService.jsx";
import { AuthContext } from "./AuthContext.jsx";

export default function AuthProvider({ children }) {
    const [isAuthenticated, setIsAuthenticated] = useState(false);
    const [token, setToken] = useState(null);
    const [user, setUser] = useState(null);

    const login = async (username, password) => {
        try {
            const response = await executeJwtAuthenticationService(username, password);
            if (response.status === 200) {
                const jwtToken = 'Bearer ' + response.data.token;
                const userData = { username };
                setIsAuthenticated(true);
                setUser(userData);
                setToken(jwtToken);
            } else {
                throw new Error("Invalid email or password");
            }
        } catch (error) {
            console.error("Login failed:", error);
            throw new Error("An error occurred during login. Please try again.");
        }
    };

    const logout = () => {
        setIsAuthenticated(false);
        setUser(null);
        setToken(null);
    };

    return (
        <AuthContext.Provider value={{ isAuthenticated, user, login, logout, token }}>
            {children}
        </AuthContext.Provider>
    );
}

// Add propTypes validation for children
AuthProvider.propTypes = {
    children: PropTypes.node.isRequired, // Validates that children is a required node
};
