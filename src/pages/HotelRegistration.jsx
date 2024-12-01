import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerHotel } from "../utils/api";

const HotelRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        description: "",
    });
    const [error, setError] = useState("");
    const navigate = useNavigate();

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const response = await registerHotel(formData);
            const hotelId = response.data._id;
            navigate(`/qr/${hotelId}`);
        } catch (error) {
            setError("Error registering hotel.");
            console.error(error);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                    Register Your Hotel
                </h2>
                {error && (
                    <p className="text-center text-red-500 font-medium mb-4">
                        {error}
                    </p>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6">
                    {/* Hotel Name */}
                    <div className="col-span-2 md:col-span-1">
                        <label
                            htmlFor="name"
                            className="block text-gray-600 font-medium"
                        >
                            Hotel Name
                        </label>
                        <input
                            type="text"
                            id="name"
                            name="name"
                            placeholder="e.g., Grand Plaza"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Email */}
                    <div className="col-span-2 md:col-span-1">
                        <label
                            htmlFor="email"
                            className="block text-gray-600 font-medium"
                        >
                            Email
                        </label>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="example@domain.com"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.email}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Password */}
                    <div className="col-span-2 md:col-span-1">
                        <label
                            htmlFor="password"
                            className="block text-gray-600 font-medium"
                        >
                            Password
                        </label>
                        <input
                            type="password"
                            id="password"
                            name="password"
                            placeholder="********"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.password}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Phone */}
                    <div className="col-span-2 md:col-span-1">
                        <label
                            htmlFor="phone"
                            className="block text-gray-600 font-medium"
                        >
                            Phone
                        </label>
                        <input
                            type="tel"
                            id="phone"
                            name="phone"
                            placeholder="+1 234 567 890"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.phone}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Address */}
                    <div className="col-span-2">
                        <label
                            htmlFor="address"
                            className="block text-gray-600 font-medium"
                        >
                            Address
                        </label>
                        <input
                            type="text"
                            id="address"
                            name="address"
                            placeholder="e.g., 123 Street Name, City"
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.address}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    {/* Description */}
                    <div className="col-span-2">
                        <label
                            htmlFor="description"
                            className="block text-gray-600 font-medium"
                        >
                            Description
                        </label>
                        <textarea
                            id="description"
                            name="description"
                            placeholder="A brief description of your hotel..."
                            className="w-full mt-2 p-3 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-400"
                            value={formData.description}
                            onChange={handleChange}
                            rows="3"
                            required
                        ></textarea>
                    </div>
                    {/* Submit Button */}
                    <div className="col-span-2 text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all duration-300"
                        >
                            Register Hotel
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelRegistration;
