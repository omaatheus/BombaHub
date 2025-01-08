import { useLocalSearchParams } from "expo-router";
import { View, Text } from "react-native";

export default function ProductIndex(){

    const params = useLocalSearchParams<{id: string}>()

    console.log(params.id);
    

    return (
        <View style={{justifyContent: "center", alignItems: "center", flex: 1}}>
            <Text>{params.id}</Text>
            
        </View>
    )
}