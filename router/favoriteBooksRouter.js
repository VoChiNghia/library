const express = require("express");
const { authentication, isAdmin } = require("../middleware/authMiddleware");
const { addFavoriteBook,getListFavoriteByUser,getAllListFavorite,deleteListFavoriteByUser,getListFavorite } = require("../controller/favoriteController");
const router = express.Router();

router.post("/", authentication, addFavoriteBook);
router.get("/all-favorite",authentication, isAdmin, getAllListFavorite);
router.get("/user/:id", getListFavoriteByUser);
router.get("/:id", getListFavorite);
router.delete("/:id", authentication,isAdmin, deleteListFavoriteByUser);

module.exports = router;


/**
 * @swagger
 * /api/favorite:
 *   post:
 *     summary: Add a favorite book.
 *     tags: [Favorite Books]
 *     parameters:
 *       - in: body
 *         name: favoriteBook
 *         description: Favorite book object that needs to be added.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/FavoriteBook'
 *     responses:
 *       200:
 *         description: Successfully added a favorite book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteBook'
 *       401:
 *         description: Unauthorized. User authentication required.
 * 
 * /api/favorite/all-favorite:
 *   get:
 *     summary: Get all favorite books.
 *     tags: [Favorite Books]
 *     responses:
 *       200:
 *         description: Successfully retrieved all favorite books.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/FavoriteBook'
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 * 
 * /api/favorite/user/{id}:
 *   get:
 *     summary: Get favorite books by user ID.
 *     tags: [Favorite Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the user to retrieve favorite books.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved favorite books for the user.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/components/schemas/FavoriteBook'
 *       404:
 *         description: User not found.
 * 
 * /api/favorite/{id}:
 *   get:
 *     summary: Get a favorite book by ID.
 *     tags: [Favorite Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the favorite book to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the favorite book.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/components/schemas/FavoriteBook'
 *       404:
 *         description: Favorite book not found.
 * 
 *   delete:
 *     summary: Delete a favorite book by ID.
 *     tags: [Favorite Books]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the favorite book to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the favorite book.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Favorite book not found.
 * 
 * components:
 *   schemas:
 *     FavoriteBook:
 *       type: object
 *       properties:
 *         prodId:
 *           type: string
 *       required:
 *         - prodId
 */