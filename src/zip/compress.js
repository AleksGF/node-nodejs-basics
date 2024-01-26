import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';
import { createGzip } from 'zlib';
import { pipeline } from 'stream/promises';

const compress = async () => {
  const folderName = 'files';
  const srcFileName = 'fileToCompress.txt';
  const distFileName = 'archive.gz';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, folderName, srcFileName);
  const distPath = path.join(__dirname, folderName, distFileName);

  try {
    const gzip = createGzip();

    const srcHandler = await fsPromises.open(srcPath, 'r');
    const distHandler = await fsPromises.open(distPath, 'w');

    const rs = srcHandler.createReadStream();
    const ws = distHandler.createWriteStream();

    ws.on('finish', async () => {
      await srcHandler.close();
      await distHandler.close();
      await fsPromises.rm(srcPath);
    });

    await pipeline(rs, gzip, ws);

    console.log('Success: File Compressed');
  } catch (error) {
    if (error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await compress();
