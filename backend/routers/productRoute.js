import express from "express";
import addProduct from "../controllers/product/addProduct.js";
import authToken from "../middleware/authToken.js";
import getAllProducts from "../controllers/product/getAllProduct.js";
import updateProduct from "../controllers/product/updateProduct.js";
import deleteProduct from "../controllers/product/deleteProduct.js";
import getFeaturedProducts from "../controllers/product/getFeaturedProduct.js";
import getProductsByPrice from "../controllers/product/getProductsByPrice.js";
import getProductsByRating from "../controllers/product/getProductsByRating.js";
import getMyProducts from "../controllers/product/getMyProducts.js";

const productRouter = express.Router();

productRouter.post("/addProduct", authToken,addProduct);
productRouter.get("/", getAllProducts);
productRouter.put("/:id", authToken,updateProduct);
productRouter.delete("/:id",authToken , deleteProduct);
productRouter.get("/price/:value", getProductsByPrice);
productRouter.get("/rating/:value", getProductsByRating);
productRouter.get("/featured", getFeaturedProducts);
productRouter.get("/myProducts", authToken , getMyProducts);

export default productRouter;