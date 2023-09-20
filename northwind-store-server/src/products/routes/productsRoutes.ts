import express from "express";
import {
  getAllProductsController,
  getProductController,
} from "../controllers/productsControllers";
const router = express.Router();

router.get("/", getAllProductsController);
router.get("/:product", getProductController);

export default router;
