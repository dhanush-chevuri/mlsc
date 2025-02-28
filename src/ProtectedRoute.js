import React, { useEffect, useState } from "react";
import { Navigate } from "react-router-dom";
import { auth } from "./firebase";
import { onAuthStateChanged } from "firebase/auth";
import LoadingScreen from "./LoadingScreen";

const ALLOWED_EMAIL = "chevuricsdhanush@gmail.com"; // Replace with the allowed email

const ProtectedRoute = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      setUser(user);
      setLoading(false);
    });

    return () => unsubscribe();
  }, []);

  if (loading) {
    return <LoadingScreen />;
  }

  if (!user || user.email !== ALLOWED_EMAIL) {
    return <Navigate to="/home" />;
  }

  return children;
};

export default ProtectedRoute;
