import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
    },
    title:{
        type: String
    },
    price:{
        type: String
    },
    description:{
        type: String
    },
    category:{
        type: String
    },
    image:{
        type: String
    }
})

export const Cart = models?.Cart || model('Cart', cartSchema);

