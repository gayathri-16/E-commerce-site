import React,{Fragment, useState, useEffect} from 'react';
import {useDispatch, useSelector} from 'react-redux'
import AdminPanel from './AdminPanel';
import '../../cssFiles/createProduct.scss'
import { useNavigate, useParams } from 'react-router';
import { getProduct, updateProduct } from '../../actions/productActions';
import {toast} from 'react-toastify'
import { clearProductUpdated,clearError } from '../../slice/productSlice';
function UpdateProduct(props) {
    const [name,setName] = useState("");
    const[price,setPrice]=useState("");
    const[description,setDescription]=useState("");
    const[category,setCategory]=useState("");
    const[stock,setStock]=useState("");
    const[seller,setSeller]=useState("");
    const[collection,setCollection]=useState("");
    const[images,setImages]=useState([]);
    const[imagesCleared,setImagesCleared]=useState(false);
    const[imagesPreview, setImagesPreview]=useState([]);
    const { id:productId } = useParams();
    const{loading, isProductUpdated, error, product=[] } = useSelector(state => state.productState)
    const categories = [
                    'Eletronics',
                    'Mobile Phones',
                    'Laptops',
                    'Accessories',
                    'Headphones',
                    'Foods',
                    'Books',
                    'Clothes/Shoes',
                    'Beauty/Health',
                    'Sports',
                    'Outdoor',
                    'Hand Bags'
                ]
const navigate = useNavigate();
const dispatch = useDispatch();

const onImagesChange = (e)=>{
    const files = Array.from(e.target.files);

    files.forEach(file=>{

        const reader = new FileReader()
        reader.onload = () => {
           if(reader.readyState === 2)
            {
                setImagesPreview(oldArray => [...oldArray, reader.result])
                setImages(oldArray => [...oldArray, file])
            }   
         }
        reader.readAsDataURL(file)

    })

}

const submitHandler = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append('name' , name);
    formData.append('price' , price);
    formData.append('stock' , stock);
    formData.append('description' , description);
    formData.append('seller' , seller);
    formData.append('category' , category);
    formData.append('type_collection',collection);
    images.forEach (image => {
        formData.append('images', image)
    })
    formData.append('imagesCleared' , imagesCleared);
    dispatch(updateProduct(productId, formData))
}

  
  const clearImagesHandler = ()=>{
    setImages([]);
    setImagesPreview([]);
    setImagesCleared(true)
  }


  useEffect(()=>{
    if(isProductUpdated){
        toast('Product Updated Succesfully!',{
            type: 'success',
            position: toast.POSITION.BOTTOM_CENTER,
            onOpen: () => dispatch(clearProductUpdated())
        })
        setImages([])
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
    dispatch(getProduct(productId))
  },[isProductUpdated,error,dispatch,navigate,productId])
   
  
  useEffect(() => {
    if(product._id) {
        setName(product.name);
        setPrice(product.price);
        setStock(product.stock);
        setDescription(product.description);
        setSeller(product.seller);
        setCategory(product.category);
        setCollection(product.type_collection);
        
        let images = []
        product.images.forEach(image => {

          images.push(image.image)

        });
        setImagesPreview(images)
    }
},[product])

    return (
        <Fragment>
        <AdminPanel/>
        <div className="components-render">
            <h1 style={{marginTop:"-3rem"}}>Update Product</h1>
        <div>
         <form  onSubmit={submitHandler} className='create-product'>
        
           <div className='add-product-details'>
            <input type="text" id="product-name" onChange={e=>setName(e.target.value)} value={name} placeholder='Product Name' />
            <hr/>
            <input type="text" id="product-name" onChange={e=>setPrice(e.target.value)} value={price} placeholder='Product Price' />
            <hr/>
            <textarea cols="30" rows="5" onChange={e=>setDescription(e.target.value)} value={description} placeholder='Product Description'></textarea>
            <hr/>
            <input type="text"  onChange={e=>setCollection(e.target.value)} value={collection} placeholder='Type of Bag' />
            <hr/>
            <label>Select Category</label>
            <select value={category} className='slct-category' onChange={e => setCategory(e.target.value)} >
                <option id="options" vlaue="">Select Category</option>
                {categories.map(category =>(
                    <option key={category} value={category}>{category}</option>
                ))}

             </select>
             <hr/>
             <label>Product Stock</label>
             <input type="text" onChange={e=>setStock(e.target.value)} value={stock} placeholder='Stock' />
             <hr/>
             <label>Seller</label>
             <input type="text" onChange={e=>setSeller(e.target.value)} value={seller} placeholder='Seller' />
             <hr/>
             <div className='select-img'>
                <input 
                  type="file"
                  onChange={onImagesChange} 
                  multiple className="choose-img" 
                  id="customFile" 
                  />
                  <div className='img-icon' htmlFor='customFile'><i className='fa fa-image'></i></div>
               <label className='custom-file-label' id="choose-lable" htmlFor='customFile'>Choose Images </label>
             </div>
             <hr/>
             <div className='add-prod-btn'>
                <button 
                type="submit"
                disabled = {loading}
                >UPDATE</button>
                
             </div>
           </div>
           <div className='images-container'>
          <div className='img-preview'>
                {imagesPreview.map(image=>(
          <img
           src={image} 
           key={image}
           alt=""
         />
         
       ))}
         {imagesPreview.length >  0 && <button id="delete-btn" onClick={clearImagesHandler} style={{cursor:"pointer"}} ><i className='fa fa-trash'></i>Delete</button> }
  

    </div>
    </div>
        </form>
           </div>
        </div>
       </Fragment>
    );
}

export default UpdateProduct;