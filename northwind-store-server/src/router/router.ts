import express, { Request, Response } from "express";
import { handleError } from "../utils/handleErrors";
const router = express.Router();
import productRoutes from "../products/routes/productsRoutes";

router.get("/", (req, res) => {
  res.send("Connect to PostgreSQL server");
});

router.use("/api/products", productRoutes);

router.use("*", (req: Request, res: Response) =>
  handleError(res, new Error("Page Not Found!"), 404)
);

export default router;
