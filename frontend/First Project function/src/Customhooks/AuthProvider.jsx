import { createContext, useEffect, useState } from "react";
import Login from "../Pages/Login";

export const AuthContext = createContext({
  user: null,
  loading: true,
  Login: (userData) => {},
});

function AuthProvider({ children }) {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    fetch("http://localhost:3001/auth/me", { credentials: "include" })
      .then((res) => {
        if (!res.ok) throw new Error("Unauthenticated");
        return res.json();
      })

      .then((data) => {
        setUser(data.user);
      })
      .catch(() => {
        setUser(null);
      })
      .finally(() => {
        setLoading(false);
      });
  }, []);

  const Login = (userData) => {
    setUser(userData);
  }

  return (
    <AuthContext.Provider value={{ user, loading ,Login}}>
      {children}
    </AuthContext.Provider>
  );
}

export default AuthProvider;
