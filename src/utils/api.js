import axios from "axios";

// Define the base URL for the backend
const API_BASE_URL = "https://digital-tipping.onrender.com/api";

// Hotel APIs
export const registerHotel = async (hotelData) => {
    return await axios.post(`${API_BASE_URL}/hotels/register`, hotelData, {
        headers: {
            "Content-Type": "multipart/form-data",
        },
    });
};


export const getHotels = async () => {
    return await axios.get(`${API_BASE_URL}/hotels`);
};

export const getHotelById = async (hotelId) => {
    return await axios.get(`${API_BASE_URL}/hotels/${hotelId}`);
};

// Login API
export const loginHotel = async (loginData) => {
    return await axios.post(`${API_BASE_URL}/login`, loginData);
};

// Employee APIs
export const addEmployee = async (employeeData) => {
    const token = localStorage.getItem("jwtToken");

    return await axios.post(`${API_BASE_URL}/employees`, employeeData, {
        headers: {
            "Authorization": `Bearer ${token}`,
        }
    });
};

export const getEmployeesByHotel = async (hotelId) => {
    return await axios.get(`${API_BASE_URL}/employees/${hotelId}`);
};

export const getEmployeeById = async (employeeId) => {
    try {
        const response = await axios.get(`${API_BASE_URL}/employees/employee/${employeeId}`);
        return response;
    } catch (error) {
        console.error("Error fetching employee by ID:", error);
        throw error;
    }
};

// Tip APIs
export const getTipsForEmployee = async (employeeId) => {
    return await axios.get(`${API_BASE_URL}/tips/${employeeId}`);
};

export const addTip = async (tipData) => {
    return await axios.post(`${API_BASE_URL}/tips`, tipData);
};

// Feedback APIs
export const getFeedbackForHotel = async (hotelId) => {
    return await axios.get(`${API_BASE_URL}/feedback/${hotelId}`);
};

export const submitFeedback = async (hotelId, feedbackData) => {
    return await axios.post(`${API_BASE_URL}/feedback/${hotelId}`, feedbackData);
};
