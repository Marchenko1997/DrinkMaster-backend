import { Drink, drinkJoiSchema } from '../../models/drinks.js';

export const addDrink = async (req, res, next) => {

    const response = drinkJoiSchema.validate(req.body, { abortEarly: false });

  if (response.error) {
      
        return res.status(400).json({message: `{response.error}`})
    }

      const {
        drink,
        drinkAlternate,
        tags,
        video,
        category,
        IBA,
        alcoholic,
        glass,
        description,
        instruction,
        instructionsES,
        instructionsDE,
        instructionsFR,
        instructionsIT,
        instructionsRU,
        instructionsPL,
        instructionsUK,
        ingredients,
        shortDescription,
      } = req.body;

    const owner = req.user._id;

      const drinkData = {
        drink,
        drinkAlternate,
        tags,
        video,
        category,
        IBA,
        alcoholic,
        glass,
        description,
        instruction,
        instructionsES,
        instructionsDE,
        instructionsFR,
        instructionsIT,
        instructionsRU,
        instructionsPL,
        instructionsUK,
        drinkThumb: req.file && req.file.path,
        ingredients,
        shortDescription:
          shortDescription !== undefined ? shortDescription : description,
        owner,
      };

    await Drink.create(drinkData);

    res.status(201).send({ message: 'Drink Created' });

}

