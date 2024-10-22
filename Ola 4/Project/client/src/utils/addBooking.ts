import { addBookingAPI } from '../api/tasks';
import { Booking, BookTrailerForm} from '../types/types';

export const addBooking = async (booking: BookTrailerForm): Promise<Booking> => {
    try {
      return await addBookingAPI(booking);
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };