import * as productService from '../services/products.service.js';

//Obtener todos los productos
export const getAllProducts = async (req, res, next) => {
    try {
        const category = req.query;
        const products = await productService.getAllProducts(category);

        res.status(200).json(products);

    } catch (error) {
        next(error)
    }
};

//Obtener un producto por su ID
export const getProductById = async (req, res, next) => {
    try {
        const { id } = req.params;

        const product = await productService.getProductById(id);

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

//Crear un producto
export const createProduct = async (req, res, next) => {
    try {
        const { category, name, price } = req.body ?? {};
        if (
            typeof category !== 'string' || !category.trim() ||
            typeof name !== 'string' || !name.trim() ||
            typeof price !== 'number' || price <= 0

        ) {
            return res.status(400).json({
                error: 'category y name debe ser textos; price debe ser numero mayor que 0'
            })
        }

        const newProduct = await productService.createProduct({
            category: category.trim(),
            name: name.trim(),
            price
        });

        return res.status(201).json(newProduct)


    } catch (error) {
        next(error)
    }
};

//Eliminar un producto
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

    //Modificar un producto
    export const updateProduct = async (req, res, next) => {
        try {
            const { id } = req.params;
            const changes = req.body;


            const updatedProduct = await productService.updateProduct(id, changes);

            if (!updatedProduct) {
                return res.status(404).json({ error: 'Producto no encontrado' });
            }
            res.status(200).json(updatedProduct)
        } catch (error) {
            next(error)
        }
    }