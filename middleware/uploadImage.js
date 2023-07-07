const multer = require("multer");
const path = require("path");
const sharp = require("sharp");
const fs = require("fs");

const multerStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    if (file.mimetype === "application/pdf") {
      cb(null, path.join(__dirname, "../public/ebooks"));
    } else {
      cb(null, path.join(__dirname, "../public/images"));
    }
  },
  filename: function (req, file, cb) {
    const uniqueSuffix = Date.now() + "-" + Math.round(Math.random() * 1e9);
    cb(
      null,
      file.fieldname + "-" + uniqueSuffix + `.${file.mimetype.split("/")[1]}`
    );
  },
});

const fileFilter = (req, file, cb) => {
  const allowedFileTypes = ["image/jpeg", "image/png", "application/pdf"];

  if (allowedFileTypes.includes(file.mimetype)) {
    cb(null, true); // Accept the file
  } else {
    cb(
      new Error("Invalid file type. Only PDF, JPG, and PNG files are allowed."),
      false
    ); // Reject the file
  }
};
const upload = multer({
  storage: multerStorage,
  fileFilter,
});

const productImageResize = async (req, res, next) => {
  if (!req.file) return next();
  await Promise.all(
    req.file.map(async (file) => {
      await sharp(file.path)
        .resize(300, 300)
        .toFormat("jpeg")
        .jpeg({ quality: 90 })
        .toFile(`public/images/products/${file.filename}`);
      fs.unlinkSync(`public/images/products/${file.filename}`);
    })
  );
  next();
};

const coverImgProduct = async (req, res, next) => {
  if (!req.file) return next();
  await sharp(req.file.path)
    .resize(300, 300)
    .toFormat("jpeg")
    .jpeg({ quality: 90 })
    .toFile(`public/images/products/${req.file.filename}`);
  fs.unlinkSync(`public/images/products/${req.file.filename}`);
  next();
};

module.exports = { upload, productImageResize, coverImgProduct };
