const getRoutes = require('./music-get-route');
const postRoutes = require('./music-post-route');
const putRoutes = require('./music-put-route');
const deleteRoutes = require('./music-delete-route');
const loadDatabase = require('../data/setup-database');

module.exports = function (app, db) {

  // create database in case it was not created yeat, 
  // or update in case of migrations
  loadDatabase(db);

  // start routes
  getRoutes(app, db);
  postRoutes(app, db);
  putRoutes(app, db);
  deleteRoutes(app, db);

};
