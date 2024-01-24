import { pipeline } from 'stream/promises';
import { Transform } from 'stream';

const transform = async () => {
  const welcomeText = 'Write something for reversing (enter "__exit" or press CTRL+C to close).\n';

  const exit = () => {
    process.stdout.write('\n' + 'Exiting...');
    process.exit(1);
  };

  if (process.platform === "win32") {
    process.stdin.on("SIGINT", () => {
      process.emit("SIGINT");
    });
  }

  process.on('SIGINT', () => {
    exit();
  });

  try {
    const transformer = new Transform({
      transform(chunk, encoding, callback) {
        if(chunk.toString().trim() === '__exit') exit();

        callback(
          null,
          `Output: ${chunk
            .toString()
            .trim()
            .split('')
            .reverse()
            .join('')
          }\nNew Input: `,
        );
      }
    });

    process.stdout.write(welcomeText);
    process.stdout.write('Input: ');

    await pipeline(
      process.stdin,
      transformer,
      process.stdout,
    );
  } catch (error) {
    console.error(error);
    exit();
  }
};

await transform();
