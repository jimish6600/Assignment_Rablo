import mongoose from "mongoose";

const productSchema = new mongoose.Schema(
  {
    productId: {
      type: String,
      required: true,
      unique: true,
      trim: true,
    },
    name: {
      type: String,
      required: true,
      trim: true,
    },
    price: {
      type: Number,
      required: true,
      min : 0,
    },
    featured: {
      type: Boolean,
      default: false,
    },
    rating: {
      type: mongoose.Types.Decimal128,
      default: 0.0,
    },
    company: {
      type: String,
      required: true,
      trim: true,
    },
    createdBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
  },
  { timestamps: true }
);


const productModel = mongoose.models.product || mongoose.model("product",productSchema);
export default productModel;