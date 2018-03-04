/**
 * Not found middleware. Put it last in the middleware chain (before the error middleware) in order to call it
 * when no other route matches.
 */
export default function (req, res) {
  res.status(404).send({ error: 'Not found' })
}
