'use strict';
const base_api_url = 'https://circleci.com/api/v1.1/';
const config = require('@opuscapita/config');
const request = require('request');
const zlib = require('zlib');

const Logger = require('ocbesbn-logger'); // Logger
const log = new Logger({
    context: {
        serviceName: 'servicenow-integration'
    }
});

let cachedApiKey;   // local var to store credentials in case of consul outage

module.exports.belongsToCurrentEnv = function (build) {
    const environment = process.env.NODE_ENV;
    const branch = build.branch;
    switch (environment) {
        case 'development':
            return branch !== 'main';
        case 'production':
            return branch === 'main';
        default: // TODO: stage?
            return false;
    }
};

module.exports.getRecentBuilds = function () {
    return getApiKey()
        .then(api_key => getRequestOptions(`${base_api_url}recent-builds?circle-token=${api_key}`))
        .then(options => requestWithEncoding(options))
        .catch(error => {
            console.log(error);
            return [];
        })
};

const getRequestOptions = function (url) {
    return new Promise((resolve, reject) => {
        return resolve({
            url: url,
            headers: {
                "accept-charset": "utf-8;",
                "accept": "text/html",
                "user-agent": "YouDontValidateMeAnyway",
                "accept-encoding": "gzip",
            }
        });
    });
};

const requestWithEncoding = function (options) {
    return new Promise((resolve, reject) => {
        let req = request.get(options);
        req.on('response', (response) => {
            let chunks = [];
            response.on('data', (part) => {
                chunks.push(part);
            });

            response.on('end', () => {
                let buffer = Buffer.concat(chunks);
                let encoding = response.headers['content-encoding'];
                if (encoding === 'gzip') {
                    zlib.gunzip(buffer, (error, decoded) => {
                        if (error)
                            return reject(error);
                        else
                            return resolve(decoded.toString());
                    });
                } else {
                    return resolve(buffer.toString());
                }
            });
        });
        req.on('error', function (error) {
            return reject(error);
        });
    })
};

let getApiKey = function () {
    return config.getProperty('circle-ci-api-key')
        .catch(error => {
            log.error(error);
            if (cachedApiKey) {
                return Promise.resolve(cachedApiKey);
            } else {
                return Promise.reject('no consul-key, no cached-key');
            }
        })
        .then(key => {
            if (cachedApiKey === null || cachedApiKey !== key) {  // setting or replacing with new value
                cachedApiKey = key;
            }
            return Promise.resolve(key);
        })
        .then(it => it);
};