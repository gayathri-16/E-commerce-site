const Product = require('../models/productModel')
const ErrorHandler = require('../utils/errorHandler')
const catchAsyncError = require('../middlewares/catchAsyncError')
const APIFeatures = require('../utils/apiFeatures')
//Get Products - {{base_url}}/api/v1/products
exports.getProducts= catchAsyncError(async (req,res,next)=>{
  const resPerPage = 8;
  const apiFeatures = new APIFeatures(Product.find(), req.query).search().filter().paginate(resPerPage);
  const products  = await  apiFeatures.query;
   
  await new Promise(resolve => setTimeout(resolve,1000));


  res.status(200).json({
        success:true,
        count:products.length,
        products
    })
})

//Create Product - {{base_url}}/api/v1/product/new
exports.newProduct = catchAsyncError(async(req,res,next)=>{
   let images = []
   if(req.files.length > 0) {
    req.files.forEach( file => {
        let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
        images.push({ image: url })
    })
}

req.body.images = images;
    
  req.body.user= req.user.id;
  const product = await Product.create(req.body );
  res.status(201).json({
    sucess:true,
    product
  })
});


//Get single product {{base_url}}/api/v1/product/:id
exports.getSingleProduct = async (req,res,next)=>{
 const product = await Product.findById(req.params.id);
  if(!product){
   return next(new ErrorHandler('Product not found test',400))
  }
  await new Promise(resolve => setTimeout(resolve,1000));
  res.status(201).json({
    sucess:true,
    product
  })

}
//Update Product {{base_url}}/api/v1/product/:id
exports.updateProduct = async (req,res,next)=>{
  let product = await Product.findByIdAndUpdate(req.params.id);
 // uploading images
 let images = []
  // if images not cleared we keep exisiting images
  if(req.body.imagesCleared === 'false'){
    images = product.images
  }


 if(req.files.length > 0) {
  req.files.forEach( file => {
      let url = `${process.env.BACKEND_URL}/uploads/product/${file.originalname}`;
      images.push({ image: url })
  })
}

req.body.images = images;

  if(!product){
    return res.status(404).json({
     success:false,
     message:"Product not found"
   })
 }

 product = await Product.findByIdAndUpdate(req.params.id,req.body,{
  new:true,
  runValidators:true
 })

 res.status(201).json({
  sucess:true,
  product
})
}

//deleteProduct -
exports.deleteProduct = async (req,res,next)=>{
    
  const product = await Product.findById(req.params.id);
  if(!product){
     return res.status(404).json({
      success:false,
      message:"Product not found"
    })
  }
   
  await product.deleteOne();


  res.status(201).json({
    sucess:true,
    message:"Product Deleted"
  })
}

// Create Review - api/v1/review

exports.createReview = catchAsyncError(async(req,res,next)=>{
   const {productId, rating, comment} = req.body
   const review ={
    user : req.user.id,
    rating,
    comment
   }

   const product = await Product.findById(productId);
   // finding user already review
   const isreviewed = product.reviews.find(review=>{
   return review.user.toString() ==  req.user.id.toString()
     })
     
     if(isreviewed){
      //updating the review
       product.reviews.forEach(review =>{
        if(review.user.toString()== req.user.id.toString()){
          review.comment = comment
          review.rating = rating
        }
       })

     } else{
      //creating the review
      product.reviews.push(review);
      product.numOfReviews = product.reviews.length;
     }
// find the avarage of the products reviews
     product.ratings = product.reviews.reduce((acc, review) =>{
      return review.rating + acc;
     },0) / product.reviews.length; 
     product.ratings = isNaN(product.ratings)? 0 : product.ratings
    await product.save({validateBeforeSave:false})
    res.status(200).json({
      sucess:true,

    })
    })
// Get Reviews - api/v1/reviews?id={productId}
exports.getReviews = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.id)

  res.status(200).json({
    success:true,
    reviews:product.reviews
  })
})
//Delete Review - api/v1/review

exports.deleteReview = catchAsyncError(async(req,res,next)=>{
  const product = await Product.findById(req.query.productId);
  // filtering the reviews dose not match review id
  const reviews = product.reviews.filter(review=>{
   return review._id.toString() !== req.query.id.toString()
  })
  
  const numOfReviews = reviews.length;
  //finding the average with the filtered reviews
  let ratings = reviews.reduce((acc, review) =>{
    return review.rating + acc;
   },0) / reviews.length; 
   ratings = isNaN(ratings)? 0 :ratings
   //update product review after delete
   await Product.findByIdAndUpdate(req.query.productId, {
    reviews,
    numOfReviews,
    ratings
   })

  res.status(200).json({
    success:true,
   
  })
})

//get admin products - api/v1/admin/products
exports.getAdminProducts = catchAsyncError(async(req,res,next)=>{
      const products = await Product.find()
      res.status(200).send({
        success:true,
        products
      })

  })
  