'use strict';

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

const { assertSuccess, assertFailure } = require(`@pheasantplucker/failables-node6`);
const { get, getJson, post } = require('./http');
const { start, stop, PORT } = require('./server');

describe(`http.js`, () => {
  const baseUrl = `http://localhost:${PORT}`;

  beforeAll(_asyncToGenerator(function* () {
    yield start();
  }));

  afterAll(_asyncToGenerator(function* () {
    yield stop();
  }));

  describe(`get()`, () => {
    const data = { text: 'the result' };
    const expected = JSON.stringify(data);
    it(`should get`, _asyncToGenerator(function* () {
      const result = yield get(`${baseUrl}/get`);
      assertSuccess(result, expected);
    }));

    it(`should fail`, _asyncToGenerator(function* () {
      const result = yield get(123);
      assertFailure(result);
    }));
  });

  describe(`getJson()`, () => {
    it(`should get success for json response`, _asyncToGenerator(function* () {
      const expected = {
        text: 'the result'
      };
      const result = yield getJson(`${baseUrl}/getJson`);
      assertSuccess(result, expected);
    }));

    it(`should get failure`, _asyncToGenerator(function* () {
      const result = yield getJson(`${baseUrl}/cheese`);
      assertFailure(result);
    }));
  });

  describe(`post()`, () => {
    const data = { test: 'post' };
    it(`should post`, _asyncToGenerator(function* () {
      const result = yield post(`${baseUrl}/post`, data);
      assertSuccess(result);
    }));

    it(`should fail`, _asyncToGenerator(function* () {
      const result = yield post(1234, data);
      assertFailure(result);
    }));
  });
});