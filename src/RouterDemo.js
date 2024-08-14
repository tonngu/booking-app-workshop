import React from "react";
import {
  BrowserRouter as Router,
  Routes,
  Route,
  Link,
  useNavigate,
  Navigate,
  useParams,
} from "react-router-dom";
import AxiosDemo from "./AxiosDemo";
import Header from "./Header";
import BookingCancelForm from "./BookingCancelForm";

const RouterDemo = () => {
  //The Router component is a top level component that wraps the entire application, it listens for changes in the URL and manages which components should be displayed based on the current route
  //Routes contains all the single-route elements

  const DetailsBooking = () => {
    //<h1>Detals Booking Component</h1>;

    //example of path parameter being used to pass a parameter through a URL and use it to display as HTML element
    const params = useParams();
    //todo using useEffect you can call get booking details by id and then set the response data
    //todo into the booking object and display data on a card
    return (
      <div>
        <h3>Details</h3>
        <p>Booking ID: {params.id}</p>
      </div>
    );
  };

  return (
    <div>
      <Router>
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/booking" element={<AxiosDemo />}></Route>
          <Route path="/home" element={<Home />}></Route>
          <Route path="/about" element={<About />}></Route>
          <Route path="/cancel" element={<BookingCancelForm />}></Route>
          <Route path="/details/:id" element={<DetailsBooking />}></Route>

          <Route path="*" element={<NotFound />}></Route>
        </Routes>
      </Router>
    </div>
  );
};

//Home component for testing
//const Home = () => <h1>Home Component</h1>;
const About = () => <h1>About Component</h1>;
const CancelBooking = () => <h1>Cancel Booking Component</h1>;
const NotFound = () => <h1>404 Not Found</h1>;

const Home = () => {
  const navigate = useNavigate();
  //navigate(-1) takes the user back to the previous page in the browser's history
  return (
    <div>
      <h1>Home Component</h1>
      <a
        href="#"
        className="btn btn-outline-danger"
        onClick={() => navigate(-1)}
      >
        Back
      </a>
      <a
        href="#"
        className="btn btn-outline-success"
        onClick={() => navigate("/about")}
      >
        About
      </a>
    </div>
  );
};

export default RouterDemo;
