import { useEffect, useState } from "react";
import { View, StyleSheet, Modal, Text, TouchableOpacity, ScrollView } from "react-native";
import { collection, getDocs, query, where } from "firebase/firestore";
import { db } from "@/src/services/firebase";
import { Catalog } from "@/src/components/Catalog";
import { ProductProps } from "@/src/components/Product";
import { Loading } from "@/src/components/Loading";
import { Button } from "@/src/components/Button";
import { SearchComponents } from "@/src/components/Search";
import { IconX } from "@tabler/icons-react-native";
import { colors } from "@/src/styles/colors";
import { fetchCategoriesFromDb } from "@/src/utils/fetchCategories";

export default function Search() {
  const [results, setResults] = useState<ProductProps[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [modalVisible, setModalVisible] = useState(false);
  const [selectedFilters, setSelectedFilters] = useState<string[]>([]);
  const [searchText, setSearchText] = useState("");
  const [categories, setCategories] = useState<{ id: string; name: string }[]>([]);

  async function fetchCategories() {
    try {
      const data = await fetchCategoriesFromDb();
      const sortedData = data.sort((a: { name: string }, b: { name: string }) =>
        a.name.localeCompare(b.name)
      );
      setCategories(sortedData);
    } catch (error) {
      console.error("Erro ao buscar categorias:", error);
    }
  }

  useEffect(() => {
    fetchCategories();
  }, []);

  async function handleFilterAndSearch() {
    if (!searchText && selectedFilters.length === 0) {
      setResults([]);
      return;
    }

    setIsLoading(true);

    try {
      let bombsRef = collection(db, "bombs");
      let filters = [];

      if (searchText) {
        filters.push(where("model", ">=", searchText));
        filters.push(where("model", "<=", searchText + "\uf8ff"));
      }

      if (selectedFilters.length > 0) {
        filters.push(where("categoriaId", "in", selectedFilters));
      }

      const bombsQuery = filters.length > 0 ? query(bombsRef, ...filters) : bombsRef;
      const querySnapshot = await getDocs(bombsQuery);

      const products: any = querySnapshot.docs.map((doc) => ({
        id: doc.id,
        ...doc.data(),
      }));

      setResults(products);
    } catch (error) {
      console.error("Erro ao buscar produtos:", error);
    } finally {
      setIsLoading(false);
    }
  }

  useEffect(() => {
    handleFilterAndSearch();
  }, [searchText, selectedFilters]);

  function toggleFilter(categoryId: string) {
    setSelectedFilters((prevFilters) =>
      prevFilters.includes(categoryId)
        ? prevFilters.filter((id) => id !== categoryId)
        : [...prevFilters, categoryId]
    );
  }

  function resetFilters() {
    setSelectedFilters([]);
  }

  return (
    <View style={styles.container}>
      <View style={styles.searchContainer}>
        <SearchComponents
          placeholder="Procure"
          onSearch={setSearchText}
          onPress={() => setModalVisible(true)}
        />
      </View>

      <View style={styles.catalogContainer}>
        {isLoading ? (
          <Loading />
        ) : results.length > 0 ? (
          <Catalog placeholder="Faça suas buscas e encontre elas aqui" data={results} />
        ) : (
          <Text style={styles.emptyMessage}>
            {selectedFilters.length > 0
              ? "Nenhum resultado encontrado para esse filtro."
              : "Digite algo na busca ou selecione um filtro para ver os resultados."}
          </Text>
        )}
      </View>

      {/* Modal de Filtros */}
      <Modal visible={modalVisible} animationType="slide" transparent>
        <View style={styles.modalOverlay}>
          <View style={styles.modalContent}>
            <View style={styles.modalHeader}>
              <Text style={styles.modalTitle}>Filtros</Text>
              <Button onPress={() => setModalVisible(false)}>
                <Button.Icon icon={IconX} />
              </Button>
            </View>

            <ScrollView contentContainerStyle={styles.filterContainer}>
              {categories.map(({ id, name }) => (
                <TouchableOpacity
                  key={id}
                  style={[styles.filterItem, selectedFilters.includes(id) && styles.selectedFilter]}
                  onPress={() => toggleFilter(id)}
                >
                  <Text
                    style={[styles.filterText, selectedFilters.includes(id) && styles.selectedFilterText]}
                  >
                    {name}
                  </Text>
                </TouchableOpacity>
              ))}
            </ScrollView>

            <View style={styles.modalButtons}>
              <TouchableOpacity style={styles.resetButton} onPress={resetFilters}>
                <Text style={styles.resetButtonText}>Reset</Text>
              </TouchableOpacity>
              <TouchableOpacity style={styles.applyButton} onPress={() => setModalVisible(false)}>
                <Text style={styles.applyButtonText}>Mostrar Resultados</Text>
              </TouchableOpacity>
            </View>
          </View>
        </View>
      </Modal>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: colors.gray[100], // Mantém a cor original
  },
  catalogContainer: {
    justifyContent: "center",
  },
  searchContainer: {
    flexDirection: "row",
    justifyContent: "space-between",
    paddingHorizontal: 16,
    marginTop: 50,
    alignItems: "center",
    backgroundColor: "transparent",
  },

  emptyMessage: {
    textAlign: "center",
    marginTop: 20,
    fontSize: 16,
    color: "#888",
  },
  modalOverlay: {
    flex: 1,
    justifyContent: "flex-end",
    backgroundColor: "rgba(0,0,0,0.5)",
  },
  modalContent: {
    width: "100%",
    height: "50%",
    backgroundColor: "#FFF",
    borderTopLeftRadius: 16,
    borderTopRightRadius: 16,
    padding: 20,
  },
  modalHeader: {
    justifyContent: "space-between",
    flexDirection: "row",
    alignItems: "center",
  },
  modalTitle: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 15,
  },
  filterContainer: {
    flexDirection: "row",
    flexWrap: "wrap",
    justifyContent: "center",
  },
  filterItem: {
    borderWidth: 1,
    borderColor: "#007bff",
    paddingVertical: 8,
    paddingHorizontal: 12,
    borderRadius: 20,
    margin: 5,
  },
  selectedFilter: {
    backgroundColor: "#007bff",
  },
  filterText: {
    color: "#007bff",
  },
  selectedFilterText: {
    color: "#FFF",
  },
  modalButtons: {
    flexDirection: "row",
    justifyContent: "space-between",
    marginTop: 20,
  },
  resetButton: {
    backgroundColor: "#CCC",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  resetButtonText: {
    fontWeight: "bold",
  },
  applyButton: {
    backgroundColor: "#007bff",
    paddingVertical: 10,
    paddingHorizontal: 20,
    borderRadius: 8,
  },
  applyButtonText: {
    color: "#FFF",
    fontWeight: "bold",
  },
});
