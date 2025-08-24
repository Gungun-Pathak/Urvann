// Build a query object for searching/filtering plants
export const buildPlantQuery = ({ search, category, inStock }) => {
  const query = {};

  // 1️⃣ Filter by availability
  if (typeof inStock !== 'undefined') {
    query.availability = inStock === 'true' || inStock === true;
  }

  // 2️⃣ Filter by dropdown category (exact match, case-insensitive)
  if (category) {
    query.categories = { $in: [new RegExp(`^${escapeRegExp(category)}$`, 'i')] };
  }

  // 3️⃣ Search by name OR category keyword (case-insensitive)
  if (search) {
    const rx = new RegExp(escapeRegExp(search), 'i');
    query.$or = [
      { name: { $regex: rx } },
      { categories: { $regex: rx } } // works with array of strings
    ];
  }

  return query;
};

// Escape special regex characters in search strings
const escapeRegExp = (s = '') => s.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
