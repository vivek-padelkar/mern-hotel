export const routeNotFound = (req, res, next) => {
  const error = new Error(`Not Found - ${req.originalUrl}`)
  res.status(404)
  next(error) // Pass the error to the next middleware
}

export const errorHandler = (err, req, res, next) => {
  let statusCode = res.statusCode === 200 ? 500 : res.statusCode
  res.status(statusCode)
  res.send({
    message: err.message || err,
    stack: process.env.NODE_ENV === 'production' ? '🥞' : err.stack,
  })
}
