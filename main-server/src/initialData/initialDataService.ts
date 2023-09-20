import UserInterface from "../users/interfaces/UserInterface";
import { getUsers, register } from "../users/services/usersApiService";
import chalk from "chalk";

const data = {
  users: [
    { email: "regular@gmail.com", password: "Aa1234!", isAdmin: false },
    { email: "business@gmail.com", password: "Aa1234!", isAdmin: false },
    { email: "admin@gmail.com", password: "Aa1234!", isAdmin: true },
  ],
};

export const generateInitialUsers = async () => {
  debugger;
  try {
    const usersInDB = await getUsers();
    if (Array.isArray(usersInDB) && usersInDB.length) return null;

    const users: UserInterface[] = [];

    for (const user of data.users) {
      try {
        const userInDB = await register(user);
        users.push(userInDB as UserInterface);
      } catch (error) {
        if (error instanceof Error) console.log(chalk.redBright(error.message));
      }
    }

    Promise.resolve(users);
  } catch (error) {
    console.log(chalk.redBright(error));
    Promise.reject(error);
  }
};
