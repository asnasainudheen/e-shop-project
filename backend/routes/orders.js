const express = require("express");
const Order = require("../models/Order");

const router = express.Router();

router.post("/", async (req, res) => {

    try {

        const order =
        new Order(req.body);

        await order.save();

        res.json(order);

    } catch (error) {

        res.status(500).json(error);

    }

});

router.get("/", async (req, res) => {

    try {

        const orders =
        await Order.find();

        res.json(orders);

    } catch (error) {

        res.status(500).json(error);

    }

});
router.delete("/:id", async (req, res) => {

    try {

        await Order.findByIdAndDelete(
            req.params.id
        );

        res.json({
            message: "Order deleted"
        });

    } catch (error) {

        res.status(500).json(error);
    }
});
module.exports = router;