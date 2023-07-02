import React, { Fragment,useEffect } from 'react';
import '../../cssFiles/dashboard.scss'
import AdminPanel from './AdminPanel';
import {useDispatch, useSelector} from 'react-redux'
import {Link} from 'react-router-dom'
import {getAdminProducts} from '../../actions/productActions'
import {getUsers} from '../../actions/userActions'
import {adminOrders as adminOrdersAction} from '../../actions/orderAction'
function Dashboard(props) {
  const {products = []} = useSelector(state => state.productsState)
  const {adminOrders = []} = useSelector(state => state.orderState)
  const {users = []} = useSelector(state => state.userState)
  const dispatch = useDispatch();
  let outOfStock = 0;
  
  if(products.length > 0 )
{
  products.forEach(product => {
    if(product.stock === 0){
      outOfStock = outOfStock + 1
    }
  })
}
let totalAmount = 0;
if (adminOrders.length > 0) {
    adminOrders.forEach( order => {
        totalAmount += order.totalPrice
    })
}


useEffect( () => {
  dispatch(getAdminProducts);
  dispatch(getUsers);
  dispatch(adminOrdersAction)
}, [dispatch])
    return (
        <Fragment>
        <AdminPanel/>
        <div className="components-render">
            <div className='dashboard-container'>
            <div className='show-amt'>
                <h4>Total Amount</h4>
                <h3>${totalAmount}</h3>
            </div>
            <div className='show-product-detail'>
                <div className='has-product'>
                  <div className='view-product'>
                    <h4>Products</h4>
                     <h3>{products.length}</h3>
                   </div>
                   <Link to='/admin/product/allproducts' style={{textDecoration:"none", color:"#fff"}} ><div className='view-detail'>
                    <p>View Details</p>
                   <p> <i class="fa-solid fa-angle-right"></i></p>
                   </div>
                   </Link>
                </div>

                <div className='has-product' id="orders">
                 <div className='view-product'>
                  <h4>Orders</h4>
                   <h3>{adminOrders.length}</h3>
                </div>
                   <div>
                   <Link  className='view-detail' to='/admin/orders' style={{textDecoration:"none", color:"#fff"}} ><p>View Details</p>
                    <p> <i class="fa-solid fa-angle-right"></i></p>   </Link>
                   </div>
                
                </div>

                <div className='has-product' id="user">
                <div className='view-product'>
                  <h4>Users</h4>
                   <h3>{users.length}</h3>
                   </div>
                   <Link to='/admin/users' style={{textDecoration:"none", color:"#fff"}} ><div className='view-detail'>
                    <p>View Details</p>
                    <p> <i class="fa-solid fa-angle-right"></i></p>
                   </div>
                   </Link>
                </div>
                
                <div className='has-product' id="stock">
                <div className='view-product'>
                  <h4>Out of Stock</h4>
                   <h3>{outOfStock}</h3>
                 </div>
                 
                </div>
            </div>
            
             </div>
        </div>
        </Fragment>
    );
}

export default Dashboard;