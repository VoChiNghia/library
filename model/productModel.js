const mongoose = require("mongoose"); // Erase if already required

// Declare the Schema of the Mongo model
const productSchema = new mongoose.Schema(
  {
    name: {
      type: String,
      required: true,
    },
    author: {
      type: String,
      required: true,
      unique: true,
    },
    publisher: {
      type: String,
      required: true,
    },
    publishingYear: {
      type: String,
      required: true,
    },
    category: {
      type: mongoose.Schema.Types.ObjectId,
      ref: 'Category',
      required: true
    },
    format: {
      type: Array,
      default: "đang cập nhập",
    },
    ebook: {
      type: String,
    },
    summary: {
      type: String,
    },
    quantity: {
      type: Number,
    },
    images: [],
    views:{
      type: Number,
      default: 0,
    },
    coverImange:{
        type: String,
        default: "https://dhmckee.com/wp-content/uploads/2018/11/defbookcover-min.jpg"
    },
    ratings: [
      {
        star: Number,
        comment: String,
        postBy: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating: {
      type: String,
      default: 0,
    },
    language: {
        type: String,
        default: "vn",
    }
  },
  { timestamps: true }
);

//Export the model
module.exports = mongoose.model("Products", productSchema);
