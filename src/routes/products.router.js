import { Router } from "express";

const router = Router();

const products = [
    {id: 1, nombre: "Uno 1", cantidad: 100, precio: 10.0},
    {id: 2, nombre: "Dos 2", cantidad: 200, precio: 15.0},
    {id: 3, nombre: "Tres 3", cantidad: 300, precio: 20.0},
]

import { getAllProducts, searchProduct, getProductID } from "../controllers/products.controller.js";
import { deleteProduct } from "../models/products.model.js";


export default router;


router.get('/products', getAllProducts);

router.get("/products/search", searchProduct);

router.get('/products/:id', getProductID);

router.post("/products", (req, res) => {
    const newProduct = req.body;
    products.push(newProduct);
    res.json(newProduct);
})

router.put("/products/:id", (req, res) => {
    const productId = parseInt(req.params.id, 10);
    const productIndex = products.findIndex((p) => p.id === productId);

    if (productIndex === -1) {
        return res.status(404).json({ error: "Producto no encontrado" });
    }

    const { name, precio } = req.body;

    products [productIndex] = { ...products[productIndex], name, precio };
    res.json(products[productIndex]);
});

router.delete("/products/:id", deleteProduct);