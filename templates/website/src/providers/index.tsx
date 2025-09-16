import React from 'react'

import { AuthProvider } from './AuthProvider'
import { HeaderThemeProvider } from './HeaderTheme'
import { ThemeProvider } from './Theme'

export const Providers: React.FC<{
  children: React.ReactNode
}> = ({ children }) => {
  return (
    <ThemeProvider>
      <HeaderThemeProvider>
        <AuthProvider>{children}</AuthProvider>
      </HeaderThemeProvider>
    </ThemeProvider>
  )
}
