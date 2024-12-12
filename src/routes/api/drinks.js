import express from 'express';
import { drinksControllers } from '../../controllers/drinks/index.js';
import { drinksController } from '../../controllers/filters/index.js';
import { authenticate } from '../../middlewares/index.js';

const router = express.Router();

const jsonParser = express.json();

const { getHomePageDrinks } = drinksControllers;
const { getAllDrinks, getDrinksByCategory, getDrinksByIngredient } =
  drinksController;

router.get('/mainpage', authenticate, getHomePageDrinks);

router.get('/', authenticate, getAllDrinks);

router.get('/search/category', authenticate, jsonParser, getDrinksByCategory);
router.get('/search/ingredient', authenticate, getDrinksByIngredient);

export default router;
