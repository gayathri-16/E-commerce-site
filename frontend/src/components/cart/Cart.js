import React, { Fragment } from 'react';
import '../../cssFiles/cart.scss'
import { Link,useNavigate} from 'react-router-dom';
import {decreaseCartItemQty,   increaseCartItemQty,removeItemFromCart} from '../../slice/cartSlice'
import { useDispatch, useSelector } from 'react-redux';
function Cart(props) {

    const{items}= useSelector(state=>state.cartState);
    const dispatch = useDispatch();
    const navigate = useNavigate();


    const increaseQty = (item)=>{
        const count = item.quantity;
        if(item.stock === 0 || count>=item.stock) return;
        dispatch(increaseCartItemQty(item.product))
    }
    const decreaseQty = (item)=>{
        const count = item.quantity;
        if( count === 1) return;
        dispatch(decreaseCartItemQty(item.product))
    }
    const checkoutHandler = () =>{
        navigate('/checkout')
    }

    return (
  

           <div  className='cart-items-container'>
                    {items.length===0?
                    
                    <h2 style={{textAlign:"center",marginTop:"15rem",color:"rgba(0, 0, 0, 0.5)", fontSize:"5em"}}>Your Cart is Empty</h2>:
                       <Fragment>           
                         <div className='cart-info'>
                            <h3 style={{ fontSize:"16px"}}>Product</h3>
                            <div className='cost-detail' >
                            <h3 style={{ fontSize:"14px"}}>Price</h3>
                            <h3 style={{ fontSize:"14px"}}>Quantity</h3>
                            <h3 style={{ fontSize:"14px"}}>Total</h3>
                            </div>  
                         </div>
                         <div className='itrrate-item'>
                         {items.map(item=>(
                            <Fragment>
                        
                             <div id="collection">                           
                             <div className='goods'>
                             <div style={{width:"10%"}}><i class="fa-solid fa-trash-can" onClick={()=> dispatch(removeItemFromCart(item.product))}></i></div>
                             <div style={{width:"25%"}}><img src={item.image} alt="" /></div>
                             <div style={{width:"60%"}}><Link to={`/product/${item.product}`} style={{textDecoration:"none"}}> <h4 style={{color:"#333",fontSize:"16px"}}>{item.name}</h4></Link></div>
                            </div>
                         
                            <div  id="item-modify">
                            <h3 className='cost' style={{ fontSize:"16px"}}>$ {item.price}</h3>
                            <div className='modify-product-btn'>
                                <button onClick={()=>decreaseQty (item)}>-</button>
                                <input type="text" value={item.quantity} style={{width:"30px",height:"90%",border:"none",background:"transparent", textAlign:"center" }} />
                                <button className='increment'  onClick={()=> increaseQty(item)}>+</button>
                            </div>
                            <h3 style={{ fontSize:"16px"}}>${ item.quantity * item.price}</h3>
                            </div>       
                            </div>
                  
                            </Fragment>
                              
                           )) }
                          </div>
                          <div className='cart-total'>
                            <h2>Cart Totals</h2>
                           <div className='cart-section'>
                           <div className='sub-total'>
                           <h3 style={{ fontSize:"17px"}}>Subtotal </h3>
                           <h3 className='sub-money' style={{ fontSize:"17px"}}>${items.reduce((acc,item)=>(acc + item.quantity * item.price),0)}</h3>
                         </div>


                    <div className='total-amount'>
                        <h3>Total</h3>
                        <h2 style={{color:"#1dd1a1"}}>${items.reduce((acc,item)=>(acc + item.quantity * item.price),0)}</h2>
                    </div>
                    </div>
                    <div className='pro-to-checkout'>
                    <button onClick={checkoutHandler}><h3 style={{ fontSize:"16px"}}>PROCEED TO CHECKOUT</h3></button>
                    </div>

                    </div>
                   
                       </Fragment>

                   
                    
                    
                
                     }
                    
           </div> 
      

    );
}

export default Cart;

