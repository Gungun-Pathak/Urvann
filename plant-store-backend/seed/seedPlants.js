// seed/seedPlants.js
import fs from 'fs';
import path from 'path';
import url from 'url';
import dotenv from 'dotenv';
import { connectDB } from '../src/config/db.js';
import Plant from '../src/models/Plant.js';

dotenv.config();

// Fix __dirname for ES Modules
const __filename = url.fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// Read base plants JSON
const basePath = path.join(__dirname, '..', 'data', 'basePlants.json');
const basePlants = JSON.parse(fs.readFileSync(basePath, 'utf-8'));

// Pools for randomness
const SUFFIXES = [
  'Mini', 'Compact', 'XL', 'Variegated',
  'Dwarf', 'Hybrid', 'Premium', 'Classic'
];

const IMAGE_POOL = [
  'https://picsum.photos/seed/plant1/600/400',
  'https://picsum.photos/seed/plant2/600/400',
  'https://picsum.photos/seed/plant3/600/400',
  'https://picsum.photos/seed/plant4/600/400',
  'https://picsum.photos/seed/plant5/600/400',
  'https://picsum.photos/seed/plant6/600/400',
  'https://picsum.photos/seed/plant7/600/400',
  'https://picsum.photos/seed/plant8/600/400',
];

// Helper functions
const getRandom = (arr) => arr[Math.floor(Math.random() * arr.length)];
const getRandomPrice = (basePrice) => basePrice || 100 + Math.floor(Math.random() * 900); // Use base price if available
const getRandomStock = () => Math.floor(Math.random() * 50) + 1;

const generateVariants = (base) => {
  const variants = [];
  for (let i = 0; i < 5; i++) {
    const suffix = getRandom(SUFFIXES);

    variants.push({
      name: `${base.name} ${suffix}`,
      description: `${base.description || base.name} - ${suffix} variety`,
      price: getRandomPrice(base.price),
      categories: base.categories, // keep original categories
      stock: getRandomStock(),
      image: getRandom(IMAGE_POOL),
    });
  }
  return variants;
};

const seedPlants = async () => {
  try {
    await connectDB();
    console.log('MongoDB connected');

    // Clear old data
    await Plant.deleteMany();
    console.log('Old plants removed');

    let allPlants = [];
    basePlants.forEach((plant) => {
      allPlants.push(...generateVariants(plant));
    });

    await Plant.insertMany(allPlants);
    console.log(`${allPlants.length} plants inserted ✅`);

    process.exit(0); // Exit successfully
  } catch (err) {
    console.error('Seeder error:', err);
    process.exit(1);
  }
};

seedPlants();
