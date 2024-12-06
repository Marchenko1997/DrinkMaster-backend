import { Drink } from '../../models/drinks.js';

export const getHomePageDrinks = async (req, res, next) => {
  const { isAdult } = req.user;

  let drinks;

  try {
    if (isAdult !== true) {
      drinks = await Drink.find({ alcoholic: 'Non alcoholic' }).sort({
        createdAt: -1,
        _id: -1,
      });
    } else {
      drinks = await Drink.find().sort({ createdAt: -1, _id: -1 });
    }

    res.json(drinks);
  } catch (error) {
    next(error);
  }
};
