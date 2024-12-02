import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { getTipsForEmployee, addTip } from "../utils/api";

const EmployeeTips = () => {
  const { employeeId } = useParams(); // Automatically fetch employeeId from URL
  const [tips, setTips] = useState([]);
  const [newTip, setNewTip] = useState({ amount: "", comment: "", employeeId: employeeId }); // Pre-fill with employeeId from URL
  const [employeeName, setEmployeeName] = useState("");
  const [loading, setLoading] = useState(true);

  // Fetch tips and associated data for the employee
  useEffect(() => {
    const fetchTips = async () => {
      try {
        const response = await getTipsForEmployee(employeeId);
        setTips(response.data.tips);
        setEmployeeName(response.data.tips[0]?.employee?.name || ""); // Get employee name from tips
        setLoading(false);
      } catch (error) {
        console.error("Error fetching tips:", error);
        setLoading(false);
      }
    };

    fetchTips();
  }, [employeeId]);

  // Handle form submission to add a new tip
  const handleTipSubmit = async (e) => {
    e.preventDefault();

    // Make sure the employeeId is included in the request
    if (!newTip.employeeId || newTip.employeeId === "") {
      alert("Employee ID is required!");
      return;
    }

    try {
      const tipData = { ...newTip };
      const response = await addTip(tipData);
      setTips((prevTips) => [...prevTips, response.data.tip]);
      setNewTip({ amount: "", comment: "", employeeId: employeeId }); // Reset form with employeeId pre-filled
    } catch (error) {
      console.error("Error adding tip:", error);
    }
  };

  if (loading) return
  <div className="flex justify-center items-center h-40">
    <div className="loader"></div>
  </div>

  return (
    <div className="container mx-auto p-6">
      <div className="flex flex-col md:flex-row space-y-6 md:space-y-0 md:space-x-6">

        {/* Add Tip Form */}
        <div className="w-full md:w-2/3 p-4 bg-white shadow rounded-lg">
          <h3 className="text-lg font-semibold mb-3">Add a Tip</h3>
          <form onSubmit={handleTipSubmit} className="space-y-4">
            <div>
              <label className="block text-sm font-medium">Employee ID</label>
              <input
                type="text"
                value={newTip.employeeId || employeeId} // Pre-fill employeeId from URL
                onChange={(e) => setNewTip({ ...newTip, employeeId: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter employee ID"
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium">Amount</label>
              <input
                type="number"
                value={newTip.amount}
                onChange={(e) => setNewTip({ ...newTip, amount: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter tip amount"
                required
              />
            </div>
            <div>
              <label className="block text-sm font-medium">Comment</label>
              <textarea
                value={newTip.comment}
                onChange={(e) => setNewTip({ ...newTip, comment: e.target.value })}
                className="w-full p-2 border border-gray-300 rounded"
                placeholder="Enter a comment (optional)"
                rows="3"
              />
            </div>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              Submit Tip
            </button>
          </form>
        </div>

        {/* Previous Tips */}
        <div className="w-full md:w-1/3 p-4">
          <h2 className="text-2xl font-bold mb-4">Tips for {employeeName || "Employee"}</h2>

          {/* Display Tips */}
          <div className="bg-white p-4 shadow rounded mb-6">
            <h3 className="text-lg font-semibold mb-3">Previous Tips</h3>

            {/* Vertical Scrollable Container for Tips */}
            <div className="overflow-y-auto max-h-96 py-4">
              {tips.length === 0 ? (
                <p>No tips found for this employee.</p>
              ) : (
                tips.map((tip) => (
                  <div
                    key={tip._id}
                    className="p-4 border border-gray-200 rounded-lg shadow-md mb-4"
                  >
                    <p className="text-sm text-gray-600">
                      <strong>Hotel:</strong> {tip.hotel?.name || "Unknown"}
                    </p>
                    <p className="text-sm text-gray-600">
                      <strong>Amount:</strong> ${tip.amount.toFixed(2)}
                    </p>
                    <p className="text-sm text-gray-500">{tip.comment}</p>
                    <p className="text-xs text-gray-400">Date: {new Date(tip.date).toLocaleString()}</p>
                  </div>
                ))
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeTips;
