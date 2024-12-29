import { Drink } from '../../models/drinks.js';

export const getDrinksByIngredient = async (req, res) => {
  const { ingredient } = req.query;
  const drinks = await Drink.find({});

  const selectTags = [ingredient];
  const drinksFilter = drinks.filter(({ ingredients: arr }) =>
    arr.some((ingredient) => selectTags.includes(ingredient.title)),
  );

  res.json(drinksFilter);
};
