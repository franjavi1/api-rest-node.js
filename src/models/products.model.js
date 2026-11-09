import { db } from '../data/data.js';

import {
    collection,
    getDocs,
    getDoc,
    addDoc,
    deleteDoc,
    doc,
    updateDoc
} from 'firebase/firestore';

const productsCollection = collection(db, 'products');

//Mètodo para buscar un producto por su ID
export async function getProductById(id) {
    const productDoc = await getDoc(doc(productsCollection, id));
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
    querySnapshot.forEach((doc)=>{
        products.push({id: doc.id, ...doc.data()});
    });
    return products;
}

//Metodo para guardar un producto en Firestore
export async function saveProduct(product){
    const documentRef = await addDoc(productsCollection, product);

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
    
    if (!productDoc.exists()){
        return null;
    }
    await updateDoc(productRef, changes);

    return await getProductById(id)

}