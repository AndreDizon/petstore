import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'

const theme = createTheme({
  palette: {
    primary: { main: '#f59e0b' },
    secondary: { main: '#1c1917' },
    background: { default: '#fafaf9', paper: '#ffffff' },
    mode: 'light'
  },
  typography: {
    fontFamily: "'Poppins', 'Inter', sans-serif",
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          backgroundColor: '#fff4e1',
        }
      }
    }
  }
})

// fallback: ensure body background is set even if CSS resets intervene
try { document.body.style.backgroundColor = '#fff4e1' } catch (e) { /* ignore in non-browser env */ }
try { document.documentElement.style.backgroundColor = '#fff4e1' } catch (e) { /* ignore */ }

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
