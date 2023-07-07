const express = require("express");
const { authentication, isAdmin } = require("../middleware/authMiddleware");
const {
  createCategory,
  updateCategory,
  deleteCategory,
  getCategory,
  getAllCategory,
} = require("../controller/categoryController");
const router = express.Router();

router.post("/", authentication,isAdmin, createCategory);
router.get("/all-category", getAllCategory);
router.get("/:id", getCategory);
router.delete("/:id", authentication,isAdmin, deleteCategory);
router.put("/:id", authentication,isAdmin, updateCategory   );

module.exports = router;

/**
 * @swagger
 * /api/category:
 *   post:
 *     summary: Create a new category.
 *     tags: [Categories]
 *     parameters:
 *       - in: body
 *         name: category
 *         description: Category object that needs to be created.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Successfully created a new category.
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 * 
 * 
 * /api/category/all-category:
 *   get:
 *     summary: Get all categories.
 *     tags: [Categories]
 *     responses:
 *       200:
 *         description: Successfully retrieved all categories.
 *         schema:
 *           type: array
 *           items:
 *             $ref: '#/components/schemas/Category'
 * 
 * /api/category/{id}:
 *   get:
 *     summary: Get a category by ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the category.
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *       404:
 *         description: Category not found.
 * 
 *   delete:
 *     summary: Delete a category by ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the category.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Category not found.
 * 
 *   put:
 *     summary: Update a category by ID.
 *     tags: [Categories]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the category to update.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: category
 *         description: Category object that needs to be updated.
 *         required: true
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *     responses:
 *       200:
 *         description: Successfully updated the category.
 *         schema:
 *           $ref: '#/components/schemas/Category'
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Category not found.
 * 
 * 
 * components:
 *   schemas:
 *     Category:
 *       type: object
 *       properties:
 *         name:
 *           type: string
 *       required:
 *         - name
 *  
 */