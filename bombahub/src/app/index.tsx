import { router, useNavigation } from "expo-router";
import { View, Text, StyleSheet, StatusBar, Pressable, TouchableOpacity } from "react-native";
import { Welcome } from "../components/Welcome";
import { Steps } from "../components/Steps";
import { colors } from "../styles/colors";
import { fontFamily } from "../styles/font-family";

export default function Index() {

  const navigation = useNavigation()

  function handleClickRegister(){
    router.push("/register")
  }
  function handleClickLogin(){
    router.push("/login")
  }

  return (
    <View style={styles.container}>
      <StatusBar barStyle="dark-content" />
      <Welcome />
      <Steps />

      <View style={styles.buttonDiv}>
        <TouchableOpacity onPress={handleClickRegister} style={styles.registerButton} activeOpacity={0.7}>
          <Text style={styles.registerText}>Register</Text>
          
        </TouchableOpacity>
        <Pressable onPress={handleClickLogin} style={styles.signInButton}>
          <Text style={styles.signInText}>Sign in</Text>
        </Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 40,
    gap: 40,
  },
  buttonDiv: {
    flexDirection: "row",
    width: "100%",
    height: 70,
    borderRadius: 20,
    borderWidth: 3,
    borderColor: colors.blue.base,
    alignItems: "center",
    justifyContent: "space-between",
    backgroundColor: "#fff",
  },
  registerButton: {
    flex: 1,
    height: "100%",
    backgroundColor: colors.blue.base,
    borderRadius: 16,
    justifyContent: "center",
    alignItems: "center",
    shadowColor: "#000",
    shadowOffset: { width: 0, height: 2 },
    shadowOpacity: 0.1,
    shadowRadius: 4,
    elevation: 3,
  },
  registerText: {
    fontSize: 16,
    fontWeight: "bold",
    fontFamily: fontFamily.medium,
    color: "#fff",
  },
  signInButton: {
    flex: 1,
    height: "100%",
    justifyContent: "center",
    alignItems: "center",
    borderRadius: 16,
  },
  signInText: {
    fontSize: 16,
    fontWeight: "bold",
    color: "#000",
  },
});

