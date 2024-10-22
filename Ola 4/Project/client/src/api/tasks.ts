import { Address, Booking, BookTrailerForm, Customer, Insurance, Location, PaymentDetails, Trailer } from "../types/types";

const baseUrl = "http://localhost:3001";

export const getAllBookingsAPI = async (): Promise<Booking[]> => {
  const response = await fetch(`${baseUrl}/bookings`, {
    method: "GET",
    headers: { "Content-Type": "application/json" },
  });
  if (!response.ok) {
    throw new Error("Failed to get tasks");
  }
  return response.json();
};

export const addBookingAPI = async (booking: BookTrailerForm): Promise<Booking> => {
    const insurance = {
      "insuranceId": "652d85a14c3ac3a5e6f79e3a",
      "fee": 250.00,
      "coverageDetails": "Full coverage including damage, theft, and natural disasters.",
      "endTime": "2025-12-31T23:59:59Z"
    };

      const booking2 = { ...booking, insurance };

  const response = await fetch(`${baseUrl}/bookings`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify(booking2),
  });
  if (!response.ok) {
    throw new Error("Failed to add booking");
  }
  return response.json();
};

export const editBookingPI = async (booking: Booking): Promise<Booking> => {
  const response = await fetch(`${baseUrl}/bookings`, {
    method: 'PUT',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(booking),
  });
  if (!response.ok) {
    throw new Error('Failed to edit booking');
  }
  return response.json();
};
