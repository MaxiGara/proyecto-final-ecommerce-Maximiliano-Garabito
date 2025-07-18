import * as service from '../services/products.service.js'
import * as model from '../models/products.model.js';

export const getAllProducts = async (req, res) => {
    const products = await service.getAllProducts();
    res.json(products);
}

export const searchProduct = async (req, res) => {
    const { nombre, presentacion, precio } = req.query
    const products = await model.getAllProducts();

    console.log("Datos obtenidos de Firebase:", products);

    const filteredProducts = products.filter((p) => {
        let match = true;

        if (nombre) {
            match = match && p.nombre?.toLowerCase().includes(nombre.toLowerCase());
        }

        if (precio) {
            match = match && p.precio == precio;
        }

        if (presentacion) {
            const buscado = presentacion.toLowerCase();

            const presentaciones = Array.isArray(p.presentacion)
                ? p.presentacion
                : typeof p.presentacion === "string"
                    ? [p.presentacion]
                    : [];

            match = match && presentaciones.some(pres =>
                typeof pres === "string" &&
                pres.toLowerCase() === buscado
            );
        }

        return match;
    })

    res.json(filteredProducts)
}

export const getProductByID = async (req, res) => {
    const { id } = req.params;

    if (!id) {
        return res.status(400).json({ error: "ID no proporcionado" });
    }

    const products = await model.getProductByID(id);

    if (!products) {
        return res.status(404).json({ error: "Medicamento no encontrado" });
    }
    res.json(products);
}

export const createProduct = async (req, res) => {
    try {
        console.log("Creando producto:", req.body);

        const { nombre, descripcion, precio, presentacion } = req.body;

        if (!nombre || !descripcion || !precio || !presentacion) {
            return res.status(400).json({ error: "Faltan campos requeridos" });
        }

        const newProduct = await model.createProduct({
            nombre,
            descripcion,
            precio,
            presentacion
        });

        res.status(201).json(newProduct);
    } catch (error) {
        console.error("Error al crear el producto:", error);
        res.status(500).json({ error: "Error interno del servidor" });
    }
}

export const updateProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await model.updateProduct(id, productData);

    if (!updatedProduct) {
        return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    res.json(updatedProduct);
}

export const patchProduct = async (req, res) => {
    const { id } = req.params;
    const productData = req.body;

    const updatedProduct = await model.patchProduct(id, productData);

    if (!updatedProduct) {
        return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    res.json(updatedProduct);
}

export const deleteProduct = async (req, res) => {
    const { id } = req.params;

    const result = await model.deleteProduct(id);

    if (!result) {
        return res.status(404).json({ error: "Medicamento no encontrado" });
    }

    res.status(204).send();
};
