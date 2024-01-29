const parseArgs = () => {
  const args = process.argv;

  args.forEach((arg, ind, arr) => {
    if (arg.startsWith('--')) {
      console.log(`${arg} is ${arr[ind + 1]}`);
    }
  });
};

parseArgs();
