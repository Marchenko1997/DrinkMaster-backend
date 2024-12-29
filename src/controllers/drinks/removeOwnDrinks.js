import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const removeOwnDrink = async (req, res) => {
  console.log('removeOwnDrink controller called');
  const { id } = req.params;
  const { _id: currentUser } = req.user;

  console.log('Request params ID:', id);
  console.log('Current user ID:', currentUser);

  try {
    const result = await Drink.findById(id);
    console.log('Drink found in DB:', result);

    if (!result) {
      console.error('Drink not found:', id);
      throw HttpError(404, 'Not found');
    }

    if (result.owner.toString() !== currentUser.toString()) {
      console.error(
        `Unauthorized deletion attempt by user: ${currentUser} for drink owner: ${result.owner}`,
      );
      throw HttpError(403, 'User is not authorized to delete this drink');
    }

    const removedDrink = await Drink.findByIdAndDelete(id);
    console.log('Drink successfully removed:', removedDrink);

    res.json({ result: removedDrink });
  } catch (error) {
    console.error('Error in removeOwnDrink controller:', error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
};
