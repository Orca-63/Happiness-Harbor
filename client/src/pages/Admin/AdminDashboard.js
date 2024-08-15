import AdminMenu from "../../components/Layouts/AdminMenu";
import Layout from "./../../components/Layout"
import { useAuth } from "../../context/auth";
import './AllStyles.css'
import profileImageUrl from '../../Images/Admin.png';
const AdminDashboard = () => {
    const [auth] = useAuth();

    return (
        <Layout title={'Admin Dashboard'}>
            <div className="container-fluid m-3 p-3">
                <div className="row">
                    <div className="col-md-3">
                        <AdminMenu />
                    </div>
                    <div className="col-md-9">
                        <div className="card w-75 p-3">
                            <h1>
                                Admin Name :   <h2>{auth?.user?.name}</h2>
                            </h1>
                            <h1>
                                Admin Email :    <h2>{auth?.user?.email}</h2>
                            </h1>
                            <h1>
                                Admin Contact Number:  <h2>{auth?.user?.phone}</h2>
                            </h1>

                        </div>
                    </div>
                </div>
            </div>

        </Layout>
    )
}

export default AdminDashboard;