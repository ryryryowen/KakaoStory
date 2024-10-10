import React, { useContext, useEffect } from "react";
import { Navigate } from "react-router-dom";
import { userAuth } from "../configs/firebase";
import { userKakaoCredentials } from "../routes/KakaoRedirect";

const ProtectedRoute = ({ children }) => {
  const loggedUser = userAuth.currentUser;
  const { user } = useContext(userKakaoCredentials);
  useEffect(() => {
    console.log(userAuth);
    console.log(user.isLoggedIn)
  }, []);

  return loggedUser !== null ? children : <Navigate to={"/login"} />;
};

export default ProtectedRoute;
