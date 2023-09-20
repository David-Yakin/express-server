import { Request, Response } from "express";
import { handleError } from "../../utils/handleErrors";
import { getAllProducts, getProduct } from "../services/productsService";

export const getAllProductsController = async (req: Request, res: Response) => {
  try {
    const products = await getAllProducts();
    return res.send(products);
  } catch (error) {
    if (error instanceof Error) return handleError(res, error);
  }
};

export const getProductController = async (req: Request, res: Response) => {
  try {
    const { product: productTitle } = req.params;
    const product = await getProduct(productTitle);
    return res.send(product);
  } catch (error) {
    if (error instanceof Error) return handleError(res, error);
  }
};
