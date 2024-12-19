import express from "express";
import { authenticate} from "../../middlewares/index.js";
import { drinksController } from '../../controllers/filters/index.js';

const { getAllCategories, getAllGlasses, getAllIngredients } = drinksController;

const router = express.Router();

router.get("/categories", authenticate, getAllCategories);
router.get("/glasses", authenticate, getAllGlasses);
router.get("/ingredients", authenticate, getAllIngredients);

export default router;
