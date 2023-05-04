import { Navigate } from "react-router-dom";
const AdminProtected = ({ isLoggedInAsAdmin, children }) => {
    if (!isLoggedInAsAdmin) {
        return <Navigate to="/" replace />;
    }
    return children;
};
export default AdminProtected;