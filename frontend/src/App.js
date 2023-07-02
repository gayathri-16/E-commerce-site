import React, { useEffect, useState } from 'react';
import { BrowserRouter as Router, Routes,Route } from 'react-router-dom';
import { HelmetProvider } from 'react-helmet-async';
import Header from './components/main/Header';
import Footer from './components/main/Footer';
import Home from './components/main/Home';
import Cart from './components/cart/Cart';
import CheckOut from './components/cart/CheckOut';
import ConfirmOrder from './components/cart/ConfirmOrder';
import ProductDetail from './components/product/ProductDetail';
import Payment from './components/cart/Payment';
import {ToastContainer} from 'react-toastify' ;
import 'react-toastify/dist/ReactToastify.css';
import './cssFiles/home.scss'
import axios from 'axios';
import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import store from './store';
import {loadUser} from './actions/userActions'
import AdminPanel from './components/admin/AdminPanel';
import Dashboard from './components/admin/Dashboard';
import CreateProduct from './components/admin/CreateProduct';
import AllProducts from './components/admin/AllProducts';
import Orders from './components/admin/Orders';
import Users from './components/admin/Users';
import Reviews from './components/admin/Reviews';
import UpdateProduct from './components/admin/UpdateProduct';
import UpdateOrder from './components/admin/UpdateOrder';
import UserOrders from './components/order/UserOrders';
import OrderDetail from './components/order/OrderDetail';
import UpdateUser from './components/admin/UpdateUser';


function App() {

    const [stripeApiKey, setStripeApiKey] = useState("")
  useEffect(() => {
    store.dispatch(loadUser)
    async function getStripeApiKey(){
      const {data} = await axios.get('/api/v1/stripeapi')
      setStripeApiKey(data.stripeApiKey)
    }
    getStripeApiKey()
  },[])
    return (
    <>

          <Router>
            <HelmetProvider>
               <Header/>
                  <ToastContainer theme="dark"/>
                    <Routes>
                        <Route path="/" element={<Home/>} />
                        <Route path="/cart" element={<Cart/>} />
                        <Route path="/checkout" element={<CheckOut/>} />
                        <Route path="/product/:id" element={<ProductDetail/>} />
                        <Route path="/confirmorder" element={<ConfirmOrder/>}/>
                        <Route path="/userorders" element={<UserOrders/>}/>
                        <Route path="/order/:id" element={<OrderDetail/>}/>
                       <Route path="/payment" element={<Elements stripe={loadStripe(stripeApiKey)}><Payment/></Elements>} /> 
                    </Routes>  
                    
                 {/*Admin Routes*/}
                    <Routes>
                    <Route path="/adminpanel" element={<AdminPanel/>}/>  
                    <Route path="/admin/dashboard" element={<Dashboard/>} />
                    <Route path="/admin/product/createproduct" element={<CreateProduct/>} />
                    <Route path="/admin/product/updateproduct/:id" element={<UpdateProduct/>} />
                    <Route path="/admin/product/allproducts" element={<AllProducts/>} />
                    <Route path="/admin/orders" element={<Orders/>} />
                    <Route path="/admin/updateorder/:id" element={<UpdateOrder/>} />
                    <Route path="/admin/users" element={<Users/>} />
                    <Route path="/admin/updateuser/:id" element={<UpdateUser/>} />

                    <Route path="/admin/reviews" element={<Reviews/>} />    
                   </Routes>              
                <Footer/>
            </HelmetProvider>
            </Router>


    </>
    );
}

export default App;
