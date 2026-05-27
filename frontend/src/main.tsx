import React from 'react'
import { createRoot } from 'react-dom/client'
import App from './App'
import './index.css'
import { ThemeProvider, createTheme, CssBaseline } from '@mui/material'
import axios from 'axios'

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

// Configure axios base URL from Vite environment variable so production builds
// call the correct backend. Vite exposes env vars prefixed with VITE_ via
// import.meta.env. If VITE_API_BASE_URL is not set, axios will use relative
// URLs (useful for local dev with the Vite proxy).
try {
  const raw = (import.meta as any).env?.VITE_API_BASE_URL || ''
  let apiBase = String(raw || '').trim()

  // Remove trailing slashes
  apiBase = apiBase.replace(/\/+$/, '')
  // If someone set the value to include a trailing /api, strip that so
  // axios + our app's request paths don't end up like /api/api/pets.
  apiBase = apiBase.replace(/\/api$/i, '')

  if (apiBase) {
    axios.defaults.baseURL = apiBase
  }
} catch (e) {
  // ignore in non-browser environments
}

createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <App />
    </ThemeProvider>
  </React.StrictMode>
)
