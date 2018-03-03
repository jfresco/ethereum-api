export default function (req, res) {
  res.status(404).send({ error: 'Not found' })
}