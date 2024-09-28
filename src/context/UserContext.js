import { createContext, useState } from "react";

export const UserContext = createContext();

export function UserProvider({ children }) {
  const [credentials, setCredentials] = useState({
    username: "",
    password: "",
  });

  const [isLogin, setIsLogin] = useState(false);

  const handleUserLogin = () => {
    setIsLogin((isLogin) => !isLogin);
  };

  const handleCredentialsChange = (event) => {
    setCredentials((prevCredentials) => {
      const newCredentials = {
        ...prevCredentials,
        [event.target.name]: event.target.value,
      };
      return newCredentials;
    });
  };

  const handleLogin = (event) => {
    event.preventDefault();

    if (!credentials.username || !credentials.password) {
      alert("Please provide both username and password.");
      return;
    }

    if (credentials.username === "admin" && credentials.password === "admin") {
      alert(
        `✅ Logged in with username: ${credentials.username} and password: ${credentials.password}`
      );
    } else {
      alert("❌ Invalid credentials");
    }
  };

  const contextValue = {
    credentials,
    isLogin,
    handleCredentialsChange,
    handleLogin,
    handleUserLogin,
  };

  return (
    <UserContext.Provider value={contextValue}>{children}</UserContext.Provider>
  );
}
