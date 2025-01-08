import { FlatList, View, Text } from "react-native";
import { ProductProps, Product } from "../Product";
import { s } from "./style";
import { router } from "expo-router";
import { Search } from "@/src/components/Search";

type Props = {
    data: ProductProps[];
};

export function Catalog({ data }: Props) {
    return (
        <View style={s.container}>

        <Search placeholder="Buscar modelo" />

            <FlatList
                data={data}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={({ item }) => (
                    <Product 
                        data={item} 
                        onPress={() => router.push({ pathname: "/product/[id]", params: { id: item.id } })}
                    />
                )}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>Explore o catálogo.</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
