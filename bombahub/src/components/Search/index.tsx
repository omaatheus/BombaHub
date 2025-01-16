import { TextInput, View } from "react-native";
import { Button } from "../Button";
import { IconSearch } from "@tabler/icons-react-native";
import { styles } from "./styles";

type Props = {
    placeholder: string
}


export function Search({placeholder}: Props) {
    return (
        <View style={styles.container}>
        <View style={styles.content}>
            <TextInput style={styles.input} placeholder={placeholder}>

            </TextInput>
            <Button style={styles.button}>
                <Button.Icon icon={IconSearch}>

                </Button.Icon>
            </Button>
        </View>
        </View>
    )
}