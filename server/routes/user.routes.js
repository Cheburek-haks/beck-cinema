const express = require("express");
const User = require("../models/User");
const auth = require("../middleware/auth.middleware");
const router = express.Router({ mergeParams: true });

router.patch("/: ", async (req, res) => {
    try {
        const { userId } = req.params;
        console.log(req.user._id);
        // userid === current user id
        if (userId === req.user._id) {
            const updatedUser = await User.findByIdAndUpdate(userId, req.body, {
                new: true,
            });

            res.send(updatedUser);
        } else {
            res.status(401).json({
                message: "Unauthorized updated",
            });
        }
    } catch (error) {
        res.status(500).json({
            message: "Сервер сдох иди отсюда ",
        });
    }
});
router.get("/", auth, async (req, res) => {
    try {
        const list = await User.find();
        res.send(list);
    } catch (error) {
        res.status(500).json({
            message: "Сервер сдох иди отсюда ",
        });
    }
});

module.exports = router;
