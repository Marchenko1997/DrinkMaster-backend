import { promises as fs } from 'fs';
import path from 'path';

const _dirname = path.dirname(new URL(import.meta.url).pathname);

const categoriesPath = path.join(_dirname, 'categories.json');

export async function listCategories() {
  const data = await fs.readFile(categoriesPath);

  return JSON.parse(data);
}
