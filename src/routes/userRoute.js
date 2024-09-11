const express = require('express');
const { getAllUsers, login, getUser } = require('../controllers/userController');

const router = express.Router();

/**
 * @swagger
 * /users/getAlluser:
 *   get:
 *     tags: [user]
 *     summary: Retrieve a list of users
 *     responses:
 *       200:
 *         description: A list of users
 */
router.get('/getAlluser', getAllUsers);

/**
 * @swagger
 * /users/getUser/{userId}:
 *   get:
 *     tags: [user]
 *     summary: Retrieve a single user by ID
 *     parameters:
 *       - in: path
 *         name: userId
 *         schema:
 *           type: integer
 *         required: true
 *         description: The ID of the user
 *     responses:
 *       200:
 *         description: A single user
 *       404:
 *         description: User not found
 */
router.get('/getUser/:userId', getUser);

/**
 * @swagger
 * /users/login:
 *   post:
 *     tags: [user]
 *     summary: login user
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               its:
 *                 type: number
 *     responses:
 *       201:
 *         description: User login
 */
router.post('/login', login);

module.exports = router;
