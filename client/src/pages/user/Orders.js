import React from 'react'
import Layout from '../../components/Layout'
import UserMenu from '../../components/Layouts/UserMenu'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import './Orders.css'
const Orders = () => {
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/orders`);
            setOrders(data);
        }
        catch (error) {
            console.log(error);

        }
    }
    useEffect(() => {
        if (auth?.token)
            getOrders()
    }, [auth?.token]);


    return (
        <Layout title={'Orders'}>
            <div className='container-fluid p-3 m-3'>
                <div className='row'>
                    <div className='col-md-3'>
                        <UserMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center h1-users'>All Orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div >
                                        <table className='table '>
                                            <thead>
                                                <tr>
                                                    <th scope="col">#</th>
                                                    <th scope="col">Status</th>
                                                    <th scope="col">User</th>

                                                    <th scope="col">Quantity</th>
                                                    <th scope="col">Payment</th>
                                                    <th scope="col">Time</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                <tr>
                                                    <td>{i + 1}</td>
                                                    <td>{o?.status}</td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{o?.products?.length} </td>
                                                    <td>{o?.payment?.success ? 'Successful' : 'Failed'}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>



                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container-orders d-flex '>
                                            {
                                                o?.products?.map((p, i) => (
                                                    <div className='col mb-2 p-3 card-order  '>
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
                                                            <h4 className='h-orders users-name'>{p.name}</h4>
                                                            <p className='users-des'>{p.description.substring(0, 50)}...</p>
                                                            <h4 className='h-orders price-user'> Rs. {p.price}</h4>

                                                        </div>

                                                    </div>
                                                ))
                                            }
                                        </div>
                                    </div>
                                )
                            })
                        }
                    </div>
                </div>
            </div>
        </Layout>
    )
}

export default Orders;