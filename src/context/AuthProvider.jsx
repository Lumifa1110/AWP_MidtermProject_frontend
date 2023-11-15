import React from "react";
import { createContext, useState } from "react";

const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({});
  const AuthContext = createContext({});
  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {children}
    </AuthContext.Provider>
  );
};

export default AuthProvider;
