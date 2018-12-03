module.exports = function (app, db) {
    
    // Update a music
    // http://localhost:4300/api/music
    // Sending a JSON body:
    // {
    //     "id": "12",            
    //     "name": "ExampleMusicName",
    //     "musicurl": "Example music musicurl",
    //     "price": 2.00,
    //     "currency": "EUR" 
    // }

    // or an array of musics:
    // [
    //     {...},{...}
    // ]
    app.put('/api/music/', (req, res) => {
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
        updateMusic(prod, res, db);
    }
}

function processMusic(req, res, db){
    validateRequest(req, res);
    updateMusic(req.body, res, db);
}

function checkIfExist(){
    // TODO: check business
}

function updateMusic(music, res, db){
    checkIfExist();

    var name = music.name;
    var musicurl = music.musicurl;
    var id = music.id;

    var sql = `update Musics
            set name = ?, musicurl = ?
            where id = ?;`;

    var values = [name, musicurl, id];

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
    var schema = JSON.parse(fs.readFileSync('app/data/music-schema-update.json', 'utf8'));

    var JaySchema = require('jayschema');
    var js = new JaySchema();
    var instance = req.body;

    js.validate(instance, schema, function (errs) {
        if (errs) {
            console.error(errs);
            res.status(400).send(errs);
        }
    });
}