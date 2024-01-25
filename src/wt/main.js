import { Worker } from 'worker_threads';
import os from 'os';
import path from 'path';
import { fileURLToPath } from 'url';

const performCalculations = async () => {
  const cpuCount = os.cpus().length;
  const nth = 10;

  const workerFileName = './worker.js'
  const __filename = fileURLToPath(import.meta.url);
  const __dirname = path.dirname(__filename);
  const workerPath = path.join(__dirname, workerFileName);

  const createWorker = (ind) => new Promise((resolve, reject) => {
    const worker = new Worker(workerPath, { workerData: ind + nth });
    worker.on('message', (data) => {
      resolve({ status: 'resolved', data });
    });
    worker.on('error', () => {
      resolve({status: 'error', data: null});
    });
    worker.on('exit', (code) => {
      if (code !== 0) {
        reject(new Error(`Worker#${ind} stopped with exit code ${code}`));
      }
    });
  });

  const threads = [...Array(cpuCount).keys()].map((i) => createWorker(i));

  try {
    const results = await Promise.all(threads);
    console.log(results);
  } catch (error) {
    console.error(error);
  }
};

await performCalculations();
