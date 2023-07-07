// not found
const notFound = (req, res) => {
  const error = new Error(`not found: ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res, next) => {
  const statusCode = res.statusCode == 200 ? 500 : res.statusCode;
  res.status(statusCode);
  res.json({ errormessage: err?.message, stack: err?.stack });
};

module.exports = { notFound, errorHandler };
