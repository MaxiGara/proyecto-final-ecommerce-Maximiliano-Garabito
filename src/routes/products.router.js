import { Router } from "express";

const router = Router();

import { 
    getAllProducts,
    searchProduct,
    getProductByID,
    createProduct,
    updateProduct,
    deleteProduct,
    patchProduct
} from "../controllers/products.controller.js";

import { auth } from "../middlewares/auth.middleware.js";

router.get("/products", getAllProducts);

router.get("/products/search", searchProduct);

router.get("/products/:id", getProductByID);

router.post("/products", auth, createProduct)

router.put("/products/:id", auth, updateProduct);

router.patch("/products/:id", auth, patchProduct);

router.delete("/products/:id", auth, deleteProduct);

export default router;