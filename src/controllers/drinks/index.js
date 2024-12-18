import { ctrlWrapper } from "../../helpers/index.js";
import { getHomePageDrinks } from "./getHomePageDrinks.js";
import { addDrink } from "./addDrink.js";

export const drinksControllers = {
    getHomePageDrinks: ctrlWrapper(getHomePageDrinks),
    addDrink: ctrlWrapper(addDrink),
}
