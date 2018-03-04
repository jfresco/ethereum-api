/**
 * Error middleware. Responds with HTTP status 500 and the error message. Put last in the middleware chain.
 * Other middlewares can make `next(err)`, being `err` an error instance, and this middleware will trap the
 * error and send it back to the client.
 */
export default (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.message })
}
