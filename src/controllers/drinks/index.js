import { ctrlWrapper } from "../../helpers/index.js";
import { getHomePageDrinks } from "./getHomePageDrinks.js";

export const drinksControllers = {
    getHomePageDrinks: ctrlWrapper(getHomePageDrinks)
}
