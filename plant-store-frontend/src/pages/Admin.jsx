import { useState } from "react";
import { addPlant } from "../services/api";

export default function Admin() {
  const [plant, setPlant] = useState({
    name: "",
    price: "",
    categories: "",
    available: true,
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newPlant = {
      ...plant,
      price: Number(plant.price),
      categories: plant.categories.split(",").map((c) => c.trim()),
    };
    await addPlant(newPlant);
    alert("Plant added successfully!");
    setPlant({ name: "", price: "", categories: "", available: true });
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h2 className="text-2xl font-bold mb-4">Add New Plant</h2>
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          placeholder="Plant Name"
          value={plant.name}
          onChange={(e) => setPlant({ ...plant, name: e.target.value })}
          className="border p-2 w-full rounded-md"
          required
        />
        <input
          type="number"
          placeholder="Price"
          value={plant.price}
          onChange={(e) => setPlant({ ...plant, price: e.target.value })}
          className="border p-2 w-full rounded-md"
          required
        />
        <input
          type="text"
          placeholder="Categories (comma separated)"
          value={plant.categories}
          onChange={(e) => setPlant({ ...plant, categories: e.target.value })}
          className="border p-2 w-full rounded-md"
          required
        />
        <select
          value={plant.available}
          onChange={(e) =>
            setPlant({ ...plant, available: e.target.value === "true" })
          }
          className="border p-2 w-full rounded-md"
        >
          <option value="true">Available</option>
          <option value="false">Not Available</option>
        </select>
        <button className="bg-green-600 text-white px-4 py-2 rounded-md">
          Add Plant
        </button>
      </form>
    </div>
  );
}
