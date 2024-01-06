import { createContext, useContext } from "react";

const LoginUserContext = createContext(null);

export function useLoginUser() {
  const user = useContext(LoginUserContext);
  return user;
}

export function LoginUserProvider({ value, children }) {
  return (
    <LoginUserContext.Provider value={value}>
      {children}
    </LoginUserContext.Provider>
  );
}
