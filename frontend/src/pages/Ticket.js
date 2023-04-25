import React from 'react'
import { useEffect, useState } from 'react'
import { useSelector, useDispatch } from 'react-redux'
import Modal from 'react-modal'
import {FaPlus} from 'react-icons/fa'
import { getTicket, closeTicket } from '../features/tickets/ticketSlice'
import {getNotes, reset as notesReset, createNote} from '../features/notes/noteSlice'
import { useParams, useNavigate } from 'react-router-dom'
import BackButton from '../components/BackButton'
import Spinner from '../components/Spinner'
import NoteItem from '../components/NoteItem'
import {toast} from 'react-toastify'

const customStyles = {
  content: {
    width: '600px',
    top: '50%',
    left: '50%',
    right: 'auto',
    bottom: 'auto',
    marginRight: '-50%',
    transform: 'translate(-50%, -50%)',
    position: 'relative'
  }
}

Modal.setAppElement('#root')

const Ticket = () => {

  const [modalIsOpen, setModalIsOpen] = useState(false)
  const [noteText, setNoteText] = useState('')

  const dispatch = useDispatch()
  const navigate = useNavigate()

  const {ticket, isLoading, isSuccess, isError, message} = useSelector((state) => state.tickets)
  const {ticketId} = useParams()

  const {notes, isLoading: notesIsLoading} = useSelector((state) => state.notes)

  useEffect(() => {

    if(isError) {
      toast.error(message)
    }

    dispatch(getTicket(ticketId))
    dispatch(getNotes(ticketId))
    
  }, [isError, message, ticketId])

  // Close ticket
  const onTicketClose = function(){
    dispatch(closeTicket(ticketId))
    toast.success('Ticket Closed.')
    navigate('/tickets')
  }

  const openModal = function(){
    setModalIsOpen(true)
  }

  const closeModal = function(){
    setModalIsOpen(false)
  }

  const onNoteSubmit = function(e) {
    e.preventDefault()
    dispatch(createNote({noteText, ticketId}))
    closeModal()
  }

  if (isLoading || notesIsLoading){
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

        <h2>Notes</h2>

      </header>

      {ticket.status !== 'closed' && (
        <button onClick={openModal} className='btn'><FaPlus />Add Note</button>
      )}

      <Modal isOpen={modalIsOpen} onRequestClose={closeModal} style={customStyles} contentLabel='Add Note'>
        <h2>Add Note</h2>
        <button onClick={closeModal} className='btn-close'>X</button>
        <form onSubmit={onNoteSubmit}>
          <div className='form-group'>
            <textarea name='noteText' id='noteText' className='form-control' placeholder='Note text' value={noteText} onChange={(e) => setNoteText(e.target.value)} />
          </div>
          <div className='form-group'>
            <button className='btn' type='submit'>Submit</button>
          </div>
        </form>
      </Modal>

      {notes.map((note) => (
        <NoteItem key={note._id} note={note} />
      ))}

      {ticket.status !== 'closed' && (
        <button onClick={onTicketClose} className='btn btn-block btn-danger'>Close Ticket</button>
      )}
    </div>
  )
}

export default Ticket