import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import LoginPage from "./pages/LoginPage";
import RoleRoute from "./routes/RoleRoute";
import SalesPage from "./pages/SalesPage";
import AccountingPage from "./pages/AccountingPage";
import OpsPage from "./pages/OpsPage";
import ExamOpsPage from "./pages/ExamOpsPage";
import TeacherPage from "./pages/TeacherPage";
import AreaManagerPage from "./pages/AreaManagerPage";
import AdminPage from "./pages/AdminPage";
import DirectorPage from "./pages/DirectorPage";
import StudentPage from "./pages/StudentPage";
import MobileOnlyPage from "./pages/MobileOnlyPage";

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<Navigate to="/login" replace />} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/mobile-only" element={<MobileOnlyPage />} />
        <Route
          path="/student"
          element={
            <RoleRoute roles={["HOC_VIEN"]}>
              <StudentPage />
            </RoleRoute>
          }
        />
        <Route
          path="/sales"
          element={
            <RoleRoute roles={["KINH_DOANH"]}>
              <SalesPage />
            </RoleRoute>
          }
        />
        <Route
          path="/accounting"
          element={
            <RoleRoute roles={["KE_TOAN"]}>
              <AccountingPage />
            </RoleRoute>
          }
        />
        <Route
          path="/ops"
          element={
            <RoleRoute roles={["GIAO_VU_KHU_VUC", "GIAO_VU_SA_HINH"]}>
              <OpsPage />
            </RoleRoute>
          }
        />
        <Route
          path="/exams"
          element={
            <RoleRoute roles={["GIAO_VU_THI"]}>
              <ExamOpsPage />
            </RoleRoute>
          }
        />
        <Route
          path="/teacher"
          element={
            <RoleRoute roles={["GIAO_VIEN"]}>
              <TeacherPage />
            </RoleRoute>
          }
        />
        <Route
          path="/area-manager"
          element={
            <RoleRoute roles={["QUAN_LY_KHU_VUC"]}>
              <AreaManagerPage />
            </RoleRoute>
          }
        />
        <Route
          path="/admin"
          element={
            <RoleRoute roles={["ADMIN"]}>
              <AdminPage />
            </RoleRoute>
          }
        />
        <Route
          path="/director"
          element={
            <RoleRoute roles={["GIAM_DOC"]}>
              <DirectorPage />
            </RoleRoute>
          }
        />
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
