import {
    TouchableOpacity,
    TouchableOpacityProps,
    View,
    Text,
  } from "react-native";
  import { s } from "./style";
  import { 
    IconDropletHalf, 
    IconCircleDashed, 
    IconLifebuoy 
  } from "@tabler/icons-react-native";
  import { colors } from "@/src/styles/colors";
  import { fetchCategoriesFromDb } from "@/src/utils/fetchCategories";
  import { useEffect, useState } from "react";
  
  export type ProductProps = {
    categoriaId: string;
    gaxeta: string | null;
    id: string;
    model: string;
    retentores: { quantidade: number }[];
    rolamentos: { quantidade: number }[];
  };
  
  type Props = TouchableOpacityProps & {
    data: ProductProps;
  };
  
  export function Product({ data, ...rest }: Props) {
    const [categoryName, setCategoryName] = useState<string | null>(null);
  
    async function fetchNameFromCategories() {
      try {
        const categ = await fetchCategoriesFromDb();
        const category = categ.find(
          (item: { id: string }) => item.id === data.categoriaId
        );
        setCategoryName(category ? category.name : "Categoria desconhecida");
      } catch (error) {
        console.error("Erro ao buscar categorias:", error);
      }
    }
  
    useEffect(() => {
      fetchNameFromCategories();
    }, []);
  
    // Somar quantidades de retentores e rolamentos
    const totalRetentores = data.retentores.reduce((sum, item) => sum + (item.quantidade || 0), 0);
    const totalRolamentos = data.rolamentos.reduce((sum, item) => sum + (item.quantidade || 0), 0);
  
    return (
      <TouchableOpacity style={s.container} {...rest}>
        <View style={s.content}>
          <Text style={s.name}>{data.model}</Text>
          <Text style={s.description} numberOfLines={2}>
            {categoryName ? `Linha: ${categoryName}` : "Carregando linha..."}
          </Text>
  
          <View style={s.footer}>
            <View style={s.div}>
              <IconDropletHalf size={14} color={colors.blue.base} />
              <Text style={s.retentor}>
                {totalRetentores > 0
                  ? `Quantidade de retentores: ${totalRetentores}`
                  : `Os retentores não estão incluídos neste modelo.`}
              </Text>
            </View>
            <View style={s.div}>
              <IconCircleDashed size={14} color={colors.blue.base} />
              <Text style={s.rolamento}>
                {totalRolamentos > 0
                  ? `Quantidade de rolamentos: ${totalRolamentos}`
                  : `Os rolamentos não estão incluídos neste modelo.`}
              </Text>
            </View>
            <View style={s.div}>
              <IconLifebuoy size={14} color={colors.blue.base} />
              <Text style={s.gaxeta}>
                {data.gaxeta ? `Gaxeta: ${data.gaxeta}"` : `A gaxeta não está incluída neste modelo.`}
              </Text>
            </View>
          </View>
        </View>
      </TouchableOpacity>
    );
  }
  