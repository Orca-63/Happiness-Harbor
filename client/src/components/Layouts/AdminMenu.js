import { NavLink } from "react-router-dom";
import '../../styles/AdminDashboard.css';
const AdminMenu = () => {
    return (
        <div className="text-center">
            <h3 className="main-heading">Admin Panel</h3>
            <div className="list-group">
                <NavLink to="/dashboard/admin/create-category" className="list-group-item list-group-item-action " aria-current="true">
                    Create Category
                </NavLink>
                <NavLink to="/dashboard/admin/products" className="list-group-item list-group-item-action " aria-current="true">
                    Programs
                </NavLink>
                <NavLink to="/dashboard/admin/orders" className="list-group-item list-group-item-action " aria-current="true">
                    Orders
                </NavLink>
                <NavLink to="/dashboard/admin/create-product" className="list-group-item list-group-item-action">Launch New Program</NavLink>
                <NavLink to="/dashboard/admin/users" className="list-group-item list-group-item-action">Users</NavLink>

            </div>

        </div>
    )
}

export default AdminMenu;