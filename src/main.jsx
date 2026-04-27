import { StrictMode } from 'react'
import { createRoot } from 'react-dom/client'
import { BrowserRouter } from 'react-router-dom'
import './index.css'
import App from './App.jsx'
import { AuthProvider } from './context/Authcontext.jsx'
import  Userdetails from './context/Userdetailscontext.jsx'



createRoot(document.getElementById('root')).render(
  <AuthProvider>
   <Userdetails>
      <BrowserRouter>
        <StrictMode>
          <App />
        </StrictMode>
      </BrowserRouter>
    </Userdetails>
  </AuthProvider>
  ,
)
