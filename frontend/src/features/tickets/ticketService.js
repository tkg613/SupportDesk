import axios from 'axios'

const API_URL = '/api/tickets/'

// Create ticket
const createTicket = async function(ticketData, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.post(API_URL, ticketData, config)

  return response.data
}

// Get user tickets
const getTickets = async function(token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(API_URL, config)

  return response.data
}

// Get single ticket
const getTicket = async function(ticketId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.get(`${API_URL}/${ticketId}`, config)

  return response.data
}

// Close ticket
const closeTicket = async function(ticketId, token) {
  const config = {
    headers: {
      Authorization: `Bearer ${token}`
    }
  }

  const response = await axios.put(`${API_URL}/${ticketId}`, {
    status: 'closed'
  }, config)

  return response.data
}

const ticketService = {
  createTicket,
  getTickets,
  getTicket,
  closeTicket
}

export default ticketService