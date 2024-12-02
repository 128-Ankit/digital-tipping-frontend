import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { registerHotel } from "../utils/api";
import { toast } from "react-hot-toast";

const HotelRegistration = () => {
    const [formData, setFormData] = useState({
        name: "",
        email: "",
        password: "",
        address: "",
        phone: "",
        description: "",
    });

    const [image, setImage] = useState(null);
    const [bannerImage, setBannerImage] = useState(null);
    const [images, setImages] = useState([]);
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);
    const navigate = useNavigate();

    // Handle form field changes
    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    // Handle file field changes and update state
    const handleFileChange = (e) => {
        const { name, files } = e.target;

        // Handle the case for single file inputs
        if (name === "image") {
            setImage(files[0]); // Set single image
        } else if (name === "bannerImage") {
            setBannerImage(files[0]); // Set single banner image
        } else if (name === "images") {
            // Convert FileList to an array and ensure unique files
            const newFiles = Array.from(files);

            setImages((prevImages) => {
                // Create a Set to track unique files by name and size
                const updatedImages = [...prevImages];

                newFiles.forEach((newFile) => {
                    // Check if the file is already in the images array based on name or size to avoid duplicates
                    const isDuplicate = updatedImages.some(file => file.name === newFile.name && file.size === newFile.size);

                    // Only add the new file if it is not a duplicate
                    if (!isDuplicate) {
                        updatedImages.push(newFile);
                    }
                });

                return updatedImages; // Return updated images list
            });
        }
    };


    // Handle form submission
    const handleSubmit = async (e) => {
        e.preventDefault();

        setLoading(true);

        try {
            // Prepare FormData for the request (includes both text and file fields)
            const hotelFormData = new FormData();

            // Append the text fields to FormData
            Object.keys(formData).forEach((key) => {
                hotelFormData.append(key, formData[key]);
            });

            // Append file fields to FormData
            if (image) hotelFormData.append("image", image);
            if (bannerImage) hotelFormData.append("bannerImage", bannerImage);
            if (images.length > 0) {
                images.forEach((img) => hotelFormData.append("images", img)); // Add multiple images
            }

            // Call API to register hotel
            const response = await registerHotel(hotelFormData);

            // Get hotelId from the API response
            const { _id: hotelId } = response.data.hotel;

            if (hotelId) {
                toast.success("Hotel registered successfully!");
                navigate(`/qr/${hotelId}`);
            } else {
                setError("Hotel ID is not returned. Check response format.");
            }
        } catch (error) {
            setError("Error registering hotel.");
            console.error("Registration Error:", error);
        } finally {
            setLoading(false);
        }
    };

    return (
        <div className="min-h-screen bg-gray-100 flex items-center justify-center">
            <div className="w-full max-w-4xl bg-white shadow-lg rounded-xl p-8 transform hover:scale-102 transition-transform duration-300">
                <h2 className="text-3xl font-bold text-center text-gray-700 mb-6">
                    Register Your Hotel
                </h2>
                {error && (
                    <p className="text-center text-red-500 font-medium mb-4">{error}</p>
                )}
                <form onSubmit={handleSubmit} className="grid grid-cols-2 gap-6" encType="multipart/form-data">
                    {/* Hotel Name */}
                    <div className="col-span-2 md:col-span-1">
                        <label htmlFor="name" className="block text-gray-600 font-medium">
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
                        <label htmlFor="email" className="block text-gray-600 font-medium">
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
                        <label htmlFor="password" className="block text-gray-600 font-medium">
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
                        <label htmlFor="phone" className="block text-gray-600 font-medium">
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
                        <label htmlFor="address" className="block text-gray-600 font-medium">
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
                        <label htmlFor="description" className="block text-gray-600 font-medium">
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

                    {/* Hotel Image */}
                    <div className="col-span-2">
                        <label htmlFor="image" className="block text-gray-600 font-medium">
                            Hotel Image (Single)
                        </label>
                        <input
                            type="file"
                            id="image"
                            name="image"
                            className="w-full mt-2"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Banner Image */}
                    <div className="col-span-2">
                        <label htmlFor="bannerImage" className="block text-gray-600 font-medium">
                            Banner Image
                        </label>
                        <input
                            type="file"
                            id="bannerImage"
                            name="bannerImage"
                            className="w-full mt-2"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Additional Images */}
                    <div className="col-span-2">
                        <label htmlFor="images" className="block text-gray-600 font-medium">
                            Additional Images (Multiple)
                        </label>
                        <input
                            type="file"
                            id="images"
                            name="images"
                            multiple
                            className="w-full mt-2"
                            onChange={handleFileChange}
                            required
                        />
                    </div>

                    {/* Submit Button */}
                    <div className="col-span-2 text-center">
                        <button
                            type="submit"
                            className="w-full bg-blue-500 text-white py-3 rounded-md font-semibold hover:bg-blue-600 transition-all duration-300"
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="spinner-border animate-spin">Registering...</span>
                            ) : (
                                "Register Hotel"
                            )}
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default HotelRegistration;
