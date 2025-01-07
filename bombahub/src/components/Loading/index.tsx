import { ActivityIndicator } from "react-native";
import { styles } from "./style";
import { colors } from "@/src/styles/colors";

export function Loading(){
    return <ActivityIndicator color={colors.blue.base} style={styles.container} />
}
