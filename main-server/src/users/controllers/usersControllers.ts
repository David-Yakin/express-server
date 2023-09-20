import UserInterface from "../interfaces/UserInterface";
import {
  getUsers,
  getUser,
  register,
  editUser,
  deleteUser,
  login,
  addProductToUser,
} from "../services/usersApiService";
import { handleError } from "../../utils/handleErrors";
import userValidation from "../models/joi/userValidation";
import { Request, Response } from "express";
import { UserRequest } from "../../auth/providers/jwt";

export const handleGetUsers = async (req: Request, res: Response) => {
  try {
    const reqUser = req as UserRequest;
    const { isAdmin } = reqUser.user;
    if (!isAdmin)
      throw new Error(
        "You must be an admin type user in order to get all the users"
      );

    const users = await getUsers();
    return res.send(users);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleGetUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { isAdmin, _id: userId } = reqUser.user;
    if (!isAdmin && userId !== id)
      throw new Error(
        "You must be an admin type user or the registered user in order to get this user information"
      );

    const user = await getUser(id);
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleUserRegistration = async (req: Request, res: Response) => {
  try {
    const user: UserInterface = req.body;

    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await register(user);
    return res.status(201).send(userFromDB);
  } catch (error) {
    if (error instanceof Error) handleError(res, error);
  }
};

export const handleEditUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { _id: userId } = reqUser.user;
    if (userId !== id)
      throw new Error(
        "You must be the registered user in order to update his details"
      );

    const user: UserInterface = req.body;

    const { error } = userValidation(user);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const userFromDB = await editUser(id, user);
    return res.send(userFromDB);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleDeleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const reqUser = req as UserRequest;
    const { _id: userId, isAdmin } = reqUser.user;
    if (userId !== id && !isAdmin)
      throw new Error(
        "You must be a user type admin or the registered user in order to update his details"
      );

    const user = await deleteUser(id);
    return res.send(user);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (error instanceof Error) return handleError(res, error);
  }
};

export const handleLogin = async (req: Request, res: Response) => {
  try {
    const userFromClient: UserInterface = req.body;

    const { error } = userValidation(userFromClient);
    if (error?.details[0].message) throw new Error(error?.details[0].message);

    const token = await login(userFromClient);
    return res.send(token);
  } catch (error) {
    if (error instanceof Error) return handleError(res, error, 401);
  }
};

export const handleAddProductToUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { product } = req.query;
    const reqUser = req as UserRequest;
    const { _id: userId } = reqUser.user;
    if (userId !== id)
      throw new Error(
        "You must be the registered user in order to add product"
      );

    const userWithProduct = await addProductToUser(id, String(product));
    if (!userWithProduct)
      throw new Error("Could not add this product to this user");

    return res.send(userWithProduct);
  } catch (error) {
    if (error instanceof Error && error.message.match(/You must be/g))
      return handleError(res, error, 403);
    if (
      error instanceof Error &&
      error.message === "Request failed with status code 400"
    )
      return handleError(
        res,
        new Error("Could not find this product in the database")
      );

    if (error instanceof Error) return handleError(res, error);
  }
};
