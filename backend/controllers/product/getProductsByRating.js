import productModel from "../../models/productModel.js";

const getProductsByRating = async (req, res) => {
    try {
        const { value } = req.params;
        if (value===null) {
            throw { message: "Rating value must be a number" , status: 404 };
        }
        const products = await productModel.find({ rating: { $gt: value } });
        res.status(200).json({
            message: `Products with rating higher than ${value} retrieved successfully`,
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

export default getProductsByRating;