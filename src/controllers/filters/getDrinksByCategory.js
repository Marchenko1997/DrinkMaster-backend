import { Drink } from '../../models/drinks.js';

export const getDrinksByCategory = async (req, res) => {
  const { category } = req.query;

  const drinks = await Drink.find({});

  const drinksFilter = drinks.filter((drink) =>
    drink.drink.toLowerCase().includes(category.toLowercase()),
  );

  res.json(drinksFilter);
};
