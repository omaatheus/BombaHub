import { TextInput, View } from "react-native";
import { Button } from "../Button";
import { IconSearch } from "@tabler/icons-react-native";
import { styles } from "./styles";
import { useState } from "react";

type Props = {
    placeholder: string
    onSearch: (query: string) => void
}


export function SearchComponents({placeholder, onSearch}: Props) {

    const [searchText, setSearchText] = useState('');

    const handleSearch = () => {
        onSearch(searchText);
    };

    return (
        <View style={styles.container}>
            <View style={styles.content}>
                <TextInput
                    style={styles.input}
                    placeholder={placeholder}
                    value={searchText}
                    onChangeText={setSearchText}
                />
                <Button style={styles.button} onPress={handleSearch}>
                    <Button.Icon icon={IconSearch} />
                </Button>
            </View>
        </View>
    );
}