import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import App from "./App.tsx";

import "./api/axiosInterceptor";
import "bootstrap/dist/css/bootstrap.min.css";
import { AuthProvider } from "./context/AuthProvider";

createRoot(document.getElementById("root")!).render(
  <AuthProvider>
    <App />
  </AuthProvider>,
);
