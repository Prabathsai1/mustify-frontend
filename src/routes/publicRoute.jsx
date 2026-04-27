import { useAuth } from "../context/Authcontext.jsx"
import { Navigate } from 'react-router-dom'
function PublicRoute(props) {
    const Authpublic = useAuth()
        console.log(Authpublic)
    if (Authpublic.state == null) {
        return (<p>loading....</p>)
    }
    if (Authpublic.state) {
        return (<Navigate to="/home" replace />)
    }
    return props.children
}
export default PublicRoute