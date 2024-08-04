import productModel from "../../models/productModel.js";

const getAllProducts = async (req, res) => {
    try {
        const allProducts = await productModel.find({});
        res.status(200).json({
            message: "All Product",
            success: true,
            data: allProducts,
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default getAllProducts;