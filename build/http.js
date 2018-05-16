'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { success, failure } = require(`@pheasantplucker/failables-node6`);
const fetch = require('isomorphic-fetch');

const get = (() => {
  var _ref = _asyncToGenerator(function* (url, type = 'text') {
    try {
      const fetchResult = yield fetch(url);
      const data = yield fetchResult[type]();
      return success(data);
    } catch (err) {
      return failure(err.toString());
    }
  });

  return function get(_x) {
    return _ref.apply(this, arguments);
  };
})();

const getJson = (() => {
  var _ref2 = _asyncToGenerator(function* (url) {
    return get(url, 'json');
  });

  return function getJson(_x2) {
    return _ref2.apply(this, arguments);
  };
})();

const makePostOptions = data => {
  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json'
    }
  };
};

const post = (() => {
  var _ref3 = _asyncToGenerator(function* (url, data) {
    const options = makePostOptions(data);
    try {
      const fetchResult = yield fetch(url, options);
      const jsonData = yield fetchResult.json();
      return success(jsonData);
    } catch (err) {
      return failure(err.toString());
    }
  });

  return function post(_x3, _x4) {
    return _ref3.apply(this, arguments);
  };
})();

module.exports = {
  get,
  getJson,
  post
};