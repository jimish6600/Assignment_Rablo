import productModel from "../../models/productModel.js";
import userModel from "../../models/userModel.js";

const deleteProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const userId = req.userId;


        const deleteProduct = await productModel.deleteOne({_id : id})
        if (!deleteProduct) {
            throw { message: "Product not found" , status: 404 };
        }
        await userModel.findByIdAndUpdate(
            userId,
            { $pull: { products: id } },
            { new: true }
          );
      
        res.status(200).json({
            message: "Product deleted",
            success: true,
            data: deleteProduct,
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default deleteProduct;