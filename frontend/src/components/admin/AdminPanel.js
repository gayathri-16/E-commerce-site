import React, { useState } from 'react';
import {NavLink} from 'react-router-dom'
import '../../cssFiles/home.scss';
import '../../cssFiles/adminpanel.scss'
function AdminPanel() {
    const[showList,setList] = useState(false);
    return (
        <div className='admin-container'>
             <header className='user-detail-sec'>
                  <div id="search-product">
                    <input type="text" placeholder='Enter Product Name...'/>
                    <button id="search-btn">
                    <i class="fas fa-search"></i>
                    </button>
                  </div>                 

                  <div id="side-nav">
                     <div id="side-nav-element">
                        <NavLink to='/admin/dashboard' style={{textDecoration:"none",color:"#333",width:"100%"}}> <div id="side-content"><p>Dashboard</p></div></NavLink>
                        <div className='products'>
                          <p><i class="fa-brands fa-product-hunt"></i>Product <i class="fa-solid fa-caret-down" style={{marginLeft:"10px",marginTop:"3px"}} onClick={()=>setList(!showList)}></i></p>  
                        </div>
                        {showList &&
                         <div id="show-product" >
                         <NavLink to='/admin/product/allproducts' style={{textDecoration:"none",color:"#333",width:"100%"}}><div id="side-content"><i class="fa-solid fa-bag-shopping"></i>All Product</div></NavLink>
                         <NavLink to='/admin/product/createproduct' style={{textDecoration:"none",color:"#333",width:"100%"}}> <div id="side-content"><p><i class="fa-solid fa-plus"></i>Create</p></div></NavLink>
                         </div>
                        } 
                         <NavLink to='/admin/orders' style={{textDecoration:"none",color:"#333",width:"100%"}}><div id="side-content"><p><i class="fa-solid fa-basket-shopping"></i>Orders</p></div></NavLink> 
                         <NavLink to='/admin/users' style={{textDecoration:"none",color:"#333",width:"100%"}}><div id="side-content"><p><i class="fa-solid fa-users"></i> Users</p></div></NavLink>
                         <NavLink to='/admin/reviews' style={{textDecoration:"none",color:"#333",width:"100%"}}><div id="side-content"><p><i class="fa-solid fa-user"></i> Reviews</p></div></NavLink>
                        </div>
                  </div>
           </header>
       
        </div>
    );
}

export default AdminPanel;