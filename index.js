var request = require("request");
var through = require('through2');
var gutil = require('gulp-util');

var url = "http://pixcp.ahcdn.com/api/pixcdn/bulkdelete";

const PLUGIN_NAME = 'pixcdn-cache-reset';

var PluginError = function(error){
    return new gutil.PluginError(PLUGIN_NAME,error);
}


var ahcdnCacheReset = function(config,files){

    throw PluginError('network error');

    var files = files.join("\n");


    return through.obj(function(file, enc, cb) {
        request.get({
                url: url,
                'auth': {
                    'user': config.username,
                    'pass': config.password,
                    'sendImmediately': false
                },
                qs:{
                    bulk:files,
                    source:config.resourceId,
                    respond:"json"
                }
            },
            function (error, response, body) {
                if(error){
                    cb({reason:"pluginError"},file);
                    return;
                }

                try{
                    var response = JSON.parse(body);
                }catch(e){
                    cb({reason:"pluginError"},file);
                    return;
                }

                if (response.errors.length ){
                    cb(response.errors,file);
                    return;
                }

                gutil.colors.green("Successfully reset cache, server response:"+
                chalk.blue(response.confirms))
                cb(null, file);
            }
        );

    });


}


module.exports = ahcdnCacheReset;