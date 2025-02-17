import { colors } from "@/src/styles/colors";
import { fontFamily } from "@/src/styles/font-family";
import { StyleSheet } from "react-native";

export const styles = StyleSheet.create({
    searchContainer: {
        flexDirection: "row",
        alignItems: "center",
        backgroundColor: "#EAEAEA",
        borderRadius: 25,
        paddingHorizontal: 10,
        paddingVertical: 8,
        marginVertical: 10,
      },
      searchInput: {
        flex: 1,
        fontSize: 16,
        marginLeft: 8,
        color: "#333",
      },
      filterButton: {
        width: 40,
        height: 40,
        marginLeft: 8,
      },
});
