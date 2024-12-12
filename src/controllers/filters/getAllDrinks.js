import { Drink } from "../../models/drinks.js";

export const getAllDrinks = async (req, res) => {
    const { isAdult } = req.user;

    const noAlc = "Non alcoholic";

    if (!isAdult) {
        const drinks = await Drink.find({});

        const drinksFilter = drinks.filter((drink) => drink.alcoholic.includes(noAlc));

        res.json(drinksFilter);
    }

    if (isAdult) {
        const drinks = await Drink.find({});
        res.json(drinks);
    }
}
