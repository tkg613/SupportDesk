import React from 'react'
import {useState, useEffect} from 'react'
import {useSelector, useDispatch} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import {toast} from 'react-toastify'
import { createTicket, reset } from '../features/tickets/ticketSlice'
import Spinner from '../components/Spinner'
import BackButton from '../components/BackButton'

const NewTicket = () => {

  const {user} = useSelector((state) => state.auth)
  const {isLoading, isError, isSuccess, message} = useSelector((state) => state.tickets)

  const [name] = useState(user.name)
  const [email] = useState(user.email)
  const [product, setProduct] = useState('iPhone')
  const [description, setDescription] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  useEffect(() => {
    if (isError){
      toast.error(message)
    }

    if (isSuccess){
      dispatch(reset)
      navigate('/tickets')
    }
    dispatch(reset)

  }, [dispatch, isError, isSuccess, navigate, message])

  const onSubmit = function(e){
    e.preventDefault()
    dispatch(createTicket({product, description}))
  }

  if (isLoading) {
    return <Spinner />
  }

  return (
    <>
    <BackButton url='/' />
      <section className='heading'>
        <h1>Create new ticket</h1>
        <p>Please fill out the form below</p>
      </section>
      <section className='form'>
        <div className='form-group'>
          <label htmlFor='name'>Customer Name</label>
          <input 
            className='form-control'
            type='text'
            value={name}
            disabled
          />
        </div>
        <div className='form-group'>
          <label htmlFor='email'>Customer Name</label>
          <input 
            className='form-control'
            type='text'
            value={email}
            disabled
          />
        </div>

        <form onSubmit={onSubmit}>
        <div className='form-group'>
          <label htmlFor='product'>Product</label>
          <select id='product' name='product' value={product} onChange={(e) => setProduct(e.target.value)}>
            <option value='iPhone'>iPhone</option>
            <option value='iPad'>iPad</option>
            <option value='Macbook'>Macbook</option>
            <option value='iMac'>iMac</option>
          </select>
        </div>
        <div className='form-group'>
          <label htmlFor='description'>Description of issue</label>
          <textarea name='description' id='description' className='form-control' placeholder='Description' value={description} onChange={(e) => setDescription(e.target.value)} />
        </div>
          <div className='form-group'>
            <button className='btn btn-block' type='submit'>
              Submit
            </button>
          </div>
        </form>
      </section>
    </>
  )
}

export default NewTicket