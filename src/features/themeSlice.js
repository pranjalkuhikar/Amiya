import { createSlice } from '@reduxjs/toolkit';

// Check if dark mode is enabled in localStorage or prefer-color-scheme
const getInitialTheme = () => {
  // Check localStorage first
  const savedTheme = localStorage.getItem('theme');
  if (savedTheme) {
    return savedTheme === 'dark';
  }
  
  // Check user preference
  if (window.matchMedia && window.matchMedia('(prefers-color-scheme: dark)').matches) {
    return true;
  }
  
  // Default to light mode
  return false;
};

const initialState = {
  isDarkMode: typeof window !== 'undefined' ? getInitialTheme() : false,
};

const themeSlice = createSlice({
  name: 'theme',
  initialState,
  reducers: {
    toggleTheme: (state) => {
      state.isDarkMode = !state.isDarkMode;
      
      // Update localStorage and document class
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', state.isDarkMode ? 'dark' : 'light');
        
        if (state.isDarkMode) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    },
    
    setDarkMode: (state) => {
      state.isDarkMode = true;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'dark');
        document.documentElement.classList.add('dark');
      }
    },
    
    setLightMode: (state) => {
      state.isDarkMode = false;
      
      if (typeof window !== 'undefined') {
        localStorage.setItem('theme', 'light');
        document.documentElement.classList.remove('dark');
      }
    },
    
    initializeTheme: (state) => {
      // This is called on app initialization to set the correct theme
      if (typeof window !== 'undefined') {
        const isDark = getInitialTheme();
        state.isDarkMode = isDark;
        
        if (isDark) {
          document.documentElement.classList.add('dark');
        } else {
          document.documentElement.classList.remove('dark');
        }
      }
    }
  },
});

export const { toggleTheme, setDarkMode, setLightMode, initializeTheme } = themeSlice.actions;

export const selectIsDarkMode = (state) => state.theme.isDarkMode;

export default themeSlice.reducer;