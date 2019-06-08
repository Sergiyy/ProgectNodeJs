const mongodb = require('mongodb');
const MongoClient = mongodb.MongoClient;
let _db;
const mongoConnect = (callback) => {
    MongoClient.connect(
        'mongodb+srv://sergiymokhurenko:Kp.XaKgGKdt3SZ9@cluster0-hdsn0.mongodb.net/shop?retryWrites=true&w=majority'
        )
        .then(client => {
            console.log("Connected!");
            _db = client.db('shop');
            callback(client);
        })
        .catch(err => {
            console.log(err);
            throw err;
        });
    }

    const getDb = () => {
        if(_db) {
            return _db;
        }
        throw 'No database found';
    }

//     function(err, client) {
//         // console.log("Connected successfully to server");
      
//         const db = client.db('shop');
//       })
//       .then(client => {
//         console.log('Connected!');
//         _db = client.db();
//         callback();
//     })
//     .catch(err => {
//         console.log(err);
//         throw err;
//     });
// };


 exports.mongoConnect = mongoConnect;
 exports.getDb = getDb;
