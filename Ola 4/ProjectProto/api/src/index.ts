import express, { Request, Response } from "express";
import { AppDataSource } from "./ormconfig";
import { getAllWarehouses, updateWarehouse } from "./db_functions/warehouseRepository";
import { createJob, getAllJobs} from "./db_functions/jobRepository";
import cors from "cors";

const app = express();
const port = 3001;

app.use(cors());
app.use(express.json());

AppDataSource.initialize()
    .then(() => {
        console.log("Data Source has been initialized!"); // eslint-disable-line no-console

        app.get("/warehouses", async (req: Request, res: Response) => {
            try {
                const warehouses = await getAllWarehouses();
                res.json(warehouses);
            } catch (error) {
                console.error("Error fetching warehouses:", error); // eslint-disable-line no-console
                res
                    .status(500)
                    .json({error: "An error occurred while fetching warehouses"});
            }
        });

        app.get("/jobs", async (req: Request, res: Response) => {
            try {
                const warehouses = await getAllJobs();
                res.json(warehouses);
            } catch (error) {
                console.error("Error fetching warehouses:", error); // eslint-disable-line no-console
                res
                    .status(500)
                    .json({error: "An error occurred while fetching warehouses"});
            }
        });

        app.post("/jobs", async (req: Request, res: Response) => {
            try {
                const {chemicalsAmount, incoming, warehouseNumber} = req.body;
                const job = await createJob(chemicalsAmount, incoming, warehouseNumber);
                const warehouse = await updateWarehouse(chemicalsAmount, incoming, warehouseNumber);
                
                res.json(job);
            } catch (error) {
                console.error("Error fetching creating job:", error); // eslint-disable-line no-console
                res
                    .status(500)
                    .json({error: "An error occurred while creating job"});
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