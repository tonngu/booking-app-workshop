import React, { useState } from "react";
import { useForm } from "react-hook-form";

const BookingForm = ({ setEmail }) => {
  const [message, setMessage] = useState("");
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const onSubmit = (data) => {
    setEmail(data.email);
    setMessage("Valid email entered. You can now choose a timeslot to book.");
  };

  return (
    <div>
      <form onSubmit={handleSubmit(onSubmit)}>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">
            Email
          </label>
          <input
            id="email"
            type="text"
            className="form-control"
            placeholder="Enter your email"
            {...register("email", {
              required: "Email is required",
              pattern: /^\S+@\S+$/i,
            })}
          />
          {errors.email && (
            <span className="text-danger">This field is required</span>
          )}
        </div>
        <button type="submit" className="btn btn-primary">
          Submit
        </button>
      </form>

      {message && <div className="mt-3 alert alert-success">{message}</div>}
    </div>
  );
};

export default BookingForm;
