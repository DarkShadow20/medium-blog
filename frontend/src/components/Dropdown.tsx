import { useNavigate } from "react-router-dom"



export const Dropdown = () =>{
    const navigate = useNavigate()
    function handleLogout () {
        localStorage.removeItem('token')
        navigate('/signin')
    }
    return <div>
        <div className="p-2 m-1 w-min bg-gray-600 border absolute rounded text-white font-thin	">
            <button onClick={handleLogout}>
                Logout
            </button>
        </div>
    </div>
}