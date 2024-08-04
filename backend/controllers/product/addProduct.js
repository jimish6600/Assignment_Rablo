import verifyProductAttributes from "../../helpers/verifyProductAttributes.js";
import productModel from "../../models/productModel.js";
import { v4 as uuidv4 } from 'uuid'; // Ensure uuidv4 is imported
import userModel from "../../models/userModel.js";

const addProduct = async (req, res) => {
  try {
    const { name, price, featured, rating, company } = req.body;
    const userId = req.userId;

    // Check if all required fields are provided
    if (!name || !price || !company) {
      throw { message: `${name} ${price} ${company}Missing required Attributes`, status: 400 };
    }

    const tname = name.trim();
    const tcompany = company.trim();

    const validation = verifyProductAttributes({ name: tname, price, company: tcompany });
    if (validation) {
      throw { message: validation, status: 400 };
    }

    const productId = uuidv4();
    const newProduct = new productModel({
      productId: productId,
      name: tname,
      price: price,
      featured: featured || false, 
      rating: rating || 0, 
      company: tcompany,
      createdBy: userId,
    });

    await newProduct.save();
    await userModel.findByIdAndUpdate(
      userId,
      { $push: { products: newProduct._id } },
      { new: true }
    );

    res.status(200).json({
      message: "Product added successfully",
      success: true,
    });
  } catch (error) {
    res.status(error.status || 400).json({
      message: error.message || "An error occurred",
      success: false,
    });
  }
};

export default addProduct;
