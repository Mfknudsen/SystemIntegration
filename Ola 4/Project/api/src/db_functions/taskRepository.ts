import {AppDataSource} from '../ormconfig';
import {Location} from "../entities/Location";
import {Trailer, TrailerStatus} from "../entities/Trailer";
import {Booking} from "../entities/Booking";

const locationRepository = AppDataSource.getMongoRepository(Location);
const trailerRepository = AppDataSource.getMongoRepository(Trailer);
const bookingRepository = AppDataSource.getMongoRepository(Booking);

async function getLocations() {
    const locations = locationRepository.find();
    console.log("Found locations", locations)
    return locations;
}

async function getTrailersByLocationID(locationID: number) {
    const filter = {locationID: locationID}
    const trailers = trailerRepository.findBy(filter);
    console.log("Found trailers", trailers);
    return trailers;
}

async function createBooking(trailerID: number, insurance: boolean) {
    const newBooking = bookingRepository.create({
        trailerID: trailerID,
        startTime: new Date(),
        insurance: insurance
    });

    const task = bookingRepository.save(newBooking)
    console.log("Booking has been saved", newBooking)

    await updateTrailerStatus(trailerID, TrailerStatus.Booked)

    return task;
}

async function updateTrailerStatus(trailerID: number, trailerStatus: TrailerStatus) {
    const filter = {id: trailerID}
    const update = {
        $set: {
            trailerStatus: trailerStatus
        }
    }

    return trailerRepository.updateOne(filter, update);
}

async function returnTrailer(bookingID: number) {
    const filter = {id: bookingID}
    const task = bookingRepository.findOneBy(filter);
    console.log("Found booking", task)

    await updateTrailerStatus((await task)?.trailerID, TrailerStatus.Free)

    const update = {
        $set: {
            endDate: new Date()
        }
    }
}

export {getLocations, getTrailersByLocationID, returnTrailer, createBooking}