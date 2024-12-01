import { BrowserRouter, Navigate, Route, Routes } from "react-router-dom";
import LoginComponent from "./LoginComponent";
import HeaderComponent from "./HeaderComponent";
import Dashboard from "./DashboardComponent";
import TaskList from "./TaskList";
import SignupComponent from "./SignupComponent";
import {useAuth} from "../context/AuthContext.jsx";

function PrivateRoute({ children }) {
    const { isAuthenticated } = useAuth();

    return isAuthenticated ? children : <Navigate to="/login" />;
}

export default function TodoApp() {
    return (
        <div>
            <BrowserRouter>
                <HeaderComponent />
                <Routes>
                    <Route path="/" element={<Navigate to="/login" />} />
                    <Route path="/login" element={<LoginComponent />} />
                    <Route path="/signup" element={<SignupComponent />} />


                    <Route
                        path="/dashboard/:username"
                        element={
                            <PrivateRoute>
                                <Dashboard />
                            </PrivateRoute>
                        }
                    />
                    <Route
                        path="/tasklist/:username"
                        element={
                            <PrivateRoute>
                                <TaskList />
                            </PrivateRoute>
                        }
                    />
                </Routes>
            </BrowserRouter>
        </div>
    );
}


