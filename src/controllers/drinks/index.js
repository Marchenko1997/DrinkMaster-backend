import { ctrlWrapper } from "../../helpers/index.js";
import { getHomePageDrinks } from "./getHomePageDrinks.js";
import { addDrink } from "./addDrink.js";
import { getOwnDrinks } from "./getOwnDrinks.js";
import { removeOwnDrink } from "./removeOwnDrinks.js";
import { getById } from "./getById.js";
import { addToFavorites } from "./addToFavorites.js";
import { getFavorites } from "./getfavorites.js";

export const drinksControllers = {
    getHomePageDrinks: ctrlWrapper(getHomePageDrinks),
    addDrink: ctrlWrapper(addDrink),
    getOwnDrinks: ctrlWrapper(getOwnDrinks),
    removeOwnDrink: ctrlWrapper(removeOwnDrink),
    getById: ctrlWrapper(getById),
    addToFavorites: ctrlWrapper(addToFavorites),
    getFavorites: ctrlWrapper(getFavorites)
}
