import fs from 'fs';
import path from 'path';
import { fileURLToPath } from 'url';

export function sendFile(req, res) {
  const { fileName } = req.params;
  const file = path.join(
    path.dirname(fileURLToPath(import.meta.url)),
    '..',
    '..',
    '..',
    'shared',
    fileName
  );

  if (!fs.existsSync(file)) {
    return res.status(404).send('File not found');
  } else {
    res.download(file);
  }
}
