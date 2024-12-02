import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";  // Import useNavigate
import { getEmployeeById } from "../utils/api";

const EmployeeDetails = () => {
    const { employeeId } = useParams();  // Get employeeId from the URL
    const [employee, setEmployee] = useState(null);
    const [hotel, setHotel] = useState(null);  // Store hotel details
    const [loading, setLoading] = useState(true);  // Add loading state
    const navigate = useNavigate();  // Initialize useNavigate for redirection

    useEffect(() => {
        const fetchEmployeeAndHotel = async () => {
            try {
                // Fetch the employee details
                const employeeResponse = await getEmployeeById(employeeId);
                setEmployee(employeeResponse.data);

                // Fetch hotel details from employee data
                const employeeHotel = employeeResponse.data.hotel;
                setHotel(employeeHotel);  // Store the hotel details

                setLoading(false);  // Set loading to false after data is fetched
            } catch (error) {
                console.error("Error fetching employee or hotel details:", error);
                setLoading(false);  // Set loading to false if there's an error
            }
        };

        fetchEmployeeAndHotel();
    }, [employeeId]);

    // Handle loading state
    if (loading) return <p className="text-center text-xl">Loading...</p>;

    // Handle case if employee or hotel is not found
    if (!employee || !hotel) {
        return <p className="text-center text-xl">Employee or hotel not found.</p>;
    }

    // Handle Pay Button Click
    const handlePayClick = () => {
        // Redirect to EmployeeTips page (pass employeeId or hotelId as needed)
        navigate(`/employee-tips/${employeeId}`);  // Assuming you have this route setup
    };

    return (
        <div className="max-w-4xl mx-auto p-6">
            <div className="bg-white shadow-lg rounded-lg overflow-hidden">
                <div className="bg-indigo-600 text-white py-6 px-8 flex items-center space-x-6">
                    <div className="flex-shrink-0">
                        {/* Avatar can be added here */}
                        <div className="w-20 h-20 bg-gray-400 text-white rounded-full flex items-center justify-center text-xl">
                            {employee.name.split(" ").map(word => word[0]).join("")}
                        </div>
                    </div>
                    <div>
                        <h2 className="text-4xl font-bold">{employee.name}</h2>
                        <p className="text-xl mt-1">Hotel: <span className="font-semibold">{hotel.name}</span></p>
                    </div>
                </div>

                <div className="p-6 space-y-6">
                    <div className="flex flex-col gap-4">
                        <div className="flex items-center space-x-4">
                            <span className="text-lg text-gray-800 font-medium">Bank Details:</span>
                            <p className="text-lg text-gray-700">{employee.bankDetails}</p>
                        </div>
                        <div className="flex items-center space-x-4">
                            <span className="text-lg text-gray-800 font-medium">Hotel Email:</span>
                            <p className="text-lg text-gray-700">{hotel.email}</p>
                        </div>
                    </div>

                    {/* Pay Button to Navigate */}
                    <div className="flex space-x-4 mt-8">
                        <button
                            onClick={() => window.history.back()}
                            className="w-full bg-indigo-600 text-white py-3 rounded-md hover:bg-indigo-700 transition duration-200"
                        >
                            Back to Hotels
                        </button>
                        <button
                            onClick={handlePayClick}  // Trigger the redirect
                            className="w-full bg-green-600 text-white py-3 rounded-md hover:bg-green-700 transition duration-200"
                        >
                            Pay
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default EmployeeDetails;
