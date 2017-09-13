'use strict';

const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

app.use(bodyParser.json());
app.use(express.static("./public"));

app.post('/toilets', (req, res) => {
  req.on('data', (data) => console.log(data.toString()));
  console.log(req.body);
})

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
