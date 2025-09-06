// import React from "react";
// import { Navigate } from "react-router-dom";
// import { useSelector } from "react-redux";
// import { jwtDecode } from "jwt-decode";

// const ProtectedRoute = ({ children, allowedRole }) => {
//   const token = useSelector((state) => state.jwt);
//   const user = useSelector((state) => state.user);

//   // No token → redirect
//   if (!token) {
//     return <Navigate to="/login" replace />;
//   }

//   // If allowedRole is passed → check role
//   if (allowedRole && allowedRole === user.accountType) {
//     try {
//       const decoded = jwtDecode(token);
//       const userRole = decoded.role;
//       if (userRole !== allowedRole) {
//         return <Navigate to="/unauthorized" replace />;
//       }
//     } catch (error) {
//       return <Navigate to="/login" replace />;
//     }
//   }

//   // ✅ If token exists and role matches → allow access
//   return children;
// };

// export default ProtectedRoute;







import React from "react";
import { Navigate } from "react-router-dom";
import { useSelector } from "react-redux";
import { jwtDecode } from "jwt-decode";

const ProtectedRoute = ({ children, allowedRole }) => {
  const token = useSelector((state) => state.jwt);
  const user = useSelector((state) => state.user);

  // No token → redirect
  if (!token) {
    return <Navigate to="/login" replace />;
  }

  try {
    const decoded = jwtDecode(token);

    // Check token expiry
    if (decoded.exp * 1000 < Date.now()) {
      return <Navigate to="/login" replace />;
    }

    // Role check (using accountType from user or decoded)
    const userRole = user?.accountType || decoded.accountType;
    if (allowedRole && userRole !== allowedRole) {
      return <Navigate to="/unauthorized" replace />;
    }
  } catch (error) {
    return <Navigate to="/login" replace />;
  }

  // ✅ If token valid and role allowed
  return children;
};

export default ProtectedRoute;
