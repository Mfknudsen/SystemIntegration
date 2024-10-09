import express, {Request, Response} from "express";
import {AppDataSource} from "./ormconfig";
import {
    changeCompleteStateTask,
    createTask,
    deleteTask,
    editTask,
    getAllTasks,
} from "./db_functions/taskRepository";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!"); // eslint-disable-line no-console

        app.get("/tasks", async (req: Request, res: Response) => {
            try {
                const tasks = await getAllTasks();
                res.json(tasks);
            } catch (error) {
                console.error("Error fetching tasks:", error); // eslint-disable-line no-console
                res
                    .status(500)
                    .json({error: "An error occurred while fetching tasks"});
            }
        });

        app.post("/tasks", async (req: Request, res: Response) => {
            try {
                const {text, description, deadline, isCompleted} = req.body;
                const task = await createTask(text, description,  deadline, isCompleted);
                res.json(task);
            } catch (error) {
                console.error("Error fetching tasks:", error); // eslint-disable-line no-console
                res
                    .status(500)
                    .json({error: "An error occurred while fetching tasks"});
            }
        });

        app.put('/tasks/:id', async (req: Request, res: Response) => {
            try {
                const {id} = req.params;
                const updatedTask = req.body;
                console.log("Preupdate:", updatedTask); // eslint-disable-line no-console

                const task = await editTask(id, updatedTask);
                res.json(task);
            } catch (error) {
                console.error('Error updating task:', error); // eslint-disable-line no-console
                res.status(500).json({error: 'An error occurred while updating task'});
            }
        });

        app.delete("/tasks", async (req: Request, res: Response) => {
            try {
                const {id} = req.body;
                const tasks = await deleteTask(id);
                res.json(tasks);
            } catch (error) {
                console.error("Error deleting task:", error); // eslint-disable-line no-console

                res
                    .status(500)
                    .json({error: "An error occurred while deleting task"});
            }
        });

        app.patch("/tasks", async (req: Request, res: Response) => {
            try {
                const {id, isCompleted} = req.body;
                const tasks = await changeCompleteStateTask(id, isCompleted);
                res.json(tasks);
            } catch (error) {
                console.error("Error changing completion state of task:", error); // eslint-disable-line no-console

                res
                    .status(500)
                    .json({error: "An error occurred while deleting task"});
            }
        });
        if (process.env.Node_ENV !== "test") {
            app.listen(port, () => {
                console.log(`Server is running at http://localhost:${port}`); // eslint-disable-line no-console
            });
        }
    })
    .catch((err) => {
        console.error("Error during Data Source initialization:", err); // eslint-disable-line no-console
    });


export default app;