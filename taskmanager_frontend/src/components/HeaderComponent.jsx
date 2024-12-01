import {Link, useLocation } from "react-router-dom";
import { useAuth} from "../context/AuthContext";

export default function HeaderComponent() {

    const authContext = useAuth();
    const {user} = useAuth();
    const isAuthenticated = authContext.isAuthenticated;

    const location = useLocation();

    function logout(){
        authContext.logout();
    }

    return (
        <div>
            <div className="w-full h-12 bg-gray-300 border-gray-400"></div>

            <div className="w-full bg-white h-16 flex items-center px-12 border-b-2">
                <nav className="flex w-full justify-between">
                    <div className="flex space-x-6">
                        {isAuthenticated && <Link to={`/dashboard/${user.username}`} className={`font-bold ${
                            location.pathname === `/dashboard/${user.username}`
                                ? "text-indigo-600"
                                : "text-gray-700"
                        }`}
                        >Dashboard</Link>}

                        {isAuthenticated && <Link to={`/tasklist/${user.username}`} className={`font-bold ${
                            location.pathname === `/tasklist/${user.username}`
                                ? "text-indigo-600"
                                : "text-gray-700"
                        }`}
                        >Task list</Link>}


                    </div>
                    <div className="flex">

                        {location.pathname === "/signup" && (
                            <Link to="/login">
                                <button
                                    className="ml-4 px-3 p-1 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600">
                                    Login
                                </button>
                            </Link>
                        )}

                        {location.pathname === "/login" && (
                            <Link to="/signup">
                                <button
                                    className="ml-4 px-3 p-1 bg-indigo-500 text-white font-semibold rounded hover:bg-indigo-600">
                                    Sign Up
                                </button>
                            </Link>
                        )}

                        {!(location.pathname === "/login" || location.pathname==="/signup") && (
                            <button
                                onClick={logout}
                                className="ml-4 px-3 p-1 bg-red-500 text-white font-semibold rounded hover:bg-red-600">
                                Sign Out
                            </button>
                        )}
                    </div>
                </nav>
            </div>
        </div>
    )
}




