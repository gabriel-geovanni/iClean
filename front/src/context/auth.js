import React, {
  createContext, useCallback, useState, useContext,
} from 'react';
import { login, register } from '../services';

export const AuthContext = createContext();

export function AuthProvider({ children }) {
  const [authData, setAuthData] = useState();

  async function signIn(cpf, password) {
    const user = await login(cpf, password);
    if(user.name) { setAuthData({ ...user }); }
    return user
  }
  async function signUp(cpf, name, password, phone, email) {
    const user = await register(cpf, name, password, phone, email);
    if(user.name) { setAuthData({ ...user }); }
    return user
  }

  function signOut() {
    setAuthData();
  }

  return (
    <AuthContext.Provider value={{
      user: authData, signIn, signOut, signUp
    }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  return context;
}
