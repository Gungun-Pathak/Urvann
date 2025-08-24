import Plant from '../models/Plant.js';
import { buildPlantQuery } from '../utils/buildPlantQuery.js';


export const getPlants = async (req, res, next) => {
try {
const {
search,
category,
inStock,
page = 1,
limit = 12,
sort = 'createdAt', // "price", "-price", "name", "-createdAt" etc.
} = req.query;


const query = buildPlantQuery({ search, category, inStock });


const pageNum = Math.max(parseInt(page) || 1, 1);
const pageSize = Math.min(Math.max(parseInt(limit) || 12, 1), 100);


const [items, total] = await Promise.all([
Plant.find(query)
.sort(parseSort(sort))
.skip((pageNum - 1) * pageSize)
.limit(pageSize)
.lean(),
Plant.countDocuments(query),
]);


res.json({
data: items,
pagination: {
total,
page: pageNum,
limit: pageSize,
pages: Math.ceil(total / pageSize),
},
});
} catch (err) {
next(err);
}
};


export const createPlant = async (req, res, next) => {
try {
const { name, price, categories = [], availability = true, imageUrl } = req.body;
const normalizedCats = Array.isArray(categories)
? categories.map((c) => String(c).trim()).filter(Boolean)
: String(categories).split(',').map((c) => c.trim()).filter(Boolean);


const plant = await Plant.create({ name, price, categories: normalizedCats, availability, imageUrl });
res.status(201).json({ message: 'Plant created', data: plant });
} catch (err) {
next(err);
}
};


const parseSort = (sort = '-createdAt') => {
  // Example input: "-price" => { price: -1 }, "name" => { name: 1 }
  const order = sort.startsWith('-') ? -1 : 1;
  const field = sort.replace('-', '');
  return { [field]: order };
};
