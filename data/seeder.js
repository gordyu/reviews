var fs = require('fs');
var parse = require('csv-parse');
var transform = require('stream-transform');
var cassandra = require('cassandra-driver');
var async = require('async');
const path = require('path');


const client = new cassandra.Client({contactPoints: ['127.0.0.1'],  localDataCenter: 'datacenter1', keyspace: 'reviews'});

var insert = "INSERT INTO reviews.reviews ( \
        id, \
        accuracyrating, \
        checkinrating, \
        cleanlinessrating, \
        communicationrating, \
        imagepath, \
        locationrating, \
        name, \
        postdate, \
        review, \
        valuerating)\
        VALUES(?,?,?,?,?,?,?,?,?,?,?)";


async.series([
    function(next){
      initCassandraSchema(client, next)
    },

    function(next){
        var parser = parse({delimiter: '\t'})
        var input = fs.createReadStream(path.join(__dirname, './SeedFile/cassdatafile.tsv'));
        var count = 0;
        var transformer = transform(function(line, next){
          console.log(count++)

            client.execute(insert, parseData(line), {prepare:true, consistency:cassandra.types.consistencies.one},  next);
             return;
        });

        transformer.on('error', next);

        input
          .pipe(parser)
          .pipe(transformer)
          .on('data', (data)=>{})
          .on('end', () => {console.log(`Closed pipe at ${Date()}`); next();});
    }
],displayError);



function initCassandraSchema(client, next) {
    console.log(`********** Initializing schema at ${Date()}`)


    async.series([
        function(nextCall) {
          console.log(`starting Keyspace "reviews" at ${Date()}`)
            client.execute("CREATE KEYSPACE IF NOT EXISTS reviews WITH REPLICATION = { 'class' : 'SimpleStrategy', 'replication_factor' : 1 }",[], nextCall);
        },
        function(nextCall) {
          console.log(`Keyspace created at ${Date()}`)
          console.log(`creating table 'reviews' at ${Date()}`)
            client.execute("CREATE TABLE IF NOT EXISTS reviews ( \
              id int  PRIMARY KEY , \
              accuracyrating text, \
              checkinrating text, \
              cleanlinessrating text, \
              communicationrating text, \
              imagepath text, \
              locationrating text, \
              name text, \
              postdate text, \
              review text, \
              valuerating text)",[],nextCall);
        },
        function(nextCall) {
          console.log(`table reviews created at ${Date()}`)
            client.execute("TRUNCATE reviews", [],nextCall)
        }
    ], () => {
      console.log(`table 'reviews' truncated at ${Date()}`)
      next();
    });
}

function parseData(line) {
    return [parseInt(line[0]), (line[1]), (line[2]), (line[3]), (line[4]), (line[5]), (line[6]), (line[7]), (line[8]), (line[9]), (line[10])]};

function displayError(err) {
    if(err) console.log("Error encountered : "+err)
}


// function(next){
//   var parser = parse({delimiter: '\t'});
//   var input = fs.createReadStream(path.join(__dirname, '../data.csv'));
//   var count = 0;
//   var transformer = transform((line) => {
//     console.log(count++);
//     client.execute(insert, parseData(line), {prepare: true, consistency: cassandra.types.consistencies.one});
//     return line;
//   });

//   transformer.on('error', next);

//   input.pipe(parser).pipe(transformer).on('end', () => {console.log('Closed pipe'); next();});
//   // .on('finish', () => {console.log(`Completed seeding ${count} rows at ${Date()}`); next();});
// }