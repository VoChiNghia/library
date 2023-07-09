const express = require("express");
const { authentication, isAdmin } = require("../middleware/authMiddleware");
const {
  createProduct,
  getAllProducts,
  getProduct,
  deleteProduct,
  updateProduct,
  rateProduct,
  deleteComment,
  uploadCoverImage,
  uploadEbook,
} = require("../controller/productsController");
const {
  upload,
  productImageResize,
  coverImgProduct,
} = require("../middleware/uploadImage");
const router = express.Router();

router.post("/", authentication, isAdmin, createProduct);
router.post("/rating/:id", authentication, rateProduct);
router.post(
  "/upload/:id",
  authentication,
  isAdmin,
  upload.single("images"),
  coverImgProduct,
  uploadCoverImage
);
router.post(
  "/upload-ebook/:id",
  authentication,
  isAdmin,
  upload.single("pdf"),
  uploadEbook
);
router.delete("/rating/:id", authentication, deleteComment);
router.get("/all-products", getAllProducts);
router.put("/update/:id", authentication, isAdmin, updateProduct);
router.get("/:id", getProduct);
router.delete("/:id", deleteProduct);

module.exports = router;

/**
 * @swagger
 * /api/products:
 *   post:
 *     summary: Create a new product.
 *     tags: [Products]
 *     requestBody:
 *       required: true
 *       content:
 *         application/json:
 *           schema:
 *             $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully created a new product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *
 * /api/products/rating/{id}:
 *   post:
 *     summary: Rate a product.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to rate.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: rating
 *         description: Rating object that contains the rating details.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Rating'
 *     responses:
 *       200:
 *         description: Successfully rated the product.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       404:
 *         description: Product not found.
 * 
 *   delete:
 *     summary: Delete a product rating/comment.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the rating to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the product rating/comment.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Rating not found.
 * 
 * /api/products/all-products:
 *   get:
 *     summary: Get all products.
 *     tags: [Products]
 *     parameters:
 *       - in: query
 *         name: search
 *         description: Search book name to filter products.
 *         required: false
 *         schema:
 *           type: string
 *       - in: query
 *         name: page
 *         description: Page number for pagination.
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           default: 1
 *       - in: query
 *         name: limit
 *         description: Number of products per page.
 *         required: false
 *         schema:
 *           type: integer
 *           minimum: 1
 *           maximum: 100
 *           default: 10
 *     responses:
 *       200:
 *         description: Successfully retrieved all products.
 *         content:
 *           application/json:
 *             schema:
 *               type: array
 *               items:
 *                 $ref: '#/definitions/Product'
 * 
 * /api/update/{id}:
 *   put:
 *     summary: Update a product by ID.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to update.
 *         required: true
 *         schema:
 *           type: string
 *       - in: body
 *         name: product
 *         description: Updated product object.
 *         required: true
 *         schema:
 *           $ref: '#/definitions/Product'
 *     responses:
 *       200:
 *         description: Successfully updated the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Product not found.
 * 
 * /api/products/{id}:
 *   delete:
 *     summary: Delete a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to delete.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully deleted the product.
 *       404:
 *         description: Product not found.
 * 
 *   get:
 *     summary: Get a product by ID.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to retrieve.
 *         required: true
 *         schema:
 *           type: string
 *     responses:
 *       200:
 *         description: Successfully retrieved the product.
 *         content:
 *           application/json:
 *             schema:
 *               $ref: '#/definitions/Product'
 *       404:
 *         description: Product not found.
 */

/**
 * @swagger
 * definitions:
 *   Product:
 *     type: object
 *     properties:
 *       name:
 *         type: string
 *       author:
 *         type: string
 *       publisher:
 *         type: string
 *       publishingYear:
 *         type: string
 *       category:
 *         type: string
 *       format:
 *         type: array
 *         items:
 *           type: string
 *       summary:
 *         type: string
 *       quantity:
 *         type: number
 *       coverImage:
 *         type: string
 *     example:
 *       name: Example Book
 *       author: Example Author
 *       publisher: Example Publisher
 *       publishingYear: 2023
 *       category: Example Category
 *       format: ["đang cập nhập"]
 *       summary: Example summary of the book.
 *       quantity: 10
 *       coverImage: "https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg"
 * 
 *   Rating:
 *     type: object
 *     properties:
 *       star:
 *         type: number
 *         minimum: 0
 *         maximum: 5
 *       comment:
 *         type: string
 *     example:
 *       star: 4.5
 *       comment: "This is a great product!"
 */

/**
 * @swagger
 * /api/products/upload/{id}:
 *   post:
 *     summary: Upload cover image for a product.
 *     tags: [Products]
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to upload cover image.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Images to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               images:
 *                 type: file
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Successfully uploaded the cover image.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Product not found.
 * 
 * 
 * /api/products/upload-ebook/{id}:
 *   post:
 *     summary: Upload ebook for a product.
 *     tags: [Products]
 *     security:
 *       - bearerAuth: []
 *     parameters:
 *       - in: path
 *         name: id
 *         description: ID of the product to upload ebook.
 *         required: true
 *         schema:
 *           type: string
 *     requestBody:
 *       description: Images to upload
 *       required: true
 *       content:
 *         multipart/form-data:
 *           schema:
 *             type: object
 *             properties:
 *               pdf file:
 *                 type: file
 *                 items:
 *                   type: string
 *                   format: binary
 *             required:
 *               - images
 *     responses:
 *       200:
 *         description: Successfully uploaded the ebook.
 *       401:
 *         description: Unauthorized. User authentication required.
 *       403:
 *         description: Forbidden. User does not have necessary permissions.
 *       404:
 *         description: Product not found.
 */