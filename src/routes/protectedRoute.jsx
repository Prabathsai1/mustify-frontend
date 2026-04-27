import { useAuth } from "../context/Authcontext.jsx"
import { Navigate } from "react-router-dom"
function Protectedroute(props) {
    const Auth = useAuth()
        console.log(Auth)
    if (Auth.state == null) {
        return <h1>Loading...</h1>
    }
    if (!Auth.state) {
        return <Navigate to="/login" replace={true} />
    }

    return (props.children)

}
export default Protectedroute