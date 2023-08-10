const tasks = [
	{
		id: 1,
		task: "Buy milk",
		completed: false,
	},
	{
		id: 2,
		task: "Buy eggs",
		completed: true,
	},
	{
		id: 3,
		task: "Buy bread",
		completed: false,
	},
];

export type Task = (typeof tasks)[0];

class DB {
	tasks: Task[];
	constructor() {
		this.tasks = tasks;
	}
	getTasks() {
		return this.tasks;
	}
	addTask(task: string) {
		const ids = this.tasks.length > 0 ? this.tasks.map((task) => task.id) : [0];
		const id = Math.max(...ids) + 1;
		this.tasks.push({ id, task, completed: false });
	}
	editTasks(ids: number[]) {
		this.tasks = this.tasks.map((task) => {
			if (ids.includes(task.id)) {
				task.completed = true;
			} else {
				task.completed = false;
			}
			return task;
		});
	}
	deleteTask(id: number) {
		this.tasks = this.tasks.filter((task) => task.id !== id);
	}
}

const db = new DB();

export default db;
