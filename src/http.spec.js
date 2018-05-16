const { assertSuccess, assertFailure } = require(`@pheasantplucker/failables-node6`)
const { get, getJson, post } = require('./http')
const { start, stop, PORT } = require('./server')

describe(`http.js`, () => {
  const baseUrl = `http://localhost:${PORT}`

  beforeAll(async () => {
    await start()
  })

  afterAll(async () => {
    await stop()
  })

  describe(`get()`, () => {
    const data = { text: 'the result' }
    const expected = JSON.stringify(data)
    it(`should get`, async () => {
      const result = await get(`${baseUrl}/get`)
      assertSuccess(result, expected)
    })

    it(`should fail`, async () => {
      const result = await get(123)
      assertFailure(result)
    })
  })

  describe(`getJson()`, () => {
    it(`should get success for json response`, async () => {
      const expected = {
        text: 'the result',
      }
      const result = await getJson(`${baseUrl}/getJson`)
      assertSuccess(result, expected)
    })

    it(`should get failure`, async () => {
      const result = await getJson(`${baseUrl}/cheese`)
      assertFailure(result)
    })
  })

  describe(`post()`, () => {
    const data = { test: 'post' }
    it(`should post`, async () => {
      const result = await post(`${baseUrl}/post`, data)
      assertSuccess(result)
    })

    it(`should fail`, async () => {
      const result = await post(1234, data)
      assertFailure(result)
    })
  })
})
