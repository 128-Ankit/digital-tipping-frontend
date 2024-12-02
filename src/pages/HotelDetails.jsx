import { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import {
  getHotelById,
  getEmployeesByHotel,
  getFeedbackForHotel,
  submitFeedback,
} from "../utils/api";
import AddEmployeeModal from "../components/AddEmployeeModal";

const HotelDetails = () => {
  const { hotelId } = useParams();
  const [hotel, setHotel] = useState(null);
  const [employees, setEmployees] = useState([]);
  const [showModal, setShowModal] = useState(false);
  const [feedback, setFeedback] = useState({ rating: 0, comment: "", user: "" });
  const [feedbacks, setFeedbacks] = useState([]);

  // Fetch hotel details and employees
  useEffect(() => {
    const fetchHotelAndEmployees = async () => {
      try {
        // Fetch hotel details
        const hotelResponse = await getHotelById(hotelId);
        setHotel(hotelResponse.data);
        console.log("hotelResponse: ", hotelResponse);


        // Fetch employees for the hotel
        const employeeResponse = await getEmployeesByHotel(hotelId);
        setEmployees(employeeResponse.data);
      } catch (error) {
        console.error("Error fetching hotel or employees:", error);
      }
    };

    fetchHotelAndEmployees();
  }, [hotelId]);

  // Fetch feedback whenever hotelId changes or the component reloads
  useEffect(() => {
    const fetchFeedback = async () => {
      try {
        const feedbackResponse = await getFeedbackForHotel(hotelId);
        setFeedbacks(feedbackResponse.data.feedbacks || []);
      } catch (error) {
        console.error("Error fetching feedback:", error);
      }
    };

    if (hotelId) {
      fetchFeedback(); // Fetch feedback on page load
    }
  }, [hotelId]);

  // Calculate average rating of the hotel
  const calculateAverageRating = () => {
    if (feedbacks.length === 0) return 0;
    const totalRating = feedbacks.reduce((acc, curr) => acc + curr.rating, 0);
    return (totalRating / feedbacks.length).toFixed(1); // Rounded to 1 decimal place
  };

  // Handle feedback form submission
  const handleFeedbackSubmit = async (e) => {
    e.preventDefault();
    const newFeedback = { ...feedback, hotelId: hotel._id };

    try {
      const response = await submitFeedback(hotel._id, newFeedback);
      setFeedbacks((prev) => [...prev, response.data.feedback]);
      setFeedback({ rating: 0, comment: "", user: "" }); // Reset form after submission
    } catch (error) {
      console.error("Error submitting feedback:", error);
    }
  };

  // Update employee list after adding a new employee
  const updateEmployeeList = (newEmployee) => {
    setEmployees((prevEmployees) => [...prevEmployees, newEmployee]);
  };

  if (!hotel) {
    return (
      <div className="flex flex-col justify-center items-center mt-56">
        <div className="loader">
        </div>
        <p className="text-xl pt-3">Loading...</p>
      </div>
    )
  }

  const hotelBannerImage = hotel.bannerImage;
  console.log("bannerImage: ", hotelBannerImage);

  const hotelImages = hotel.images;
  console.log("hotelImages: ", hotelImages);

  // Function to format the date
  const formatDate = (date) => {
    const options = {
      year: "numeric",
      month: "short",
      day: "numeric",
      hour: "2-digit",
      minute: "2-digit",
      second: "2-digit",
    };
    return new Date(date).toLocaleString(undefined, options);
  };

  return (
    <div className="container mx-auto p-6">
      <div className="bg-white shadow-lg rounded-lg overflow-hidden">
        {/* Banner Image with Hotel Name on Top Left with Dark Transparent Background */}
        <div className="relative">

          <img
            src={hotelBannerImage}
            alt="Hotel Banner"
            className="w-full h-72 object-cover rounded-lg"
            placeholder={hotelBannerImage}
          />
          <div className="absolute top-4 left-4 text-white text-3xl font-bold bg-black bg-opacity-50 p-2 rounded">
            <div>
              <p>{hotel.name}</p>
              <p>{hotel.email}</p>
            </div>
          </div>
        </div>

        {/* Hotel Details */}
        <div className="p-6">
          <div className="grid md:grid-cols-2 gap-6">
            {/* Left Column */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Hotel Details</h3>
              <p className="mb-2">
                <strong>Address:</strong> {hotel.address || "123 Fake Street, City, Country"}
              </p>
              <p className="mb-2">
                <strong>Phone:</strong> {hotel.phone || "+1 (555) 123-4567"}
              </p>
              <p className="mb-4">
                <strong>Description:</strong> {hotel.description || "A beautiful hotel with modern amenities, excellent customer service, and a great location."}
              </p>

              {/* Display overall rating */}
              <div className="mb-4">
                <h4 className="text-lg font-semibold">Overall Rating</h4>
                <p className="text-xl">
                  {calculateAverageRating()} / 5{" "}
                  <span className="text-gray-500">({feedbacks.length} reviews)</span>
                </p>
              </div>

              <button
                className="bg-green-500 text-white px-4 py-2 rounded-full hover:bg-green-600 transition"
                onClick={() => setShowModal(true)}
              >
                Add Employee
              </button>
            </div>

            {/* Right Column - Employees List */}
            <div>
              <h3 className="text-xl font-semibold mb-4">Employees</h3>
              <ul className="bg-white p-4 shadow-md rounded-lg">
                {employees.map((employee) => (
                  <li key={employee._id} className="p-2 border-b">
                    <Link
                      to={`/employees/${employee._id}`}
                      className="text-blue-500 hover:underline font-medium"
                    >
                      {employee.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* Other Images Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Other Images</h3>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
            {hotelImages.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={img}
                className="w-full h-48 object-cover rounded-lg shadow-lg"
               
              />
            ))}
          </div>
        </div>

        {/* Feedback Section */}
        <div className="p-6">
          <h3 className="text-xl font-semibold mb-4">Customer Feedback</h3>

          {/* Feedback Form */}
          <form onSubmit={handleFeedbackSubmit} className="space-y-4">
            <div>
              <label className="text-lg">Your Name:</label>
              <input
                type="text"
                value={feedback.user}
                onChange={(e) => setFeedback({ ...feedback, user: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter your name"
              />
            </div>

            <div className="flex items-center space-x-2">
              <label className="text-lg">Rating:</label>
              <select
                value={feedback.rating}
                onChange={(e) => setFeedback({ ...feedback, rating: parseInt(e.target.value) })}
                className="border border-gray-300 p-2 rounded"
              >
                <option value={0}>Select Rating</option>
                {[1, 2, 3, 4, 5].map((rating) => (
                  <option key={rating} value={rating}>{rating}</option>
                ))}
              </select>
            </div>

            <div>
              <label className="text-lg">Comment:</label>
              <textarea
                value={feedback.comment}
                onChange={(e) => setFeedback({ ...feedback, comment: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Write your feedback here"
                rows="4"
              />
            </div>

            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded-full hover:bg-blue-600 transition"
            >
              Submit Feedback
            </button>
          </form>

          {/* Displaying Feedbacks */}
          <div className="mt-6">
            <h4 className="text-lg font-semibold">Recent Feedbacks</h4>
            <ul className="space-y-4">
              {feedbacks.map((feedback, index) => (
                <li key={index} className="p-4 border border-gray-200 rounded">
                  <div className="flex flex-col sm:flex-row sm:items-center sm:space-x-4">
                    <span className="text-yellow-500 text-xl sm:text-base">
                      ⭐ {feedback.rating}
                    </span>
                    <div className="sm:flex-1">
                      <p className="text-sm text-gray-600">{feedback.comment}</p>
                      <p className="text-sm text-gray-500">- {feedback.user}</p>
                      <p className="text-xs text-gray-400">{formatDate(feedback.date)}</p> {/* Display date and time */}
                    </div>
                  </div>
                </li>
              ))}
            </ul>
          </div>

        </div>
      </div>

      {/* Modal to Add Employee */}
      {showModal && (
        <AddEmployeeModal hotelId={hotelId} setShowModal={setShowModal} updateEmployeeList={updateEmployeeList} />
      )}
    </div>
  );
};

export default HotelDetails;
