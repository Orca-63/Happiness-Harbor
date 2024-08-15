import Layout from "../../components/Layout";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";
import { useAuth } from "../../context/auth";
import './Login.css'
const Login = () => {

    const [email, setEmail] = useState('');


    const [password, setPassword] = useState('');
    const [auth, setAuth] = useAuth();
    const navigate = useNavigate();
    const location = useLocation();
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/login`, { email, password });
            // toast.success('User registered successfully');
            console.log(res.data.successful);
            if (res.data.successful) {

                toast.success(res.data.message, {
                    onClose: () => navigate(location.state || '/'), // Navigate after toast closes
                });

                setAuth(
                    {
                        ...auth,
                        user: res.data.user
                        ,
                        token: res.data.token
                    }
                );
                localStorage.setItem('auth', JSON.stringify(res.data));
                // navigate('/');
            }
            else {
                toast.error(res.data.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    }
    return (
        <>
            <Layout title="Login">
                <div className="register">Login Here!</div>
                <form onSubmit={handleSubmit} className="registration-form">

                    <div className="mb-3">

                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter your email" required />
                    </div>


                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter your password" required />
                    </div>

                    <div className="button-group">
                        <button
                            type="button"
                            className="btn btn-secondary-login"
                            onClick={() => {
                                navigate("/forgot-password");
                            }}
                        >
                            Forgot Password
                        </button>
                        <button type="submit" className="btn btn-primary-login ">Login</button>
                    </div>


                </form>
            </Layout>
        </>
    )
}

export default Login;