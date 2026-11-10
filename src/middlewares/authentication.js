//Importa la libreria para verificar tokens JWT y carga las variables de entorno
import jwt from 'jsonwebtoken';
import 'dotenv/config';

//Clave secreta para firmar el token
const secret_key = process.env.JWT_SECRET_KEY;

//Middleware para verificar el token JWT
export const authentication = (req, res,next) =>{
    //Lee el encabezado Authorization de la peticion
    const authorization = req.headers.authorization;
    //Si no se envia la autorizacion responde 401 ( falta autorizacion)
    if (!authorization){
        return res.sendStatus(401);
    }
    //Separa el tipo de autorizacion y tel token
    const [scheme, token] = authorization.split(' ');

  //Exige el formato Bearer Token
    if (scheme !== 'Bearer' || !token) return res.sendStatus(401);

    // Verifica la firma
    jwt.verify(token, secret_key, (err) =>{
        if (err) return res.sendStatus(403); // Si es invalido respodne un 403
        next(); // si es valido continua hacia la ruta protegida
    });

}

