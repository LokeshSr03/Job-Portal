const notFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`);
  res.status(404);
  next(error);
};

const errorHandler = (err, req, res) => {
  const statuscode = req.statuscode === 200 ? 500 : req.statuscode;
  return res.status(statuscode).json({ message: err.message });
};

export { notFound, errorHandler };
