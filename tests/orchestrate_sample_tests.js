var should = require('should');
var Symphonize = require('../bin/symphonize');

// Spool up the database & connection.
var orchestrate_holder = require("../key/orchestrate_key");
var key_holder = new orchestrate_holder();
var orchestrate_key = key_holder.access_key;
var db = require('orchestrate')(orchestrate_key);

// Data to test with.
var collection = 'musician';
var key = "1";
var value = {
    "name": "Adron Hall",
    "bio": "That's me!!!"
};

describe('the orchestrate client', function () {

    it('should exist when constructed.', function () {
        db.should.exist;
    })

    it('should put the data.', function (done) {
        db.put(collection, key, value)
            .then(function (result) {
                result.should.exist;
                done();
            })
            .fail(function (err) {
                err.should.not.exist;
                done();
            })
    })

    it('should have a result.', function (done) {
        db.get(collection, key)
            .then(function (result) {
                result.should.exist;
                done();
            })
            .fail(function (err) {
                err.should.not.exist;
                done();
            })
    })
})

describe('verify defaults created in orchestrate', function () {
    it('should make a collection named sample_data to put generated data in.', function (done) {
        var symphonize = new Symphonize({"write_source": "orchestrateio"});
        symphonize.generate();
        var dataReturned = 0;

        db.search('sample_data', '*')
            .then(function (result) {
                dataReturned = result.body.count;
                done();
            })
            .fail(function (err) {
                err.should.fail;
                done();
            })

        dataReturned.should.eql(1);
    })
})