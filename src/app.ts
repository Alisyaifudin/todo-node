import express from "express";
import path from "path";
import assetsRoute from "./routes/public";
import taskRoute from "./api/task";

export const app = express();
const port = 3000;

app.use(express.urlencoded({ extended: true }));
app.use(assetsRoute);
app.use("/api/task", taskRoute);

app.get("/", (req, res) => {
	res.sendFile(path.join(__dirname, "../public/index.html"));
});

app.listen(port, () => {
	return console.log(`Express is listening at http://localhost:${port}`);
});
