import { useEffect, useState } from "react";
import { getAllWarehousesAPI, getAllJobsAPI, addJobAPI } from "./api/entities";
import { Customer, PaymentDetails, Job, Warehouse, Booking } from "./types/types";
import { addJob } from "./utils/addJob";
import "./App.css";

const App = () => {
  const [booking, setBooking] = useState<Booking[]>([
    {bookingId: "1", endTime: new Date(), insurance: null, lateFee: 400, startTime: new Date(), trailer: {trailerId: "1", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "collected"}}, 
    {bookingId: "2", endTime: new Date(), insurance: null, lateFee: 2000, startTime: new Date(), trailer: {trailerId: "2", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "Not collected"}}, 
    {bookingId: "3", endTime: new Date(), insurance: null, lateFee: 100, startTime: new Date(), trailer: {trailerId: "3", locationId: "1", otherInfo: {size: "big", type: "black"}, status: "returned"}}
  ]);
  const [customer, setCustomer] = useState<Customer>({customerId: "47", name: "bob", email: "bob@gmail.com", phoneNumber:
    53352415, paymentDetails: { paymentId: "53", paymentMethod: "cattle-trade", cardNumber: 57839472}});
  const [jobs, setJobs] = useState<Job[]>();
  const [chemicalsAmount, setChemicalsAmount] = useState<number>(0);
  const [incoming, setIncoming] = useState<boolean>(true);
  const [warehouseNumber, setWarehouseNumber] = useState<number>(1);

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
  
  const handleAddJob = async () => {
    try {
      const newJob: Job = {
        chemicalsAmount: chemicalsAmount,
        incoming: incoming,
        warehouseNumber: warehouseNumber,
      };
      await addJob(newJob);
      setChemicalsAmount(0);
      setIncoming(true);
      setWarehouseNumber(0);
      // await fetchData();
    } catch (error) {
      console.error("Error adding task:", error);
    }
  };

  console.log("customer", customer);
  
  useEffect(() => {
    // fetchData();
  }, []);

   const handleToggle = () => {
    setIncoming(!incoming);
  };
 
  return (
  <div className="App">
    <div className="table-container">
    <div style={{border: '1px solid #ccc', padding: '20px', borderRadius: '8px', width: '300px', boxShadow: '2px 2px 12px rgba(0,0,0,0.1)', margin: '20px', fontFamily: 'Arial, sans-serif',}}>
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
      <table className="table-content">
        <thead>
          <tr>
            <th className="table-cell table-cell-header">Start Time</th>
            <th className="table-cell table-cell-header">End time</th>
            <th className="table-cell table-cell-header">Insurance fee</th>
            <th className="table-cell table-cell-header">Late fee</th>
            <th className="table-cell table-cell-header"></th>
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
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>

  );
};

export default App;
