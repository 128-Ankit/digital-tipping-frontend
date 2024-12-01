import { useEffect, useState } from "react";
import { getHotels } from "../utils/api";
import { Link } from "react-router-dom";

const HomePage = () => {
  const [hotels, setHotels] = useState([]);
  const [currentPage, setCurrentPage] = useState(1); // Current page number
  const [hotelsPerPage] = useState(8); // Hotels per page

  useEffect(() => {
    const fetchHotels = async () => {
      try {
        const response = await getHotels();
        setHotels(response.data);
      } catch (error) {
        console.error("Error fetching hotels:", error);
      }
    };

    fetchHotels();
  }, []);

  // Calculate the index of the first and last hotel on the current page
  const indexOfLastHotel = currentPage * hotelsPerPage;
  const indexOfFirstHotel = indexOfLastHotel - hotelsPerPage;

  // Slice the hotels array to get the current page's hotels
  const currentHotels = hotels.slice(indexOfFirstHotel, indexOfLastHotel);

  // Handle page change
  const paginate = (pageNumber) => setCurrentPage(pageNumber);

  // Calculate total number of pages
  const totalPages = Math.ceil(hotels.length / hotelsPerPage);

  const dummyImage = "https://cf.bstatic.com/xdata/images/hotel/max1024x768/343327621.jpg?k=86f1c4b18df343949c0e40c25e13fc4aeb4e4fa5dd2b810512dff62b00f00f69&o=&hp=1";

  return (
    <div className="container mx-auto p-4">
      <h1 className="text-3xl font-bold text-gray-800 mb-6 text-center">Discover Our Hotels</h1>
      {hotels.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {currentHotels.map((hotel) => (
              <div
                key={hotel._id}
                className="bg-white rounded-lg shadow-md hover:shadow-lg transition-shadow duration-300 p-4"
              >
                <div className="relative pb-2/3 w-full h-[150px] rounded overflow-hidden">
                  <img
                    src={hotel.image || dummyImage}
                    alt={hotel.name || "Hotel"}
                    className="absolute h-full w-full object-cover"
                  />
                </div>
                <h2 className="text-xl font-semibold text-gray-800 mt-4">
                  <Link
                    to={`/hotels/${hotel._id}`}
                    className="text-blue-600 hover:underline"
                  >
                    {hotel.name}
                  </Link>
                </h2>
                <p className="text-gray-600">{hotel.email || "No contact info available."}</p>
                <Link
                  to={`/hotels/${hotel._id}`}
                  className="mt-4 inline-block text-sm text-white bg-blue-600 hover:bg-blue-700 rounded px-4 py-2"
                >
                  View Details
                </Link>
              </div>
            ))}
          </div>

          {/* Pagination Controls */}
          <div className="flex justify-center mt-6">
            <button
              onClick={() => paginate(currentPage - 1)}
              disabled={currentPage === 1}
              className="px-4 py-2 bg-blue-400 text-white rounded disabled:bg-gray-300"
            >
              Previous
            </button>
            <span className="px-4 py-2 text-lg">
              Page {currentPage} of {totalPages}
            </span>
            <button
              onClick={() => paginate(currentPage + 1)}
              disabled={currentPage === totalPages}
              className="px-4 py-2 bg-blue-400 text-white rounded disabled:bg-gray-300"
            >
              Next
            </button>
          </div>
        </>
      ) : (
        <div className="text-center">
          <p className="text-gray-600">No hotels found. Please try again later.</p>
        </div>
      )}
    </div>
  );
};

export default HomePage;
