import Datastore from '../node_modules/react-native-local-mongodb';
// const path = require('path');

//const showPath = path.dirname(require.resolve('DataStore/locations.db'));

export const storeData = (pData) => {
    var db = new Datastore({
        filename: "../DataStore/locations.db", autoload: true
    });
   
    //db.loadDatabase();
    db.insert(pData, function (err, newDocs) {
        console.log(newDocs);
    });
    db.persistence.compactDatafile();
  
    //db.update({ a: 5 }, { a: 65 }, {}, function (err, numReplaced) {
    //    console.log(numReplaced);
    //});
    //db.findOne({ a: 5 }, function (err, doc) {
    //    console.log(doc);
    //});
    //db.remove({ a: 65 }, { multi: true }, function (err, numRemoved) {
    //    console.log(numRemoved);
    //});
    // db.find({}).exec(function (err, docs) {
    //    console.log(docs);
    // });

    // db.remove({}, { multi: true }, function (err, numRemoved) {
    // });
};