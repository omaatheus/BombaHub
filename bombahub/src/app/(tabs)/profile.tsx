import { StyleSheet, View, Text } from "react-native";

export default function Profile(){
    return(
        <View style={styles.container}>
            <Text>Profile</Text>
        </View>
    )
}

const styles = StyleSheet.create({
    container: {
        alignItems: "center",
        justifyContent: "center",
        flex: 1,
    }
})