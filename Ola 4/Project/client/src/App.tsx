import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Customer, PaymentDetails, Booking} from "./types/types";
import "./App.css";

import {HandleLogin} from "./UserAuthService/UserAdapter";
import {StripeAdapter} from "./utils/StripeAdapter";
import BookTrailer from "./BookingService/bookTrailer";
import { editBookingPI, getAllBookingsAPI } from "./api/tasks";


const App = () => {
    const [booking, setBooking] = useState<Booking[]>([]);
    const [customer, setCustomer] = useState<Customer>({
        customerId: "-1",
        name: "",
        email: "",
        phoneNumber: 0o0000000,
        paymentDetails: {paymentId: "-1", paymentMethod: "", cardNumber: 0o0000000}
    });

    const stripeAdapter = new StripeAdapter("key");
    const initializePayment = async (price: number, customerId: string, booking: Booking) => {
        const paymentMethod = await stripeAdapter.addTestCard(customer,setCustomer);
        if(price) {
            await stripeAdapter.pay(price, "usd", paymentMethod.id, customer.customerId);
        }
        editBookingPI(booking)
    };

    async function handleCompleteBooking(id: string | undefined): Promise<void> {
        if (!id) return; // Check if id is valid
        try {
            // Find the booking by id
            setBooking(prevBookings =>
                prevBookings.map(booking =>
                    booking.bookingId === id
                        ? {
                            ...booking,
                            status: 'done'
                        }
                        : booking
                )
            );
            console.log("Booking completed:", id);
        } catch (error) {
            console.error("Error completing booking:", error);
        }
    }


    console.log("customer", customer);

    const fetchData = async () => {
        try {
          const bookings = await getAllBookingsAPI();
          console.log("bookings:", bookings);
          setBooking(bookings);
        } catch (error) {
          console.error("Error fetching bookings:", error);
        }
      };
    

    useEffect(() => {
        fetchData();
    }, []);


    return (
        <div className="App">
            <div className="table-container">
                <div className="login">
                    {HandleLogin(setCustomer)}
                </div>
                <div style={{display:'flex'}}>
                <div style={{
                    border: '1px solid #ccc',
                    padding: '20px',
                    borderRadius: '8px',
                    width: '300px',
                    boxShadow: '2px 2px 12px rgba(0,0,0,0.1)',
                    margin: '20px',
                    fontFamily: 'Arial, sans-serif',
                }}>
                    <h2>Customer Information</h2>
                    <p><strong>ID:</strong> {customer.customerId}</p>
                    <p><strong>Name:</strong> {customer.name}</p>
                    <p><strong>Email:</strong> {customer.email}</p>
                    <p><strong>Phone Number:</strong> {customer.phoneNumber}</p>

                    <h3>Payment Details</h3>
                    <p><strong>Payment ID:</strong> {customer.paymentDetails.paymentId}</p>
                    <p><strong>Payment Method:</strong> {customer.paymentDetails.paymentMethod}</p>
                    <p><strong>Card Number:</strong> {customer.paymentDetails.cardNumber}</p>
                </div>
                <div style={{padding:20}}>
                <BookTrailer />
                </div>
                </div>
                <table className="table-content">
                    <thead>
                    <tr>
                        <th className="table-cell table-cell-header">Start Time</th>
                        <th className="table-cell table-cell-header">End time</th>
                        <th className="table-cell table-cell-header">Insurance fee</th>
                        <th className="table-cell table-cell-header">Late fee</th>
                        <th className="table-cell table-cell-header"></th>
                        <th className="table-cell table-cell-header">Pay</th>
                    </tr>
                    </thead>
                    <tbody>
                    {booking?.map((booking) => (
                        <tr key={booking.bookingId}>
                            <td className="table-cell">
                                {booking.startTime ? new Date(booking.startTime).toDateString() : 'No start time'}
                            </td>
                            <td className="table-cell">
                                {booking.startTime ? new Date(booking.endTime).toDateString() : 'No start time'}
                            </td>
                            <td className="table-cell">{booking.insurance?.fee || "-"}</td>
                            <td className="table-cell">

                <span
                    role="img"
                    aria-label={booking.lateFee ? "Fee" : "No fee"}
                    style={{
                        fontSize: "30px",
                        cursor: "pointer",
                    }}
                    onClick={() => handleCompleteBooking(booking.bookingId)}
                >
                  {booking.lateFee}
                </span>
                            </td>
                            <td className="table-cell">
                  <span
                      role="img"
                      aria-label={booking?.status}
                      style={{
                          fontSize: "30px",
                          cursor: "pointer",
                      }}
                      onClick={() => handleCompleteBooking(booking.bookingId)}
                  >
  {booking?.status === "done" ? "✅" : "❌"}
</span>

                            </td>
                            <td className="table-cell">
                                {booking?.status === "done" ? (
                                    <button onClick={() => initializePayment(booking.lateFee, customer.customerId, booking)}>Pay</button>
                                ) : (
                                    "❌"
                                )}
                            </td>
                        </tr>
                    ))}
                    </tbody>
                </table>
            </div>
        </div>

    );
};
export default App;
