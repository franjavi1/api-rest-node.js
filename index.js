
import cors from 'cors'

import express from 'express';

import productsRouter from './src/routes/products.routes.js';

import authRouter from './src/routes/auth.routes.js';

import { authentication } from './src/middlewares/authentication.js';

const app = express()


const PORT = 3000;


app.use(cors());

//Middleware para realizar datos JSON
app.use(express.json())

app.use('/auth', authRouter)

//Rutas de productos
app.use('/api/products', authentication, productsRouter)


//Middleware para rutas no encontradas
app.use((req,res)=>{
    res.status(404).json({
        error: 'Ruta no encontrada'
    })
})

//Middleware para manejar errores
app.use((error, req, res, next) => {
    console.log(error);

    if (error instanceof SyntaxError && 'body' in error){
        return res.status(400).json({
            error: 'El JSON enviado no tiene un formato vàlido'
        });
    }

    res.status(500).json({
        error: 'Error interno del servidor'
    });
});

//Iniciar servidor
app.listen(PORT, ()=>{
    console.log(`Servidor funcionando en http://localhost:${PORT}`)
})