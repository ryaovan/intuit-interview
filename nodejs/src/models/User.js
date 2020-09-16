import mongoose from 'mongoose';

import setUpCollection from '../db/utils.js';
import { dbNameEnum } from '../constants/dbEnum.js';
import { getConnection } from '../db/index.js';

const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  username: {
    type: String,
    unique: true,
  },
  password: String,
  created_at: { type: Date, default: Date.now },
});

const useDb = getConnection(dbNameEnum.USER);
setUpCollection(dbNameEnum.USER, 'user', UserSchema);

export default useDb.model('user', UserSchema);
