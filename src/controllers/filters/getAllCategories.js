import { categories } from "../../db/categories/index.js";

export const getAllCategories = async (req, res) => {
    const categoriesList = await categories.listCategories();

    if (!categoriesList || categoriesList.length === 0) {
        res.status(404).json({ message: 'No categories found' });
    }

    res.json(categoriesList);
}
