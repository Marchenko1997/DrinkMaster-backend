import { Ingredient } from '../../models/ingredients.js';

export const getAllIngredients = async (req, res) => {
  const { isAdult } = req.user;
  let ingredients;
  if (isAdult === true) {
    ingredients = await Ingredient.find({});
  } else {
    ingredients = await Ingredient.find({ alcohol: 'No' });
  }

  if (ingredients.length === 0) {
    return res.status(404).json({ message: 'No ingredients found' });
  }

  const ingredientsWithIds = ingredients.map(({ _id, title }) => ({
    id: _id,
    title,
  }));

  res.status(200).json(ingredientsWithIds);
};
