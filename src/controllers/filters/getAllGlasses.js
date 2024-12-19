import { glasses } from '../../db/glasses/index.js';

export const getAllGlasses = async (req, res) => {
  const glassesList = await glasses.listGlasses();

  if (!glassesList || glassesList.length === 0) {
    res.status(404).json({ message: 'No glasses found' });
  }

  res.status(200).json(glassesList);
};
