import { editBookingPI } from '../api/tasks';
import { Booking } from '../types/types';

export const editBooking = async (updatedBooking: Booking): Promise<Booking> => {
    try {
      return await editBookingPI(updatedBooking);
    } catch (error) {
      console.error('Error adding booking:', error);
      throw error;
    }
  };