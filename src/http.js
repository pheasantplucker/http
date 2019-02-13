const { success, failure } = require(`@pheasantplucker/failables`)
const fetch = require('isomorphic-fetch')

const get = async (url, type = 'text') => {
  try {
    const fetchResult = await fetch(url)
    const { status, statusText } = fetchResult
    if (status > 400) {
      return failure(statusText, { status })
    }
    const data = await fetchResult[type]()
    return success(data, { status })
  } catch (err) {
    return failure(err.toString())
  }
}

const getJson = async url => {
  return get(url, 'json')
}

const makePostOptions = data => {
  return {
    method: 'POST',
    body: JSON.stringify(data),
    headers: {
      'Content-Type': 'application/json',
    },
  }
}

const post = async (url, data) => {
  const options = makePostOptions(data)
  try {
    const fetchResult = await fetch(url, options)
    const { status, statusText } = fetchResult
    if (status > 400) {
      return failure(statusText, { status })
    }
    const jsonData = await fetchResult.json()
    return success(jsonData, { status })
  } catch (err) {
    return failure(err.toString())
  }
}

module.exports = {
  get,
  getJson,
  post,
}
