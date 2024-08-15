import Layout from '../components/Layout'
import React from 'react'
import { useSearch } from '../context/Search'
import './Search.css'
const Search = () => {
    const [values, setValues] = useSearch()
    return (
        <Layout title={'Search Results'}>
            <div className='container'>
                <div className='text-center'>
                    <h1 className='h1-search'>Search Results</h1>
                    <h6 className='h6-search'>{values?.results.length < 1 ? 'No Programs found' : `Programs/Workshops Available ~ ${values?.results.length}`}</h6>
                    <div className="d-flex flex-wrap">
                        {values?.results.map((p) => (

                            <div className="card m-2" style={{ width: "18rem" }}>
                                <img
                                    src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                    className="card-img-top"
                                    alt={p.name}
                                />
                                <div className="card-body">
                                    <h5 className="card-title">{p.name}</h5>
                                    <p className="card-text">{p.description.substring(0, 30)}...</p>
                                    <p className="card-text">Rs. {p.price}</p>
                                    <button href="#" class="btn btn-primary-hm">More Details</button>
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

export default Search