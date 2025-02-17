import { TextInput, View } from "react-native";
import { Button } from "../Button";
import { IconFilter, IconSearch } from "@tabler/icons-react-native";
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
        <View style={styles.searchContainer}>
        <IconSearch size={20} color="#666" />
        <TextInput
          style={styles.searchInput}
          placeholder={placeholder}
          placeholderTextColor="#999"
          value={searchText}
          onChangeText={setSearchText}
          returnKeyType="done"
          onSubmitEditing={handleSearch}
        />
        <Button style={styles.filterButton} onPress={() => console.log("Filtro ativado")}>
          <Button.Icon icon={IconFilter} />
        </Button>
      </View>
    );
}