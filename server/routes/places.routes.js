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
            const newPlaces = await Places.create({
                occupied: false,
                name: "",
                phone: "",
                count: index,
            });
        }

        const list = await Places.find();
        res.status(200).send({
            message: `${count} мест успешно добавлены`,
            data: list,
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

        if (!name || !phone || !placesId) {
            return res.status(400).json({
                message: "Проверьте свои данные",
            });
        }
        console.log(req.body);

        const updatedPlaces = await Places.findByIdAndUpdate(
            placesId,
            req.body,
            {
                new: true,
            }
        );
        console.log(chalk.green(updatedPlaces));

        res.send(updatedPlaces);
    } catch (error) {
        res.status(500).json({
            message: "Сервер сдох иди отсюда placesId",
        });
    }
});

module.exports = router;
