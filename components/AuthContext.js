// AuthContext.js
import React, { createContext, useState } from 'react';

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isUser, setIsUser] = useState(false);

  return (
    <AuthContext.Provider value={{ isUser, setIsUser }}>
      {children}
    </AuthContext.Provider>
  );
};
