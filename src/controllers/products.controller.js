import * as service from '../services/products.service.js'

export const getAllProducts = (req, res) => {
    res.json(service.getAllProducts());
}

export const searchProduct = (req, res) => {
    const {nombre} = req.query
    const filteredProducts = products.filter((p) => 
    p.nombre.toLowerCase().includes(nombre.toLowerCase())
    );

    res.json(filteredProducts)
}

export const getProductID = (req, res) =>{
    const { id } = req.params;
    const product = products.find((item) => item.id == id);

    if (!product) {
        return res.status(404).json({ error: "No existe el producto"});
    }
    res.json(products);
}