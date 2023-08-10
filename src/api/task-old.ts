import express from "express";
import db from "../db/old-index";

const taskRoute = express.Router();

taskRoute.post("/add", (req, res) => {
	const task: string = req.body.task;
	if (task !== "") {
		db.addTask(task);
	}
	res.redirect("/");
});

taskRoute.get("/get", (req, res) => {
	const tasks = db.getTasks();
	res.send(tasks);
});

taskRoute.post("/edit", (req, res) => {
	const body = req.body;
	const completedIds: number[] = [];
	for (const key in body) {
		if (key.startsWith("task-")) {
			const id = key.split("-")[1];
			completedIds.push(parseInt(id));
		}
		if (key.startsWith("delete-")) {
			const id = key.split("-")[1];
			console.log("delete", id, body[key]);
			db.deleteTask(parseInt(id));
		}
	}
	db.editTasks(completedIds);
	res.redirect("/");
});

export default taskRoute;
