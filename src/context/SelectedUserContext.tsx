/* eslint-disable react-refresh/only-export-components */
/* eslint-disable @typescript-eslint/no-explicit-any */
import { createContext, useContext, useState } from "react";

const SelectedUserContext = createContext<any>(null);

export const SelectedUserProvider = ({ children }: { children: React.ReactNode }) => {
  const [selectedUser, setSelectedUser] = useState<any | null>(null);

  return (
    <SelectedUserContext.Provider value={{ selectedUser, setSelectedUser }}>
      {children}
    </SelectedUserContext.Provider>
  );
};

export const useSelectedUser = () => useContext(SelectedUserContext);