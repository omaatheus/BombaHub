import FontAwesome from "@expo/vector-icons/FontAwesome";
import { IconLibrary, IconSearch,  IconUser} from "@tabler/icons-react-native";
import { Tabs } from "expo-router";
import { colors } from "@/src/styles/colors";
import MyTabBar from "@/src/components/TabBar";


export default function TabLayout() {
  return (
    <Tabs tabBar={props => <MyTabBar {...props} />} screenOptions={{ tabBarActiveTintColor: colors.blue.base }}>
      <Tabs.Screen
        name="home"
        options={{
          headerShown: false,
          title: "Catalogo",
          tabBarIcon: ({ color }) => <IconLibrary size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="search"
        options={{
          headerShown: false,
          title: "Pesquisar",
          tabBarIcon: ({ color }) => <IconSearch size={28} color={color} />,
        }}
      />
      <Tabs.Screen
        name="profile"
        options={{
          headerShown: false,
          title: "Perfil",
          tabBarIcon: ({ color }) => <IconUser size={28} color={color} />,
        }}
      />
    </Tabs>
  );
}
