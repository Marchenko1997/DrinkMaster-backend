import express from 'express';
import { drinksControllers } from '../../controllers/drinks/index.js';
import { authenticate } from '../../middlewares/index.js';

const router = express.Router();

// const jsonParser = express.json();

const { getHomePageDrinks } = drinksControllers; 

router.get("/mainpage", authenticate, getHomePageDrinks);

export default router;
