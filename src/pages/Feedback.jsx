import { useState } from "react";

const Feedback = () => {
    const [feedback, setFeedback] = useState("");

    const handleSubmit = (e) => {
        e.preventDefault();
        console.log("Feedback submitted:", feedback);
        alert("Feedback submitted. Thank you!");
    };

    return (
        <div className="container mx-auto p-4">
            <h2 className="text-2xl font-bold mb-4">Feedback</h2>
            <form className="bg-white p-4 shadow rounded" onSubmit={handleSubmit}>
                <div className="mb-4">
                    <label className="block text-gray-700 font-bold mb-2" htmlFor="feedback">
                        Your Feedback
                    </label>
                    <textarea
                        id="feedback"
                        name="feedback"
                        rows="4"
                        className="w-full p-2 border border-gray-300 rounded"
                        value={feedback}
                        onChange={(e) => setFeedback(e.target.value)}
                        required
                    ></textarea>
                </div>
                <button
                    type="submit"
                    className="bg-blue-500 text-white p-2 rounded hover:bg-blue-600"
                >
                    Submit Feedback
                </button>
            </form>
        </div>
    );
};

export default Feedback;
