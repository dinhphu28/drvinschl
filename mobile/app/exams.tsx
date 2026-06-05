import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getExams } from "../src/api";

interface Exam {
  examSession: { examType: string; examDate: string };
  passed: boolean | null;
  score: string;
  retake: boolean;
}

export default function ExamsScreen() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    getExams().then(setExams);
  }, []);

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.type}>{item.examSession?.examType}</Text>
            <Text>Ngày: {item.examSession?.examDate}</Text>
            <Text>
              Kết quả: {item.passed == null ? "Chưa có" : item.passed ? "Đạt" : "Không đạt"}
            </Text>
            {item.retake && <Text>Thi lại</Text>}
          </View>
        )}
        ListEmptyComponent={<Text style={styles.empty}>Chưa có lịch thi</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  card: { backgroundColor: "#fff", padding: 14, borderRadius: 8, marginBottom: 10 },
  type: { fontWeight: "bold", fontSize: 16 },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
