const express = require("express");
const mongoose = require("mongoose");
const config = require("config");
const chalk = require("chalk");
const routes = require("./routes");

const port = config.get("port") ?? 1080;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use("/api", routes);

async function start() {
    await mongoose.connect(config.get("mongoURI"));
    console.log(chalk.blue("MongoDB connected"));
    app.listen(port, (res, req) => {
        console.log(chalk.green(`Server has been started on port - ${port}`));
    });
    try {
    } catch (error) {
        console.log(chalk.red(error.message));
        process.exit(1);
    }
}

start();
