import * as productModel from "../models/products.model.js";

//obtener todos los productos
export const getAllProducts= async (category) =>{
    return await productModel.getAllProducts(category);
}

//Obtener un producto por su id
export const getProductById = async (id) =>{
    return await productModel.getProductById(id);
}

//Crear un producto
export const createProduct = async (productData) =>{
    return await productModel.saveProduct(productData);
}

//Eliminar un producto
export const deleteProduct = async (id) =>{
    return await productModel.deleteProduct(id)
}

//Modificar un producto
export const updateProduct = async (id, changes)=>{
    return await productModel.updateProduct(id, changes);
}