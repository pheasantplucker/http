'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { success } = require(`@pheasantplucker/failables-node6`);
const http = require('http');

const PORT = 9000;

const server = http.createServer((req, res) => {
  if (req.method === 'GET') {
    switch (req.url) {
      case '/get':
        {
          const data = { text: 'the result' };
          res.write(JSON.stringify(data));
          break;
        }
      case '/getJson':
        {
          const data = { text: 'the result' };
          res.write(JSON.stringify(data));
          break;
        }
    }
    res.end();
  }
  if (req.method === 'POST') {
    switch (req.url) {
      case '/post':
        let responseBody = '';

        req.on('data', data => {
          responseBody += data;
        });
        req.on('end', () => {
          res.write(responseBody);
          res.end();
        });
        break;
      default:
    }
  }
});

const start = (() => {
  var _ref = _asyncToGenerator(function* () {
    server.listen(PORT);
    return success();
  });

  return function start() {
    return _ref.apply(this, arguments);
  };
})();

const stop = (() => {
  var _ref2 = _asyncToGenerator(function* () {
    server.close();
    return success();
  });

  return function stop() {
    return _ref2.apply(this, arguments);
  };
})();

module.exports = {
  start,
  stop,
  PORT
};