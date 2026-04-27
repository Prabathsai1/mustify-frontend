import { useAuth } from './Authcontext.jsx'
import { useContext, createContext, useEffect, useState } from 'react'
import axiosinstance from '../components/api/axios.jsx'

const UserContext = createContext()

export default function Userdetails({ children }) {
  const [userdetail, setuserdetail] = useState(null)
  const { state } = useAuth()

  useEffect(() => {
    async function details() {
      try {
        if (state) {
          const response = await axiosinstance.post('/getuser')

          if (response.data.success) {
            setuserdetail({
              UserName: response.data.UserName,
              Email: response.data.Email,
              Role:response.data.Role
            })
          }
        }
      } catch (error) {
        console.error("Error fetching user:", error)
      }
    }

    details()
  }, [state]) 

  return (
    <UserContext.Provider value={userdetail}>
      {children}
    </UserContext.Provider>
  )
}


export function useUserDetails() {
  return useContext(UserContext)
}