import { FlatList } from "react-native";
import { Category } from "../Category";
import { styles } from "./styles";
import { Loading } from "../Loading";

export type CategoriesProps = {
    id: string,
    name: string,
}[]

type Props = {
    data: CategoriesProps
    selected: string
    onSelect: (id: string) => void
}

export function Categories({data, selected, onSelect}: Props){

    return(
        
        <FlatList
        data={data}
        keyExtractor={(item) => item.id}
        renderItem={({item})=>
        <Category 
        iconId={item.id} 
        name={item.name} 
        onPress={() => onSelect(item.id)} 
        isSelected={item.id === selected}
        />}
        horizontal
        contentContainerStyle={styles.content}
        style={styles.container}
        showsHorizontalScrollIndicator={false}
        />
    
    )
}