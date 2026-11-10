//Importa libreria para crear token JWT Y carga las varialbes del archivo .env
import jwt from 'jsonwebtoken';
import 'dotenv/config'

//Obtiene la clabe usada para firmar el token
const secret_key = process.env.JWT_SECRET_KEY;

// Funcion para generar un token JWT  con el ID y el mail
export const generateToken = (userData)=>{
    const user = {id: userData.id, email: userData.email};
    const expiration = { expiresIn: '1h'}; //El token vence en una hora

    return jwt.sign(user, secret_key, expiration) //Firma y devuelve el token JWt
}