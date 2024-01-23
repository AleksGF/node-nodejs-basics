const parseEnv = () => {
  const env = process.env;

  for (let key in env) {
    if (key.startsWith('RSS_')) {
      console.log(`${key}=${env[key]}`);
    }
  }
};

parseEnv();
