import React, { useContext } from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../configs/firebase";
import { userKakaoCredentials } from "../routes/KakaoRedirect";

const ProtectedRoute = ({ children }) => {
  console.log(children);
  const loggedUser = userAuth.currentUser;
  const { user } = useContext(userKakaoCredentials);
  if (loggedUser === null && user.isLoggedIn === false) {
    return <Navigate to={"/login"} />;
  }
  return children;
};

export default ProtectedRoute;
