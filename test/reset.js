var cdn = require('..');
require('should');
require('mocha');

describe('ahcdnCacheReset(config,files)', function(){
    it('should generate a request', function(done){
        var count = 0;
        var writtenValue = '';

        // Stub process.stdout.write
        var stdout_write = process.stdout.write;
        process.stdout.write = function(value) {
            writtenValue += value;
            if(++count > 2){
                // Restore process.stdout.write after test
                process.stdout.write = stdout_write;
            }
        };

        util.log(1, 2, 3, 4, 'five');
        var time = util.date(new Date(), 'HH:MM:ss');
        writtenValue.should.eql('[' + util.colors.grey(time) + '] 1 2 3 4 \'five\'\n');

        done();
    });

    it('should validate parameters', function(done){
        var count = 0;
        var writtenValue = '';

        // Stub process.stdout.write
        var stdout_write = process.stdout.write;
        process.stdout.write = function(value) {
            writtenValue += value;
            if(++count > 2){
                // Restore process.stdout.write after test
                process.stdout.write = stdout_write;
            }
        };

        util.log('%s %d %j', 'something', 0.1, {key: 'value'});
        var time = util.date(new Date(), 'HH:MM:ss');
        writtenValue.should.eql(
            '[' + util.colors.grey(time) + '] '+
            'something 0.1 {\"key\":\"value\"}\n'
        );

        done();
    });
});