import { useState } from "react";
import { View, Text, TextInput, TouchableOpacity, StyleSheet, Alert } from "react-native";
import { useRouter } from "expo-router";
import { colors } from "@/src/styles/theme";
import { Button } from "@/src/components/Button";
import { IconArrowLeft } from "@tabler/icons-react-native";
import { SignInWithEmail } from "@/src/utils/authFirebase";

export default function Register() {
  const router = useRouter();
  
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  function handleLogin(){
    const res = SignInWithEmail(email, password)

    if(!res){
      return Alert.alert("Erro", "Não foi possível acessar sua conta.")
    }

    router.push("/(tabs)/home")
  }

  return (
    <View style={styles.container}>

      {/* Header */}
      <View style={styles.header}>
        <Button style={styles.backButton} onPress={() => router.back()}>
          <Button.Icon icon={IconArrowLeft} />
        </Button>
      </View>

      <Text style={styles.title}>Olá</Text>
      <Text style={styles.subtitle}>
        Estamos felizes em tê-lo conosco novamente.
      </Text>

      <TextInput 
        style={styles.input} 
        placeholder="Insira seu email" 
        placeholderTextColor="#999" 
        keyboardType="email-address"
        autoCapitalize="none"
        value={email}
        onChangeText={setEmail}
      />
      
      <TextInput 
        style={styles.input} 
        placeholder="Insira sua senha" 
        placeholderTextColor="#999" 
        secureTextEntry 
        value={password}
        onChangeText={setPassword}
      />

      <TouchableOpacity onPress={handleLogin} style={styles.button}>
        <Text style={styles.buttonText}>Login</Text>
      </TouchableOpacity>

      <Text style={styles.orText}>________________ ou __________________</Text>

      <TouchableOpacity onPress={() => router.push("/register")}>
        <Text style={styles.signInText}>
          Ainda não possui registro? <Text style={{ color: colors.blue.base }}>Registrar</Text>
        </Text>
      </TouchableOpacity>

    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center",
    paddingHorizontal: 20,
    backgroundColor: colors.gray[100],
  },
  header: {
    position: "absolute",
    top: 50,
    left: 20,
  },
  backButton: {
    width: 40,
    height: 40,
  },
  title: {
    fontSize: 28,
    fontWeight: "bold",
    marginBottom: 10,
  },
  subtitle: {
    fontSize: 16,
    color: "#666",
    textAlign: "center",
    marginBottom: 20,
  },
  input: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    paddingHorizontal: 15,
    backgroundColor: "#FFF",
    marginBottom: 15,
    borderWidth: 1,
    borderColor: "#DDD",
  },
  button: {
    width: "100%",
    height: 50,
    borderRadius: 10,
    backgroundColor: colors.blue.base,
    justifyContent: "center",
    alignItems: "center",
    marginTop: 10,
  },
  buttonText: {
    color: "#FFF",
    fontSize: 16,
    fontWeight: "bold",
  },
  orText: {
    fontSize: 14,
    color: "#999",
    marginVertical: 15,
  },
  signInText: {
    fontSize: 14,
    color: "#333",
  },
});

