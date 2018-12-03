module.exports = function (app, db) {
    
    // Delete a music
    // http://localhost:4300/api/music
    // Sending a JSON body: (ID is needed)
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
    app.delete('/api/music/', (req, res) => {
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
    updateMusic(req.body, res, db);
}

function updateMusic(music, res, db){
    var id = music.id;

    if(!id){
        res.status(400).send("ID is mandatory");
    }

    else{
        var sql = `delete from  Musics where id = ?;`;
        var values = [id];

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
}

