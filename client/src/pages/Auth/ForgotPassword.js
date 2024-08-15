import Layout from "./../../components/Layout"
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate, useLocation } from "react-router-dom";

const ForgotPassword = () => {
    const [email, setEmail] = useState('');
    const [answer, setAnswer] = useState('');

    const [newPassword, setNewPassword] = useState('');

    const navigate = useNavigate();

    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/forgot-password`, { email, answer, newPassword });
            // toast.success('User registered successfully');
            console.log(res.data.successful);
            if (res.data.successful) {

                toast.success(res.data.message, {
                    onClose: () => navigate('/login'), // Navigate after toast closes
                });



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
        <Layout title={'Forgot Password'}>
            <div className="register">Change Password</div>
            <form onSubmit={handleSubmit} className="registration-form">

                <div className="mb-3">

                    <input type="email" value={email}
                        onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter your email" required />
                </div>
                <div className="mb-3">

                    <input type="text" value={answer}
                        onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="What was the name of your favorite childhood pet?" required />
                </div>


                <div className="mb-3">

                    <input type="password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter your new password" required />
                </div>

                <button type="submit" className="submit-button">Change Password</button>


            </form>
        </Layout>
    )
}

export default ForgotPassword;