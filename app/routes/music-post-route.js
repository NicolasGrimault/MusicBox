module.exports = function (app, db) {
    
    // Add new music
    // http://localhost:4300/api/music
    // Sending a JSON body:
    // {
    //     "name": "ExampleMusicName",
    //     "musicurl": "Example music musicurl",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of musics:
    // [
    //     {...},{...}
    // ]
    app.post('/api/music/', (req, res) => {
        res.setHeader("Access-Control-Allow-Origin", "*");

         var data = req.body;
         
         if((data.constructor === Array))
            processMusics(req, res, db);
         else
            processMusic(req, res, db);
    });
};

function processMusics(req, res, db){
    for (var prod of req.body) {
        insertMusic(prod, res, db);
    }
}

function processMusic(req, res, db){
    validateRequest(req, res);
    insertMusic(req.body, res, db);
}

function insertMusic(music, res, db){
    var name = music.name;
    var musicurl = music.musicurl;

    var sql = `insert into Musics (name, musicurl) 
            VALUES 
            (?, ?);`;

    var values = [name, musicurl];

    db.serialize(function () {
        db.run(sql, values, function (err) {
            if (err){
                console.error(err);
                res.status(500).send(err);
            }
                
            else
                res.send();
        });
    });
}

function validateRequest(req, res) {
    var fs = require('fs');
    var schema = JSON.parse(fs.readFileSync('app/data/music-schema.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });

    if (req.body.id) {
        res.status(400).send("ID cannot be submmited");
    }
}