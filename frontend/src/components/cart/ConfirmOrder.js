
import { Link } from 'react-router-dom';
import '../../cssFiles/checkout.scss'
import '../../cssFiles/confirmOrder.scss'
import { useDispatch, useSelector } from 'react-redux';
import { orderCompleted } from '../../slice/cartSlice';

export default function ConfirmOrder(){

    const dispatch = useDispatch()

    const {  shippingInfo, items:cartItems } = useSelector(state => state.cartState);
    const itemsPrice = cartItems.reduce((acc, item)=> (acc + item.price * item.quantity),0);
    const shippingPrice = itemsPrice > 200 ? 0 : 25;
    let taxPrice = Number( 0.05 * itemsPrice);
    const totalPrice = Number(itemsPrice + shippingPrice + taxPrice).toFixed(2);
    taxPrice = Number( 0.05 * itemsPrice).toFixed(2)

 

return(
    <div>
     
         
      
            <div className='checkout-header'>
                    <h2>My Account</h2>
                    <p>  <Link to="/" id="link"><i class="fa-sharp fa-solid fa-house-chimney"></i>Home</Link> / <Link to="/checkout" id="link">My Account</Link></p>
            </div>

            <div className='order-confirm-container'>
                <div className='summary-container'>

            <div className='success-msg'>
                <i class="fa-solid fa-circle-check"></i>
                <h1>Thank You</h1>
                <p>Success! we received your payment. Your order wil be processed soon.</p>
                <h6>transaction ID: 678237919301</h6>
            </div>

            <div className='expected-date'>
                <h3>Expected Date Of Delivery</h3>
                <h1>June 7, 2023</h1>
            </div>
             

            <div className='shipping-summery'>
                <h4 style={{marginBottom:"1rem"}}>Ship To</h4>
                <p style={{fontWeight:"bold"}}>{shippingInfo?.firstName}</p>
                <p>{ shippingInfo.address}</p>
                <p>{ shippingInfo.state}</p>
                <p>{ shippingInfo.country}</p>
             
            </div>

            <div className='order-detail'>
                <h2 style={{fontSize:"20px"}}>Your Ordered Details</h2>
                {cartItems.map(item=>(
                   <div className='order-list'>
                            <div className='order-img'><Link to={`/product/${item.product}`}><img src={item.image} alt="" id="order-prod" /></Link></div>
                            <div className='order-name'><h4 style={{fontSize:"17px"}}>Product Name</h4><p style={{fontSize:"14px"}}>{item.name}</p></div>
                            <div className='order-qty'><h4 style={{fontSize:"17px"}}>Quantity</h4><p style={{fontSize:"14px"}}>{item.quantity}</p></div>
                            <div className='order-price'><h4 style={{fontSize:"17px"}}>Price</h4><p style={{fontSize:"14px"}}>$ {item.price}</p></div>
                    </div>
                             
                ))}
            </div>
            <div className='order-total-container'>
                    <div className='order-list-subtotal'>
                        <p>Subtotal</p>
                        <p>Tax Price</p>
                        <p>Shipping</p>
                    </div>
                    <div className='order-money-subtotal'>
                        <p>${itemsPrice}</p>
                        <p>${taxPrice}</p>
                        <p>$ {shippingPrice}</p>
                    </div>
                   
            </div>
            <div className='main-total'>
                <h4>Total</h4>
                <h3>$ {totalPrice}</h3>
            </div>
        
           
            <Link to='/' onClick={()=> dispatch(orderCompleted())}><button className='home-link'>Go to home</button></Link>
           
            <Link to='/userorders'><button className='order-link' style={{marginLeft:"-10rem"}}>Go to Orders</button></Link>
         </div>
            </div>
            
    </div>
)
}