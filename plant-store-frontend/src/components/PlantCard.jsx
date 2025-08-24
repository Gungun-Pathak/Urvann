export default function PlantCard({ plant }) {
  return (
    <div className="bg-white rounded-2xl shadow-md hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2 hover:scale-105 p-5 flex flex-col justify-between">
      
      {/* Plant Image */}
      <div className="h-48 w-full rounded-xl overflow-hidden mb-4 relative group">
        {plant.imageUrl ? (
          <img
            src={plant.imageUrl}
            alt={plant.name}
            className="h-full w-full object-cover rounded-xl group-hover:scale-110 transition-transform duration-500"
          />
        ) : (
          <div className="h-full w-full bg-gray-100 flex items-center justify-center rounded-xl">
            <span className="text-gray-400 text-sm">No Image</span>
          </div>
        )}
      </div>

      {/* Plant Details */}
      <div className="flex flex-col gap-2">
        <h2 className="text-lg font-bold text-gray-800 truncate hover:text-green-700 transition-colors duration-300">
          {plant.name}
        </h2>
        <p className="text-green-600 font-semibold text-md">₹{plant.price}</p>
        <p className="text-gray-500 text-sm">
          Categories: {plant.categories.join(", ")}
        </p>
        <p
          className={`mt-2 font-semibold ${
            plant.availability ? "text-green-600" : "text-red-600"
          }`}
        >
          {plant.availability ? "In Stock ✅" : "Out of Stock ❌"}
        </p>
      </div>

      {/* Add Button */}
      <button className="mt-4 bg-gradient-to-r from-green-500 to-green-600 text-white font-medium py-2 px-4 rounded-xl hover:from-green-600 hover:to-green-700 transition-all duration-300 shadow-md hover:shadow-lg">
        Add to Cart
      </button>
    </div>
  );
}
