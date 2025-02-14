import { addDoc, collection, updateDoc } from "firebase/firestore";
import { db } from "../services/firebase";


interface Bomba {
    categoriaId: string;
    id: string;
    model: string;
    rolamentos: { quantidade: number; modelo: string }[];
    retentores: { quantidade: number | null; modelo: string | null }[];
    gaxeta: string | null;
  }
  
  async function popularCollection(bombas: Bomba[]) {
    try {
      // Collection "bombs"
      const bombsCollection = collection(db, "bombs");
  
      // Adicionar documentos com IDs gerados pelo Firestore
      for (const bomba of bombas) {
        // Adicionar documento e obter referência
        const docRef = await addDoc(bombsCollection, bomba);
  
        // Atualizar o documento com o ID gerado
        await updateDoc(docRef, { id: docRef.id });
  
        console.log(`Bomba ${bomba.model} adicionada com ID: ${docRef.id}`);
      }
  
      console.log("Todas as bombas foram adicionadas!");
    } catch (error) {
      console.error("Erro ao popular a collection:", error);
    }
  }
  
  // Dados das bombas
  let bombas: Bomba[] = [];
  
  // Função para adicionar bombas à lista
  function adicionarBomba(bomba: Bomba) {
    bombas.push(bomba);
  }
  
  // Função para popular o Firebase
  export function popularFirebase() {
    popularCollection(bombas);
  }
  