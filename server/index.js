const express = require('express');
const Repo = require('../database');
const getReposByUsername = require('../helpers/github');

let app = express();

// Set up static file service for files in the `client/dist` directory.
// Webpack is configured to generate files in that directory and
// this server must serve those files when requested.
app.use(express.static('client/dist'));

app.post('/repos', function (req, res) {
  // This route should take the github username provided
  // and get the repo information from the github API, then
  getReposByUsername(req.body.username, function(data) {
    // save the repo information in the database
    Repo.save(data)
      .then(() => res.status(201).send());
  });

});

app.get('/repos', function (req, res) {
  Repo.getAll()
    .then((data) => {
      res.send(data);
    });
  // res.render("index.jsx");
  // TODO - your code here!
  // This route should send back the top 25 repos
});

let port = process.env.PORT || 1128;

app.listen(port, function() {
  console.log(`listening on port ${port}`);
});

