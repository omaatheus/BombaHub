import { colors } from "@/src/styles/colors";
import { View, StyleSheet } from "react-native";
import { SearchComponents } from "@/src/components/Search";
import { useState } from "react";
import { db } from "@/src/services/firebase";
import { collection, getDocs, query, where } from "firebase/firestore";
import { Catalog } from "@/src/components/Catalog";
import { ProductProps } from "@/src/components/Product";
import { Loading } from "@/src/components/Loading";

export default function Search() {
  const [results, setResults] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  async function handleSearch(searchText: string) {
    setIsLoading(true);
    try {
      const res = query(
        collection(db, "bombs"),
        where("model", ">=", searchText),
        where("model", "<=", searchText + "\uf8ff")
      );

      const snapshot = await getDocs(res);
      const data = snapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      })) as ProductProps[];

      setResults(data);
      setIsLoading(false);
    } catch (error) {
      console.error("Erro ao buscar no Firestore:", error);
    }
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchComponents placeholder="Procure" onSearch={handleSearch} />
      </View>

      <View style={styles.catalogContainer}>
        {isLoading ? (
          <Loading />
        ) : (
          <Catalog
            placeholder="Faça suas buscas e encontre elas aqui"
            data={results}
          />
        )}
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100],
  },
  catalogContainer: {
    flex: 1,
    justifyContent: "center",
  },
  searchContainer: {
    justifyContent: "flex-start",
    flexDirection: "column",
    paddingBottom: 16,
    paddingHorizontal: 16,
    marginTop: 50,
  },
});
