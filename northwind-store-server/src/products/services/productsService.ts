import { getProductFromPG, getProductsFromPG } from "../DAL/productsDAL";

export const getAllProducts = async () => {
  try {
    const products = await getProductsFromPG();
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProduct = async (productTitle: string) => {
  try {
    const products = await getProductFromPG(productTitle);
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};
