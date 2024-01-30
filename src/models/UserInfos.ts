import mongoose, { Schema, model, models } from "mongoose";

const cartSchema = new Schema({
    userId:{
        type: mongoose.Types.ObjectId,
    },
    name:{
        type: String
    },
    email:{
        type: String
    },
    country:{
        type: String
    },
    city:{
        type: String
    },
    phone:{
        type: String
    },
    address:{
        type: String
    }
})

export const UserInfos = models?.userData || model('userData', cartSchema);

