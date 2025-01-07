import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";

export async function fetchCategoriesFromDb(){
    try {
        const res = await getDocs(collection(db, "categories"));
              const categ: any = [];
              
                // Iterar sobre os documentos e extrair os dados
            res.forEach((doc) => {
                const categoryData = {
                  id: doc.id,      // ID do documento
                  name: doc.data().name,  // Campo 'name' do documento
                };
                
                // Adicionar o objeto ao array
                categ.push(categoryData);
              });

              return categ
        
    } catch (error) {
        console.error(error);
    }
}