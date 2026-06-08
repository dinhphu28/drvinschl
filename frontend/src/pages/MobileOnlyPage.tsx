import { Navigate } from "react-router-dom";

const MobileOnlyPage = () => {
  return <Navigate to="/student" replace />;
};

export default MobileOnlyPage;
