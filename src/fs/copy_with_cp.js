import path from 'path';
import { fileURLToPath } from 'url';
import fsPromises from 'fs/promises';

const copy_with_cp = async () => {
  const srcFolder = 'files';
  const distFolder = 'files_copy';
  const errorMessage = 'FS operation failed';

  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const srcPath = path.join(__dirname, srcFolder);
  const distPath = path.join(__dirname, distFolder);

  try {
    await fsPromises.cp(srcPath, distPath, {
      errorOnExist: true,
      force: false,
      recursive: true,
    });
    console.log('Folder copied');
  } catch (error) {
    if (error.code === 'ERR_FS_CP_EEXIST' || error.code === 'ENOENT') {
      throw new Error(errorMessage);
    } else {
      console.error(error);
    }
  }
};

await copy_with_cp();
