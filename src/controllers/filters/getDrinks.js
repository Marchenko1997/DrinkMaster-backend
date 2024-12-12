import { Drink } from '../../models/drinks.js';

export const getDrinks = async (req, res) => {
  const { letter } = req.query;

  const drinks = await Drink.find({});

  const drinksFilter = drinks.filter((drink) =>
    drink.drink.toLowerCase().includes(letter.toLowerCase()),
  );

    res.json(drinksFilter);
};
