
var assert = require('assert');

exports.insertDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Insert a document
  coll.insert(document, function(err, result) {
    assert.equal(err, null);
    console.log("Inserted " + result.result.n + " documents into the document collection " + collection);
    callback(result);
  });
}

exports.findDocuments = function(db, collection, callback) {

  // Get documents collection
  var coll = db.collection(collection);

  // Find some documents
  coll.find({}).toArray(function(err, docs) {
    assert.equal(err, null);
    callback(docs);
  });
}

exports.removeDocument = function(db, document, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Remove a document
  coll.deleteOne(document, function(err, result) {
    assert.equal(err, null);
    console.log("Removed the document " + document);
    callback(result);
  });
}

exports.updateDocument = function(db, document, update, collection, callback) {

  // Get the documents collection
  var coll = db.collection(collection);

  // Update document where a is 2, set b equal to 1
  coll.updateOne(document, { $set: update }, null, function(err, result) {
    assert.equal(err, null);
    console.log("Updated the document with " + update);
    callback(result);
  });
}

