import {Router} from 'express'

import * as productController from '../controllers/products.controller.js'

const router = Router()

//Obtener todos los productos
router.get('/', productController.getAllProducts)

//Obtener el producto por su id
router.get('/:id', productController.getProductById)

//Crear un producto
router.post('/create', productController.createProduct)

//Eliminar un producto
router.delete('/:id',productController.deleteProduct)

//Modificar un producto
router.patch('/:id',productController.updateProduct)

export default router;
