import React, { createContext, useContext, useEffect, useState } from 'react';
import { useColorScheme } from 'react-native';

type ThemeType = 'light' | 'dark';

interface ThemeContextType {
  theme: ThemeType;
  isDark: boolean;
}

const ThemeContext = createContext<ThemeContextType>({
  theme: 'light',
  isDark: false,
});

export const useTheme = () => useContext(ThemeContext);

export const ThemeProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const colorScheme = useColorScheme();
  const [theme, setTheme] = useState<ThemeType>(colorScheme === 'dark' ? 'dark' : 'light');
  
  useEffect(() => {
    setTheme(colorScheme === 'dark' ? 'dark' : 'light');
  }, [colorScheme]);

  const isDark = theme === 'dark';

  return (
    <ThemeContext.Provider value={{ theme, isDark }}>
      {children}
    </ThemeContext.Provider>
  );
};