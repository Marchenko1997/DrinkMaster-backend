import { Drink } from '../../models/drinks.js';

export const getFavorites = async (req, res) => {
  try {
    const { _id: userId } = req.user;

    const result = await Drink.find({
      users: {
        $elemMatch: {
          $eq: userId,
        },
      },
    }).sort({ createdAt: -1 });

    const totalFavoriteDrinks = await Drink.countDocuments({
      users: {
        $elemMatch: {
          $eq: userId,
        },
      },
    });

    res.json({ total: totalFavoriteDrinks, drinks: result });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
