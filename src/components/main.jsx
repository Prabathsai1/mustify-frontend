import Footer from './footer.jsx'
import Sidebar from './sidebar.jsx'
import Music from '../pages/musicpage.jsx'
import AdminApprovalMusic from '../pages/AdminMusicPage.jsx'
import{useUserDetails}from '../context/Userdetailscontext.jsx'

const Main = () => {
  const user=useUserDetails()
  const Role=user?.Role

  return (
    <div data-theme="dark" className="min-h-screen bg-base-200">

      <Sidebar/>

      <div className="hero bg-gradient-to-l from-primary/30 to-secondary/30 py-12">
        <div className="hero-content text-center">
          <div>
            <h1 className="text-3xl font-bold">Welcome Back 🎶</h1>
            <p className="py-2 text-sm">
              Discover and play your favorite music
            </p>
          </div>
        </div>
      </div>

      <div className="p-6">
        <h2 className="text-xl font-semibold mb-5">Latest Songs</h2>
        <div>
         {Role==="admin"?<AdminApprovalMusic/>:<Music/>} 

        </div>
      </div>

      <Footer />
    </div>
  )
}

export default Main