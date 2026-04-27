import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";
import {useUserDetails } from '../context/Userdetailscontext.jsx'


export default function UserProfile() {
    const navigate = useNavigate();
    const details=useUserDetails()
    const letter=details?.UserName?.split("")[0]||"?"

    return (
        <div className="min-h-screen bg-slate-800 text-white p-6">

           <button
                onClick={() => navigate("/home")}
                className="mb-4 btn btn-sm btn-ghost text-white"
            >
                ← Back
            </button>

            <h1 className="text-xl font-bold mb-4">Profile</h1>

            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }}
                className="bg-slate-900/80 backdrop-blur-md rounded-xl shadow-lg p-4 max-w-sm"
            >

                
                <div className="avatar ml-30 mb-4 avatar-placeholder">
                    <div className="bg-neutral text-neutral-content w-24 rounded-full">
                        <span className="text-3xl">{letter}</span>
                    </div>
                </div>
                
                <div className="text-center">
                    <h2 className="text-base font-semibold">{details?.UserName||"loading"}</h2>
                    <p className="text-xs text-gray-400">{details?.Email||"loading"}</p>
                </div>

            </motion.div>
        </div>
    );
}