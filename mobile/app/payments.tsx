import { useEffect, useState } from "react";
import { View, Text, FlatList, StyleSheet } from "react-native";
import { getProfile, getPayments } from "../src/api";

export default function PaymentsScreen() {
  const [profile, setProfile] = useState<{ paidFee: number; remainingFee: number } | null>(null);
  const [payments, setPayments] = useState<{ paymentType: string; amount: number; paidAt: string }[]>([]);

  useEffect(() => {
    getProfile().then(setProfile);
    getPayments().then(setPayments);
  }, []);

  return (
    <View style={styles.container}>
      {profile && (
        <View style={styles.summary}>
          <Text>Đã đóng: {profile.paidFee?.toLocaleString()} đ</Text>
          <Text>Còn lại: {profile.remainingFee?.toLocaleString()} đ</Text>
        </View>
      )}
      <FlatList
        data={payments}
        keyExtractor={(_, i) => String(i)}
        renderItem={({ item }) => (
          <View style={styles.card}>
            <Text>{item.paymentType}</Text>
            <Text>{item.amount?.toLocaleString()} đ — {item.paidAt}</Text>
          </View>
        )}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: { flex: 1, padding: 16 },
  summary: { backgroundColor: "#e8eaf6", padding: 16, borderRadius: 8, marginBottom: 16 },
  card: { backgroundColor: "#fff", padding: 12, borderRadius: 8, marginBottom: 8 },
});
