import { Link, useNavigate } from "react-router-dom";
import { useState, useEffect } from "react";

const Header = () => {
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const navigate = useNavigate();

    useEffect(() => {
        const token = localStorage.getItem("jwtToken");
        if (token) {
            setIsLoggedIn(true);
        }
    }, []);

    // Handle logout
    const handleLogout = () => {
        localStorage.removeItem("jwtToken");
        localStorage.removeItem("hotelId");
        setIsLoggedIn(false);
        navigate("/login");
    };

    return (
        <header className="bg-blue-500 text-white p-4">
            <div className="container mx-auto flex justify-between items-center">
                <h1 className="text-lg font-bold">
                    <Link to="/">Digital Tipping</Link>
                </h1>
                <nav>
                    <ul className="flex space-x-4">
                        {!isLoggedIn && (
                            <>
                                <li>
                                    <Link to="/register" className="hover:underline">
                                        Hotel Registration
                                    </Link>
                                </li>
                                <li>
                                    <Link to="/login" className="hover:underline">
                                        Login
                                    </Link>
                                </li>
                            </>
                        )}
                        {isLoggedIn && (
                            <li>
                                <button
                                    onClick={handleLogout}
                                    className="hover:underline bg-blue-700 text-white px-3 py-1 rounded"
                                >
                                    Logout
                                </button>
                            </li>
                        )}
                    </ul>
                </nav>
            </div>
        </header>
    );
};

export default Header;
