import { useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import Loader from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";
import Pagination from "../components/Pagination";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");
  const [error, setError] = useState(null);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);

  const fetchPlants = async () => {
    try {
      setLoading(true);
      setError(null);

      let url = `${import.meta.env.VITE_API_URL}/api/plants?page=${page}&limit=12`;

      const queryParams = [];
      if (searchTerm) queryParams.push(`search=${searchTerm}`);
      if (selectedCategory) queryParams.push(`category=${selectedCategory}`);

      if (queryParams.length > 0) {
        url += "&" + queryParams.join("&");
      }

      const res = await fetch(url);
      if (!res.ok) throw new Error("Failed to fetch plants");

      const data = await res.json();
      setPlants(data.data || []);
      setTotalPages(data.pagination?.pages || 1);
    } catch (err) {
      console.error("Error fetching plants:", err);
      setError("Could not load plants. Please try again.");
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchPlants();
  }, [searchTerm, selectedCategory, page]);

  // Reset to page 1 when search/filter changes
  useEffect(() => {
    setPage(1);
  }, [searchTerm, selectedCategory]);

  return (
    <div className="p-6">
      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between items-center">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
          categories={["Indoor", "Outdoor", "Succulent", "Herbs", "Flowering"]}
        />
      </div>

      {/* Loader / Error / Plants */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : error ? (
        <p className="text-center text-red-500">{error}</p>
      ) : plants.length > 0 ? (
        <>
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {plants.map((plant) => (
              <PlantCard key={plant._id} plant={plant} />
            ))}
          </div>

          {/* Pagination */}
          <Pagination
            currentPage={page}
            totalPages={totalPages}
            onPageChange={(p) => setPage(p)}
          />
        </>
      ) : (
        <p className="text-center text-gray-500">No plants found 🌱</p>
      )}
    </div>
  );
};

export default Home;
