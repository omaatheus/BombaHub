import { colors } from "@/src/styles/colors";
import { fontFamily } from "@/src/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    container: {
    alignItems: "center"
    },
    content: {
        marginTop: 10,
        height: 55,
        borderRadius: 8,
        width: "90%",
        flexDirection: "row",
    },
    button: {
        width: "15%",
        
    },
    input: {
        borderWidth: 1,
        borderRadius: 8,
        fontSize: 14,
        fontFamily: fontFamily.regular,
        color: colors.gray[500],
        borderColor: colors.blue.base,
        backgroundColor: colors.gray[100],
        height: 55,
        width: "85%", // Ajusta o tamanho para caber ao lado do botão
        paddingHorizontal: 8, // Adiciona espaçamento interno ao texto
    },
});
