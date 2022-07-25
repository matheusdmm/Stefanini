import './styles.css';
import { useState } from 'react';
import { Link } from 'react-router-dom';
import Register from './Register';

// this one is the "stantard" """database"""
import data from './users.json';

// this one is the updated version, in case you register some new user
const dataStorage = window.localStorage.getItem('data');
const newData = JSON.parse(dataStorage);

export default function Login() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState(false);

  // username change
  const handleName = (e) => {
    setName(e.target.value);
    setSubmitted(false);
  };

  // email change
  const handleEmail = (e) => {
    setEmail(e.target.value);
    setSubmitted(false);
  };

  // Handling the password change in the form
  const handlePassword = (e) => {
    setPassword(e.target.value);
    setSubmitted(false);
  };

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault();

    // iterate through the object to get the login information
    Object.keys(newData).forEach((key) => {
      let value = newData[key];

      // if the username and pwd matches the one in the localstorage/json
      // the login is true
      if (name === value.username && password === value.password) {
        setSubmitted(true);
        setError(false);
      } else {
        setError(true);
      }
    });
  };

  // If login success
  // can also route to another page if wanted
  const successMessage = () => {
    return (
      <div
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>User {name} logged in. Valeu aí Stefanini hahaha</h1>
      </div>
    );
  };

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>All fields required!</h1>
      </div>
    );
  };

  return (
    <>
      <div className="form">
        <div>
          <h1 className="h3 mb-3 font-weight-normal">Log In</h1>
        </div>

        <div>
          {errorMessage()}
          {successMessage()}
        </div>

        <form className="form-signin">
          <input
            onChange={handleName}
            className="form-control"
            placeholder="Username"
            value={name}
            type="username"
          />

          <input
            onChange={handlePassword}
            className="form-control"
            placeholder="Password"
            value={password}
            type="password"
          />

          <br />
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            type="submit"
          >
            Login
          </button>
          <br />
          <Link to="Register">Register</Link>
        </form>
      </div>
    </>
  );
}
