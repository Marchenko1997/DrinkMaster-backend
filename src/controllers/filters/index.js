import { ctrlWrapper } from "../../helpers/index.js";
import { getDrinksByCategory } from "./getDrinksByCategory.js";
import { getAllDrinks } from "./getAllDrinks.js";
import { getDrinks } from "./getDrinks.js";
import { getDrinksByIngredient } from "./getDrinksByIngredient.js";
import { getDrinksByFilters } from "./getDrinksByFilters.js";

export const drinksController = {
    getAllDrinks: ctrlWrapper(getAllDrinks),
    getDrinks: ctrlWrapper(getDrinks),
    getDrinksByCategory: ctrlWrapper(getDrinksByCategory),
    getDrinksByIngredient: ctrlWrapper(getDrinksByIngredient),
    getDrinksByFilters: ctrlWrapper(getDrinksByFilters)
}