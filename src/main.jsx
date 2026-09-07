import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import App from './App.jsx'

let savedTheme = null
try {
  savedTheme = window.localStorage.getItem('across-theme')
} catch {
  // Storage can be unavailable in hardened/private browser contexts.
}
const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches
document.documentElement.dataset.theme =
  savedTheme === 'light' || savedTheme === 'dark'
    ? savedTheme
    : prefersDark
      ? 'dark'
      : 'light'

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <App />
  </StrictMode>,
)
