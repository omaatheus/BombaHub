import { router } from "expo-router";
import { View, Text, StyleSheet, StatusBar } from "react-native";
import { Welcome } from "../components/Welcome";
import { Steps } from "../components/Steps";
import { Button } from "../components/Button";
import { IconHandClick } from "@tabler/icons-react-native";

export default function Index() {
  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Welcome />
      <Steps />
      <Button onPress={() => router.navigate('./home')}>
        <Button.Icon icon={IconHandClick} />
        <Button.Title>Vamos Lá</Button.Title>
      </Button>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    gap: 40,
  },
});
