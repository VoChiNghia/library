const express = require('express');
const { authentication, isAdmin } = require('../middleware/authMiddleware');
const { createTicket, getAllTicket, getTicket, deleteTicket, updateTicket } = require('../controller/borrowController');
const router = express.Router()

router.post('/',authentication,createTicket)
router.get('/all-ticket',getAllTicket)
router.get('/:id',getTicket)
router.delete('/:id',authentication,deleteTicket)
router.put('/:id',authentication,updateTicket)

module.exports = router



/**
 * @swagger
 * /api/borrow:
 *   post:
 *     summary: Create a ticket
 *     description: Create a new ticket.
 *     tags: [borrow]
 *     security:
 *       - authentication: []  # Requires authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/TicketInput'
 *     responses:
 *       '200':
 *         description: Ticket created successfully
 *       '500':
 *         description: InternalServerError
 *
 * /api/borrow/all-ticket:
 *   get:
 *     summary: Get all tickets
 *     description: Retrieve all tickets.
 *     tags: [borrow]
 *     responses:
 *       '200':
 *         description: List of tickets
 *       '500':
 *         description: InternalServerError
 *
 * /api/borrow/{id}:
 *   get:
 *     summary: Get a ticket by ID
 *     description: Retrieve a ticket by its ID.
 *     tags: [borrow]
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket found
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: InternalServerError
 *   delete:
 *     summary: Delete a ticket by ID
 *     description: Delete a ticket by its ID.
 *     tags: [borrow]
 *     security:
 *       - authentication: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       '200':
 *         description: Ticket deleted successfully
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: InternalServerError
 *
 *   put:
 *     summary: Update a ticket by ID
 *     description: Update a ticket by its ID.
 *     tags: [borrow]
 *     security:
 *       - authentication: []  # Requires authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               title:
 *                 type: string
 *               description:
 *                 type: string
 *     responses:
 *       '200':
 *         description: Ticket updated successfully
 *       '404':
 *         description: Ticket not found
 *       '500':
 *         description: InternalServerError
 * 
 * 
 * components:
 *   schemas:
 *     TicketInput:
 *       type: object
 *       properties:
 *         prodId:
 *           type: string
 *         dateIn:
 *           type: string
 *           format: date-time
 *         dateOut:
 *           type: string
 *           format: date-time
 *         status:
 *           type: string
 *         quantity:
 *           type: integer
 */