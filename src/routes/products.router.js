import { Router } from "express";

const router = Router();

import { getAllProducts, searchProduct, getProductID, createProduct, updateProduct } from "../controllers/products.controller.js";
import { deleteProduct } from "../models/products.model.js";


export default router;


router.get('/products', getAllProducts);

router.get("/products/search", searchProduct);

router.get('/products/:id', getProductID);

router.post("/products", createProduct)

router.put("/products/:id", updateProduct);

router.delete("/products/:id", deleteProduct);