import User from '../models/User.js';

const createUser = async userData => {
  try {
    const newUser = new User(userData);
    await newUser.save();
    return newUser._id; // eslint-disable-line
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async ({ username }) => {
  try {
    const result = await User.findOne({ username });
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async userData => {
  try {
    const newUserInfo = new User(userData);
    await User.findOneAndUpdate({ username: userData.username }, newUserInfo, {
      new: true,
      overwrite: true,
      upsert: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async ({ username }) => {
  try {
    await User.delete({ username });
  } catch (error) {
    throw new Error(error.message);
  }
};

const getAllUsers = async () => {
  try {
    const result = await User.find();
    return result;
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  create: createUser,
  get: getUser,
  getAll: getAllUsers,
  put: updateUser,
  delete: deleteUser,
};
