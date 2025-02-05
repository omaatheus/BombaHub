import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export async function fetchCategoriesFromDb(){
    try {
        const res = await getDocs(collection(db, "categories"));
              const categ: any = [];
              
                
            res.forEach((doc) => {
                const categoryData = {
                  id: doc.id,      
                  name: doc.data().name, 
                };
                
                
                categ.push(categoryData);
              });

              return categ
        
    } catch (error) {
        console.error(error);
    }
}