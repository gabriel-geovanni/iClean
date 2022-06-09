import React from 'react';
import { ThemeProvider } from 'styled-components';
import { AuthProvider } from './auth';
import light from '../themes';
import { MenuProvider } from './menu';
import { AdsProvider } from './ads';



function AppProvider({ children }) {
  return (
  <AuthProvider>
      <ThemeProvider theme={light}>
        <MenuProvider>
          <AdsProvider>
            {children}
          </AdsProvider>
        </MenuProvider>
      </ThemeProvider>
  </AuthProvider>
  )
}

export default AppProvider;
