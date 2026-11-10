//Importa la funcion que genera el token JWT
import { generateToken } from "../../utils/token-generator.js";

//Usuario de prueba harcodeado para probar el login
const default_user = {
    id: 1,
    email: "user@email.com",
    password: "strongPass123"
}
//Funciton que recibe las credenciales 
export async function login (req, res){
    const { email, password } = req.body;
    

    //Crea los datos del usuario que se incuiran en el token
    const user = {id: 1, email}

    //Si las credenciales coinciden , genera y devuelve un token
    if (email== default_user.email && password==default_user.password){
        const token = generateToken(user);
        res.json(token)

    }else{
        //Si no coinciden devuelve un 401: no autorizado
        res.sendStatus(401);
    }

}