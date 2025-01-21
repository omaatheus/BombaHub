import { FlatList, View, Text } from "react-native";
import { ProductProps, Product } from "../Product";
import { s } from "./style";
import { router } from "expo-router";

type Props = {
    data: ProductProps[];
    placeholder: string
};

export function Catalog({ data, placeholder }: Props) {
    return (
        <View style={s.container}>
            <FlatList
                data={data}
                keyExtractor={(item) => item.id ?? ""}
                renderItem={({ item }) => (
                    <Product 
                        data={item} 
                        onPress={() => router.push({ pathname: "/product/[id]", params: { id: String(item.id) } })}
                    />
                )}
                contentContainerStyle={s.content}
                ListHeaderComponent={() => (
                    <Text style={s.title}>{placeholder}</Text>
                )}
                showsVerticalScrollIndicator={false}
            />
        </View>
    );
}
