const express = require('express');
const { createUser, login, getUser, getAllUser, updateUser, deleteUser, changePassword } = require('../controller/userController');
const { authentication, isAdmin } = require('../middleware/authMiddleware');
const catchMiddleware = require('../middleware/redisCatchUser');
const router = express.Router()

router.post('/',createUser)
router.post('/login',login)
router.get('/get-all-user',authentication,getAllUser)
router.put('/edit-user',authentication,isAdmin,updateUser)
router.put('/password',authentication,changePassword)
router.get('/:id',authentication,catchMiddleware,getUser)
router.delete('/:id',authentication,isAdmin,deleteUser)

module.exports = router


/**
 * @swagger
 * /api/user:
 *   post:
 *     summary: Create a new user
 *     description: Endpoint to create a new user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/User'
 *     responses:
 *       200:
 *         description: User created successfully
 *       400:
 *         description: Invalid request
 * 
 * components:
 *   schemas:
 *     User:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         mobile:
 *           type: string
 *           pattern: '^[0-9]{8,15}$'
 *         password:
 *           type: string
 *         studentCode:
 *           type: string
 *         citizenNumber:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - password
 *         - studentCode
 *         - citizenNumber
 */

/**
 * @swagger
 * /api/user/login:
 *   post:
 *     summary: User login
 *     description: Endpoint to authenticate a user.
 *     tags:
 *       - Authentication
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/LoginCredentials'
 *     responses:
 *       200:
 *         description: User logged in successfully
 *       401:
 *         description: Unauthorized - Invalid credentials
 * components:
 *   schemas:
 *     LoginCredentials:
 *       type: object
 *       properties:
 *         studentCode:
 *           type: string
 *         password:
 *           type: string
 *       required:
 *         - studentCode
 *         - password
 */

/**
 * @swagger
 * /api/user/get-all-user:
 *   get:
 *     summary: Get all users
 *     description: Endpoint to retrieve all users.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     responses:
 *       200:
 *         description: Successfully retrieved all users
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 */

/**
 * @swagger
 * /api/user/edit-user:
 *   put:
 *     summary: Edit user
 *     description: Endpoint to edit user information.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/UserUpdateData'
 *     responses:
 *       200:
 *         description: User updated successfully
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - User does not have sufficient privileges
 *       500:
 *         description: Internal server error
 * components:
 *   schemas:
 *     UserUpdateData:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *         email:
 *           type: string
 *           format: email
 *         mobile:
 *           type: string
 *           pattern: '^[0-9]{8,15}$'
 *         studentCode:
 *           type: string
 *         citizenNumber:
 *           type: string
 *         role:
 *           type: string
 *       required:
 *         - name
 *         - email
 *         - mobile
 *         - studentCode
 *         - citizenNumber
 *         - role
 */

/**
 * @swagger
 * /api/user/password:
 *   put:
 *     summary: Change password
 *     description: Endpoint to change user's password.
 *     tags:
 *       - Authentication
 *     security:
 *       - Authorization: []
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/components/schemas/ChangePasswordData'
 *     responses:
 *       200:
 *         description: Password changed successfully
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       500:
 *         description: Internal server error
 * 
 * components:
 *   schemas:
 *     ChangePasswordData:
 *       type: object
 *       properties:
 *         currentPassword:
 *           type: string
 *         newPassword:
 *           type: string
 *       required:
 *         - currentPassword
 *         - newPassword
 */

/**
 * @swagger
 * /api/user/{id}:
 *   get:
 *     summary: Get user by ID
 *     description: Endpoint to retrieve user information by ID.
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User retrieved successfully
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * 
 */

/**
 * @swagger
 * /api/user/{id}:
 *   delete:
 *     summary: Delete user by ID
 *     description: Endpoint to delete user by ID.
 *     security:
 *       - Authorization: []
 *     tags:
 *       - Authentication
 *     parameters:
 *       - in: path
 *         name: id
 *         description: User ID
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: User deleted successfully
 *       401:
 *         description: Unauthorized - Invalid or missing authentication token
 *       403:
 *         description: Forbidden - User does not have sufficient privileges
 *       404:
 *         description: User not found
 *       500:
 *         description: Internal server error
 * 
 * 
 */