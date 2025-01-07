import { FlatList, View, Text } from "react-native"


import { ProductProps, Product } from "../Product"
import { s } from "./style"

type Props = {
    data: ProductProps[]
}


export function Catalog({data}: Props){
    return(
        <View style={s.container}>
            <FlatList 
            data={data}
            keyExtractor={(item)=> item.id}
            renderItem={({item}) => <Product data={item} />}
            contentContainerStyle={s.content}
            ListHeaderComponent={()=>(
                <Text style={s.title}>Explore o catálogo.</Text>
            )}
            showsVerticalScrollIndicator={false}
            />
        </View>
    )
}