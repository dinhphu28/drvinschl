import { useState } from "react";
import { View, Text, TextInput, Pressable, StyleSheet, Alert } from "react-native";
import { router } from "expo-router";
import * as SecureStore from "expo-secure-store";
import { login } from "../src/api";

export default function LoginScreen() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleLogin = async () => {
    try {
      const res = await login(email, password);
      await SecureStore.setItemAsync("accessToken", res.accessToken);
      router.replace("/home");
    } catch {
      Alert.alert("Lỗi", "Đăng nhập thất bại");
    }
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Drvinschl</Text>
      <Text style={styles.subtitle}>Ứng dụng học viên</Text>
      <TextInput
        style={styles.input}
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        autoCapitalize="none"
      />
      <TextInput
        style={styles.input}
        placeholder="Mật khẩu"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
      />
      <Pressable style={styles.button} onPress={handleLogin}>
        <Text style={styles.buttonText}>Đăng nhập</Text>
      </Pressable>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, justifyContent: "center", padding: 24, backgroundColor: "#f5f5f5" },
  title: { fontSize: 28, fontWeight: "bold", textAlign: "center", color: "#1a237e" },
  subtitle: { fontSize: 14, textAlign: "center", marginBottom: 32, color: "#666" },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 14, marginBottom: 12, borderWidth: 1, borderColor: "#ddd" },
  button: { backgroundColor: "#1a237e", borderRadius: 8, padding: 16, marginTop: 8 },
  buttonText: { color: "#fff", textAlign: "center", fontWeight: "600" },
});
