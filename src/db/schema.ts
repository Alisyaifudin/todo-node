import { InferModel } from "drizzle-orm";
import { boolean, pgTable, serial, varchar } from "drizzle-orm/pg-core";

export const tasks = pgTable("tasks", {
	id: serial("id").primaryKey(),
	task: varchar("task", { length: 255 }).notNull(),
	completed: boolean("completed").default(false).notNull(),
});

type Task = InferModel<typeof tasks, "select">;
