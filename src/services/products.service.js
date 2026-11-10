//Importa las funciones del modelo
import * as productModel from "../models/products.model.js";

//obtiene todos los productos
export const getAllProducts= async () =>{
    return await productModel.getAllProducts();
}

//Obtiene un producto por su id
export const getProductById = async (id) =>{
    return await productModel.getProductById(id);
}

//Crea un producto
export const createProduct = async (productData) =>{
    return await productModel.saveProduct(productData);
}

//Elimina un producto
export const deleteProduct = async (id) =>{
    return await productModel.deleteProduct(id)
}

//Modifica un producto
export const updateProduct = async (id, changes)=>{
    return await productModel.updateProduct(id, changes);
}