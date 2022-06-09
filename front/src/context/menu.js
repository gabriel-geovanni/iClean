import React, {
  createContext, useState, useContext,
} from 'react';

export const MenuContext = createContext();

export function MenuProvider({ children }) {
  const [option, setOption] = useState('todos');

  return (
    <MenuContext.Provider value={{ option, setOption }}>
      {children}
    </MenuContext.Provider>
  );
}

export function useMenu() {
  const context = useContext(MenuContext);
  return context;
}
