import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const getById = async (req, res) => {
  const { id } = req.params;

  try {
    const result = await Drink.findById(id).populate(
      'ingredients.ingredientId',
    );

    if (!result) {
      throw HttpError(404, 'Not found');
    }

    res.status(200).json(result);
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
