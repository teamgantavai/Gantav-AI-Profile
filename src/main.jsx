import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { AuthProvider } from './useAuth'      // Firebase auth context
import './index.css'
import App from './App.jsx'

// Verify Firebase env vars at startup
const requiredEnv = [
  'VITE_FIREBASE_API_KEY',
  'VITE_FIREBASE_AUTH_DOMAIN',
  'VITE_FIREBASE_PROJECT_ID',
  'VITE_FIREBASE_APP_ID',
];
requiredEnv.forEach((key) => {
  if (!import.meta.env[key]) {
    throw new Error(`Missing environment variable: ${key}\nAdd it to your .env file.`);
  }
});

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <AuthProvider>
      <App />
    </AuthProvider>
  </StrictMode>,
)