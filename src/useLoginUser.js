import { createContext, useContext } from "react";

const LoginUserContext = createContext(null);

export function useLoginUser() {
  return useContext(LoginUserContext);
}

export function LoginUserProvider({ value, children }) {
  return (
    <LoginUserContext.Provider value={value}>
      {children}
    </LoginUserContext.Provider>
  );
}
