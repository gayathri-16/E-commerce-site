import React, { Fragment, useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';
import '../../cssFiles/checkout.scss'
import Loader from '../layouts/Loader'
import '../../cssFiles/confirmOrder.scss'
import { useDispatch, useSelector } from 'react-redux';
import {orderDetail as orderDetailAction} from '../../actions/orderAction'

function OrderDetail(props) {
  const {orderDetail, loading} = useSelector(state=>state.orderState);



    const { shippingInfo = {}, user={}, orderStatus="Processing", orderItems=[], totalPrice=0} = orderDetail;
     const dispatch = useDispatch()
    const {id} = useParams();

    useEffect(()=>{
       dispatch(orderDetailAction(id))
    },[dispatch,id])
      
    return (
        <Fragment>
           {  loading ? <Loader/> :
             <Fragment>
       
     
         
      
     <div className='checkout-header'>
             <h2>Order # {orderDetail._id}</h2>
     </div>

     <div className='order-confirm-container'>
       <div className='summary-container'>
        <div className='shipping-summery'>
         <h4 style={{marginBottom:"3rem"}}>Shipping Info</h4>
         <p style={{fontWeight:"bold"}}>{user.name}</p>
         <p>{ shippingInfo.phoneNo}</p>
         <p>{ shippingInfo.address}</p>
         <p>{shippingInfo.city}</p>
         <p>{shippingInfo.postalCode}</p>
         <p>{ shippingInfo.country}</p>
         <b style={{color:"#1dd1a1",fontSize:"20px"}}>${totalPrice}</b>

        
          
         </div>
         <div style={{position:"absolute",width:"700px",marginTop:"21rem",marginLeft:"3rem"}}>
         <h4>Order Status</h4>
         {orderStatus.includes('Delivered')?
         <p style={{color:"green"}}>{orderStatus}</p>:
         <p style={{color:"red"}}>{orderStatus}</p>
          }
         </div>
        
         </div>


     <div className='order-detail' style={{position:"absolute",width:"700px",marginTop:"33rem"}}>
         <h2 style={{fontSize:"20px"}}>Your Ordered Details</h2>
         {orderItems.map(item=>(
            <div className='order-list'>
                     <div className='order-img'><Link to={`/product/${item.product}`}><img src={item.image} alt={item.name} id="order-prod" /></Link></div>
                     <div className='order-name'><Link to={`/product/${item.product}`} style={{textDecoration:"none",color:"#333"}}><h4 style={{fontSize:"17px"}}>Product Name</h4><p style={{fontSize:"14px",marginTop:"1rem"}}>{item.name}</p></Link></div>
                     <div className='order-qty'><h4 style={{fontSize:"17px"}}>Quantity</h4><p style={{fontSize:"14px",marginTop:"1rem"}}>{item.quantity}</p></div>
                     <div className='order-price'><h4 style={{fontSize:"17px"}}>Price</h4><p style={{fontSize:"14px",marginTop:"1rem"}}>$ {item.price}</p></div>
               </div>
                      
         ))}
     </div>

 
    
      </div>
        
     
             </Fragment>
         }
 </Fragment>
    );
}

export default OrderDetail;