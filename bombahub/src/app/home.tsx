import { View, Text, StyleSheet, Alert } from "react-native";

import { colors, fontFamily } from "@/src/styles/theme";

import { useEffect, useState } from "react";

import { router } from "expo-router";
import { Loading } from "../components/Loading";
import { Categories, CategoriesProps } from "../components/Categories";
import { collection, getDocs } from "firebase/firestore";
import { db } from "../services/firebase";
import { Catalog } from "../components/Catalog";

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("")

  async function fetchCategories() {
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

      
      
      setCategories(categ)
      setCategory(categ[0].id)
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);
  return (
    <View style={styles.container}>
      <Categories data={categories} selected={category} onSelect={setCategory}/>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
});
