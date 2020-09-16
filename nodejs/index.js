import initMongoose from './src/db/index.js';
import app from './src/server.js';

const { PORT = 3000 } = process.env;

const setup = async () => {
  try {
    await initMongoose();
    console.log('init 3 sec buffer for mongoose connection');
    setTimeout(() => {
      app.listen(PORT, () => console.log(`Express running → PORT ${PORT}`));
    }, 3000);
  } catch (err) {
    console.error(`setup - ${err}`);
  }
};

setup();
