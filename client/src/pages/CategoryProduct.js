import React from 'react'
import Layout from '../components/Layout'
import { useState, useEffect } from 'react'
import axios from 'axios'
import { useParams, useNavigate } from 'react-router-dom'
import './CategoryProducts.css'
const CategoryProduct = () => {
    const params = useParams();
    const [product, setProduct] = useState([]);
    const [category, setCategory] = useState([]);
    const navigate = useNavigate();
    useEffect(() => {
        if (params?.slug)
            getProductsByCategory()
    }, [params.slug]);
    const getProductsByCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-category/${params.slug}`)

            setProduct(data?.product);
            setCategory(data?.category);
        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <Layout>
            <div className='container'>
                <h2 className='text-center h2-pd'>
                    Category ~<span> </span>
                    {category?.name}
                </h2>
                <h6 className='text-center h6-pd'>
                    Programs and Workshops in {category?.name} ~<span> </span>
                    {product?.length}
                </h6>
                <div className='row'>
                    <div className="d-flex flex-wrap ">
                        {product?.map((p) => (

                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top "
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">Rs. {p.price}</p>
                                    <button className="btn btn-primary-hm" onClick={() => navigate(`/product/${p.slug}`)}>More Details</button>
                                    <button href="#" class="btn btn-secondary-hm">Add to Cart</button>
                                </div>
                            </div>



                        ))}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default CategoryProduct