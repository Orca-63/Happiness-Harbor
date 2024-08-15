import React from 'react'
import Layout from '../components/Layout'
import useCategory from '../hooks/useCategory'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import './CategoryProducts.css'
const Categories = () => {
    const categories = useCategory();
    return (
        <Layout title={'All Categories'}>
            <div className='container'>
                <h2 className='h2-pd'>
                    All Categories Available
                </h2>
                <div className='row'>
                    {categories.map(c => (
                        <div className='col-md-3 mt-5 mb-3 gx-2 gy-3 key = {c._id}'>

                            <Link to={`/category/${c.slug}`} className='btn btn-secondary-pd'>
                                {c.name}
                            </Link>


                        </div>
                    ))}

                </div>
            </div>
        </Layout>
    )
}

export default Categories