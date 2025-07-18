import * as model from "../models/products.model.js";

export const getAllProducts = () => {
  return model.getAllProducts();
};

export const getProductById = (id) => {
  return model.getProductById(id);
};

export const createProduct = (data) => {
  return model.createProduct(data);
}

export const updateProduct = (id, data) => {
  return model.updateProduct(id, data);
}

export const deleteProduct = (id) => {
  return model.deleteProduct(id);
}