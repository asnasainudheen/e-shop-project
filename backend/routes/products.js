const express = require("express");
const Product = require("../models/Product");

const router = express.Router();

router.get("/", async (req, res) => {
    try {
        const products = await Product.find();
        res.json(products);
    } catch (error) {
        res.status(500).json(error);
    }
});

router.post("/", async (req, res) => {
    try {
        const product = new Product(req.body);

        await product.save();

        res.json(product);
    } catch (error) {
        res.status(500).json(error);
    }
});
router.delete("/:id", async (req, res) => {

    try {

        const deletedProduct =
        await Product.findByIdAndDelete(
            req.params.id
        );

        if (!deletedProduct) {

            return res.status(404).json({
                message: "Product not found"
            });
        }

        res.json({
            message: "Product deleted successfully"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});
module.exports = router;