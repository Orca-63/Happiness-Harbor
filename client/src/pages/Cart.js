import React, { useEffect, useState } from 'react'
import Layout from './../components/Layout';
import { useCart } from '../context/CartContext';
import { useAuth } from '../context/auth';
import { useNavigate } from 'react-router-dom';
import axios from 'axios';
import DropIn from "braintree-web-drop-in-react";
import { toast } from 'react-toastify';
import './user/Orders.css'
const Cart = () => {
    const [auth, setAuth] = useAuth();
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [clientToken, setClientToken] = useState("");
    const [instance, setInstance] = useState("");
    const [loading, setLoading] = useState(false);
    const totalPrice = () => {
        try {
            let total = 0;
            cart?.map(item => (total = total + item.price))
            return total.toLocaleString("en-IN", {
                style: "currency",
                currency: "INR"
            })
        }
        catch (error) {
            console.log(error);
        }
    }
    const removeCartItem = (pid) => {
        try {
            let myCart = [...cart];
            let index = myCart.findIndex((item) => item._id === pid);
            myCart.splice(index, 1);
            setCart(myCart);
            localStorage.setItem('cart', JSON.stringify(myCart));
        }
        catch (error) {
            console.log(error)
        }
    }
    const getToken = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/braintree/token`)
            setClientToken(data?.clientToken)
        }
        catch (error) {
            console.log(error);
        }
    }
    useEffect(() => {
        getToken();
    }, [auth?.token]);

    const handlePayment = async () => {
        try {
            setLoading(true);
            const { nonce } = await instance.requestPaymentMethod();

            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/braintree/payment`, { nonce, cart })
            setLoading(false);
            localStorage.removeItem('cart')
            setCart([]);


            toast.success('Payment done successfully!', {
                onClose: () => navigate('/dashboard/user/orders'), // Navigate after toast closes
            });


        }

        catch (error) {
            console.log(error);
            setLoading(false);
        }

    }
    return (

        <Layout>
            <div className='.container.d-flex-cartm  '>
                <div className='row'>
                    <div className='col-md-12'>
                        <h1 className='text-center p-2 text-orders'>
                            {`Hello, ${auth?.token && auth?.user?.name} !`}
                        </h1>
                        <h4 className='text-center text-orders-second'>
                            {cart?.length > 0 ? `You have ${cart.length} items in your cart ${auth?.token ? " " : "Please Login to Checkout"}` : "Your Cart is Empty"}

                        </h4>
                    </div>

                </div>
                <div className='row d-flex '>
                    <div className='col-md-7 d-flex '>
                        <div className=' container-orders d-flex'>
                            {
                                cart?.map(p => (
                                    <div className='col mb-2 p-3 card-order card-order-m'>
                                        <div className='col-md-4'>
                                            <img
                                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                className="card-img-top-cart-orders"
                                                alt={p.name}
                                                width="100px"
                                                height="100px"
                                            />
                                        </div>
                                        <div className='row-md-8'>
                                            <h4 className='h-orders users-name-second'>{p.name}</h4>
                                            <p className='users-des-second'>{p.description.substring(0, 80)}...</p>
                                            <h4 className='h-orders price-user-second'>Rs. {p.price}</h4>
                                            <button className='btn btn-danger cart-danger' onClick={() => removeCartItem(p._id)}>
                                                Remove from Cart
                                            </button>
                                        </div>

                                    </div>
                                ))
                            }
                        </div>
                    </div>
                    <div className='col pay'>
                        <h4 className='pay-heading'>Enroll Now ~</h4>
                        <h4 className='mt-0 pay-heading'>
                            Cart Summary
                        </h4>
                        <p className='payOptions'>Total | Checkout | Payment</p>

                        <h4 className='pay-total-heading'>Total : <span className='pay-total'>{totalPrice()}</span>
                            {auth?.user?.address ? (
                                <>
                                    {/* <div mb-3>
                                        <h4>Current Address</h4>
                                        <h5>{auth?.user?.address}</h5>
                                        <button className='btn-secondary-pd'
                                            onClick={() => navigate('/dashboard/user/profile')}
                                        >Update Address</button>
                                    </div> */}
                                </>
                            ) : (
                                <div className='mb-3'>
                                    {
                                        auth?.token ? (
                                            <button className='btn-secondary-pd' onClick={() => navigate('/dashboard/user/profile')}>Update Address</button>
                                        ) : (
                                            <button className='btn-secondary-pd-user' onClick={() =>
                                                navigate("/login", {
                                                    state: "/cart",
                                                })
                                            }>
                                                Please login to checkout
                                            </button>

                                        )
                                    }
                                </div>
                            )}</h4>

                        <>
                            {
                                !clientToken || !cart.length ? ("") : (
                                    <>
                                        <DropIn options={{
                                            authorization: clientToken,
                                            paypal: {
                                                flow: 'vault'
                                            }
                                        }}
                                            onInstance={(instance) => setInstance(instance)} />
                                        <button className='btn-secondary-pd mt-4 pay-button' onClick={handlePayment} disabled={loading || !instance || auth?.address}>{loading ? 'Processing...' : 'Make Payment'}
                                        </button>
                                    </>
                                )
                            }

                        </>
                    </div>

                </div>
            </div>
        </Layout>
    )
}

export default Cart