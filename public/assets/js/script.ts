function taskTemplate(id: number, task: string, completed: boolean) {
	return `
            <label class="task ${completed ? "completed" : null}" for="task-${id}">${task}</label>
            <input name="task-${id}" id="task-${id}" type="checkbox" ${
		completed ? "checked" : null
	}>
            <label for="delete-${id}">🗑️</label>
			<input name="delete-${id}" id="delete-${id}" type="checkbox">
        `;
}

type Task = {
	id: number;
	task: string;
	completed: boolean;
};

let tasks: Task[] = [];

const getTasks = async () => {
	const response = await fetch("/api/task/get", {
		method: "GET",
	});
	tasks = await response.json();
	renderTasks();
	addListeners();
};

const renderTasks = () => {
	const liElements = tasks.map((task) => {
		const li = document.createElement("li");
		li.innerHTML = taskTemplate(task.id, task.task, task.completed);
		return li;
	});
	const ul = document.querySelector<HTMLUListElement>("#list")!;
	// remove all children from ul
	while (ul.firstChild) {
		ul.removeChild(ul.firstChild);
	}
	ul.append(...liElements);
};

function addListeners() {
	for (const task of tasks) {
		const id = task.id;
		const checkEl = document.querySelector<HTMLInputElement>(`#task-${id}`)!;
		const deleteEl = document.querySelector<HTMLInputElement>(`#delete-${id}`)!;

		checkEl.addEventListener("change", () => {
			const state = checkEl.checked;
			if (state) {
				checkEl.parentElement!.firstElementChild!.classList.add("completed");
			} else {
				checkEl.parentElement!.firstElementChild!.classList.remove("completed");
			}
		});
		deleteEl.addEventListener("change", () => {
			const state = deleteEl.checked;
			if (state) {
				checkEl.parentElement!.classList.add("deleted");
			} else {
				checkEl.parentElement!.classList.remove("deleted");
			}
		});
	}
}

getTasks()
	.then(() => {
		console.log("Done");
	})
	.catch((error) => {
		console.error(error);
	});
