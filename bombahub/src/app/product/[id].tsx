import { Button } from "@/src/components/Button";
import { Loading } from "@/src/components/Loading";
import { ProductProps } from "@/src/components/Product";
import { Cover } from "@/src/components/ProductProps/cover";
import { Details } from "@/src/components/ProductProps/details";
import { db } from "@/src/services/firebase";
import { Redirect, useLocalSearchParams } from "expo-router";
import { doc, getDoc } from "firebase/firestore";
import { useEffect, useState } from "react";
import { View, Text, StatusBar, ScrollView } from "react-native";

export default function ProductIndex(){
const params = useLocalSearchParams<{id: string}>()


type DataProps = ProductProps & {
  cover: string;
};

  const [data, setData] = useState<DataProps | null>();
  const [isLoading, setIsLoading] = useState(true);


  useEffect(() => {
    async function fetchBombById(bombId: string) {
      try {
        const docRef = doc(db, "bombs", bombId);
        const docSnap = await getDoc(docRef);

        if (docSnap.exists()) {
          setData({ id: docSnap.id, ...docSnap.data() } as DataProps);
        } else {
          console.log("Documento não encontrado");
          setData(null);
        }
      } catch (error) {
        console.error("Erro ao buscar documento:", error);
      } finally {
        setIsLoading(false);
      }
    };

    if (params.id) {
      fetchBombById(params.id);
    }
  }, [params.id]);

  if (isLoading) {
    return <Loading />;
  }

  if (!data) {
    return <Redirect href="/home" />;
  }
  return (
    <View style={{ flex: 1 }}>
        <StatusBar barStyle="light-content" />

        <ScrollView showsHorizontalScrollIndicator={false}>
      <Cover uri={data.cover} />

      <Details data={data} />
      </ScrollView>
    </View>
  );

}