import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const read = async () => {
  const folderName = 'files';
  const fileName = 'fileToRead.txt';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName, fileName);

  try {
    const fh = await fsPromises.open(srcPath);
    const rs = fh.createReadStream();
    rs.pipe(process.stdout);
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await read();
