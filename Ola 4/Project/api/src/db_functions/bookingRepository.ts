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

export {createBooking, getAllBookings, bookingRepository};
