const BASE_URL = "/api/plants"; // your backend URL

export const fetchPlants = async () => {
  const res = await fetch(BASE_URL);
  const json = await res.json();
  return json.data; // ✅ return only plants
};

export const searchPlants = async (query) => {
  const res = await fetch(`${BASE_URL}?search=${query}`);
  const json = await res.json();
  return json.data;
};

export const filterByCategory = async (category) => {
  const res = await fetch(`${BASE_URL}?category=${category}`);
  const json = await res.json();
  return json.data;
};

export const addPlant = async (plant) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  return res.json();
};
