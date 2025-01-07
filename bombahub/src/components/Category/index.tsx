import { Text, Pressable, PressableProps } from "react-native";
import { styles } from "./styles";
import { categoriesIcons } from "@/src/utils/categories-icons";
import { colors } from "@/src/styles/colors";

type Props = PressableProps & {
    iconId: string,
    isSelected?: boolean,
    name: string,
}

export function Category({name, iconId, isSelected = false, ...rest}: Props){

    const Icon = categoriesIcons[iconId]

    return (
        <Pressable {...rest} style={[styles.container, isSelected && styles.containerSelected]}>
            <Icon size={16} color={colors.gray[isSelected ? 100 : 400]} />
            <Text style={[styles.name, isSelected && styles.nameSelected]}>{name}</Text>
        </Pressable>
    )
}