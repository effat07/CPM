const { getDB } = require("../config/db");

const getUserCollection = () => getDB().collection("users");

const findUserByEmail = async (email) => {
  const users = getUserCollection();
  return await users.findOne({ email });
};

const createUser = async (userData) => {
  const users = getUserCollection();
  const result = await users.insertOne(userData);
  return result.ops?.[0] || await users.findOne({ _id: result.insertedId });
};

const savePasswordResetToken = async (email, resetToken) => {
  const users = getUserCollection();
  const expiryTime = new Date(Date.now() + 60 * 60 * 1000); // 1 hour

  await users.updateOne(
    { email },
    {
      $set: {
        resetToken,
        resetTokenExpiry: expiryTime,
      },
    }
  );
};

const findUserByResetToken = async (token) => {
  const users = getUserCollection();
  return await users.findOne({ resetToken: token });
};

const updatePassword = async (email, hashedPassword) => {
  const users = getUserCollection();
  await users.updateOne(
    { email },
    {
      $set: { password: hashedPassword },
      $unset: { resetToken: "", resetTokenExpiry: "" },
    }
  );
};

module.exports = {
  findUserByEmail,
  createUser,
  savePasswordResetToken,
  findUserByResetToken,
  updatePassword,
};