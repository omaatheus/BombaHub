import { View, Text } from "react-native";
import { styles } from "./style";
import { Step } from "../Step";
import { IconSearch, IconInfoCircle, IconPackage } from "@tabler/icons-react-native";

export function Steps() {
    return (
        <View style={styles.container}>
            <Text style={styles.title}>Como usar o catálogo:</Text>
            <Step 
                icon={IconSearch} 
                title="Pesquise o modelo ideal" 
                description="Encontre bombas específicas para suas necessidades industriais ou de saneamento."
            />
            <Step 
                icon={IconInfoCircle} 
                title="Veja informações detalhadas" 
                description="Acesse especificações completas, como potência, vazão e aplicações."
            />
            <Step 
                icon={IconPackage} 
                title="Adquira a bomba certa" 
                description="Entre em contato com fornecedores."
            />
        </View>
    );
}
