    import express, { Request, Response } from "express";
    import { AppDataSource } from "./ormconfig";
    import { createBooking, getAllBookings, updateTrailer } from "./db_functions/bookingRepository";
    import cors from "cors";
import { Booking } from "./entities/entities";
import { ObjectId } from "mongodb";

    const app = express();
    const port = 3001;

    app.use(cors());
    app.use(express.json());

    const bookingRepository = AppDataSource.getMongoRepository(Booking);


    AppDataSource.initialize()
        .then(() => {
            console.log("Data Source has been initialized!"); // eslint-disable-line no-console

            app.get("/bookings", async (req: Request, res: Response) => {
                try {
                    const bookings = await getAllBookings();
                    res.json(bookings);
                } catch (error) {
                    console.error("Error fetching bookings:", error); // eslint-disable-line no-console
                    res
                        .status(500)
                        .json({error: "An error occurred while fetching bookings"});
                }
            });

            app.post("/bookings", async (req: Request, res: Response) => {
                try {
                    const {trailer, startTime} = req.body;
                    const booking = await createBooking(trailer, startTime);
                    
                    res.json(booking);
                } catch (error) {
                    console.error("Error fetching creating booking:", error); // eslint-disable-line no-console
                    res
                        .status(500)
                        .json({error: "An error occurred while creating booking"});
                }
            });

            app.put("/bookings", async (req: Request, res: Response) => {
            
                const {bookingId, status} = req.body;
                const bookingObjID = new ObjectId(bookingId);

                try {
                    const booking = await bookingRepository.findOne({ where: { bookingId: bookingObjID } });
                
                    if (booking && booking.trailer) {
                        booking.trailer.status = status;
                        await bookingRepository.save(booking);
                        res.json(booking);
                    } else {
                        console.error("Booking or trailer not found"); // eslint-disable-line no-console
                    }
                } catch (error) {
                    console.error("Error updating booking trailer status:", error); // eslint-disable-line no-console
                }

            });

            app.put('/trailer/:id', async (req: Request, res: Response) => {
                try {
                    const {id} = req.params;
                    const updatedTrailer = req.body;
                    console.log("Preupdate:", updatedTrailer);
    
                    const task = await updateTrailer(id, updatedTrailer);
                    res.json(task);
                } catch (error) {
                    console.error('Error updating task:', error);
                    res.status(500).json({error: 'An error occurred while updating task'});
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