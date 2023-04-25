import axios from 'axios'

const API_URL = '/api/tickets/'

// Get notes
const getNotes = async function(ticketId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${API_URL}${ticketId}/notes`, config)

  return response.data
}

// Create note
const createNote = async function(noteText, ticketId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(`${API_URL}${ticketId}/notes`, {
    text: noteText,
  }, config)

  return response.data
}

const noteService = {
  getNotes,
  createNote
}

export default noteService