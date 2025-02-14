import { View, Text, StyleSheet, Alert } from "react-native";

import { colors, fontFamily } from "@/src/styles/theme";

import { useEffect, useState } from "react";

import { Categories, CategoriesProps } from "../../components/Categories";
import { fetchCategoriesFromDb } from "../../utils/fetchCategories";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/services/firebase";
import { ProductProps } from "@/src/components/Product";
import { Catalog } from "../../components/Catalog";
import { Loading } from "../../components/Loading";
import React from "react";

type PropsProduct = ProductProps;

export default function Home() {
  const [categories, setCategories] = useState<CategoriesProps>([]);
  const [category, setCategory] = useState("");
  const [product, setProduct] = useState<PropsProduct[]>([]);

  async function fetchCategories() {
    try {
      const data = await fetchCategoriesFromDb();
  

      const sortedData = data.sort((a: { name: string }, b: { name: string }) => 
        a.name.localeCompare(b.name)
      );
  
      setCategories(sortedData);
      setCategory(sortedData[0]?.id);
    } catch (error) {
      console.log(error);
      Alert.alert("Categorias", "Não foi possível carregar as categorias.");
    }
  }
  
  

  async function fetchProducts() {
    try {
      if (!category) {
        return;
      }

      const bombsRef = collection(db, "bombs");
      const bombsQuery = query(bombsRef, where("categoriaId", "==", category));

      const querySnapshot = await getDocs(bombsQuery);

      const bombs: ProductProps[] = querySnapshot.docs.map((doc) => {
        const data = doc.data() as ProductProps;
      
        return {
          ...data, 
        };
      });
      

      setProduct(bombs); 
    } catch (error) {
      console.log(error);
      Alert.alert("Catálogo", "Não foi possível carregar o catálogo.");
    }
  }

  
  useEffect(() => {
    fetchCategories();
  }, []);

  
  useEffect(() => {
    fetchProducts();
  }, [category]); 

  return (
    <>

    {product ?

    <View style={styles.container}>
      <Categories data={categories} selected={category} onSelect={setCategory} />

      
      <Catalog placeholder="Explore o catálogo." data={product} />
      
    </View> : <Loading />
    }
    </>
  );
}

const styles = StyleSheet.create({
  container: {
    
    backgroundColor: colors.gray[100],
  },
});
