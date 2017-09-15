'use strict';

const pg = require('pg');
const fs = require('fs');
const express = require('express');
const bodyParser = require('body-parser');
const PORT = process.env.PORT || 3000;
const app = express();

const conString = process.env.DATABASE_URL || 'postgres://DaltonCarr@localhost:5432/toilets'
const client = new pg.Client(conString);
client.connect();
client.on('error', err => console.log(err));

app.use(bodyParser.json());
app.use(express.static("./public"));

loadDB();

app.get('/toilets', (req, response) => {
  client.query(`
    SELECT * FROM toilets
    INNER JOIN reviews
      ON toilets.toilet_id = reviews.toilet_id;
    `)
    .then(result => response.send(result.rows))
    .catch(console.error);
});

//Database loader
function loadDB(){
  client.query(`
    CREATE TABLE IF NOT EXISTS
    toilets(
      toilet_id SERIAL PRIMARY KEY,
      location VARCHAR(50),
      occupancy VARCHAR(10),
      soap VARCHAR(5),
      drying VARCHAR(10),
      "genderNeutral" VARCHAR(5),
      usage VARCHAR(5)
    )
  `)
  .catch(console.error);

  client.query(`
    CREATE TABLE IF NOT EXISTS
    reviews(
      review_id SERIAL PRIMARY KEY,
      toilet_id INTEGER NOT NULL REFERENCES toilets(toilet_id),
      "overallQuality" INTEGER NOT NULL,
      "tpQuality" INTEGER NOT NULL,
      comments VARCHAR(255)
    )
  `)
  .catch(console.error);
}

app.post('/toilets', function(request, response){
  client.query(
    'INSERT INTO toilets(location, occupancy, soap, drying, "genderNeutral", usage) VALUES($1, $2, $3, $4, $5, $6) ON CONFLICT DO NOTHING',
    [
      request.body.location,
      request.body.occupancy,
      request.body.soap,
      request.body.drying,
      request.body.genderNeutral,
      request.body.usage
    ],
    function(err) {
      if(err) console.error(err);
      queryTwo();
    });

  function queryTwo() {
    client.query(
      'SELECT toilet_id FROM toilets WHERE location=$1',
      [request.body.location],
      function(err, result) {
        if(err) console.error(err);
        queryThree(result.rows[0].toilet_id)
    });
  }

  function queryThree(toilet_id) {
    client.query(
      'INSERT INTO reviews(toilet_id, "overallQuality", "tpQuality", comments) VALUES($1, $2, $3, $4)',
      [
        toilet_id,
        request.body.overallQuality,
        request.body.tpQuality,
        request.body.comments
      ],
      function(err) {
        if(err) console.error(err);
        response.send('insert complete');
      });
  }
});

app.listen(PORT, () => console.log(`Server started on port ${PORT}!`));
