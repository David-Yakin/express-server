import express from "express";
const app = express();
import chalk from "chalk";
import connectToPG from "./DAL/connectToPG";
import { config } from "dotenv";
import corsHandler from "./cors/corsHandler";
import morganLogger from "./logger/morganLogger";
import { handleServerError } from "./utils/handleErrors";
import router from "./router/router";
config();

app.use(morganLogger);
app.use(corsHandler);
app.use(express.json());
app.use(express.text());
app.use(router);
app.use(handleServerError);

const PORT = process.env.PORT || 9000;
app.listen(PORT, () => {
  console.log(chalk.blueBright(`Server listening on port: ${PORT}`));

  connectToPG()
    .then((message) => console.log(chalk.magentaBright(message)))
    .catch((error) =>
      console.log(
        chalk.redBright("Connect To PostgreSQL Error: ", error.message)
      )
    );
});
