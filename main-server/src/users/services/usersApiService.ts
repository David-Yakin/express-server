import UserInterface, { LoginInterface } from "../interfaces/UserInterface";
import { v1 as uuid1 } from "uuid";
import { comparePassword, generateUserPassword } from "../helpers/bcrypt";
import {
  getCollectionFromJsonFile,
  modifyCollection,
} from "../../dataAccessLayer/jsonfileDAL";
import chalk from "chalk";
import { getDataFromDummy } from "../../dataAccessLayer/dummyjson";
import { addDataToJsonPlaceHolder } from "../../dataAccessLayer/jsonPlaceHolder";
import { generateAuthToken } from "../../auth/providers/jwt";
import { getProductFromPG } from "../../dataAccessLayer/postgreSQL";

type UserResult = Promise<UserInterface | null>;

export const getUsers = async () => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (!users) throw new Error("no users in the database");
    return users;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getUser = async (userId: string) => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const userFromDB = users.find(
      (user: Record<string, unknown>) => user._id === userId
    );

    if (!userFromDB) throw new Error("No user with this id in the database!");
    return userFromDB;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const register = async (user: UserInterface): UserResult => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const userRegistered = users.find(
      (userInDB: Record<string, unknown>) => userInDB.email === user.email
    );
    if (userRegistered) throw new Error("This user is already registered!");

    user._id = uuid1();
    user.password = generateUserPassword(user.password);
    user.isAdmin = user.isAdmin || false;
    users.push({ ...user });
    await modifyCollection("users", users);
    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const editUser = async (
  userId: string,
  userForUpdate: UserInterface
): UserResult => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const index = users.findIndex((user) => user._id === userId);
    if (index === -1) throw new Error("Could not find user with this ID!");

    const usersCopy = [...users];
    const userToUpdate = { ...usersCopy[index], ...userForUpdate };
    usersCopy[index] = userToUpdate;

    const data = await modifyCollection("users", usersCopy);
    if (!data)
      throw new Error("Oops... something went wrong Could not Edit this user");
    return userToUpdate;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const deleteUser = async (userId: string) => {
  try {
    const users = await getCollectionFromJsonFile("users");
    if (users instanceof Error)
      throw new Error("Oops... Could not get the users from the Database");

    const user = users.find((user) => user._id === userId);
    if (!user) throw new Error("Could not find user with this ID!");
    const filteredUser = users.filter((user) => user._id !== userId);

    const data = await modifyCollection("users", filteredUser);
    if (!data)
      throw new Error("Oops... something went wrong Could not Edit this user");

    return user;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const login = async (userFromClient: LoginInterface) => {
  try {
    const users = (await getCollectionFromJsonFile(
      "users"
    )) as unknown as UserInterface[];
    if (!users)
      throw new Error("Oops... Could not get the users from the Database");

    const userInDB = users.find((user) => userFromClient.email === user.email);

    if (!userInDB) throw new Error("The email or password is incorrect!");

    const userCopy = { ...userInDB };

    if (!comparePassword(userFromClient.password, userCopy.password))
      throw new Error("The email or password is incorrect!");

    const token = generateAuthToken(userInDB);
    return token;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const addProductToUser = async (
  userId: string,
  productFromClient: string
) => {
  try {
    const user = await getUser(userId);
    if (!user) throw new Error("Could not find this user!");

    const data = await getDataFromDummy();

    if (!data) {
      const productFromPG = await getProductFromPG(productFromClient);
      return Promise.resolve(productFromPG);
    }

    const { products } = data;

    let productFromDB = products.find(
      (product: Record<string, unknown>) =>
        typeof product.title === "string" &&
        product.title
          .toLowerCase()
          .trim()
          .includes(productFromClient.toLowerCase().trim())
    );

    if (!productFromDB) {
      const productFromPG = await getProductFromPG(productFromClient);
      productFromDB = productFromPG;
    }

    user.product = productFromDB;

    const userFromJsonPlaceHolder = await addDataToJsonPlaceHolder(
      user,
      "users"
    );
    if (!userFromJsonPlaceHolder)
      throw new Error("Could not add this user to jsonplaceholder database");

    return userFromJsonPlaceHolder;
  } catch (error) {
    return Promise.reject(error);
  }
};
