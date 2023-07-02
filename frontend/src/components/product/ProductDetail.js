import React, { Fragment } from "react";
import '../../cssFiles/productdetail.scss'
import { useParams } from "react-router";
import { useDispatch} from "react-redux";
import Loader from '../layouts/Loader'
import { useEffect,useState } from "react";
import { Carousel } from 'react-bootstrap';
import { useSelector } from "react-redux";
import { getProduct } from "../../actions/productActions";
import { addCartItem } from "../../actions/cartAction";
import {toast} from 'react-toastify'
export default function ProductDetail(){

  const {loading, product} = useSelector((state) => state.productState);
 
  const dispatch = useDispatch();
  
  const {id} = useParams()
  const [quantity,setQuantity] = useState(1);

  const increseQty = ()=>{
     const count =  quantity
     if(product.stock === 0 || quantity >= product.stock ) return;
     const qty = count+1
     setQuantity(qty);
  } 

  const decreseQty = ()=>{
    const count = quantity
    if(product.stock === 1) return;
    if(quantity > 1 ){  
       const qty = count- 1
      setQuantity(qty);}
 
 } 


  useEffect(()=>{
   dispatch(getProduct(id))
  },[dispatch,id])

    return(
      <Fragment>
      
         <Fragment>
         
           {loading  ? <Loader/> :
         <div className="detail-container">
            
             <div className="image-part">
             <Carousel pause="hover">
                            {product.images && product.images.length > 0 && product.images.map(image =>
                                <Carousel.Item key={image._id}>
                                    <img style={{width:"400px"}} src={image.image} alt={product.name} height="500" width="500" />
                                </Carousel.Item>
                            )}
                        </Carousel>

               
              </div>

            <div id="product-detail">
              <div id="products">
               <h4 className='item-name'> {product.name} </h4>
              <div id="star-rating">
              <div className='ratings mt-auto' style={{marginTop:"-1rem"}}>
                <div className='rating-outer'>
                 <div className='rating-inner'  style={{width: `${product.ratings / 5 * 100}%` }}></div>
                </div>
              </div> 
               <p style={{marginTop:"1rem",marginLeft:"7rem"}}>({product.numOfReviews}coustomer reviews)</p>
             
            </div>     
                 <h3 id="rate"> $ {product.price} </h3>          
                 <p id="prod-description">
                  Leather tote bag available in caramel and black. Tumbled leather body with pleats. Tubular shoulder straps with knots. Lined interior with a zip pocket. Magnetic clasp closure 
                 </p>  

              <div className="increse-decrese-btn">
                   <div className='modify-product-btn'>
                        <button onClick={decreseQty}>-</button>
                        <input type="text" value={quantity} className="count" />
                        <button className='increment' onClick={increseQty}>+</button>
                    </div>

                  <button id="cart-btn" disabled={product.stock===0?true:false} onClick={()=>
                   { dispatch(addCartItem(product._id,quantity))
                  
                    toast('Cart Item Added',{
                      type:'success',
                      position:toast.POSITION.TOP_RIGHT
                    })
                  }
                   }>
                  <button> ADD TO CART</button></button>
              </div>  
              
              <hr/> 
              <div className="item-size-detail">
                <h3>SKU:<span>9624</span></h3>  
                <h3>Size:<span>M,XL</span></h3>  
                <h3>Categories:<span>Women</span></h3>  
                <h3>Brand:<span>dresswear,women,handbags</span></h3>  
              </div>   
              <hr/>
              <div className="share-product">
              <h3>Share:</h3> 
              <div className="share-icons">
                    <button id="social-media-icons"><a href="https://www.facebook.com/"><i class="fa-brands fa-facebook-f"></i></a></button>
                    <button id="social-media-icons"><a href="https://twitter.com/i/flow/login"><i class="fa-brands fa-twitter"></i></a></button>
                    <button id="social-media-icons"><a href="https://accounts.google.com/v3/signin/identifier?dsh=S33579128%3A1685579702060854&continue=https%3A%2F%2Fplus.google.com%2F&followup=https%3A%2F%2Fplus.google.com%2F&ifkv=Af_xneH9DmPJXTG0N4Fr6XvI2srApcHfaY0d9QS6nEaOD3j8lj3l7OaW-ks_hv5fEDw-Lm5xpHM6&osid=1&passive=1209600&flowName=GlifWebSignIn&flowEntry=ServiceLogin"><i class="fa-brands fa-google-plus-g"></i></a></button>
                    <button id="social-media-icons"><a href="https://vimeo.com/"><i class="fa-brands fa-vimeo-v"></i></a></button>
                    <button id="social-media-icons"><a href="https://in.pinterest.com/"><i class="fa-brands fa-pinterest"></i></a></button>
               </div>  
             </div>   
             <hr/>   
             </div>
            </div>
          
           
            </div>
          
}
         </Fragment>
         
      </Fragment>
    )
}