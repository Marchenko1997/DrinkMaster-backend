import { Drink } from "../../models/drinks.js";

export const getPopularDrinks = async (req, res) => {
    const { isAdult } = req.user;

    const noAlc = "Non alcoholic";

    if (isAdult) {

        const drinks = await Drink.find({});

        const drinksWithUsers = drinks.filter((drink) => drink.users.length > 0);

        const sortedDrinks = drinksWithUsers.sort((a, b) => b.users.length - a.users.length);

        const popularCoctails = sortedDrinks.slice(0, 4);

        return res.json(popularCoctails);
    }

    if (!isAdult) {

        const drinksAll = await Drink.find({});

        const nonAlcoDrinks = drinksAll.filter((drink) => drink.alcoholic.includes(noAlc));

        const drinksWithUsersNonAlc = nonAlcoDrinks.filter((drink) => drink.users.length > 0);

        const sortedDrinks = drinksWithUsersNonAlc.sort((a, b) => b.users.length - a.users.length);

        const popularCoctailsNonAlc = sortedDrinks.slice(0, 4);

        return res.json(popularCoctailsNonAlc);
    }
}
