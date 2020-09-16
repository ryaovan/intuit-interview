/* eslint-disable no-use-before-define */
import mongoose from 'mongoose';
import { dbEnum, dbNameEnum } from '../constants/dbEnum.js';

const { MONGO_URI = 'mongodb://mongo:27017' } = process.env;

const reconnectTimeout = 5000;
mongoose.set('useCreateIndex', true);
mongoose.set('useFindAndModify', false);

const connect = async () => {
  try {
    await mongoose.createConnection(MONGO_URI);
    await connectDatabases();
  } catch (err) {
    console.error(`Mongoose: error connecting to mongoDB ${err.message}`);
  }
};

const connectDatabases = async () => {
  try {
    await Promise.all(
      Object.keys(dbNameEnum).map(async dbName => {
        try {
          await mongoose.connect(MONGO_URI, dbEnum[dbName]);
          console.info(`connected to database: ${dbName}`);
        } catch (err) {
          console.error(`mongoose connection - ${err.message}`);
        }
      })
    );
  } catch (err) {
    console.error(`connectDatabases - ${err.message}`);
  }
};

export const getConnection = dbName => mongoose.connection.useDb(dbName);

const setupConnListeners = conn => {
  conn.on('connecting', () => {
    console.log('Mongoose: Connecting to MongoDB...');
  });

  conn.on('error', error => {
    console.error(`Mongoose: MongoDB connection error: ${error}`);
    mongoose.disconnect();
  });

  conn.on('connected', () => {
    console.log('Mongoose: Connected to MongoDB!');
  });

  conn.once('open', () => {
    console.log('Mongoose: MongoDB connection opened!');
  });

  conn.on('reconnected', () => {
    console.log('Mongoose: MongoDB reconnected!');
  });

  conn.on('disconnected', () => {
    console.error(`Mongoose: MongoDB disconnected! Reconnecting in ${reconnectTimeout / 1000}s`);
    setTimeout(() => connect(), reconnectTimeout);
  });
};

// DB connection listeners
const conn = mongoose.connection;
setupConnListeners(conn);

export default async () => connect();
