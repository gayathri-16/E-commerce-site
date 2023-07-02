const mongoose = require('mongoose');

const productSchema = new mongoose.Schema({
    name:{
        type:String,
        required:[true,"Please enter product name"],
        trim: true,
        maxLength:[100,"Product name cannot be above 100 characters"]
    },
    price:{
        type:Number,
        default:0.0
    },
    description:{
        type:String,
        required:[true,"Please enter product description"]
    },
    type_collection:{
        type:String,
        required:[true,"Please enter product collection"]
    },
    ratings:{
        type:String,
        default:0
    },
    
    images: [
        {
            image: {
                type: String,
                required: true
            }
        }
    ],
    category:{
        type:String,
        required:[true,"Please enter product category"],
        enum:{
            values:[
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
            ],
            message:"Please select correct category"
        }
    },
    seller:{
        type:String,
        required:[true,"Please enter seller"],
    },
    stock:{
        type:Number,
        required:[true,"Please enter product stock"],
        maxLenth:[20,'Product stock cannot exceed 20']
    },
    role:String,
    numOfReviews:{
        type:Number,
        default:0
    },
    reviews:[
        {
         user: mongoose.Schema.Types.ObjectId,
            rating:{
                type:String,
                required:true
            },
            comment:{
                type:String,
                required:true
            }
        }
    ],
    user:{
       type: mongoose.Schema.Types.ObjectId
    },
    createdAt:{
        type:Date,
        default:Date.now()
    }
        
})
let schema = mongoose.model('Product',productSchema)

module.exports = schema;