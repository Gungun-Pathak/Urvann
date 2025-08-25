import { useState } from "react";
import { addPlant } from "../services/api";

export default function Admin() {
  const [plant, setPlant] = useState({
    name: "",
    price: "",
    categories: "",
    available: true,
  });
  const [loading, setLoading] = useState(false);
  const [feedback, setFeedback] = useState({ message: "", type: "" }); // type: success | error

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      setLoading(true);
      const newPlant = {
        ...plant,
        price: Number(plant.price),
        categories: plant.categories.split(",").map((c) => c.trim()),
      };
      await addPlant(newPlant);
      setFeedback({ message: "✅ Plant added successfully!", type: "success" });
      setPlant({ name: "", price: "", categories: "", available: true });

      // Auto-hide feedback after 3 seconds
      setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
    } catch (err) {
      console.error("Error adding plant:", err);
      setFeedback({ message: "❌ Failed to add plant. Please try again.", type: "error" });

      setTimeout(() => setFeedback({ message: "", type: "" }), 3000);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="p-6 max-w-lg mx-auto bg-white rounded-2xl shadow-md mt-6">
      <h2 className="text-2xl font-bold mb-6 text-center text-green-700">
        🌱 Add New Plant
      </h2>

      {/* Feedback Message */}
      {feedback.message && (
        <div
          className={`mb-4 text-center py-2 px-4 rounded-lg font-medium ${
            feedback.type === "success"
              ? "bg-green-100 text-green-700"
              : "bg-red-100 text-red-600"
          }`}
        >
          {feedback.message}
        </div>
      )}

      <form onSubmit={handleSubmit} className="space-y-5">
        {/* Plant Name */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Plant Name
          </label>
          <input
            type="text"
            placeholder="e.g. Aloe Vera"
            value={plant.name}
            onChange={(e) => setPlant({ ...plant, name: e.target.value })}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
        </div>

        {/* Price */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Price (₹)
          </label>
          <input
            type="number"
            placeholder="e.g. 250"
            value={plant.price}
            onChange={(e) => setPlant({ ...plant, price: e.target.value })}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
        </div>

        {/* Categories */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Categories
          </label>
          <input
            type="text"
            placeholder="e.g. Indoor, Succulent, Medicinal"
            value={plant.categories}
            onChange={(e) => setPlant({ ...plant, categories: e.target.value })}
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
            required
          />
          <p className="text-xs text-gray-500 mt-1">
            Enter multiple categories separated by commas
          </p>
        </div>

        {/* Availability */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">
            Availability
          </label>
          <select
            value={plant.available}
            onChange={(e) =>
              setPlant({ ...plant, available: e.target.value === "true" })
            }
            className="border p-3 w-full rounded-lg focus:ring-2 focus:ring-green-400 outline-none"
          >
            <option value="true">Available</option>
            <option value="false">Not Available</option>
          </select>
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          disabled={loading}
          className={`w-full py-3 rounded-lg font-semibold transition-all shadow-md ${
            loading
              ? "bg-gray-400 cursor-not-allowed"
              : "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
          }`}
        >
          {loading ? "Adding..." : "Add Plant"}
        </button>
      </form>
    </div>
  );
}
