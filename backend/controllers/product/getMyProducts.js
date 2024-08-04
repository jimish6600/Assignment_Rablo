import productModel from "../../models/productModel.js";

const getMyProducts = async (req, res) => {
    try {
        const userId = req.userId;
        const products = await productModel.find({ createdBy: userId });
        console.log("ok")
        res.status(200).json({
            message: `Your products retrieved successfully`,
            success: true,
            data: products,
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default getMyProducts;