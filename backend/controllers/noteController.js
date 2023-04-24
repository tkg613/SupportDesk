const asyncHandler = require('express-async-handler')
const User = require('../models/userModel')
const Ticket = require('../models/ticketModel')
const Note = require('../models/noteModel')

// @desc   Get notes for a ticket
// @route  GET /api/tickets/:ticketId/notes
// @access Private
const getNotes = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const notes = await Note.find({ticket: req.params.ticketId})

  res.status(200).json(notes)
})

// @desc   Create notes for a ticket
// @route  POST /api/tickets/:ticketId/notes
// @access Private
const addNote = asyncHandler(async function(req, res) {
  // Get user using the id and the JWT
  const user = await User.findById(req.user.id)

  if (!user) {
    res.status(401)
    throw new Error('User not found.')
  }

  const ticket = await Ticket.findById(req.params.ticketId)

  if (ticket.user.toString() !== req.user.id){
    res.status(401)
    throw new Error('User not authorized')
  }

  const note = await Note.create({
    ticket: req.params.ticketId,
    text: req.body.text,
    isStaff: false,
    user: req.user.id
    })

  res.status(200).json(notes)
})

module.exports = {
  getNotes,
  addNote
}