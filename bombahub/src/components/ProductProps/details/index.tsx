import { View, Text } from "react-native";

import {  IconDropletHalf, 
    IconCircleDashed, 
    IconLifebuoy  } from "@tabler/icons-react-native"

import { styles } from "./styles";
import { Info } from "../info";

type ProductProps = {
    categoriaId: string;
    gaxeta: string | null;
    id: string;
    model: string;
    retentores: { quantidade: number }[];
    rolamentos: { quantidade: number }[];
  };
  
type Props = {
    data: ProductProps
}

export function Details({ data }: Props) {
    const formatParts = (parts: { quantidade: number; modelo?: string }[] | null, label: string) => {
        if (!parts || parts.length === 0) return `${label}: Não disponível neste modelo.`;
        return `${label}:\n${parts.map(p => ` ${p.quantidade} (Unidade) Modelo: ${p.modelo ?? "Desconhecido"}`).join("\n")}`;
    };

    return (
        <View style={styles.container}>
            <Text style={styles.name}>{data.model}</Text>
            <Text style={styles.description}>Código: {data.id}</Text>

            <View style={styles.group}>
                <Text style={styles.title}>Informações</Text>
                <Info icon={IconCircleDashed} description={formatParts(data.rolamentos, "Rolamentos")} />
                <Info icon={IconDropletHalf} description={formatParts(data.retentores, "Retentores")} />
                <Info icon={IconLifebuoy} description={data.gaxeta ? `Gaxeta: ${data.gaxeta}"` : "Gaxeta não incluída neste modelo." } />
            </View>
        </View>
    );
}
