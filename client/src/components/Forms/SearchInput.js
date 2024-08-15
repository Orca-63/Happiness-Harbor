import React from 'react'
import { useSearch } from '../../context/Search'
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

import './SearchInput.css'
const SearchInput = () => {
    const [values, setValues] = useSearch()
    const navigate = useNavigate();
    const handleSubmit = async (e) => {

        try {
            e.preventDefault();
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/search/${values.keyword}`);
            setValues({ ...values, results: data });
            navigate('/search')
        }
        catch (error) {
            console.log(error);

        }
    }
    return (
        <div>
            <form className="custom-form d-flex" role="search" onSubmit={handleSubmit}>
                <input
                    className="custom-input form-control me-2"
                    type="search"
                    placeholder="Search"
                    aria-label="Search"
                    value={values.keyword}
                    onChange={(e) => setValues({ ...values, keyword: e.target.value })}
                />
                <button className="custom-button btn " type="submit">
                    Search
                </button>
            </form>



        </div>
    )
}

export default SearchInput