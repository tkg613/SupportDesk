const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const { request } = require('http')

// @desc   Get user tickets
// @route  GET /api/tickets
// @access Private
const getTickets = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const tickets = await Ticket.find({user: req.user.id})

  res.status(200).json(tickets)
})

// @desc   Get user ticket
// @route  GET /api/tickets/:id
// @access Private
const getTicket = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found.')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized.')
  }

  res.status(200).json(ticket)
})

// @desc   Create new tickets
// @route  POST /api/tickets
// @access Private
const createTicket = asyncHandler(async function(req, res) {

  const {product, description} = req.body

  if (!product || !description) {
    res.status(400)
    throw new Error('Please add a product and description')
  }

   // Get user using the id and the JWT
   const user = await User.findById(req.user.id)

   if (!user) {
     res.status(401)
     throw new Error('User not found.')
   }

   const ticket = await Ticket.create({
    product: product,
    description: description,
    user: req.user.id,
    status: 'new'
   })

  res.status(201).json(ticket)
})

// @desc   Delete user ticket
// @route  DELETE /api/tickets/:id
// @access Private
const deleteTicket = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found.')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized.')
  }

  await Ticket.findByIdAndDelete(req.params.id)

  res.status(200).json({success: true})
})

// @desc   Update user ticket
// @route  PUT /api/tickets/:id
// @access Private
const updateTicket = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const ticket = await Ticket.findById(req.params.id)

  if (!ticket) {
    res.status(404)
    throw new Error('Ticket not found.')
  }

  if (ticket.user.toString() !== req.user.id) {
    res.status(401)
    throw new Error('Not authorized.')
  }

  const updatedTicket = await Ticket.findByIdAndUpdate(req.params.id, req.body, {new: true})

  res.status(200).json(updatedTicket)
})

module.exports = {
  getTickets,
  getTicket,
  createTicket,
  updateTicket,
  deleteTicket
}