import { collection, getDocs, query, where } from "firebase/firestore";
import { firestore } from "../firebase";

export const fetchProducts = async (userId = null) => {
  try {
    let q;
    if (userId) {
      q = query(collection(firestore, "products"), where("userId", "==", userId));
    } else {
      q = query(collection(firestore, "products"));
    }
    
    const querySnapshot = await getDocs(q);
    return querySnapshot.docs.map((doc) => ({
      id: doc.id,
      ...doc.data()
    }));
  } catch (error) {
    console.error("Error fetching products:", error);
    throw error;
  }
};
