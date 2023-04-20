import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {login} from '../features/auth/authSlice'
import { FaSignInAlt } from 'react-icons/fa'
import {toast} from 'react-toastify'

const Login = () => {

  const [formData, setFormData] = useState({
    email: '',
    password: '',
  })

  const {name, email, password, password2} = formData

  const dispatch = useDispatch()

  // Bring states managed by Redux
  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)

  const onChange = function(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()

    const userData = {
      email: email,
      password: password
    }

    // Call the login function from authSlice
    dispatch(login(userData))

  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaSignInAlt /> Log In
        </h1>
        <p>Please log in.</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>

          <div className='form-group'>
            <input 
              className='form-control' 
              type='email' 
              id='email'
              name='email' 
              value={email} 
              onChange={onChange} 
              placeholder='Enter your email.'
              autoComplete='off'
              required
            />
          </div>

          <div className='form-group'>
            <input 
              className='form-control' 
              type='password' 
              id='password'
              name='password' 
              value={password} 
              onChange={onChange} 
              placeholder='Enter password.'
              required
            />
          </div>

          <div className='form-group'>
            <button className='btn btn-block'>
              Submit
            </button>
          </div>

        </form>
      </section>

    </>
  )
}

export default Login