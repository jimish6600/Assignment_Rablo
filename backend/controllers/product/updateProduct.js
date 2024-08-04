import verifyProductAttributes from "../../helpers/verifyProductAttributes.js";
import productModel from "../../models/productModel.js";

const updateProduct = async (req, res) => {
    try {
        const { id } = req.params;
        const { name, price, featured, rating, company } = req.body;
        const userId = req.userId;

        if (!name || !price || !company) {
            throw { message: "Missing required Attributes", status: 400 };
        }

        const tname = name.trim();
        const tcompany = company.trim();

        const validation = verifyProductAttributes({ name: tname, price, company: tcompany });
        if (validation) {
            throw { message: validation, status: 400 };
        }

        const updateData = {
            name: tname,
            price,
            featured,
            rating,
            company: tcompany,
        };

        const updatedProduct = await productModel.findByIdAndUpdate(id, updateData, { new: true });

        if (!updatedProduct) {
            throw { message: "Product not found", status: 404 };
        }

        res.status(200).json({
            message: "Product updated successfully",
            success: true,
            data: updatedProduct,
        });
    } catch (error) {
        res.status(error.status || 400).json({
            message: error.message || "An error occurred",
            success: false,
        });
    }
};

export default updateProduct;