import {Logout} from '../pages/auth/Logout.auth.jsx'
import {useNavigate} from 'react-router-dom'
import {Link} from 'react-router-dom'
import {useAuth} from '../context/Authcontext.jsx'

function Sidebar(){
const Navigate=useNavigate()
const {setState}=useAuth()

function destroySession(){
Logout(Navigate,setState)
}

return(
<div id="scrollbar" className="drawer h-[70px] sticky top-0 z-50 bg-slate-600 ">
  <input id="my-drawer-2"  type="checkbox" className="drawer-toggle" />
  <div className="drawer-content flex flex-col">
    <div className="navbar w-full">
      <div className="flex-none">
        <label htmlFor="my-drawer-2" aria-label="open sidebar" className="btn btn-square btn-ghost">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            fill="none"
            viewBox="0 0 24 24"
            className="inline-block h-6 w-6 stroke-current"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M4 6h16M4 12h16M4 18h16"
            ></path>
          </svg>
        </label>
      </div>
      <div className="text-xl font-bold text-primary">🎵 Mastify</div>
     <div className="flex-none ml-auto">
  <ul className="menu menu-horizontal">
    <li>
      <a  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })} className="btn btn-ghost btn-sm bg-green-700 text-white hover:bg-green-900 mr-2">Home</a>
    </li>
    <li>
      <button onClick={destroySession} className="btn btn-ghost btn-sm bg-white/40 text-white hover:bg-green-900 ">Logout</button>
    </li>
  </ul>
</div>
    </div>
  </div>
  <div className="drawer-side">
    <label htmlFor="my-drawer-2" aria-label="close sidebar" className="drawer-overlay"></label>
    <ul className="menu bg-base-200 min-h-full w-50 p-4">
      <li className="bg-slate-900"><Link to="/home/user/music/profile">Profile</Link></li>
      <li><Link to="/home/upload">upload music</Link></li>
    </ul>
  </div>
</div>

)
}
export default Sidebar
