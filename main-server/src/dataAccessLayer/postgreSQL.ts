import axios from "axios";

const BASE_URL = "http://127.0.0.1:9191";

axios.defaults.headers.origin = "http://127.0.0.1:8181";

export const connectToPG = async () => {
  try {
    const { data: message } = await axios.get(`${BASE_URL}`);
    return message;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductsFromPG = async () => {
  try {
    const products = await axios.get(`${BASE_URL}/api/products`);
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};

export const getProductFromPG = async (product: string) => {
  try {
    const { data: productFromPG } = await axios.get(
      `${BASE_URL}/api/products/${product}`
    );
    return productFromPG;
  } catch (error) {
    return Promise.reject(error);
  }
};
