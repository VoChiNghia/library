const express = require("express");
const { authentication, isAdmin } = require("../middleware/authMiddleware");
const {
  createRequestBook,
  deleteRequestBook,
  getRequestBook,
  getAllRequestBook,
} = require("../controller/requestBookController");
const router = express.Router();

router.post("/", authentication, createRequestBook);
router.get("/all-requestbook", authentication, isAdmin, getAllRequestBook);
router.get("/:id", authentication, isAdmin, getRequestBook);
router.delete("/:id", authentication, isAdmin, deleteRequestBook);

module.exports = router;
