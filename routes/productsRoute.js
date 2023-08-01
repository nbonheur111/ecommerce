import express  from "express";
import { createProductCtrl, getProductsCtrl } from "../controllers/productsCtrl.js";
import { isLoggedIn } from "../middlewares/isLoggedIn.js";



const productRouter = express.Router();

productRouter.post("/",isLoggedIn, createProductCtrl);
productRouter.get("/", getProductsCtrl);

export default productRouter;