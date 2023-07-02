import React, { Fragment, useEffect } from 'react';
import '../../cssFiles/product.scss'
import { getProducts } from '../../actions/productActions';
import { useDispatch, useSelector } from 'react-redux';
import Loader from '../layouts/Loader'
import {toast} from 'react-toastify'
import { Link } from 'react-router-dom';


function Products(props) {
   const dispatch = useDispatch();
   const {products, loading, error} = useSelector((state) => state.productsState)


   useEffect(()=>{
      if(error){
        return toast.error(error,{
         position: toast.POSITION.BOTTOM_CENTER
        })
      }


    dispatch(getProducts) 
   }, [error, dispatch])
    return (
     < Fragment>
    
  
        <div>
            <div className='product-header'>
                <h2>Top Selling Products </h2>
                <p>Forget about to do everything at once : taking care of the family, Running your business  <br/> etc.</p>
            </div>
              { loading ? <Loader/> :
             <div className='cards-container'>
                {products && products.map(product =>(
                           <div className='cards-list' key={product._id}>
                           <div className='cards'>
                            <Link to={`/product/${product._id}`}>{product.images.length > 0 &&
                             <img id="bag-image" src={product.images[0].image} alt="" /> 
                  
                            }
                             </Link>          
                           </div>
                           <div className='item-details'>
                              <h5>{product.type_collection}</h5>
                                 <h4 className='item-name'>
                                   {product.name}
                               
                                 </h4>
                                 <div className='price'>
                                    <h3 style={{fontSize: "1.2em"}}>${product.price}</h3>
                                    <div className='ratings mt-auto'>
                                     <div className='rating-outer'>
                                       <div className='rating-inner'  style={{width: `${product.ratings / 5 * 100}%` }}></div>
                                     </div>
                                    </div>
                                 </div>
                           </div>
                         
                        </div>
                        
                ))}
            
                                 

                
             </div>
}
        </div>

        </Fragment>
    );
}

export default Products;