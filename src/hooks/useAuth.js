import { useContext } from "react";
import { AuthContext } from "../context/auth";

export const useAuth = () => {
  const context = useContext(AuthContext);

  if (!context) {
    throw new Error("UseAuth must be used within an auth");
  }
  return context;
};
