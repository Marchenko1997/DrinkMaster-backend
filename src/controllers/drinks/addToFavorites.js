import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const addToFavorites = async (req, res) => {
  try {
    console.log('addToFavorites called');

    const { id } = req.params;
    console.log('Request parameter ID:', id);

    const { _id: userId } = req.user;
    console.log('Current user ID:', userId);

    const drink = await Drink.findById(id);
    console.log('Drink found in database:', drink);

    if (!drink) {
      console.error('Drink not found:', id);
      throw HttpError(404, 'Not Found');
    }

    if (!drink.users) {
      drink.users = [];
      console.log('Initialized empty users array for drink');
    }

    const isFavorite = drink.users.includes(userId);
    console.log(`Is favorite already: ${isFavorite}`);

    let result;

    if (isFavorite) {
      console.error(
        `Attempted to add an already favorite drink. Drink: ${drink.drink}, User: ${userId}`,
      );
      throw HttpError(409, `${drink.drink} is already in your favorites`);
    } else {
      result = await Drink.findByIdAndUpdate(
        drink._id,
        { $push: { users: userId } },
        { new: true },
      );
      console.log('Drink successfully added to favorites:', result);
    }

    res.json({ result });
  } catch (error) {
    console.error('Error in addToFavorites:', error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
};
