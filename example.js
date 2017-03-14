/**
 * Created by nicholas on 17-2-13.
 */
const NgConf = require('./');
const path = require('path');

let ngconf = new NgConf('http://127.0.0.1:2379', 'ngconf-example');

ngconf.local({
    development: './examples',
    production: {
        '/test.conf': './examples-prod/test.conf',
        'test.json': path.join(__dirname, 'examples-prod', 'test.json')
    }
});

ngconf.raw('/test.conf', watcherResult).then(readResult);

ngconf.json('/test.json', watcherResult).then(readResult);

function readResult(data) {
    console.log('This is read result.', data);
}

function watcherResult(data) {
    console.log('This is watcher result.', data);
}
