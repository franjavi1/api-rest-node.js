import jwt from 'jsonwebtoken';
import 'dotenv/config';

const secret_key = process.env.JWT_SECRET_KEY;

//Middleware para verificar el token JWT
export const authentication = (req, res,next) =>{
    const authorization = req.headers.authorization;

    if (!authorization){
        return res.sendStatus(401);
    }
    const [scheme, token] = authorization.split(' ');

  
    if (scheme !== 'Bearer' || !token) return res.sendStatus(401);

    jwt.verify(token, secret_key, (err) =>{
        if (err) return res.sendStatus(403);
        next();
    });

}

