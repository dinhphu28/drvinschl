import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, View } from "react-native";
import { getExams, registerRetake } from "../src/api";

interface Exam {
  examSession: { id: string; examType: string; examDate: string; instructions?: string };
  passed: boolean | null;
  score: string;
  retake: boolean;
}

export default function ExamsScreen() {
  const [exams, setExams] = useState<Exam[]>([]);

  useEffect(() => {
    getExams().then(setExams);
  }, []);

  const retake = async (sessionId: string) => {
    await registerRetake(sessionId);
    Alert.alert("Đã đăng ký thi lại");
    setExams(await getExams());
  };

  return (
    <View style={styles.container}>
      <FlatList
        data={exams}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text style={styles.type}>{item.examSession?.examType}</Text>
            <Text>Ngày: {item.examSession?.examDate}</Text>
            {item.examSession?.instructions ? <Text>Hướng dẫn: {item.examSession.instructions}</Text> : null}
            <Text>
              Kết quả: {item.passed == null ? "Chưa có" : item.passed ? "Đạt" : "Không đạt"}
            </Text>
            {item.retake && <Text>Thi lại</Text>}
            {item.passed === false && !item.retake && (
              <Pressable style={styles.button} onPress={() => retake(item.examSession.id)}>
                <Text style={styles.buttonText}>Đăng ký thi lại</Text>
              </Pressable>
            )}
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
  button: { marginTop: 10, backgroundColor: "#1976d2", borderRadius: 8, padding: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  empty: { textAlign: "center", color: "#999", marginTop: 40 },
});
