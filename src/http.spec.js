const {
  assertSuccess,
  assertFailure,
  meta,
} = require(`@pheasantplucker/failables`)
const { get, getJson, post } = require('./http')
const { start, stop, PORT } = require('./server')
const equal = require('assert').deepEqual

describe(`http.js`, () => {
  const baseUrl = `http://localhost:${PORT}`

  beforeAll(async () => {
    await start()
  })

  afterAll(async () => {
    await stop()
  })

  describe(`get()`, () => {
    const url = `${baseUrl}/get`
    const data = { text: 'the result' }
    const expected = JSON.stringify(data)
    it(`should get`, async () => {
      const result = await get(url)
      assertSuccess(result, expected)
      const { status } = meta(result)
      equal(status, 200)
    })

    it(`should fail`, async () => {
      const result = await get(123)
      assertFailure(result)
    })

    it(`should fail with statusCode`, async () => {
      const result = await get(`${baseUrl}/notfound`)
      assertFailure(result)
      const { status } = meta(result)
      equal(status, 404)
    })
  })

  describe(`getJson()`, () => {
    it(`should get success for json response`, async () => {
      const expected = {
        text: 'the result',
      }
      const result = await getJson(`${baseUrl}/getJson`)
      assertSuccess(result, expected)
      const { status } = meta(result)
      equal(status, 200)
    })

    it(`should get failure`, async () => {
      const result = await getJson(`${baseUrl}/notfound`)
      assertFailure(result)
      const { status } = meta(result)

      equal(status, 404)
    })
  })

  describe(`post()`, () => {
    const data = { test: 'post' }
    it(`should post`, async () => {
      const result = await post(`${baseUrl}/post`, data)
      assertSuccess(result)
      const { status } = meta(result)
      equal(status, 200)
    })

    it(`should fail`, async () => {
      const result = await post(1234, data)
      assertFailure(result)
    })

    it(`should fail`, async () => {
      const result = await post(`${baseUrl}/notfound`, data)
      assertFailure(result)
      const { status } = meta(result)
      equal(status, 404)
    })
  })
})
