import { ctrlWrapper } from "../../helpers/index.js";

import { getAllDrinks } from "./getAllDrinks.js";

export const drinksController = {
    getAllDrinks: ctrlWrapper(getAllDrinks),
}
