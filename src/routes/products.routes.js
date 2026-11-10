//Importa Router de Express
import {Router} from 'express'

//Importa los controladores de los productos
import * as productController from '../controllers/products.controller.js'

//Crea el router de productos
const router = Router()

//Obtiene todos los productos
router.get('/', productController.getAllProducts)

//Obtiene el producto por su id
router.get('/:id', productController.getProductById)

//Crea un producto
router.post('/create', productController.createProduct)

//Elimina un producto
router.delete('/:id',productController.deleteProduct)

//Modifica un producto
router.patch('/:id',productController.updateProduct)

//Exporta el router
export default router;
