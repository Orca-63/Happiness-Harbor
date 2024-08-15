import React from 'react'
import AdminMenu from '../../components/Layouts/AdminMenu'
import Layout from '../../components/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useAuth } from '../../context/auth'
import moment from 'moment'
import { Select } from 'antd'
import '../user/Orders.css'
const { Option } = Select
const AdminOrders = () => {

    const [status, setStatus] = useState(['Not Processed', 'Processing', 'Processed', 'Delivered', 'Cancelled']);
    const [changeStatus, setChangeStatus] = useState("");
    const [orders, setOrders] = useState([]);
    const [auth, setAuth] = useAuth();
    const getOrders = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/auth/all-orders`);
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
    const handleChange = async (orderId, value) => {
        try {
            const { data } = await axios.put(`${process.env.REACT_APP_API}/api/v1/auth/order-status/${orderId}`, { status: value })

            getOrders();
        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <>
            <Layout title={'All Orders'}>
                <div className='row'>
                    <div className='col-md-3'>
                        <AdminMenu />
                    </div>
                    <div className='col-md-9'>
                        <h1 className='text-center h1-users mt-5'>All Orders</h1>
                        {
                            orders?.map((o, i) => {
                                return (
                                    <div>
                                        <table className='table'>
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
                                                    <td>
                                                        <Select bordered={false} onChange={(value) => handleChange(o._id, value)} defaultValue={o?.status}>
                                                            {status.map((s, i) => (
                                                                <Option key={i} value={s}>{s}</Option>
                                                            ))}
                                                        </Select>
                                                    </td>
                                                    <td>{o?.buyer?.name}</td>
                                                    <td>{o?.products?.length} </td>
                                                    <td>{o?.payment?.success ? 'Successful' : 'Failed'}</td>
                                                    <td>{moment(o?.createdAt).fromNow()}</td>



                                                </tr>
                                            </tbody>
                                        </table>
                                        <div className='container-orders d-flex'>
                                            {
                                                o?.products?.map((p, i) => (
                                                    <div className='col mb-2 p-3 card-order'>
                                                        <div className='col-md-4'>
                                                            <img
                                                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                                                className="card-img-top-cart-orders"
                                                                alt={p.name}
                                                                width="50px"
                                                                height="50px"
                                                            />
                                                        </div>
                                                        <div className='row-md-8'>
                                                            <h4 className='h-orders users-name'>{p.name}</h4>
                                                            <p className='users-des'>{p.description.substring(0, 80)}...</p>
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
            </Layout>

        </>
    )
}

export default AdminOrders