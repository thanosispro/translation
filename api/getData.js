const fetchData = require('../services');

module.exports = async (req, res) => {
  const word = req.query.word;
  console.log(word);
  const response = await fetchData(word);
  console.log(response);
  res.status(200).json({ data: response });
};