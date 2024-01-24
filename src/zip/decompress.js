import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { createUnzip } from 'zlib';
import { pipeline } from 'stream/promises';

const decompress = async () => {
  const folderName = 'files';
  const srcFileName = 'archive.gz';
  const distFileName = 'fileToCompress.txt';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName, srcFileName);
  const distPath = path.join(__dirname, folderName, distFileName);

  try {
    const unzip = createUnzip();

    const srcHandler = await fsPromises.open(srcPath, 'r');
    const distHandler = await fsPromises.open(distPath, 'w');

    const rs = srcHandler.createReadStream();
    const ws = distHandler.createWriteStream();

    await pipeline(rs, unzip, ws);

    console.log('Success: File Decompressed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await decompress();
