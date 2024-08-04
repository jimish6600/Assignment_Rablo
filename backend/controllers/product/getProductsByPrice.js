import productModel from "../../models/productModel.js";

const getProductsByPrice = async (req, res) => {
    try {
        const { value } = req.params;
        console.log("jimish")
        if (value===null) {
            throw { message: "Price value must be a number" , status: 404 };
        }
        const products = await productModel.find({ price: { $lt: value } });

        res.status(200).json({
            message: `Products with price less than ${value} retrieved successfully`,
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

export default getProductsByPrice;