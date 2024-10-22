import React, {Dispatch, SetStateAction, useEffect, useState} from "react";
import {Customer, PaymentDetails, Booking} from "./types/types";
import "./App.css";

import {HandleLogin} from "./UserAuthService/UserAdapter";
import {StripeAdapter} from "./utils/StripeAdapter";
import BookTrailer from "./BookingService/bookTrailer";


const App = () => {
    const [booking, setBooking] = useState<Booking[]>([
        {
            bookingId: "1",
            endTime: new Date(),
            insurance: null,
            lateFee: 400,
            startTime: new Date(),
            trailer: {trailerId: "1", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "collected"}
        },
        {
            bookingId: "2",
            endTime: new Date(),
            insurance: null,
            lateFee: 2000,
            startTime: new Date(),
            trailer: {trailerId: "2", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "Not collected"}
        },
        {
            bookingId: "3",
            endTime: new Date(),
            insurance: null,
            lateFee: 100,
            startTime: new Date(),
            trailer: {trailerId: "3", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "returned"}
        }
    ]);
    const [customer, setCustomer] = useState<Customer>({
        customerId: "-1",
        name: "",
        email: "",
        phoneNumber: 0o0000000,
        paymentDetails: {paymentId: "-1", paymentMethod: "", cardNumber: 0o0000000}
    });

    const stripeAdapter = new StripeAdapter("key");
    const initializePayment = async (price: number, customerId: string) => {
        const paymentMethod = await stripeAdapter.addTestCard(customer,setCustomer);
        await stripeAdapter.pay(price, "usd", paymentMethod.id, customer.customerId);
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
                            trailer: {
                                ...booking.trailer,
                                status: "completed" // Set trailer status to complete
                            }
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

    useEffect(() => {
        // fetchData();
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
                <BookTrailer/>
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
                            <td className="table-cell">{booking.startTime.toDateString()}</td>
                            <td className="table-cell">{booking.endTime.toDateString()}</td>
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
                      aria-label={booking.trailer.status}
                      style={{
                          fontSize: "30px",
                          cursor: "pointer",
                      }}
                      onClick={() => handleCompleteBooking(booking.bookingId)}
                  >
  {booking.trailer.status === "completed" ? "✅" : "❌"}
</span>

                            </td>
                            <td className="table-cell">
                                {booking.trailer.status === "completed" ? (
                                    <button onClick={() => initializePayment(booking.lateFee, customer.customerId)}>Pay</button>
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
