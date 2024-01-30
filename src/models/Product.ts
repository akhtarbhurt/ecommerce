import mongoose, { Schema, Document } from "mongoose";

export interface IProduct extends Document {
  title: string;
  price: number;
  description: string;
  category: string;
  image?: string;
}

const productSchema = new Schema({
  title: {
    required: [true, "title field is required."],
    minLength: [2, "Name must be 2 character long."],
    type: Schema.Types.String,
  },
  price: {
    required: [true, "price field is required."],
    type: Schema.Types.Number,
    trim: true,
  },
  description: {
    type: Schema.Types.String,
    required: [true, 'description is required'],
    trim: true
  },
  category: {
    required: true,
    type: Schema.Types.String,
    trim: true
  },
  image: {
    type: Schema.Types.String,
    required: false
  }
},{
  timestamps: true
});

export const Product = mongoose.models.Product as mongoose.Model<IProduct> || mongoose.model<IProduct>("Product", productSchema);
