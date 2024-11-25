"use client";

import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";
import { JWTInfo, User } from "@/app/Types";

type AuthContextType = {
  user: JWTInfo;
  token: string | null;
  setUser: (user: any, token: string | null) => void;
  logout: () => void;
};
type AuthProviderProps = {
  children: ReactNode;
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthProvider = ({ children }: AuthProviderProps) => {
  const [user, setUserState] = useState<any>(null);
  const [token, setTokenState] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);

  const setUser = (user: any, token: string | null) => {
    setUserState(user);
    setTokenState(token);
    localStorage.setItem("user", JSON.stringify(user)); // Save user data
    if (token) localStorage.setItem("jwtToken", token); // Save JWT token
  };

  const logout = () => {
    setUserState(null);
    setTokenState(null);
    localStorage.removeItem("user");
    localStorage.removeItem("jwtToken");
  };

  useEffect(() => {
    const loadAuthData = async () => {
      const storedUser = JSON.parse(localStorage.getItem("user") || "null");
      const storedToken = localStorage.getItem("jwtToken");

      if (storedUser && storedToken) {
        setUserState(storedUser);
        setTokenState(storedToken);
      }

      setLoading(false); // Loading finished
    };

    loadAuthData();
  }, []);

  if (loading) {
    return null; // Replace with a proper loading UI if necessary
  }

  return (
    <AuthContext.Provider value={{ user, token, setUser, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

// Custom hook for accessing auth context
export const useAuth = (): AuthContextType => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
