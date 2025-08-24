import { Router } from 'express';
import { body } from 'express-validator';
import { createPlant, getPlants } from '../controllers/plantController.js';


const router = Router();


// GET /api/plants?search=...&category=Indoor&inStock=true&page=1&limit=12&sort=-price
router.get('/', getPlants);


// POST /api/plants (Admin) — simple validation
router.post(
'/',
[
body('name').isString().trim().isLength({ min: 2, max: 120 }),
body('price').isNumeric().toFloat(),
body('availability').optional().isBoolean().toBoolean(),
body('categories').customSanitizer((value) => {
if (Array.isArray(value)) return value;
if (typeof value === 'string') return value.split(',').map((v) => v.trim()).filter(Boolean);
return [];
}),
],
async (req, res, next) => {
try {
// Handle validation errors explicitly
const { validationResult } = await import('express-validator');
const errors = validationResult(req);
if (!errors.isEmpty()) return res.status(400).json({ errors: errors.array() });
return createPlant(req, res, next);
} catch (err) {
next(err);
}
}
);


export default router;