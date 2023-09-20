import { Client } from "pg";
import { config } from "dotenv";
config();

const { API_DATABASE, USER, PASSWORD } = process.env;

const clientOptions = {
  host: "127.0.0.1",
  port: 5433,
  database: API_DATABASE,
  user: USER,
  password: PASSWORD,
};

export const client = new Client(clientOptions);

const connectToPG = async () => {
  try {
    await client.connect();
    return "connected to postgreSQL database successfully";
  } catch (error) {
    if (error instanceof Error) return Promise.reject(error);
    throw new Error("Something went wong!");
  }
};

export default connectToPG;
