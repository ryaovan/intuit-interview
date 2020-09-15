import mongoose from 'mongoose';

import setUpCollection from '../db/utils';
import { dbNameEnum } from '../constants/dbEnum';
import { getConnection } from '../db/index';

const { Schema } = mongoose;

const UserSchema = Schema({
  name: String,
  password: String,
  created_at: { type: Date, default: Date.now },
});

const useDb = getConnection(dbNameEnum.USER);
setUpCollection(dbNameEnum.USER, 'user', UserSchema);

export default useDb.model('user', UserSchema);
