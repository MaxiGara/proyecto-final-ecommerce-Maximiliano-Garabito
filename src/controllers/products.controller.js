import * as service from '../services/products.service.js'

export const getAllProducts = async (req, res) => {
    const products = await service.getAllProducts();
    res.json(products);
}

export const searchProduct = async (req, res) => {
    const {name} = req.query
    const products = await model.getAllProducts();
    const filteredProducts = products.filter((p) => 
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    res.json(filteredProducts)
}

export const getProductID = async (req, res) =>{
    const { id } = req.params;
    const products = await model.getProductByID(id);

    if (!products) {
        return res.status(404).json({ error: "Medicamento no encontrado" });
    }
    res.json(products);
}

export const createProduct = async (data) => {
    const {name, price, categories} = req.body;
    const newProduct = await model.createProduct({
        nombre, descripcion, precio})
    res.status(201).json(newProduct);
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

export const deleteProduct = async (id) => {
  const productId = req.params.id;

  const products = await model.deleteProduct(productId);

  if (!products) {
    return res.status(404).json({ error: "Medicamento no encontrado" });
  }

  res.status(204).send();
}