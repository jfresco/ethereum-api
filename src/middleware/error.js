export default (err, req, res, next) => {
  console.log(err);
  res.status(500).send({ error: err.message })
}
