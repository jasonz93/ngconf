/**
 * Created by Nicholas on 2017/2/10.
 */
'use strict';

const NgConf = require('../');
const path = require('path');
const expect = require('chai').expect;

describe('Local only tests', function () {
    var ngconf;

    it('Initialize with default options', function () {
        ngconf = new NgConf('', 'ngconf_test', {
            localOnly: true
        });
        expect(ngconf._namespace).to.be.equal('ngconf_test', 'Namespace not initialized');
        expect(ngconf._profile).to.be.equal('development', 'Profile not initialized');
    });

    it('Init data with local examples', function () {
        ngconf.local({
            development: path.join(__dirname, '..', 'examples'),
            production: {
                '/test.conf': path.join(__dirname, '..', 'examples-prod', 'test.conf'),
                'test.json': path.join(__dirname, '..', 'examples-prod', 'test.json')
            }
        });
        expect(ngconf._localPaths.development).to.be.deep.equal({
            '/test.conf': path.join(__dirname, '..', 'examples', 'test.conf'),
            '/test.json': path.join(__dirname, '..', 'examples', 'test.json')
        })
    })

    it('Read raw file', function () {
        return ngconf.raw('test.conf').then((data) => {
            expect(data).to.be.equal(ngconf._localCache.development['/test.conf']);
        });
    })

    it('Read json file', function () {
        return ngconf.json('test.json').then((data) => {
            expect(data).to.deep.equal(JSON.parse(ngconf._localCache.development['/test.json']));
        })
    })
});
