import './styles.css'
import { useState } from 'react'
import { Link } from 'react-router-dom'

// import the """database"""
import data from './users.json'
//send it to the local storage
if (localStorage.getItem('data') === null) {
    window.localStorage.setItem('data', JSON.stringify(data))
} 
const dataStorage = window.localStorage.getItem('data')
const newData = JSON.parse(dataStorage)

export default function Register() {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [submitted, setSubmitted] = useState(false)
  const [error, setError] = useState(false)
  const [search, setSearch] = useState('')

  // Handling the name change
  const handleName = (e) => {
    setName(e.target.value)
    setSubmitted(false)
  }

  // Handling the email change
  const handleEmail = (e) => {
    setEmail(e.target.value)
    setSubmitted(false)
  }

  // Handling the password change
  const handlePassword = (e) => {
    setPassword(e.target.value)
    setSubmitted(false)
  }

  // Handling the form submission
  const handleSubmit = (e) => {
    e.preventDefault()
    //  Checks if all fields are filled
    if (name === '' || email === '' || password === '') {
      setError(true)
    } else {
      // if true, it sets the states and then create a temporary object
      // to push into localstorage the credentials
      setSubmitted(true)
      setError(false)
      const newData = {
        username: name,
        password: password,
        email: email,
      }
      //data.push(newData)
      //console.log(data)
      window.localStorage.setItem('data', JSON.stringify(data))
    }
  }

  // Showing success message
  const successMessage = () => {
    return (
      <div
        className="success"
        style={{
          display: submitted ? '' : 'none',
        }}
      >
        <h1>User {name} registered</h1>
      </div>
    )
  }

  // Showing error message if error is true
  const errorMessage = () => {
    return (
      <div
        className="error"
        style={{
          display: error ? '' : 'none',
        }}
      >
        <h1>Please enter all the fields</h1>
      </div>
    )
  }

  return (
    <>
      <div className="form">
        <div>
          <h1 className="h3 mb-3 font-weight-normal">Sign Up</h1>
        </div>

        <div className="messages">
          {errorMessage()}
          {successMessage()}
        </div>

        <form className="form-signin">
          <input
            onChange={handleName}
            className="form-control"
            placeholder="Username"
            value={name}
            type="text"
          />
          <input
            onChange={handleEmail}
            className="form-control"
            placeholder="Email"
            value={email}
            type="email"
          />
          <input
            onChange={handlePassword}
            className="form-control"
            placeholder="Password"
            value={password}
            type="password"
          />
          <input
            className="form-control"
            placeholder="Confirm the password"
            type="password"
          />
          <br />
          <button
            onClick={handleSubmit}
            className="btn btn-success"
            type="submit"
          >
            Register
          </button>
          <br />
          <Link to="/">Already registered?</Link>
          <br />

          <h3 className="h3 mb-3 font-weight-normal">Registered users:</h3>

        {/* Iterate through the local storage to show users */}
        <input
            className="form-control"
            type="text"
            value={search}
            placeholder="Search ..."
            onChange={event => {setSearch(event.target.value)}}
        />
        {/* Filter the user list */}
        {data.filter((user) => {
            if (search === '') { 
                return user
            } else if (user.username.toLowerCase().includes(search.toLowerCase())) {
                return user
            }
        }).map((user) => {
          return (
            <div className="users" key={user.username}>
              <p>
                username: {user.username} | password: {user.password} | email: {user.email}
              </p>
            </div>
          )
        })}
        </form>
      </div>
    </>
  )
}
