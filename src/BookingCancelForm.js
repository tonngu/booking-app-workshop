import React from "react";
import { useForm } from "react-hook-form";
import axios from "axios";

const BookingCancelForm = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = async (data) => {
    try {
      const response = await axios.put(
        "http://localhost:8080/api/v1/booking/cancel",
        {
          id: data.id,
          email: data.email,
        }
      );
      if (response.status === 200) {
        alert("Booking successfully canceled.");
      }
    } catch (error) {
      console.error("Error:", error);
      alert("Invalid ID or email");
    }
  };

  return (
    <div className="container">
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="id" className="form-label">
            Booking ID
          </label>
          <input
            type="text"
            id="id"
            className="form-control"
            placeholder="Enter Booking ID"
            {...register("id", { required: "Booking ID is required" })}
          />
          {errors.id && <div className="text-danger">{errors.id.message}</div>}
        </div>

        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="Enter Email associated with Booking ID"
            {...register("email", {
              required: "Email is required",
              pattern: {
                value: /^\S+@\S+$/i,
                message: "Invalid email format",
              },
            })}
          />
          {errors.email && (
            <div className="text-danger">{errors.email.message}</div>
          )}
        </div>

        <div className="d-grid">
          <button type="submit" className="btn btn-danger">
            Cancel Booking
          </button>
        </div>
      </form>
    </div>
  );
};

export default BookingCancelForm;
