import React, { useEffect, useState } from 'react'
import Layout from '../components/Layout'
import axios from 'axios'
import { useParams } from 'react-router-dom'
import { useNavigate } from 'react-router-dom'
import { useCart } from "../context/CartContext";
import { toast } from "react-toastify"
const ProductDetails = () => {
    const params = useParams();
    const [product, setProduct] = useState({});
    const [cart, setCart] = useCart();
    const navigate = useNavigate();
    const [relatedProducts, setRelatedProducts] = useState([])
    useEffect(() => {
        if (params?.slug)
            getProducts();
    }, [params?.slug])
    const getProducts = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/get-product/${params.slug}`);
            setProduct(data?.product)
            getSimilarProduct(data?.product._id, data?.product.category._id);
        }
        catch (error) {
            console.log(error);
        }
    }
    const getSimilarProduct = async (pid, cid) => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/related-product/${pid}/${cid}`);
            setRelatedProducts(data?.products);
        }
        catch (error) {

        }

    }
    return (
        <Layout>
            <div className='row container mt-4 main-div-pd d-flex'>
                <div className='col-md-6 d-flex'><img
                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${product._id}`}
                    className="card-img"
                    alt={product.name}
                    width="500px"

                /></div>
                <div className='col-md-6 '>
                    <h1 className='text-center-pd'>Program/Workshop Details</h1>
                    <h6 className='pd-h'>Name: <span className='pd-sh'>{product.name}</span></h6>
                    <h6 className='pd-h'>Category: <span className='pd-sh'>{product.category?.name}</span></h6>
                    <h6 className='pd-h'>Description: <span className='pd-sh'>{product.description}</span></h6>
                    <h6 className='pd-h'>Price:  <span className='pd-sh'>Rs. {product.price}</span></h6>
                    <h6 className='pd-h'>Spots Available: <span className='pd-sh'>{product.quantity}</span></h6>

                    <button class="btn btn-secondary-pd" onClick={() => {
                        setCart([...cart, product]);
                        localStorage.setItem('cart', JSON.stringify([...cart, product])); toast.success('Program/Workshop added to your cart')
                    }}>Add to Cart</button>

                </div>

            </div>
            <div className='row container d-flex'>
                <h1 className='h1-pd'>Similar Programs and Workshops:</h1>
                {relatedProducts.length < 1 && <p className='text-center'>No Similar Programs or Workshops Found</p>}
                <div className="d-flex flex-wrap cb-pd">
                    {relatedProducts?.map((p) => (

                        <div className="card m-2" style={{ width: "18rem" }}>
                            <img
                                src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                className="card-img-top"
                                alt={p.name}
                            />
                            <div className="card-body ">
                                <h5 className="card-title">{p.name}</h5>
                                <p className="card-text">{p.description.substring(0, 30)}...</p>
                                <p className="card-text">Rs. {p.price}</p>
                                <button className="btn btn-primary-hm" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                <button class="btn btn-secondary-hm" onClick={() => {
                                    setCart([...cart, p]);
                                    localStorage.setItem('cart', JSON.stringify([...cart, p])); toast.success('Program/Workshop added to your cart')
                                }}>Add to Cart</button>
                            </div>
                        </div>



                    ))}
                </div>
            </div>
        </Layout>
    )
}

export default ProductDetails