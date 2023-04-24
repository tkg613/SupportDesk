import React from 'react'
import { useEffect } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import { getTicket, closeTicket, reset } from '../features/tickets/ticketSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import {toast} from 'react-toastify'

const Ticket = () => {

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const {ticketId} = useParams()

  useEffect(() => {

    if(isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    
  }, [isError, message, ticketId])

  // Close ticket
  const onTicketClose = function(){
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed.')
    navigate('/tickets')
  }

  if (isLoading){
    return <Spinner />
  }

  if (isError){
    return <h3>Something went wrong...</h3>
  }

  return (
    <div className='ticket-page'>
      <header className='ticket-header'>
        <BackButton url='/tickets' />
        <h2>
          Ticket ID: {ticket._id}
          <span className={`status status-${ticket.status}`}>
            {ticket.status}
          </span>
        </h2>
        <h3>Date Submitted: {new Date(ticket.createdAt).toLocaleString('en-us')}</h3>
        <h3>Product: {ticket.product}</h3>
        <hr />
        <div className='ticket-desc'>
          <h3>Description of Issue</h3>
          <p>{ticket.description}</p>
        </div>
      </header>

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket