import { useEffect, useState } from "react";
import PlantCard from "../components/PlantCard";
import Loader from "../components/Loader";
import CategoryFilter from "../components/CategoryFilter";
import SearchBar from "../components/SearchBar";

const Home = () => {
  const [plants, setPlants] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchTerm, setSearchTerm] = useState("");
  const [selectedCategory, setSelectedCategory] = useState("");

  // Fetch plants from backend
  const fetchPlants = async () => {
    try {
      setLoading(true);
      let url = "/api/plants"; // adjust port if needed

      // add filters dynamically
      const queryParams = [];
      if (searchTerm) queryParams.push(`search=${searchTerm}`);
      if (selectedCategory) queryParams.push(`category=${selectedCategory}`);

      if (queryParams.length > 0) {
        url += "?" + queryParams.join("&");
      }

      const res = await fetch(url);
      const data = await res.json();

      setPlants(data.data || []); // API returns { data: [...] }
      setLoading(false);
    } catch (err) {
      console.error("Error fetching plants:", err);
      setLoading(false);
    }
  };

  // refetch when searchTerm or category changes
  useEffect(() => {
    fetchPlants();
  }, [searchTerm, selectedCategory]);

  return (
    <div className="p-6">
      {/* Search + Category Filter */}
      <div className="flex flex-col md:flex-row gap-4 mb-6 justify-between">
        <SearchBar searchTerm={searchTerm} setSearchTerm={setSearchTerm} />
        <CategoryFilter
          selectedCategory={selectedCategory}
          setSelectedCategory={setSelectedCategory}
        />
      </div>

      {/* Loader */}
      {loading ? (
        <div className="flex justify-center items-center h-64">
          <Loader />
        </div>
      ) : plants.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {plants.map((plant) => (
            <PlantCard key={plant._id} plant={plant} />
          ))}
        </div>
      ) : (
        <p className="text-center text-gray-500">No plants found</p>
      )}
    </div>
  );
};

export default Home;
