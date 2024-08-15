import Layout from "../../components/Layout";
import { useState } from "react";
import { toast } from "react-toastify";
import axios from 'axios';
import { useNavigate } from "react-router-dom";
const Register = () => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [address, setAddress] = useState('');
    const [password, setPassword] = useState('');
    const [answer, setAnswer] = useState('');
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        e.preventDefault();
        try {

            const res = await axios.post(`${process.env.REACT_APP_API}/api/v1/auth/register`, { name, email, password, phone, address, answer });
            // toast.success('User registered successfully');
            console.log(res.data.successful);
            if (res.data.successful) {
                toast.success(res.data.message, {
                    onClose: () => navigate('/login'), // Navigate after toast closes
                });
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
            <Layout title="Register">
                <div className="register">Register Here!</div>
                <form onSubmit={handleSubmit} className="registration-form">
                    <div className="mb-3">

                        <input type="text" value={name}
                            onChange={(e) => setName(e.target.value)} className="form-control" id="exampleInputName"
                            placeholder="Enter your name "
                            required
                        />

                    </div>
                    <div className="mb-3">

                        <input type="email" value={email}
                            onChange={(e) => setEmail(e.target.value)} className="form-control" id="exampleInputEmail" placeholder="Enter your email" required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={phone} onChange={(e) => setPhone(e.target.value)} className="form-control" id="exampleInputPhone" placeholder="Enter your contact number" required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={address} onChange={(e) => setAddress(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="Enter your address" required />
                    </div>
                    <div className="mb-3">

                        <input type="password" value={password} onChange={(e) => setPassword(e.target.value)} className="form-control" id="exampleInputPassword" placeholder="Enter your password" required />
                    </div>
                    <div className="mb-3">

                        <input type="text" value={answer} onChange={(e) => setAnswer(e.target.value)} className="form-control" id="exampleInputAddress" placeholder="What was the name of your favorite childhood pet? " required />
                    </div>
                    <button type="submit" className="submit-button">Sign In</button>
                </form>
            </Layout>
        </>
    )
}

export default Register;
