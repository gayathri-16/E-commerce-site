const catchAsyncError = require('../middlewares/catchAsyncError')
const User = require('../models/userModel');
const sendEmail = require('../utils/email');
const ErrorHandler=require('../utils/errorHandler')
const sendToken = require('../utils/jwt')
//register -user
exports.registerUser = catchAsyncError(async (req, res, next)=>{
   const{name, email, password,address}= req.body;
   
   let BASE_URL = process.env.BACKEND_URL;
   if(process.env.NODE_ENV === 'production'){
    BASE_URL = `${req.prortocol}://${req.get('host')}`
   }


 const user =   await User.create({
    name,
    address,
    email,
    password,

   });
   sendToken(user,201,res)

})
//login-user
exports.loginUser = catchAsyncError(async(req, res, next)=>{
  const{email,password }= req.body

  if(!email||!password){
    return next(new ErrorHandler('Please enter email,password',400))
  }
  //finding the user database

  const user = await User.findOne({email}).select('+password');
  if(!user){
    return next(new ErrorHandler('Invalid email or password ',401))
  }
  if(!await user.isValidPassword(password)){
    return next(new ErrorHandler('Invalid email or password ',401))
  }
  sendToken(user,201,res)

})
//logout-user
exports.logoutUser = (req, res, next) =>{
  res.cookie('token', null,{
    expires: new Date(Date.now()),
    httpOnly:true
  }).status(200)
      .json({
        success:true,
        message:"Logedout"
      })
}
//forgot password

exports.forgotPassword = catchAsyncError(async(req, res, next)=>{
  const user = await User.findOne({email:req.body.email});
  if(!user){
    return next(new ErrorHandler('User not found',404))
  }

  const resetToken = user.getResetToken()
   await user.save({validateBeforeSave:false})

  //create reset url 

  let BASE_URL = process.env.FRONTEND_URL;
  if(process.env.NODE_ENV === "production"){
    BASE_URL = `${req.prortocol}://${req.get('host')}`
  }
  const resetUrl = `${BASE_URL}/api/v1/password/reset/${resetToken}`
  const message = `Your password reset url is as follow \n\n
  ${resetUrl} \n\n if you have not requested this email, then ignore it`

  try{
      
    sendEmail({
      email:user.email,
      subject: "E-commerce website Recovery",
      message
    })
res.status(200).json({
  success:true,
  messeage:`Email sent to ${user.email}`
  })
  }
  catch(error){
      user.resetPasswordToken = undefined;
      user.resetPasswordTokenExpire = undefined;

      await user.save({validateBeforeSave:false})

      return next(new ErrorHandler(error.message),500)
  }
})

//Reset Password 
exports.resetPassword = catchAsyncError( async (req, res, next) => {
  const resetPasswordToken =  crypto.createHash('sha256').update(req.params.token).digest('hex'); 

   const user = await User.findOne( {
       resetPasswordToken,
       resetPasswordTokenExpire: {
           $gt : Date.now()
       }
   } )

   if(!user) {
       return next(new ErrorHandler('Password reset token is invalid or expired'));
   }

   if( req.body.password !== req.body.confirmPassword) {
       return next(new ErrorHandler('Password does not match'));
   }

   user.password = req.body.password;
   user.resetPasswordToken = undefined;
   user.resetPasswordTokenExpire = undefined;
   await user.save({validateBeforeSave: false})
   sendToken(user, 201, res)

})


//Get User Profile - /api/v1/myprofile
exports.getUserProfile = catchAsyncError(async (req, res, next) => {
   const user = await User.findById(req.user.id)
   res.status(200).json({
        success:true,
        user
   })
})

//Change Password  - api/v1/password/change
exports.changePassword  = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.user.id).select('+password');
  //check old password
  if(!await user.isValidPassword(req.body.oldPassword)) {
      return next(new ErrorHandler('Old password is incorrect', 401));
  }

  //assigning new password
  user.password = req.body.password;
  await user.save();
  res.status(200).json({
      success:true,
  })
})

// update Profile 

exports.updateProfile = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email: req.body.email
  }
   const user = await User.findByIdAndUpdate(req.user.id,newUserData,{
    new:true,
    runValidators: true,
  })

  res.status(200).json({
    success:true,
    user
   }) 
})

//Admin: Get All Users - /api/v1/admin/users

exports.getAllUsers = catchAsyncError(async(req,res,next)=>{
  const users = await User.find();
  res.status(200).json({
    success:true,
    users
   }) 
})
// Admin: get specific User - /api/v1/admin/user/:id

exports.getUser = catchAsyncError(async(req,res,next)=>{
  const user = await User.findById(req.params.id); 
  if(!user)
  {
    return next(new ErrorHandler(`User not found this id ${req.params.id}`))
  }
  res.status(200).json({
    success:true,
    user
   }) 
})

//Admin: Update User -/api/v1/admin/user/:id
exports.updateUser = catchAsyncError(async(req,res,next)=>{
  const newUserData = {
    name:req.body.name,
    email: req.body.email,
    role: req.body.role
  }
   const user = await User.findByIdAndUpdate(req.params.id,newUserData,{
    new:true,
    runValidators: true,
  })

  res.status(200).json({
    success:true,
    user
   }) 
})

//Admin: deleteUser - /api/v1/admin/user/:id
exports.deleteUser = catchAsyncError(async (req, res, next) => {
  const user = await User.findById(req.params.id);
  if(!user) {
      return next(new ErrorHandler(`User not found with this id ${req.params.id}`))
  }
  await user.deleteOne();
  res.status(200).json({
      success: true,
  })
})
