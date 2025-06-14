const express = require('express');
const fetchData = require('./services')
const app = express();
const port = 3000;
const cors = require('cors');
const bodyParser = require('body-parser');
app.use(bodyParser.json());
app.use(cors());
console.log(fetchData)
app.get('/getData', async(req, res) => {
    const word = req.query.word
    console.log(word)
    const response = await fetchData(word)
    console.log(response)
    res.json({'data':response})
});
//listen app on 0.0.0.0 that is ipAdress

app.listen(port, () => {
    console.log(`Example app listening on port ${port}`);
});

module.exports = app