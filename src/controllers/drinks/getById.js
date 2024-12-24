import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

export const getById = async (req, res) => {
  const { id } = req.params;

  console.log('Received ID:', id);
  console.log('Type of ID:', typeof id);

  try {
    // Выполняем поиск в базе данных без преобразования в ObjectId
    const result = await Drink.findOne({ _id: id }).populate(
      'ingredients.ingredientId',
    );
    console.log('Result from DB:', result);

    if (!result) {
      console.error('Drink not found for ID:', id);
      throw HttpError(404, 'Not found');
    }

    console.log('Drink found:', result);
    res.status(200).json(result);
  } catch (error) {
    console.error('Error fetching drink:', error.message);
    res.status(error.status || 500).json({ message: error.message });
  }
};
