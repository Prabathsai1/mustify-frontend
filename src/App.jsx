import { Routes, Route } from 'react-router-dom'
import Register from './pages/auth/register.auth.jsx'
import Login from './pages/auth/Login.auth.jsx'
import PasswordReset from './pages/auth/passwordreset.jsx'
import Home from './components/main.jsx'
import Profile from './components/profile.jsx'
import Musicupload from './pages/uploadmusic.jsx'
import { ToastContainer,Bounce } from 'react-toastify';
import Protectedroute from './routes/protectedRoute.jsx'
import PublicRoute from './routes/publicRoute.jsx'

function App() {
  return (
    <>
      <div data-theme="light">
        <ToastContainer limit={1} position="top-center"
          autoClose={2000}
          hideProgressBar={true}
          newestOnTop={false}
          closeOnClick={false}
          rtl={false}
          pauseOnFocusLoss
          draggable
         closeButton={ false}
          pauseOnHover={false}
          theme="colored"
          transition={Bounce} />
        <Routes>
          <Route path="/"element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/Login' element={<PublicRoute><Login /></PublicRoute>} />
          <Route path='/Register' element={<PublicRoute><Register /></PublicRoute>} />
          <Route path='/Passwordreset' element={<PasswordReset />} />
          <Route path='/home' element={<Protectedroute><Home /> </Protectedroute>} />
          <Route path='/home/user/music/profile' element={<Protectedroute><Profile /></Protectedroute>} />
          <Route path="/home/upload" element={<Protectedroute><Musicupload/></Protectedroute>}/>
        </Routes>
      </div>
    </>
  )
}

export default App
