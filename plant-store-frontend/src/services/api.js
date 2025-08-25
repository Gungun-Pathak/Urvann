const BASE_URL = `${import.meta.env.VITE_API_URL}/api/plants`;

export default BASE_URL;

/**
 * Fetch plants with pagination, search, and category filter
 * @param {number} page - current page number
 * @param {number} limit - number of items per page
 * @param {string} search - search query
 * @param {string} category - selected category
 * @returns {Promise<object>} - { data: [...plants], pagination: {...} }
 */
export const fetchPlants = async (page = 1, limit = 12, search = "", category = "") => {
  try {
    const queryParams = [`page=${page}`, `limit=${limit}`];
    if (search) queryParams.push(`search=${encodeURIComponent(search)}`);
    if (category) queryParams.push(`category=${encodeURIComponent(category)}`);

    const url = `${BASE_URL}?${queryParams.join("&")}`;
    const res = await fetch(url);
    if (!res.ok) throw new Error("Failed to fetch plants");
    const json = await res.json();
    return json; // returns { data: [...], pagination: {...} }
  } catch (err) {
    console.error("Error in fetchPlants:", err);
    return { data: [], pagination: { page: 1, pages: 1, total: 0 } };
  }
};

/**
 * Add a new plant
 * @param {object} plant - plant object {name, price, categories, availability}
 */
export const addPlant = async (plant) => {
  const res = await fetch(BASE_URL, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(plant),
  });
  return res.json();
};
