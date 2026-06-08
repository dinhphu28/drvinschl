import { useEffect, useState } from "react";
import { Alert, FlatList, Pressable, StyleSheet, Text, TextInput, View } from "react-native";
import { bookSlot, cancelBooking, getAvailableSlots, getBookings, getExtraRegistrations, rateTeacher, registerExtra } from "../src/api";

export default function ScheduleScreen() {
  const [type, setType] = useState("CO_BAN_4H");
  const [slots, setSlots] = useState<any[]>([]);
  const [bookings, setBookings] = useState<any[]>([]);
  const [extraHours, setExtraHours] = useState("1");
  const [comment, setComment] = useState("");

  const load = () => {
    getAvailableSlots(type).then(setSlots).catch(() => setSlots([]));
    getBookings().then(setBookings).catch(() => setBookings([]));
    getExtraRegistrations().catch(() => []);
  };

  useEffect(load, [type]);

  const reserve = async (slotId: string) => {
    await bookSlot(slotId);
    Alert.alert("Lịch đã được đặt");
    load();
  };

  const extra = async (extraType: "DUONG_TRUONG" | "SA_HINH") => {
    await registerExtra(extraType, Number(extraHours || 1));
    Alert.alert("Đăng ký thêm giờ thành công");
  };

  return (
    <View style={styles.container}>
      <Text style={styles.title}>Đặt lịch học</Text>
      <View style={styles.tabs}>
        {["CO_BAN_4H", "CABIN", "DAT", "SA_HINH_THO", "SA_HINH_CAM_UNG"].map((item) => (
          <Pressable key={item} style={[styles.tab, type === item && styles.activeTab]} onPress={() => setType(item)}>
            <Text style={type === item ? styles.activeText : styles.tabText}>{item}</Text>
          </Pressable>
        ))}
      </View>

      <FlatList
        data={slots}
        keyExtractor={(item) => item.id}
        ListHeaderComponent={<Text style={styles.section}>Lịch trống</Text>}
        ListEmptyComponent={<Text style={styles.empty}>Không có lịch trống</Text>}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{new Date(item.startTime).toLocaleString()} - {new Date(item.endTime).toLocaleTimeString()}</Text>
            <Text>GV: {item.teacher?.firstName ?? "Chưa phân"} {item.teacher?.lastName ?? ""}</Text>
            <Pressable style={styles.button} onPress={() => reserve(item.id)}>
              <Text style={styles.buttonText}>Đặt lịch</Text>
            </Pressable>
          </View>
        )}
      />

      <Text style={styles.section}>Lịch đã đặt</Text>
      {bookings.map((item) => (
        <View key={item.id} style={styles.card}>
          <Text>{item.slot?.sessionType} - {item.status}</Text>
          <Text>{item.slot?.startTime ? new Date(item.slot.startTime).toLocaleString() : ""}</Text>
          <View style={styles.actions}>
            <Pressable style={styles.secondaryButton} onPress={() => cancelBooking(item.id).then(load)}>
              <Text>Hủy</Text>
            </Pressable>
            <Pressable style={styles.secondaryButton} onPress={() => rateTeacher(item.id, 5, comment).then(load)}>
              <Text>Đánh giá 5 sao</Text>
            </Pressable>
          </View>
        </View>
      ))}

      <TextInput style={styles.input} value={comment} onChangeText={setComment} placeholder="Nhận xét giáo viên" />
      <View style={styles.extra}>
        <TextInput style={[styles.input, styles.hours]} value={extraHours} onChangeText={setExtraHours} keyboardType="number-pad" />
        <Pressable style={styles.secondaryButton} onPress={() => extra("DUONG_TRUONG")}><Text>Thêm giờ đường trường</Text></Pressable>
        <Pressable style={styles.secondaryButton} onPress={() => extra("SA_HINH")}><Text>Thêm giờ sa hình</Text></Pressable>
      </View>
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 20 },
  title: { fontSize: 20, fontWeight: "bold", marginBottom: 16 },
  tabs: { flexDirection: "row", flexWrap: "wrap", gap: 8, marginBottom: 12 },
  tab: { borderWidth: 1, borderColor: "#ccd", borderRadius: 8, paddingHorizontal: 10, paddingVertical: 8 },
  activeTab: { backgroundColor: "#263238", borderColor: "#263238" },
  tabText: { color: "#263238", fontSize: 12 },
  activeText: { color: "#fff", fontSize: 12 },
  section: { fontWeight: "bold", marginTop: 12, marginBottom: 8 },
  card: { backgroundColor: "#fff", borderRadius: 8, padding: 12, marginBottom: 10, gap: 6 },
  button: { backgroundColor: "#1976d2", borderRadius: 8, padding: 10, alignItems: "center" },
  buttonText: { color: "#fff", fontWeight: "bold" },
  secondaryButton: { borderWidth: 1, borderColor: "#ccd", borderRadius: 8, padding: 10, alignItems: "center" },
  actions: { flexDirection: "row", gap: 8, flexWrap: "wrap" },
  input: { backgroundColor: "#fff", borderRadius: 8, padding: 10, marginBottom: 8, borderWidth: 1, borderColor: "#ddd" },
  hours: { width: 80 },
  extra: { gap: 8, marginBottom: 20 },
  empty: { color: "#777", marginBottom: 8 },
});
