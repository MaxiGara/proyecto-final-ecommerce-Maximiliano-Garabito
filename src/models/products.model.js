import { db } from "./data.js";
import { collection, doc, getDocs, addDoc, getDoc, deleteDoc, setDoc, updateDoc } from "firebase/firestore";

const productsCollection = collection(db, "products");

export const getAllProducts = async () => {
    try {
        const snapshot = await getDocs(productsCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error);
        return [];
    }
};

export const searchProduct = async (req, res) => {
    try {
        const snapshot = await get(productsCollection);
        return snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    } catch (error) {
        console.error(error)
    }
};

export const getProductByID = async (id) => {
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);
        return snapshot.exists() ? { id: snapshot.id, ...snapshot.data() } : null;
    } catch (error) {
        console.error(error);
        return null;
    }
};

export const createProduct = async (data) => {
    try {
        const docRef = await addDoc(productsCollection, data);
        return { id: docRef.id, ...data };
    } catch (error) {
        console.error("Error en el modelo al crear producto", error)
        throw error;
    }
};

export async function updateProduct(id, productData) {
  try {
    const productRef = doc(productsCollection, id);
    const snapshot = await getDoc(productRef);

    if (!snapshot.exists()) {
      return false;
    }

    await setDoc(productRef, productData);
    return { id, ...productData };
  } catch (error) {
    console.error(error);
  }
};

export const patchProduct = async (id, productData) => {
    console.log("Tipo de producto: ", typeof id, id)
    try {
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            return false;
        }

        await updateDoc(productRef, productData);
        return { id, ...snapshot.data(), ...productData };
    } catch (error) {
        console.error(error);
        return false;
    }
};

export const deleteProduct = async (id) => {
    try {
        if (typeof id !== 'string') {
            throw new Error("ID debe ser un string en deleteProduct");
        }
        
        const productRef = doc(productsCollection, id);
        const snapshot = await getDoc(productRef);

        if (!snapshot.exists()) {
            return false;
        }
        await deleteDoc(productRef);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
