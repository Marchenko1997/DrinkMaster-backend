import mongoose from 'mongoose'; // Импортируем Mongoose для работы с ObjectId
import { Drink } from '../../models/drinks.js';
import { HttpError } from '../../helpers/index.js';

const { ObjectId } = mongoose.Types; // Извлекаем ObjectId из mongoose.Types

export const getById = async (req, res) => {
  const { id } = req.params;
  console.log('Received ID:', id);

  try {
    // Проверяем валидность ObjectId
    if (!ObjectId.isValid(id)) {
      console.error('Invalid ID format:', id);
      throw HttpError(400, 'Invalid ID format');
    }

    const result = await Drink.findById(new ObjectId(id)).populate(
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
