const reportError = require('../lib/report-error')
const nock = require('nock')
const github = require('@octokit/rest')()
const defaultContext = {
  log: function () { /* no-op */ },
  github: github,
  payload: {
    repository: {
      name: 'probot-exercise',
      owner: {
        login: 'zeke'
      }
    }
  }
}

describe('reportError', () => {
  test('it is a function', () => {
    expect(typeof reportError).toBe('function')
  })

  test('aborts if issue with same title already exists', async () => {
    const mock = getAllIssuesMock()
    const opts = {title: 'title 3', body: 'something went wrong'}
    const result = await reportError(defaultContext, opts)
    expect(mock.isDone()).toBe(true)
    expect(result).toBe(null)
  })

  test('creates issue if title does not already exist', async () => {
    const mock1 = getAllIssuesMock()
    const mock2 = nock('https://api.github.com')
      .post('/repos/zeke/probot-exercise/issues')
      .reply(200, {yay: true})

    const opts = {title: 'title 4', body: 'something went wrong'}
    const result = await reportError(defaultContext, opts)
    expect(mock1.isDone()).toBe(true)
    expect(mock2.isDone()).toBe(true)
    expect(result.data.yay).toBe(true)
  })
})

function getAllIssuesMock () {
  const res = [
    {title: 'title 1'},
    {title: 'title 2'},
    {title: 'title 3'}
  ]
  return nock('https://api.github.com')
    .get('/repos/zeke/probot-exercise/issues?per_page=100')
    .reply(200, res)
}
