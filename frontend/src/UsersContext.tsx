import { createContext, useState } from "react";

export interface IUser {
  username: string;
  password: string;
}

export interface IUsersContext {
  currentUser: IUser | null;
  setCurrentUser: (user: IUser | null) => void;
}

const initialUsersContext: IUsersContext = {
  currentUser: null,
  setCurrentUser: () => { }
};

export const UsersContext = createContext<IUsersContext>(initialUsersContext);

export function UsersProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<IUser | null>(null);
  return (
    <UsersContext.Provider value={{ currentUser, setCurrentUser }}>
      {children}
    </UsersContext.Provider>
  );
}