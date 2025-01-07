import { colors, fontFamily } from "@/src/styles/theme"
import { StyleSheet } from "react-native"

export const styles = StyleSheet.create({
    container: {
        gap: 24,
        flex: 1,
    },
    title: {
        fontSize: 16,
        fontFamily: fontFamily.regular,
        color: colors.gray[500]
    }
})