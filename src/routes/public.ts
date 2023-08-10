import express from "express";
import path from "path";

const assetsRoute = express.Router();

assetsRoute.get("/shark.png", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/assets/shark.png"));
});
assetsRoute.get("/script.js", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/assets/js/script.js"));
});
assetsRoute.get("/style.css", (req, res) => {
	res.sendFile(path.join(__dirname, "../../public/assets/css/style.css"));
});

export default assetsRoute;
