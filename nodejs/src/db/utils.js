import mongoose from 'mongoose';

export default async (dbName, collectionName, schema) => {
  try {
    const useDB = mongoose.connection.useDb(dbName);
    await useDB.model(collectionName, schema).createCollection();
    await useDB.model(collectionName, schema).collection.dropIndex('expireAt_1');
  } catch (err) {
    console.info(`Mongoose: expireAt index did not exist on collection ${collectionName}.${err}`);
  }

  await mongoose.connection.useDb(dbName).model(collectionName, schema).collection.createIndex();
};
