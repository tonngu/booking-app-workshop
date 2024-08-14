import React, { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import BookingForm from "./BookingForm";

const AxiosDemo = () => {
  const [bookings, setBookings] = useState([]);
  const [email, setEmail] = useState("");
  const [bookingDetails, setBookingDetails] = useState(null);
  const [errorMessage, setErrorMessage] = useState(null);
  const baseUrl = "http://localhost:8080";
  const navigate = useNavigate();

  const getBookingsClickHandler = async () => {
    try {
      const response = await axios.get(
        baseUrl + "/api/v1/booking/from/2024-08-13/to/2024-08-15"
      );
      if (response.status === 200) {
        setBookings(response.data);
      }
    } catch (error) {
      console.error("Error: ", error);
    }
  };

  const fetchBookingDetails = async (id) => {
    try {
      const response = await axios.get(
        `${baseUrl}/api/v1/booking/details/${id}`
      );
      if (response.status === 200) {
        const data = response.data;
        setBookingDetails({
          id: data.id,
          date: data.date,
          time: data.time,
          booked: data.booked,
        });
      }
    } catch (error) {
      console.error("Error fetching booking details:", error);
    }
  };

  const bookBookingClickHandler = async (id) => {
    try {
      const response = await axios.post(baseUrl + "/api/v1/booking/book", {
        id,
        email,
      });
      if (response.status === 201) {
        setErrorMessage(null);
        getBookingsClickHandler();
        fetchBookingDetails(id);
      }
    } catch (error) {
      console.error("Error:", error);
      if (error.response && error.response.status === 400) {
        setErrorMessage("This email already has a time booked.");
        setBookingDetails(null);
      }
    }
  };

  return (
    <div className="container">
      <div className="row">
        <div className="col">
          <button
            className="btn btn-info"
            type="button"
            onClick={getBookingsClickHandler}
          >
            Get Bookings
          </button>
        </div>
      </div>

      <div className="row mt-4">
        <div className="col-md-6">
          <BookingForm setEmail={setEmail} />
        </div>
      </div>

      {errorMessage && (
        <div className="mt-4">
          <div className="alert alert-danger" role="alert">
            {errorMessage}
          </div>
        </div>
      )}

      {bookingDetails && !errorMessage && (
        <div className="mt-4">
          <h3>Booking Details</h3>
          <div className="card">
            <div className="card-body">
              <p>
                <strong>ID:</strong> {bookingDetails.id}
              </p>
              <p>
                <strong>Date:</strong> {bookingDetails.date}
              </p>
              <p>
                <strong>Time:</strong> {bookingDetails.time}
              </p>
              <p>
                <strong>Status:</strong>{" "}
                {bookingDetails.booked ? "Booked" : "Available"}
              </p>
            </div>
          </div>
        </div>
      )}

      <div className="container mt-5">
        <div className="row">
          {bookings && bookings.length !== 0 && (
            <h2 className="mb-4">Bookings List</h2>
          )}
          <div className="row">
            {bookings.map((booking) => (
              <div key={booking.id} className="card mb-4 col-md-3">
                <div className="card-body">
                  <h5 className="card-title">
                    {booking.date} {booking.time}
                  </h5>
                  <button
                    className="btn btn-info"
                    onClick={() => navigate("/details/" + booking.id)}
                  >
                    Details
                  </button>
                </div>
                <div className="d-grid card-footer">
                  <button
                    type="button"
                    className={`btn btn-${
                      booking.booked ? "danger" : "success"
                    }`}
                    onClick={() => bookBookingClickHandler(booking.id)}
                    disabled={booking.booked}
                  >
                    {booking.booked ? "Booked" : "Available"}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};

export default AxiosDemo;
