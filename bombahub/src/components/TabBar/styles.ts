import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    tabbar: {
        position: "absolute",
        bottom: 50,
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center",
        backgroundColor: '#fff',
        marginHorizontal: 80,
        paddingVertical: 15,
        borderRadius: 35,
        shadowColor: '#000',
        shadowOffset: {
            width: 0,
            height: 10,
        },
        shadowOpacity: 0.1
    },
    
})