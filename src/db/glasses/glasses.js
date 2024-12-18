import { promises as fs } from 'fs';
import path from 'path';

const glassesPath = path.join(
  new URL('.', import.meta.url).pathname,
  'glasses.json',
);

export async function listGlasses() {
  const data = await fs.readFile(glassesPath);
  return JSON.parse(data);
}
