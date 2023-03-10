const mongoose = require('mongoose');
if (process.env.type === 'PROD') {
  mongoose.connect('mongodb://mlab/fetcher');
} else {
  mongoose.connect('mongodb://localhost/fetcher');
}

let repoSchema = mongoose.Schema({
  id: {
    type: Number,
    unique: true
  },
  name: String,
  username: String,
  url: String,
  stars: Number,
  description: String,
  // we will organize by amount of forks, then by how recently added to database (not actively sorting latter)
  forks: Number
});

let Repo = mongoose.model('Repo', repoSchema);

let save = (repos) => {
  // This function should save a repo or repos to
  // the MongoDB
  return Repo.create(repos);
  // return Promise.all(repos.map(repo => {
  //   return new Repo(repo).save();
  // }))
}

let getAll = () => {
  return Repo.find({})
    .sort('-stars')
    .limit(25)
    .exec()
}

module.exports.save = save;
module.exports.getAll = getAll;