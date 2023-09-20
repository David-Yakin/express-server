import express from "express";
import router from "./router/router";
const app = express();
import chalk from "chalk";
import morgan from "./logger/morgan";
import { generateInitialUsers } from "./initialData/initialDataService";
import cors from "./cors/cors";
import connectToMongoDb from "./dataAccessLayer/mongoDb";
import { handleServerError } from "./utils/handleErrors";
import { connectToPG } from "./dataAccessLayer/postgreSQL";

app.use(morgan);
app.use(cors);
app.use(express.json());
app.use(express.text());
app.use(router);
app.use(handleServerError);

const PORT = 8181;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));

  connectToPG()
    .then((message) => console.log(chalk.yellowBright(message)))
    .catch((error) => {
      console.log(
        chalk.redBright("Connect to PostgreSQL server Error: ", error.message)
      );
    });
  // connectToMongoDb()
  //   .then((message) => {
  //     console.log(chalk.yellowBright(message));
  //   })
  //   .catch((error) =>
  //     console.log(
  //       chalk.magentaBright("Connect to mongoDB Error: ", error.message)
  //     )
  //   );

  generateInitialUsers()
    .then(() => console.log(chalk.magentaBright("Initial Users Created!")))
    .catch((error) => console.log(error));
});
