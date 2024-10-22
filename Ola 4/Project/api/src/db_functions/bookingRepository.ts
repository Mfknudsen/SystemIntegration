import {AppDataSource} from '../ormconfig';
import {Trailer, Insurance, Booking} from '../entities/entities';
import { ObjectId } from 'mongodb';

const bookingRepository = AppDataSource.getMongoRepository(Booking);

async function createBooking(
  trailerId: string,
  insurance: Insurance,
) {

  const newBooking = bookingRepository.create({

      trailerId: trailerId,
      startTime: new Date(),
      endTime: new Date(new Date().setDate(new Date().getDate() + 1)),
      insurance: insurance,

    });

  const booking = await bookingRepository.save(newBooking);
  console.log("Booking has been saved:", newBooking); // eslint-disable-line no-console
  return booking;
}

async function getAllBookings() {
  const bookings = await bookingRepository.find();
  console.log("Found bookings:", bookings); // eslint-disable-line no-console
  return bookings;
}

// async function updateTrailer(id: string | undefined, _trailer: Trailer) {
//   const objectId = new ObjectId(id);
//   const trailer = await trailerRepository.findOne({where: {_id: objectId}});
//   if (!trailer) {
//       throw new Error('Booking not found');
//   } else {
//     trailer.otherInfo = _trailer.otherInfo;
//       trailer.status = _trailer.status;
//       trailer.locationId = _trailer.locationId;
//       await trailerRepository.save(trailer);
//       console.log("trailer has been updated:", trailer);
//       return trailer;
//   }
// }

export {createBooking, getAllBookings, bookingRepository};
