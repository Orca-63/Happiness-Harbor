import Layout from "../../components/Layout";
import AdminMenu from "../../components/Layouts/AdminMenu";
import './AllStyles.css';
import { useState, useEffect } from "react";
import axios from "axios";
import { toast } from "react-toastify";
import { Select } from "antd";
import { useNavigate } from "react-router-dom";
const { Option } = Select
const CreateProduct = () => {
    const navigate = useNavigate();
    const [categories, setCategories] = useState([]);
    const [photo, setPhoto] = useState("");
    const [name, setName] = useState("");
    const [description, setDescription] = useState("");
    const [quantity, setQuantity] = useState("");
    const [shipping, setShipping] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");

    const getAllCategory = async () => {
        try {
            const { data } = await axios.get(`${process.env.REACT_APP_API}/api/v1/category/get-category`);
            if (data?.successful) {
                setCategories(data?.category);
            }
        } catch (error) {
            console.log(error);
            toast.error("Something wwent wrong in getting catgeory");
        }
    };
    useEffect(() => {
        getAllCategory();
    }, []);

    const handleCreate = async (e) => {
        e.preventDefault()
        try {
            const productData = new FormData();
            productData.append('name', name);
            productData.append('description', description);
            productData.append('photo', photo);
            productData.append('price', price);
            productData.append('quantity', quantity);
            productData.append('category', category);
            productData.append('shipping', shipping);
            const { data } = await axios.post(`${process.env.REACT_APP_API}/api/v1/product/create-product`, productData);
            if (data?.successful) {
                // toast.success('Program created successfully');

                // navigate('/dashboard/admin/products');
                toast.success('Program created Successfully', {
                    onClose: () => navigate('/dashboard/admin/products'), // Navigate after toast closes
                });


            }
            else {
                toast.error(data?.message);
            }
        }
        catch (error) {
            console.log(error);
            toast.error('Something went wrong');
        }

    }
    return (
        <Layout title={'Launch New Program'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <h1 className="h1-cpd">Launch a new Program</h1>
                        <div className="m-1 w-75">
                            <Select bordered={false} placeholder="Select a category" size="large" showSearch className="form-select-cpd-mb-3 cat-cpd" onChange={(value) => { setCategory(value) }}>
                                {categories?.map(c => (<Option key={c._id} value={c._id}>{c.name}</Option>))}
                            </Select>
                            <div className="mb-3-cpd">
                                <label className="btn btn-outline-secondary-cpd col-md-12">
                                    {photo ? photo.name : "Upload Image (Less then 1MB)"}
                                    <input type="file" name="photo" accept="image/*" onChange={(e) => setPhoto(e.target.files[0])} hidden />
                                </label>
                            </div>
                            <div className="mb-3-cpd">
                                {photo && (
                                    <div className="text-center">
                                        <img src={URL.createObjectURL(photo)} alt="Preview of P rogram" height={'400px'} width={'500px'} className="img img-responsive" />

                                    </div>
                                )}
                                <div className="mb-3-cpd">
                                    <input type="text" value={name} placeholder="Type a name" className="form-control" onChange={(e) => setName(e.target.value)} />

                                </div>
                                <div className="mb-3-cpd">
                                    <input type="text" value={description} placeholder="Put the Description" className="form-control" onChange={(e) => setDescription(e.target.value)} />

                                </div>
                                <div className="mb-3-cpd">
                                    <input type="number" value={price} placeholder="Put the Price" className="form-control" onChange={(e) => setPrice(e.target.value)} />

                                </div>
                                <div className="mb-3-cpd">
                                    <input type="number" value={quantity} placeholder="Put the number of available slots" className="form-control" onChange={(e) => setQuantity(e.target.value)} />

                                </div>
                                <div className="mb-3-cpd">
                                    <Select bordered={false} placeholder="Select Shipping Status"
                                        size="large"
                                        showSearch
                                        className="form-select mb-3" onChange={(value) => { setShipping(value); }} >
                                        <Option value="0">Yes</Option>
                                        <Option value="1">No</Option>

                                    </Select>
                                </div>
                                <div className="mb-3-cpd">
                                    <button className="btn-primary-cpd" onClick={handleCreate}>
                                        Launch Program
                                    </button>

                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </Layout>
    )
}
export default CreateProduct;
