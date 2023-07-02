import React, { useState } from 'react';
import { Link, useNavigate} from 'react-router-dom';
import '../../cssFiles/checkout.scss'
import { useSelector,useDispatch } from 'react-redux';
import { countries } from 'countries-list';
import {  saveShippingInfo} from '../../slice/cartSlice'

// import { toast } from "react-toastify";


export const validateShipping = (shippingInfo, navigate) => {
   
  if(
      !shippingInfo.address||
      !shippingInfo.city||
      !shippingInfo.state|| 
      !shippingInfo.country||
      !shippingInfo.phoneNo||
      !shippingInfo.postalCode
      ) {
          // toast.error('Please fill the shipping information',{position: toast.POSITION.BOTTOM_CENTER})
         
  }
} 


export default function CheckOut() {
  
  const{items:cartItems =[]}= useSelector(state=>state.cartState);


  const {shippingInfo = {} } = useSelector(state=>state.cartState);

  const [firstName,setFirstname] =useState( shippingInfo.firstName);
  const [lastName,setLastname] =useState( shippingInfo.lastName);
  const [address,setAddress] =useState( shippingInfo.address);
  const [city,setCity] =useState( shippingInfo.city);
  const [phoneNo,setphoneNo] =useState( shippingInfo.phoneNo);
  const [postalCode,setPostalCode] =useState( shippingInfo.postalCode);
  const [country,setCountry] =useState(shippingInfo.country);
  const [state,setState] =useState( shippingInfo.state);
  const countryList = Object.values(countries);

  const dispatch = useDispatch();
  const navigate = useNavigate()


  const shippingPrice =cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0) > 200 ? 0 :25
  const taxPrice= cartItems.reduce((acc, item)=> (acc + item.price * item.quantity * 0.05) ,0)
  const totalPrice= cartItems.reduce((acc, item)=> (acc + item.price * item.quantity + shippingPrice ),0) + taxPrice 
  const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price),0)
  
 
  const processPayment = ()=>{
    const data = {
        itemsPrice,
        shippingInfo,
        taxPrice,
        totalPrice
    }
    sessionStorage.setItem('orderInfo', JSON.stringify(data)) 
}
  
  const submitHandler=(e)=>{
      e.preventDefault();
      dispatch(saveShippingInfo({firstName, lastName, address,city,phoneNo,postalCode,country,state}))
      navigate('/payment')
      // if(isAuthenticated){
      //   navigate('/payment')
     
      // }else{
      //   toast('Please Login To Pay',{
      //     position:toast.POSITION.TOP_RIGHT,
          
        
      //   })
      // }
  }

    return (
        <div>
      
                 <div className='checkout-header'>
                    <h2>Checkout</h2>
                    <p>  <Link to="/" id="link"><i class="fa-sharp fa-solid fa-house-chimney"></i>Home</Link> / <Link to="/checkout" id="link">Checkout</Link></p>
                 </div>

                 <form onSubmit={submitHandler}>
                   <div className='checkout-container'>
               
             
                   <div className='billing'>
                 
                   <h3>Billing Details</h3>
                    <label>First name <sup>*</sup></label>
                    <input type="text" name='name' value={firstName} onChange={(e)=>setFirstname(e.target.value)} required/>
                    <label>Last name <sup>*</sup></label>
                    <input type="text" name="lastanme" value={lastName} onChange={(e)=>setLastname(e.target.value)} required />
                    <label>Country</label>
                    <select value={country} onChange={(e)=>setCountry(e.target.value)}  required>
                      { countryList.map ( (country,i)=>(
                          <option value={country.name} key={i} required>{country.name}</option>
                      ))
                      }
                     
                    </select>
                    <label>State</label>
                    <input type="text" name="state" value={state} onChange={(e)=>setState(e.target.value)}  required/>
                    <label>City</label>
                    <input type="text" name="city" value={city} onChange={(e)=>setCity(e.target.value)} required />
                    <label>Street address <sup>*</sup></label>
                    <input type="text" name ="address" value={address} onChange={(e)=>setAddress(e.target.value)} required/>
                    <label>Postcode / ZIP  <sup>*</sup></label>
                    <input type="text" name="postcode" value={postalCode} onChange={(e)=>setPostalCode(e.target.value)} required/>
                    <label>Phone<sup>*</sup></label>
                    <input type="text" name='phone' value={phoneNo} onChange={(e)=>setphoneNo(e.target.value)} required/>

                   
                   </div>

                <div className="your-order">              
                    <h3>Your order</h3>
                    <div className='your-order-container'>
                     <div className='oreder-header'>
                      <h4 className='product-title'> Product</h4>
                      <h4 className='product-value'>Total</h4>
                      </div>                   
                         <div>
                           { cartItems.map(item=>(  
                            <div className='order-body'>
                            
                              <p className='product-title' style={{fontSize:"17px"}}>{item.name} X  {item.quantity}</p>
                              <p style={{fontSize:"17px"}}>{ item.quantity * item.price}</p>
                           
                           </div>
                           ))}
                            
                            <div className='order-subtotal'>
                              <h4 style={{fontSize:"17px"}}>Subtotal</h4>
                              <h4 >${cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0)}</h4>
                            </div>
                               <div className='order-shipping'>
                               <div>
                                <h4 style={{fontSize:"17px"}}> Shipping </h4>
                                <h4 style={{fontSize:"17px"}}>TaxPrice</h4> 
                              </div>
                              <div className='rate'>
                              <p> ${shippingPrice}</p>
                              <p>${taxPrice}</p>
                              </div>
                            </div>
                            <div className='order-final'>
                              <h4>Total</h4>
                              <h3>${cartItems.reduce((acc, item)=> (acc + item.price * item.quantity + shippingPrice ),0) + taxPrice}</h3>
                            </div> 
                          </div>
                      

              
                   <div className='order-payment'>
                    <div className='payment'> <h5> <input type="radio" /> PayPal <img src="https://p.kindpng.com/picc/s/44-440249_paypal-payment-methods-icons-hd-png-download.png" alt="" /> </h5></div>
                    <p>Your personal data will be used to process your order, support your experience <br/> throughout this website, and for other purposes described in our</p>
                    <p><input type="checkbox" /> I have read and agree to the website <sup>*</sup></p>
                   </div>
                   </div>

                   <div><button type="submit" onClick={processPayment} className='place-order'>PLACE ORDER</button></div>
                   </div>
                   </div>
                 </form>

        </div>
    );
}

