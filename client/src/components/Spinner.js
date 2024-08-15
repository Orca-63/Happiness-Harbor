import { useState, useEffect } from "react";
import { useNavigate, useLocation } from "react-router-dom";
const Spinner = ({ path = 'login' }) => {
    const [count, setCount] = useState(3)
    const navigate = useNavigate();
    const location = useLocation();
    useEffect(() => {
        const interval = setInterval(() => {
            setCount((prevValue) => --prevValue)
        }, 1000)

        count === 0 && navigate('/${path}', {
            state: location.pathname
        });
        return () => clearInterval(interval)
    }, [count, navigate, location, path]);
    return (
        <>
            <div className="spinner-container">
                <div className="d-flex justify-content-center align-items-center vh-100">
                    <h1>Redirecting you to login page in {count} seconds</h1>
                    <div className="spinner-grow text-primary" role="status">

                    </div>
                    <div className="spinner-grow text-secondary" role="status">

                    </div>
                    <div className="spinner-grow text-success" role="status">

                    </div>
                    <div className="spinner-grow text-danger" role="status">

                    </div>
                    <div className="spinner-grow text-warning" role="status">

                    </div>
                    <div className="spinner-grow text-info" role="status">

                    </div>
                    <div className="spinner-grow text-light" role="status">

                    </div>
                    <div className="spinner-grow text-dark" role="status">

                    </div>
                </div>
            </div>


        </>
    )
}
export default Spinner;