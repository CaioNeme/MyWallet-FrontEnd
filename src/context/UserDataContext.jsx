import { useState, createContext } from "react";
export const UserDataContext = createContext();

export const UserDataProvider = ({ children }) => {
  const [userData, setUserData] = useState({});
  const [token, setToken] = useState('')

  return (
    <UserDataContext.Provider value={{ userData, setUserData, token, setToken }}>
      {children}
    </UserDataContext.Provider>
  )
}