const express = require("express");
const Places = require("../models/Places");
const auth = require("../middleware/auth.middleware");
const chalk = require("chalk");
const router = express.Router({ mergeParams: true });

router.get("/", async (req, res) => {
    try {
        const list = await Places.find();
        res.status(200).send(list);
    } catch (error) {
        res.status(500).json({
            message: "Сервер сдох иди отсюда ",
        });
    }
});
router.post("/add/:count", async (req, res) => {
    try {
        const { count } = req.params;

        await Places.collection.drop();

        for (let index = 0; index < count; index++) {
            const newPlaces = Places.create({
                occupied: false,
                id: Date.now(),
                name: "",
                phone: "",
            });
        }

        const list = await Places.find();
        res.status(200).json({
            message: `${count} мест успешно добавлены`,
        });
    } catch (error) {
        res.status(500).json({
            message: `Сервер сдох иди отсюда count`,
        });
    }
});
router.post("/:placesId", async (req, res) => {
    try {
        const { placesId } = req.params;
        const { name, phone } = req.body;
        console.log(chalk.blue(placesId, name, phone));
        // const exitingUser = await Places.findOne(
        //     { _id: placesId },
        //     { name: "Great Dane" }
        // );
        // console.log(exitingUser);
        const updatedPlaces = await Places.findOneAndUpdate(
            { _id: placesId },
            { name: name, phone: phone }
        );
        console.log(chalk.red(updatedPlaces));

        res.status(200).send(updatedPlaces);
    } catch (error) {
        res.status(500).json({
            message: "Сервер сдох иди отсюда placesId",
        });
    }
});

module.exports = router;
