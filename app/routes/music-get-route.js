module.exports = function(app, db) {

  // Load musics by ID: http://localhost:4300/api/music/id/$id
  // example: http://localhost:4300/api/music/id/15
  app.get('/api/music/id/:id', (req, res) => {
    processData(res, "SELECT * FROM musics where id == "+req.params.id);
  });

  // Load musics by attribute: http://localhost:4300/api/music/$attribute/$name
  // example: http://localhost:4300/api/music/price/24
  //          http://localhost:4300/api/music/name/Suntone
  // $attribute = ['name', 'price', 'currency', 'musicurl']*
  // * this is not checked values, wrong parameters will return in a DB error.
  app.get('/api/music/:attribute/:name', (req, res) => {
    processData(res, "SELECT * FROM musics where "+req.params.attribute+" = '"+req.params.name+"'");
  });

  // Load all musics: http://localhost:4300/api/music/
  app.get('/api/music', (req, res) => {
    processData(res, "SELECT * FROM musics");
  });

  // Load musics: http://localhost:4300/api/music/sort/$attribute
  // example: http://localhost:4300/api/music/sort/price
  //          http://localhost:4300/api/music/sort/name
  // $attribute = ['name', 'price', 'currency', 'musicurl']*
  app.get('/api/music/sort/:way', (req, res) => {
    processData(res, "SELECT * FROM musics order by " + req.params.way);
  });


  // Load musics: http://localhost:4300/api/music/sort/$direction/$attribute
  // example: http://localhost:4300/api/music/sort/asc/price
  //          http://localhost:4300/api/music/sort/desc/price
  // $attribute = ['name', 'price', 'currency', 'musicurl']*
  // $direction [ASC or DESC]C]*
  // * the direction is checked and when wrong will return a 401 business error.
  app.get('/api/music/sort/:direction/:way', (req, res) => {
    var way = req.params.way;
    var direction = req.params.direction;

    if(direction !== "asc" && 
        direction !== "desc"){
      res.status(404).send("Sorting direction invalid!");
    }

    processData(res, "SELECT * FROM musics order by " + way + " " + direction);
  });

  function processData(res, sql){
    db.serialize(function() {
      db.all(sql, 
        function(err, rows) {
          if(err){
            console.error(err);
            res.status(500).send(err);
          }
          else
            sendData(res, rows, err);
      });
    });
  }

  function sendData(res, data, err){
    res.setHeader("Access-Control-Allow-Origin","*");

    if(data[0])
      res.send(data);
    
    else{
      res.status(404).send("Music not found");
    }
  }
};