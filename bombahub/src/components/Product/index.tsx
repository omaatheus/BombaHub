import { TouchableOpacity, TouchableOpacityProps, View, Text, Image } from "react-native";
import { s } from "./style";
import { IconPresentationFilled } from "@tabler/icons-react-native";
import { colors } from "@/src/styles/colors";


export type ProductProps = {
    categoriaId: string,
    frequenciaRotacao: string,
    id?: string,
    linhaTipo: string,
    massaEspecifica: string,
    modeloTamanho: string
    temperaturaMax: string
    temperaturaMin: string
    uniVazao: string
    vazao: string
}

type Props = TouchableOpacityProps & {
    data: ProductProps
}

export function Product({data, ...rest}: Props){
    return (
        <TouchableOpacity style={s.container} {...rest}>
            
            <View style={s.content}>
                <Text style={s.name}>{data.modeloTamanho}</Text>
                <Text style={s.description} numberOfLines={2}>Frequência rotação: {data.frequenciaRotacao}</Text>

                <View style={s.footer}>
                    <IconPresentationFilled size={16} color={colors.red.base} />
                    <Text style={s.pressure}>Vazão: {data.vazao}</Text> 
                </View>

                
            </View>

        </TouchableOpacity>
    )
}