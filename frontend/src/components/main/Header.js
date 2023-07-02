import React,{Fragment, useState} from 'react';
import '../../cssFiles/home.scss'
import {NavLink, Link, useNavigate} from 'react-router-dom';
import Login from '../user/Signin';
// import {toast} from 'react-toastify'
import {removeItemFromCart} from '../../slice/cartSlice'
import {useDispatch,useSelector } from 'react-redux';
import { toast } from "react-toastify";
import '../../cssFiles/adminpanel.scss'

function Header() {
    const [showcart, setShowCart] = useState(false);
    const [showList, setList] = useState(false);
    const [showLogin, setShowLogin] = useState(false);
    const{items:cartItems} = useSelector(state=>state.cartState);
     const{items }= useSelector(state=>state.cartState)
     const dispatch = useDispatch();
     const {user} = useSelector(state=>state.authState);
     const navigate = useNavigate()
   
     const {isAuthenticated} = useSelector(state=>state.authState)  
    const viewCart = ()=>{
        if(isAuthenticated){
            navigate('/cart')
        }
        else{
            toast('Please Login To View Cart',{
                position:toast.POSITION.TOP_RIGHT,
              
              })
  
        }
        setShowCart(showcart===false) 

    }
    const viewAdminpanel = ()=>{
       
        if(user.role==='admin'){
            navigate('/adminpanel')
        }
       else {
           toast('Please login Admin can only visit',{
            position:toast.POSITION.TOP_RIGHT,     
          })
       }
       
       
       
       

    }
 
 
    return (
        <div>
             <header className='user-detail-sec'>
                            <div className='user-port'>
                            <div className='con-feild'>
                                <button className='mail'><i class="fa-solid fa-envelope"></i>support@sparksshop.com</button>
                                <button className='phone-no'><i class="fa-solid fa-phone"></i>126-234-2354</button>
                            </div>
                            <div className='login-feild'>
                              
                                <button className='login-btn' ><i class="fa-solid fa-right-to-bracket" id="log-icon"  onClick={()=> setShowLogin(!showLogin)}></i><span  onClick={()=> setShowLogin(!showLogin)}>Login</span> <i class="fa-solid fa-caret-down" style={{marginLeft:"10px",marginTop:"3px"}} onClick={()=>setList(!showList)}></i></button>                      
                                <button id="social-media-icons"><a href="https://www.facebook.com/"><i class="fa-brands fa-facebook-f"></i></a></button>
                                <button id="social-media-icons"><a href="https://twitter.com/i/flow/login"><i class="fa-brands fa-twitter"></i></a></button>
                                <button id="social-media-icons"><a href="https://accounts.google.com/v3/signin/identifier?dsh=S33579128%3A1685579702060854&continue=https%3A%2F%2Fplus.google.com%2F&followup=https%3A%2F%2Fplus.google.com%2F&ifkv=Af_xneH9DmPJXTG0N4Fr6XvI2srApcHfaY0d9QS6nEaOD3j8lj3l7OaW-ks_hv5fEDw-Lm5xpHM6&osid=1&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i class="fa-brands fa-google-plus-g"></i></a></button>
                                <button id="social-media-icons"><a href="https://vimeo.com/"><i class="fa-brands fa-vimeo-v"></i></a></button>
                                <button id="social-media-icons"><a href="https://in.pinterest.com/"><i class="fa-brands fa-pinterest"></i></a></button>
                            </div>           
                        </div>  

                        {showList &&
                         <div className='show-login'>
                         <NavLink to='/userorders' style={{textDecoration:"none",color:"#333",width:"100%"}}><div id="login-content"><p><i class="fa-solid fa-bag-shopping"></i>My Orders</p></div></NavLink>
                         </div>
                        } 

                        <div className='top-nav'>
                            <Link to='/' style={{height:"80%"}}><img id="logo" src="/logo1.png" alt="" /></Link>
                            <div className='nav-element'>
                                <h5><Link to="/" style={{textDecoration:"none",color:"#333"}}>HOME </Link><hr id="line" /></h5>
                                <h5>SHOP <hr id="line" /></h5>
                                <h5>BLOG <hr id="line" /></h5>
                                <h5>PAGES <hr id="page-line" /></h5>
                                <h5 onClick={viewAdminpanel} style={{ color:"#333"}} className='admin'>ADMIN PANEL <hr id="admin-line" /></h5>
                            </div>
                            <div className='cart-icons'>
                                <span class="material-symbols-outlined" onClick={()=> setShowCart(!showcart)}>shopping_cart</span><div className="circle"><p>{cartItems && cartItems.length}</p></div>
                                <span class="material-symbols-outlined">favorite</span><div className="circle" id='like'><p>1</p></div>
                                <span class="material-symbols-outlined">search</span>
                            </div>

                        </div>
           </header>

           {showLogin
            && <div>
                <Login/>
            </div>}
             
            {showcart &&
            <Fragment>
               
             {items.length===0 ?
                 <div className='cart-container'onClick={()=> setShowCart(showcart===false)}  id="empty-cart">
                  <h2> Cart is Empty</h2>
                  </div>:
                
                
                 <Fragment>
                    <div className='cartlist'>
                     <div className='cart-container'>
                     {items.map(item=>(
                      <Fragment>
                        <div className='items'>
                            <div className='cart-photo'>
                            <img id="cart-img" src={item.image} alt="" />
                            </div>
                            <div className='items-sum'>
                            <h5>{item.name}</h5>
                            <p> {item.quantity}X <span className='quantity'>${item.price}</span> </p>
                         
                            </div>
                            <i onClick={()=> dispatch(removeItemFromCart(item.product))} class="fa-solid fa-xmark" id="close"></i>
                    </div>
                   
                    </Fragment>
                    
                     ))}


                <hr id="hr-line"/><br/><hr id="hr-line2"/>
                <div className='total-money'>
                    <h3>Subtotal</h3>
                    <h3 className='tot-money'>${items.reduce((acc,item)=>(acc + item.quantity * item.price),0)}</h3>
                </div>
                <div className='cart-btns'>
                   <button className='view-cart' onClick={viewCart}>VIEW CART</button>
                    <button onClick={()=> setShowCart(showcart===false)} className='check-out' style={{zIndex:"100"}}>CANCEL</button>
                </div>
                </div>
                </div>
                </Fragment>
               
                 

             }  
             
            </Fragment>  
            }             
               
        </div>
    );
}

export default Header;