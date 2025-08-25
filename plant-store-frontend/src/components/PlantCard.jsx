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

        {/* Subtle overlay on hover */}
        <div className="absolute inset-0 bg-black bg-opacity-10 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
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

        {/* Availability Badge */}
        <span
          className={`mt-2 inline-block px-3 py-1 text-xs font-semibold rounded-full w-fit ${
            plant.availability ? "bg-green-100 text-green-700" : "bg-red-100 text-red-600"
          }`}
        >
          {plant.availability ? "In Stock" : "Out of Stock"}
        </span>
      </div>

      {/* Add Button */}
      <button
        disabled={!plant.availability}
        className={`mt-4 font-medium py-2 px-4 rounded-xl transition-all duration-300 shadow-md hover:shadow-lg ${
          plant.availability
            ? "bg-gradient-to-r from-green-500 to-green-600 text-white hover:from-green-600 hover:to-green-700"
            : "bg-gray-300 text-gray-500 cursor-not-allowed"
        }`}
      >
        {plant.availability ? "Add to Cart 🛒" : "Unavailable"}
      </button>
    </div>
  );
}
