import { Drink } from '../../models/drinks.js';

export const getOwnDrinks = async (req, res) => {
  const { _id: ownerID } = req.user;

  try {
    const result = await Drink.find({ owner: ownerID }).sort({ createdAt: -1 });

    const totalOwnDrinks = await Drink.countDocuments({ owner: ownerID });

    res.json({ total: totalOwnDrinks, drinks: result });
  } catch (error) {
    res
      .status(500)
      .json({ message: 'Failed to fetch drinks', error: error.message });
  }
};
