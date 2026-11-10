//Carga las variables definidas en el archivo .env
import 'dotenv/config';

//Importa las funcioens necesarias para iniciar Firebase y conectarse a Firebase
import { initializeApp} from 'firebase/app'
import  { getFirestore} from 'firebase/firestore'

//Configuracion de Firebase obetenidas desde las variables de entorno 
//Las varaibles no se escriben aca por seguridad
const firebaseConfig = {
    apiKey: process.env.FIREBASE_API_KEY,
    authDomain: process.env.FIREBASE_AUTH_DOMAIN,
    projectId: process.env.FIREBASE_PROJECT_ID,
    storageBucket: process.env.FIREBASE_STORAGE_BUCKET,
    messagingSenderId: process.env.FIREBASE_MESSAGING_SENDER_ID,
    appId: process.env.FIREBASE_APP_ID
};

//Inicializa la app de Firebase con la configuracion anterior
const app = initializeApp(firebaseConfig)

//Crea y exporta la conexion a Firestore pras usarla desde los modelos
export const db = getFirestore(app);