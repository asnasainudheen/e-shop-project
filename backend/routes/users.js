const express = require("express");
const bcrypt = require("bcryptjs");

const User = require("../models/User");

const router = express.Router();

router.post("/register", async (req, res) => {

    try {

        const existingUser =
        await User.findOne({
            email: req.body.email
        });

        if(existingUser){

            return res.status(400).json({
                message: "Email already registered"
            });

        }

        const hashedPassword =
        await bcrypt.hash(req.body.password, 10);

        const user = new User({
            name: req.body.name,
            email: req.body.email,
            password: hashedPassword
        });

        await user.save();

        res.json({
            message: "User Registered"
        });

    } catch (error) {

        res.status(500).json(error);

    }

});
router.post("/login", async (req, res) => {

    try {

        const user =
        await User.findOne({
            email: req.body.email
        });

        if (!user) {
            return res.json({
                message: "User Not Found"
            });
        }

        const valid =
        await bcrypt.compare(
            req.body.password,
            user.password
        );

        if (!valid) {

            return res.json({
                message: "Invalid Password"
            });

        }

       res.json({

    message: "Login Successful",

    user: {

        id: user._id,

        name: user.name,

        email: user.email

    }

});

    } catch (error) {

        res.status(500).json(error);

    }

});
module.exports = router;