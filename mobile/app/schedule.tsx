import { Text, View, StyleSheet } from "react-native";

export default function ScheduleScreen() {
  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch học</Text>
      <Text>• 4h cơ bản — xem lịch trống, đặt lịch</Text>
      <Text>• Cabin — đặt lịch 2h</Text>
      <Text>• DAT — đặt lịch, ghi nhận km/thời gian</Text>
      <Text>• Sa hình thô / cảm ứng</Text>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
});
