import React from 'react'
import { useState } from 'react'
import {useSelector, useDispatch} from 'react-redux'
import {register} from '../features/auth/authSlice'
import { FaUser } from 'react-icons/fa'
import {toast} from 'react-toastify'

const Register = () => {

  const [formData, setFormData] = useState({
    name: '',
    email: '',
    password: '',
    password2: ''
  })

  const {name, email, password, password2} = formData

  // Use Redux to manage state
  const dispatch = useDispatch()

  const {user, isLoading, isSuccess, message} = useSelector(state => state.auth)

  const onChange = function(e) {
    setFormData((prevState) => ({
      ...prevState,
      [e.target.name]: e.target.value
    }))
  }

  const onSubmit = function(e) {
    e.preventDefault()

    if (password !== password2) {
      toast.error('Passwords do not match.')
    } else {
      const userData = {
        name: name,
        email: email,
        password: password
      }
      
      // Call the register function from authSlice
      dispatch(register(userData))

    }

  }

  return (
    <>
      <section className='heading'>
        <h1>
          <FaUser /> Register
        </h1>
        <p>Please create an account.</p>
      </section>

      <section className='form'>
        <form onSubmit={onSubmit}>
          <div className='form-group'>
            <input 
              className='form-control' 
              type='text' 
              id='name'
              name='name' 
              value={name} 
              onChange={onChange} 
              placeholder='Enter your name.'
              autoComplete='off'
              required
            />
          </div>

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
            <input 
              className='form-control' 
              type='password' 
              id='password2'
              name='password2'
              value={password2} 
              onChange={onChange} 
              placeholder='Confirm password.'
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

export default Register