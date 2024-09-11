const express = require('express');
const { updateAllotedNiyyat, getCommonTasbeeh,commonTasbeehUpdate, getAllotedDua } = require('../controllers/niyyatController');

const router = express.Router();

/**
 * @swagger
 * /niyyat/alloted:
 *   post:
 *     tags: [alloted]
 *     summary: Update Alloted
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               yasin:
 *                 type: number
 *               yasin_alloted:
 *                 type: number
 *               tasbeeh:
 *                 type: number
 *               tasbeeh_alloted:
 *                 type: number
 *     responses:
 *       200:
 *         description: success
 */
router.post('/alloted', updateAllotedNiyyat);
/**
 * @swagger
 * /niyyat/commonTasbeehUpdate:
 *   post:
 *     tags: [Common Tasbeeh]
 *     summary: Update commonTasbeehUpdate
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             type: object
 *             properties:
 *               user_id:
 *                 type: number
 *               dua_id:
 *                 type: number
 *     responses:
 *       200:
 *         description: success
 */
router.post('/commonTasbeehUpdate', commonTasbeehUpdate);

/**
 * @swagger
 * /niyyat/getCommonTasbeeh/{userId}:
 *   get:
 *     tags: [Common Tasbeeh]
 *     summary: Retrieve a CommonTasbeeh recited by user
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
router.get('/getCommonTasbeeh/:userId', getCommonTasbeeh);
/**
 * @swagger
 * /niyyat/getAllotedDua/{userId}:
 *   get:
 *     tags: [alloted]
 *     summary: Retrieve a Alloted Dua
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
router.get('/getAllotedDua/:userId', getAllotedDua);




module.exports = router;
