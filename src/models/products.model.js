//Importa la conexion a Firestore inciailizada en data.js
import { db } from '../data/data.js';

//Importa las funciones de Firestore usadas para consultar y modificar doc de Firebase
import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';

//Coleccion dodne se guardan los productos
const productsCollection = collection(db, 'products');

//Mètodo para buscar un producto por su ID
export async function getProductById(id) {
    const productDoc = await getDoc(doc(productsCollection, id));
    //Devuelve los datos si existe el producto sino devuelve null
    if (productDoc.exists()) {
        return productDoc.data()
    } else {
        return null
    }

};

//Mètodo para obtener todos los productos
export async function getAllProducts(){
    const querySnapshot = await getDocs(productsCollection);
    const products = [];
    //Agrega cada producto a la lista con su ID de Firestore
    querySnapshot.forEach((doc)=>{
        products.push({id: doc.id, ...doc.data()});
    });
    return products;
}

//Metodo para guardar un producto en Firestore generando un ID 
export async function saveProduct(product){
    const documentRef = await addDoc(productsCollection, product);
    //Devuelbe el ID generado junto con los datos guardados
    return {
        id: documentRef.id,
        ...product
    };
}

//Metodo pra eliminar un producto por su ID
export async function deleteProduct(id){
    await deleteDoc(doc(productsCollection,id));
}

// Metodo para modificar un producto por su ID

export async function updateProduct(id,changes){
    const productRef = doc(productsCollection, id)

    const productDoc = await getDoc(productRef)
    //Si no existe devuvelve null
    if (!productDoc.exists()){
        return null;
    }
    await updateDoc(productRef, changes);
    //Devuelve los datos actualizados
    return await getProductById(id)

}