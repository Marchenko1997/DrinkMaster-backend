import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const removeOwnDrink = async (req, res) => {
 const { id } = req.params;

  const { _id: currentUser } = req.user;

  try {
    const result = await Drink.findById(id);

    if (!result) {
      throw HttpError(404, 'Nor found');
    }

    if (result.owner.toString() !== currentUser.toString()) {
      throw HttpError(403, 'User is not authorized to delete this drink');
    }

    const removedDrink = await Drink.findByIdAndRemove(id);

    res.json({ result: removedDrink });
  } catch (error) {
    res.status(error.status || 500).json({ message: error.message });
  }
};
