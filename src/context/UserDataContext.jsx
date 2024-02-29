import { createContext, useState } from "react";

export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const lsToken = localStorage.getItem("token");
  const [token, setToken] = useState(lsToken);

  return (
    <UserDataContext.Provider value={{ userData, setUserData, token, setToken, lsToken }}>
      {children}
    </UserDataContext.Provider>
  )
}