import express from 'express';
import { drinksControllers } from '../../controllers/drinks/index.js';
import { drinksController } from '../../controllers/filters/index.js';
import { authenticate, validateBody } from '../../middlewares/index.js';
import { searchDrinksByFiltersSchema } from '../../models/drinks.js';
// import { getDrinksByFilters } from '../../controllers/filters/getDrinksByFilters.js';

const router = express.Router();

const jsonParser = express.json();

const { getHomePageDrinks } = drinksControllers;
const {
  getAllDrinks,
  getDrinksByCategory,
  getDrinksByIngredient,
  getDrinksByFilters,
  getPopularDrinks,
} = drinksController;

router.get('/mainpage', authenticate, getHomePageDrinks);

router.get('/', authenticate, getAllDrinks);

router.get('/popular', authenticate, getPopularDrinks);

router.get(
  '/search',
  authenticate,
  jsonParser,
  validateBody(searchDrinksByFiltersSchema),
  getDrinksByFilters,
);

router.get('/search/category', authenticate, jsonParser, getDrinksByCategory);
router.get('/search/ingredients', authenticate, getDrinksByIngredient);

export default router;
