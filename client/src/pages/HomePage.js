import { useState, useEffect } from "react"
import Layout from "../components/Layout"
import './HomePage.css';
import { useNavigate } from "react-router-dom";
import axios from "axios"
import { Link } from "react-router-dom"
import { Button, Checkbox, Radio } from "antd"
import { toast } from "react-toastify"
import { Prices } from "../components/Prices"
import { useCart } from "../context/CartContext";
const HomePage = () => {
    const navigate = useNavigate();
    const [cart, setCart] = useCart();
    const [products, setProducts] = useState([]);
    const [categories, setCategories] = useState([]);

    const [checked, setChecked] = useState([]);
    const [radio, setRadio] = useState([]);
    const [total, setTotal] = useState(0);
    const [page, setPage] = useState(1);
    const [loading, setLoading] = useState(false);

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.successful) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);

        }
    };

    useEffect(() => {
        getAllCategory();
        getTotal();
    }, []);

    const getAllProducts = async () => {
        try {
            setLoading(true)
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`);
            setLoading(false);
            setProducts(data.products);
        }
        catch (error) {
            setLoading(false);
            console.log(error);

        }
    };
    const getTotal = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-count`)
            setTotal(data?.total)

        }
        catch (error) {

        }
    }
    useEffect(() => {
        if (page === 1) return
        loadMore()
    }, [page])
    const loadMore = async () => {
        try {
            setLoading(true);
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/product/product-list/${page}`)
            setLoading(false);
            setProducts([...products, ...data?.products])
        }
        catch (error) {
            console.log(error);
            setLoading(false);
        }
    }

    const handleFilter = (value, id) => {

        let all = [...checked];
        if (value) {
            all.push(id);
        }
        else {
            all = all.filter((c) => c !== id)
        }

        setChecked(all);
    }

    useEffect(() => {
        if (!checked.length || !radio.length)
            getAllProducts();

    }, [checked.length, radio.length]);
    useEffect(() => {
        if (checked.length || radio.length)
            filterProduct()
    }, [checked, radio])
    const filterProduct = async () => {
        try {
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/product-filters`, { checked, radio });
            setProducts(data?.products);
        }
        catch (error) {
            console.log(error);
        }
    }
    return (
        <Layout title={'Happiness Harbor | All Programs and Workshops'}>

            <div className="row">
                <div className="col-md-3 main-block">
                    <h4 className="text-center m-heads-1">Filter by Categories</h4>
                    <div className="d-flex flex-column ">
                        {categories?.map((c) => (
                            <Checkbox className="Checkbox-text" key={c._id} onChange={(e) => handleFilter(e.target.checked, c._id)}>
                                {c.name}
                            </Checkbox>
                        ))}
                    </div>
                    <h4 className="text-center m-heads-2">Filter by Price</h4>
                    <div className="d-flex flex-column">
                        <Radio.Group onChange={e => setRadio(e.target.value)}>
                            {Prices?.map(p => (
                                <div key={p._id}>
                                    <Radio className="radio-text" value={p.array}>{p.name}</Radio>
                                </div>

                            ))}
                        </Radio.Group>
                    </div>
                    <div className="d-flex flex-column">
                        <Button className="btn btn-primary-hmd" onClick={() => window.location.reload()}

                        >Reset Filters</Button>
                    </div>
                </div>
                <div className="col-md-9">

                    <h1 className="text-center-m-5 main-heading">All Programs and Workshops
                        <div className="d-flex flex-row flex-wrap div-flex">
                            {products?.map((p) => (

                                <div className="card m-2" style={{ width: "18rem" }}>
                                    <img
                                        src={`${process.env.REACT_APP_API}/api/v1/product/product-photo/${p._id}`}
                                        className="card-img-top"
                                        alt={p.name}
                                    />
                                    <div className="card-body">
                                        <h5 className="card-title">{p.name}</h5>
                                        <p className="card-text">{p.description.substring(0, 100)}...</p>
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
                    </h1>
                    <div className="m-2 p-3">
                        {products && products.length < total && (
                            <button className="btn btn-warning" onClick={(e) => {
                                e.preventDefault();
                                setPage(page + 1);
                            }}>
                                {loading ? "Loading..." : "Loadmore"}
                            </button>
                        )}
                    </div>
                </div>

            </div>
        </Layout>
    )
}

export default HomePage