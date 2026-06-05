import { View, Text, Pressable, StyleSheet } from "react-native";
import { router } from "expo-router";

const menuItems = [
  { label: "Hồ sơ & Tiến độ học", route: "/progress" },
  { label: "Đặt lịch học", route: "/schedule" },
  { label: "Học phí", route: "/payments" },
  { label: "Lịch thi & Kết quả", route: "/exams" },
];

export default function HomeScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.header}>Xin chào, Học viên</Text>
      {menuItems.map((item) => (
        <Pressable key={item.route} style={styles.card} onPress={() => router.push(item.route as never)}>
          <Text style={styles.cardText}>{item.label}</Text>
        </Pressable>
      ))}
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20, backgroundColor: "#f5f5f5" },
  header: { fontSize: 22, fontWeight: "bold", marginBottom: 24, color: "#1a237e" },
  card: { backgroundColor: "#fff", borderRadius: 10, padding: 18, marginBottom: 12, elevation: 2 },
  cardText: { fontSize: 16, color: "#333" },
});
