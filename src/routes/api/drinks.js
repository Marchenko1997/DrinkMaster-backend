import express from 'express';
import { drinksControllers } from '../../controllers/drinks/index.js';
import { drinksController } from '../../controllers/filters/index.js';
import {
  authenticate,
  validateBody,
  upload,
  isValidId,
} from '../../middlewares/index.js';
import { searchDrinksByFiltersSchema } from '../../models/drinks.js';

const router = express.Router();

const jsonParser = express.json();

const {
  getHomePageDrinks,
  addDrink,
  getOwnDrinks,
  removeOwnDrink,
  getById,
    addToFavorites,
  getFavorites,
    removeFromFavorites
} = drinksControllers;
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

router.post(
  '/own/add',
  upload.single('drinkThumb', authenticate, jsonParser, addDrink),
);

router.delete("/favorites/remove/:id", authenticate, removeFromFavorites);
router.get("/favorites", authenticate, getFavorites);
router.post('/favorites/add/:id', authenticate, addToFavorites);


router.get('/own', authenticate, getOwnDrinks);

router.delete('/own/remove/:id', authenticate, isValidId, removeOwnDrink);

router.get('/:id', authenticate, getById);

export default router;
