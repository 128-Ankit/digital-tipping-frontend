import { Routes, Route } from "react-router-dom";
import HomePage from "../pages/HomePage";
import HotelDetails from "../pages/HotelDetails";
import EmployeeDetails from "../pages/EmployeeDetails";
import HotelRegistration from "../pages/HotelRegistration";
import QRPage from "../pages/QRPage";  // Import QRPage component
import Feedback from "../pages/Feedback";
import EmployeeTips from '../pages/EmployeeTips';
import LoginPage from "../pages/LoginPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/hotels/:hotelId" element={<HotelDetails />} />
      <Route path="/employees/:employeeId" element={<EmployeeDetails />} />
      <Route path="/register" element={<HotelRegistration />} />
      <Route path="/login" element={<LoginPage />} />
      <Route path="/qr/:hotelId" element={<QRPage />} />  {/* QR Page Route */}
      <Route path="/feedback" element={<Feedback />} />
      <Route path="/employee-tips/:employeeId" element={<EmployeeTips />} />

    </Routes>
  );
};

export default AppRoutes;
