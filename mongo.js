/*let mongoose = require('mongoose');
mongoose.connect('mongodb://add:123@ds111262.mlab.com:11262/exmo');

let db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    console.log('open');
    let Leo = new Scrape({name:'Leonardo'});
    console.log(Leo.name);
});


let Schema = mongoose.Schema;

let scrapeSchema = new Schema({
    name:  String
});
let Scrape = mongoose.model('Scrape', scrapeSchema);*/















let MongoClient = require('mongodb').MongoClient;
//let url = "mongodb://add:123@ds111262.mlab.com:11262/exmo";
let url = "mongodb://localhost:27017/";

MongoClient.connect(url, function(err, client) {
    if (err) throw err;
    let db = client.db('scrapes');

    /*let myobj = { name: "Company Inc", address: "Highway 37" };
    db.collection("customers").insertOne(myobj, function(err, res) {
        if (err) throw err;
        console.log("1 document inserted");
        client.close();
    });*/

    db.collection('talons').find({}).toArray(function(err, result) {
        if (err) throw err;
        console.log(result);
        client.close();
    });
    //console.log(pairs);
});