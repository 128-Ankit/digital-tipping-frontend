import { useState } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate for redirection
import { loginHotel } from "../utils/api"; // Your API function for login

const LoginPage = () => {
    const [email, setEmail] = useState("");
    const [password, setPassword] = useState("");
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate(); // Initialize the useNavigate hook

    // Handle login form submission
    const handleLogin = async (e) => {
        e.preventDefault();
        setError(""); // Reset error state

        // Validate inputs
        if (!email || !password) {
            setError("Please enter both email and password.");
            return;
        }

        setLoading(true);

        try {
            const loginData = { email, password };
            const response = await loginHotel(loginData);

            // Save the token and hotelId to localStorage
            localStorage.setItem("jwtToken", response.data.token);
            localStorage.setItem("hotelId", response.data.hotelId);

            // Redirect to the hotel-specific page
            navigate(`/hotels/${response.data.hotelId}`);  // Redirect to hotel page

        } catch (error) {
            setLoading(false);
            setError("Invalid credentials or server error.");
            console.error("Login Error: ", error);
        }
    };

    return (
        <div className="container mx-auto p-6">
            <div className="max-w-sm mx-auto bg-white p-6 rounded-lg shadow-md">
                <h2 className="text-2xl font-bold text-center mb-6">Hotel Login</h2>

                {/* Display error message if any */}
                {error && <div className="text-red-500 text-center mb-4">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-4">
                    <div>
                        <label className="block text-sm font-medium mb-2">Email</label>
                        <input
                            type="email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your hotel email"
                            required
                        />
                    </div>

                    <div>
                        <label className="block text-sm font-medium mb-2">Password</label>
                        <input
                            type="password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full p-2 border border-gray-300 rounded"
                            placeholder="Enter your password"
                            required
                        />
                    </div>

                    <button
                        type="submit"
                        className={`w-full bg-blue-500 text-white py-2 rounded ${loading ? "opacity-50" : "hover:bg-blue-600"}`}
                        disabled={loading}
                    >
                        {loading ? "Logging in..." : "Login"}
                    </button>
                </form>
            </div>
        </div>
    );
};

export default LoginPage;
