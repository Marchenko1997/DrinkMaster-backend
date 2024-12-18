import express from "express";
import { authenticate} from "../../middlewares/index.js";
import { drinksController } from '../../controllers/filters/index.js';

const { getAllCategories } = drinksController;

const router = express.Router();

router.get("/categories", authenticate, getAllCategories);

export default router;
