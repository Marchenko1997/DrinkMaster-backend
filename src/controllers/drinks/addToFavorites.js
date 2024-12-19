import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const addToFavorites = async (req, res) => {
  try {
    const { id } = req.params;

    const { _id: userId } = req.params;

    const drink = await Drink.findById(id);

    if (!drink) {
      throw HttpError(404, 'Not Found');
    }

    if (!drink.users) {
      drink.users = [];
    }

    const isFavorite = drink.users.includes(userId);

    let result;

    if (isFavorite) {
      throw HttpError(409, `${drink.drink} is already in your favorites`);
    } else {
      result = await Drink.findByIdAndUpdate(
        drink._id,
        { $push: { users: userId } },
        { new: true },
      );
    }
    res.json({ result });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
