import productModel from "../../models/productModel.js";

const getFeaturedProducts = async (req, res) => {
    try {
        const featuredProducts = await productModel.find({ featured: true });
        res.status(200).json({
            message: "All Product",
            success: true,
            data: featuredProducts,
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default getFeaturedProducts;