import { useNavigate } from "react-router-dom"

const Start = () => {
    const navigate = useNavigate()
    const handleVisitorLogin = () => {
        navigate('/visitorlogin')
    }

    const handleAdminLogin = () => {
        navigate('/login')
    }

    return <>
        <div className='d-flex justify-content-center align-items-center vh-100 loginPage'>
            <div className='p-3 rounded w-25 border loginForm text-center'>
                <h2>Login As</h2>
                <div className="d-flex justify-content-between mt-5">
                    <button className="btn btn-primary btn-lg" onClick={handleVisitorLogin}>Visitor</button>
                    <button className="btn btn-success btn-lg" onClick={handleAdminLogin}>Admin</button>
                </div>
            </div>
        </div>
    </>
}

export default Start