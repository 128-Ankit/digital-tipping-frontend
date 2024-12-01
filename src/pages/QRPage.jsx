import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getHotelById } from "../utils/api";

const QRPage = () => {
  const { hotelId } = useParams(); // Get hotelId from URL
  const [hotel, setHotel] = useState(null);

  useEffect(() => {
    const fetchHotel = async () => {
      try {
        const response = await getHotelById(hotelId); // Get hotel details by hotelId
        setHotel(response.data);
      } catch (error) {
        console.error("Error fetching hotel:", error);
      }
    };
    fetchHotel();
  }, [hotelId]);

  if (!hotel) return <p className="text-center text-lg font-semibold mt-10">Loading...</p>;

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 p-6">
      <div className="bg-white shadow-lg rounded-lg p-6 w-full max-w-lg">
        <h2 className="text-3xl font-bold text-center text-gray-800 mb-6">{hotel.name} QR Code</h2>

        {/* QR Code Image */}
        <div className="flex justify-center mb-6">
          <img
            src={hotel.qrCode}
            alt="Hotel QR Code"
            className="w-64 h-64 object-contain border-4 border-indigo-500 rounded-md shadow-md"
          />
        </div>

        {/* Description */}
        <p className="text-center text-gray-600 text-lg">Scan this QR code to tip employees</p>

        {/* Button */}
        <div className="mt-6 text-center">
          <a
            href={`https://tip.thegigbee.com/hotels/${hotel._id}`}
            className="inline-block bg-indigo-600 text-white py-2 px-6 rounded-md hover:bg-indigo-700 transition duration-300"
          >
            Tip Now
          </a>
        </div>
      </div>
    </div>
  );
};

export default QRPage;
