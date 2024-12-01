import { useState } from "react";
import { addEmployee } from "../utils/api";
import { toast } from 'react-hot-toast';

// eslint-disable-next-line react/prop-types
const AddEmployeeModal = ({ hotelId, setShowModal, updateEmployeeList }) => {
    const [formData, setFormData] = useState({ name: "", bankDetails: "" });

    const handleChange = (e) => {
        const { name, value } = e.target;
        setFormData({ ...formData, [name]: value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            // Ensure hotelId is being correctly passed with the employee data
            const response = await addEmployee({ ...formData, hotelId });

            setShowModal(false); // Close the modal
            updateEmployeeList(response.data.employee); // Update employee list with the new employee
            toast.success("Employee added successfully!");
        } catch (error) {
            toast.error("Login First")
            console.error(error);
        }
    };

    return (
        <div className="fixed inset-0 bg-gray-500 bg-opacity-50 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded shadow-md w-96">
                <h2 className="text-2xl font-bold mb-4">Add Employee</h2>
                <form onSubmit={handleSubmit}>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="name">
                            Employee Name
                        </label>
                        <input
                            id="name"
                            name="name"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.name}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 font-bold mb-2" htmlFor="bankDetails">
                            Bank Details
                        </label>
                        <input
                            id="bankDetails"
                            name="bankDetails"
                            type="text"
                            className="w-full p-2 border border-gray-300 rounded"
                            value={formData.bankDetails}
                            onChange={handleChange}
                            required
                        />
                    </div>
                    <div className="flex justify-between">
                        <button
                            type="button"
                            className="bg-gray-500 text-white p-2 rounded hover:bg-gray-600"
                            onClick={() => setShowModal(false)}
                        >
                            Cancel
                        </button>
                        <button
                            type="submit"
                            className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                        >
                            Add Employee
                        </button>
                    </div>
                </form>
            </div>
        </div>
    );
};

export default AddEmployeeModal;
