import User from '../models/User';

const createUser = async userData => {
  try {
    const newUser = new User(userData);
    await newUser.save();
  } catch (error) {
    throw new Error(error.message);
  }
};

const getUser = async ({ id }) => {
  try {
    const results = User.findOne({ id });
    return results;
  } catch (error) {
    throw new Error(error.message);
  }
};

const updateUser = async userData => {
  try {
    const newUserInfo = new User(userData);
    await User.findOneAndUpdate({ id: userData.id }, newUserInfo, {
      new: true,
      overwrite: true,
      upsert: true,
    });
  } catch (error) {
    throw new Error(error.message);
  }
};

const deleteUser = async ({ id }) => {
  try {
    await User.delete({ id });
  } catch (error) {
    throw new Error(error.message);
  }
};

export default {
  create: createUser,
  get: getUser,
  put: updateUser,
  delete: deleteUser,
};
