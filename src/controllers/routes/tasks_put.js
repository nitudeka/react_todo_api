module.exports = (req, res) => {
  console.log(req.query);
  res.json({ boom: 'yes' });
};
