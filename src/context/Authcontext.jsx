import { createContext, useEffect, useState, useContext } from 'react'
import axiosinstance from '../components/api/axios'
const Authcontext = createContext()

export function AuthProvider(props) {
    const [state, setState] = useState(null)

    useEffect(() => {
        async function Api() {
            try {
                const sessionresponse = await axiosinstance.post("/session")
                if (sessionresponse.data.success) {
                    setState(true)
                }
                else {
                    setState(false)
                }
            }
            catch (error) {
                console.log(error.message)
                setState(false)
            }
        }
        Api()
    }, [])


    return (
        <Authcontext.Provider value={{ state, setState }}>
            {props.children}
        </Authcontext.Provider>

    )

}
export const useAuth = () => {
    return useContext(Authcontext)
}