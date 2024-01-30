import { Schema, model, models } from "mongoose";

const wishSchema = new Schema({
    userId: String,
    title: String,
    price:  Number,
    description: String,
    category: String,
    image: String
})

export const WhishList = models.wishlist || model("wishlist", wishSchema)