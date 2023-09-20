import { client } from "../../DAL/connectToPG";

export const getProductsFromPG = async () => {
  try {
    const { rows: products } = await client.query("SELECT * FROM products");
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductFromPG = async (productTitle: string) => {
  try {
    const { rows: product } = await client.query(
      `SELECT * FROM products WHERE product_name ILIKE '${productTitle}' LIMIT 1`
    );

    if (!product.length)
      throw new Error(
        `No product with the name "${productTitle}" was found in the database`
      );

    return product[0];
  } catch (error) {
    return Promise.reject(error);
  }
};
