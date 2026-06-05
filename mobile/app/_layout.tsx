import { Stack } from "expo-router";

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen name="index" options={{ title: "Đăng nhập" }} />
      <Stack.Screen name="home" options={{ title: "Học viên" }} />
      <Stack.Screen name="progress" options={{ title: "Tiến độ học" }} />
      <Stack.Screen name="schedule" options={{ title: "Đặt lịch" }} />
      <Stack.Screen name="payments" options={{ title: "Học phí" }} />
      <Stack.Screen name="exams" options={{ title: "Thi" }} />
    </Stack>
  );
}
