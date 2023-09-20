import { connect } from "mongoose";
import User from "../users/models/mongoose/User";

const connectToMongoDb = async () => {
  try {
    await connect("mongodb://127.0.0.1:27017/usersApp");
    return "Connect to mongoDB successfully!";
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getAllUsersFromMongoDb = async () => {
  try {
    const users = await User.find();
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export default connectToMongoDb;
