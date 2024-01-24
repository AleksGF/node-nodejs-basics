import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { createHash } from 'crypto';

const calculateHash = async () => {
  const srcFolder = 'files';
  const fileName = 'fileToCalculateHashFor.txt';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const filePath = path.join(__dirname, srcFolder, fileName);

  try {
    const hash = createHash('sha256');
    const fh = await fsPromises.open(filePath);
    const rs = fh.createReadStream();
    rs.pipe(hash).setEncoding('hex').pipe(process.stdout);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await calculateHash();
