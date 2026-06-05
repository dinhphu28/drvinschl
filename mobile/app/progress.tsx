import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getProgress } from "../src/api";

interface Progress {
  module: string;
  status: string;
  completedHours: number;
  requiredHours: number;
}

export default function ProgressScreen() {
  const [items, setItems] = useState<Progress[]>([]);

  useEffect(() => {
    getProgress().then(setItems).catch(() => setItems([]));
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={items}
        keyExtractor={(item) => item.module}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.module}>{item.module}</Text>
            <Text>Trạng thái: {item.status}</Text>
            <Text>
              Giờ: {item.completedHours}/{item.requiredHours}
            </Text>
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có dữ liệu tiến độ</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 14, marginBottom: 10 },
  module: { fontWeight: "bold", fontSize: 16, marginBottom: 4 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
