import axios from "axios";

const DB_URL = "https://dummyjson.com/products";

export const getDataFromDummy = async () => {
  try {
    const { data: products } = await axios.get(DB_URL);
    return products;
  } catch (error) {
    return Promise.reject(error);
  }
};
