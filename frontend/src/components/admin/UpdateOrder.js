import React,{Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import AdminPanel from './AdminPanel';
import '../../cssFiles/createProduct.scss'
import {  useParams } from 'react-router';
import { Link } from 'react-router-dom';
import { orderDetail as orderDetailAction, updateOrder } from '../../actions/orderAction';
import {toast} from 'react-toastify'
import { clearOrderUpdated,clearError } from '../../slice/orderSlice';
function UpdateOrder(props) {
    
    const { loading, isOrderUpdated, error, orderDetail } = useSelector( state => state.orderState)
    const{user= {}} = useSelector(state=>state.authState);
    const{orderItems= [],paymentInfo={}, totalPrice=0} = useSelector(state=>state.orderState)
    const {shippingInfo = {}} = useSelector(state=>state.cartSate);

    const isPaid = paymentInfo.status === 'succeeded'? true: false;
    const [orderStatus, setOrderStatus] = useState("Processing");
    const { id:orderId } = useParams();



    const dispatch = useDispatch();

    const submitHandler = (e) => {
        e.preventDefault();
        const orderData = {};
        orderData.orderStatus = orderStatus;
        dispatch(updateOrder(orderId, orderData))
    }
    
    useEffect(() => {
        if(isOrderUpdated) {
            toast('Order Updated Succesfully!',{
                type: 'success',
                position: toast.POSITION.BOTTOM_CENTER,
                onOpen: () => dispatch(clearOrderUpdated())
            })
           
            return;
        }

        if(error)  {
            toast(error, {
                position: toast.POSITION.BOTTOM_CENTER,
                type: 'error',
                onOpen: ()=> { dispatch(clearError()) }
            })
            return
        }

        dispatch(orderDetailAction(orderId))
    }, [isOrderUpdated, error, dispatch, orderId])


    useEffect(() => {
        if(orderDetail._id) {
            setOrderStatus(orderDetail.orderStatus);
        }
    },[orderDetail])


    return (
        <Fragment>
        <AdminPanel/>
        <div className="components-render">
            <h1 style={{marginTop:"-3rem"}}>Update Product</h1>
         <form  onSubmit={submitHandler} className='create-product'>
        
           <div className='add-product-details'>
            <h1>Order #{orderDetail._id}</h1>
            <h4>shippingInfo</h4>
            <p><b>Name:</b> {user.name}</p>
            <p><b>Phone:</b> {shippingInfo.phoneNo}</p>
            <p className="mb-4"><b>Address:</b>{shippingInfo.address}, {shippingInfo.city}, {shippingInfo.postalCode}, {shippingInfo.state}, {shippingInfo.country}</p>
            <p><b>Amount:</b> ${totalPrice}</p>
            <hr/>
            <h4>Payment</h4>
            <p className={isPaid ? 'greenColor' : 'redColor' } ><b>{isPaid ? 'PAID' : 'NOT PAID' }</b></p>
            <h4>Order Status:</h4>
            <p className={orderStatus&&orderStatus.includes('Delivered') ? 'greenColor' : 'redColor' } ><b>{orderStatus}</b></p>
            <hr/>
             <h4>Order Items:</h4>
             <div className="cart-item my-1">
                {orderItems && orderItems.map(item => (
                    <div className="row my-5">

                    <div className="col-4 col-lg-2">
                    <img src={item.image} alt={item.name} height="45" width="65" />
                    </div>

                    <div className="col-5 col-lg-5">
                     <Link to={`/product/${item.product}`}>{item.name}</Link>
                     </div>


                    <div className="col-4 col-lg-2 mt-4 mt-lg-0">
                    <p>${item.price}</p>
                    </div>

                    <div className="col-4 col-lg-3 mt-4 mt-lg-0">
                    <p>{item.quantity} Piece(s)</p>
                    </div>

                    </div>
                    ))}                        
              </div>
            <hr/>
           </div>
           <div className='images-container'>
           <h4>Order Status</h4>
           <div>
            <select
              className='slct-category'
              onChange={e => setOrderStatus(e.target.value)}
              value={orderStatus}
              name="status"
              >
               <option value="Processing">Processing</option>
               <option value="Shipped">Shipped</option>
               <option value="Delivered">Delivered</option>
            </select>
            <div className='add-prod-btn'>
                <button 
                type="submit"
                disabled = {loading}
                onClick={submitHandler}
                >UPDATE</button>
                
             </div>
           </div>
          </div>
        </form>
       
        </div>
       </Fragment>
    );
}

export default UpdateOrder;