import mongoose, { Schema, model, models } from "mongoose";

const checkOutSchema = new Schema({
    userId: {
        type: mongoose.Types.ObjectId,
    },
    user: {
        type: String,
    },
    address: {
        type: String,
    },
    city: {
        type: String,
    },
    phone: {
        type: Number,
    },
    email: {
        type: String,
    },
    final_price: {
        type: Number,
    },
    title: {
        type: [String]
    }, 
    images:{
        type: [String]
    },
    qty:{   
        type: [Number]
    },
    paid:{
        type: Boolean,
        default: false
    }

},{
    timestamps : true
});


export const Checkout = models.checkout || model('checkout', checkOutSchema)