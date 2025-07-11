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
    const product = await model.getProductByID(id);

    if (!product) {
        return res.status(404).json({ error: "No existe el producto"});
    }
    res.json(product);
}

export const createProduct = async (data) => {
    const {name, price, categories} = req.body;
    const newProduct = await model.createProduct({
        name, price, categories})
    res.status(201).json(newProduct);
}

export const deleteProduct = async (id) => {
  const productId = req.params.id;

  const product = await model.deleteProduct(productId);

  if (!product) {
    return res.status(404).json({ error: "Producto no encontrado" });
  }

  res.status(204).send();
}