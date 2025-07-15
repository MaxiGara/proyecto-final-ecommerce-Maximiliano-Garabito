import fs from 'fs';
import path from "path";

const __dirname = import.meta.dirname;

const jsonPath = path.join(__dirname, "./products.json");

const json = fs.readFileSync(jsonPath, "utf-8");

const products = JSON.parse(json);

// console.log(products);

import { db } from "./data.js";
import { collection, doc, getDocs, addDoc, getDoc, deleteDoc, setDoc } from "firebase/firestore";

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

export const getAllProductsByID = async (id) => {
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
        console.error(error)
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

export const deleteProduct = async (id) => {
    try {
        const producRef = doc(productsCollection, id);
        const snapshot = await getDoc(producRef);

        if (!snapshot.exists()) {
            return false;
        }
        await deleteDoc(producRef);
        return true;
    } catch (error) {
        console.error(error);
        return false;
    }
};
