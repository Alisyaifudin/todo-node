import express from "express";
import { db } from "../db/";
import { tasks } from "../db/schema";
import { eq } from "drizzle-orm";

const taskRoute = express.Router();

taskRoute.post("/add", async (req, res) => {
	const task: string = req.body.task;
	if (task !== "") {
		await db.insert(tasks).values({
			task,
		});
	}
	res.redirect("/");
});

taskRoute.get("/get", async (req, res) => {
	const result = await db.select().from(tasks);
	res.send(result);
});

taskRoute.post("/edit", async (req, res) => {
	const body = req.body;
	const ids = (
		await db
			.select({
				id: tasks.id,
			})
			.from(tasks)
	).map((task) => task.id);
	const completedIds: number[] = [];
	for (const key in body) {
		if (key.startsWith("task-")) {
			const id = key.split("-")[1];
			completedIds.push(parseInt(id));
		}
		if (key.startsWith("delete-")) {
			const id = key.split("-")[1];
			await db.delete(tasks).where(eq(tasks.id, parseInt(id)));
		}
	}
	for (const id of ids) {
		if (completedIds.includes(id)) {
			await db.update(tasks)
				.set({
					completed: true,
				})
				.where(eq(tasks.id, id));
		} else {
			await db.update(tasks)
				.set({
					completed: false,
				})
				.where(eq(tasks.id, id));
		}
	}
	res.redirect("/");
});

export default taskRoute;
