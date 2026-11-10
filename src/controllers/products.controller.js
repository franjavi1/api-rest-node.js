//Importa las funciones de la capa de servicios 
import * as productService from '../services/products.service.js';

//Obtiene todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        //Lee los parametros de la consulta de la URL
  
        const products = await productService.getAllProducts();

        res.status(200).json(products);

    } catch (error) {
        //Pasa el error al middlaware general de Express
        next(error)
    }
};

//Obtiene un producto por su ID
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);
        //Si no exite, responde con 404
        if (!product) {
            return res.status(404).json({
                error: 'Producto no encontrado'
            });
        }

        res.status(200).json(product);
    } catch (error) {
        next(error)
    }
};

//Crea un producto
export const createProduct = async (req, res, next) => {
    try {
        //Obtiene los campos enviados en el body
        const { category, name, price } = req.body ?? {};
        //Verifica que los campos no esten vacios y el precio mayor que 0
        if (
            typeof category !== 'string' || !category.trim() ||
            typeof name !== 'string' || !name.trim() ||
            typeof price !== 'number' || price <= 0

        ) {
            return res.status(400).json({
                error: 'category y name debe ser textos; price debe ser numero mayor que 0'
            })
        }
        //Envia los datos validados al servicio para guardar el producto
        const newProduct = await productService.createProduct({
            category: category.trim(),
            name: name.trim(),
            price
        });
         //201 Indica que el producto se creo exitosamente
        return res.status(201).json(newProduct)


    } catch (error) {
        next(error)
    }
};

//Elimina un producto
export const deleteProduct = async (req, res, next) => {
    try {
        const { id } = req.params;

        await productService.deleteProduct(id)

        res.status(200).json({
            message: 'Producto eliminado correctamente'
        });
    } catch (error) {
        next(error)
    }

};

    //Actualiza un producto existente
    export const updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const changes = req.body;


            const updatedProduct = await productService.updateProduct(id, changes);
            //Si no encuentra el producto responde con un 404
            if (!updatedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }