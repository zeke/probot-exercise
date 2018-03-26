const assert = require('assert')

module.exports = async function reportError (context, opts = {}) {
  assert(opts.title, 'title option is required')
  assert(opts.body, 'body option is required')

  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const title = opts.title
  const fencedErr = opts.err
    ? ['```json', JSON.stringify(opts.err, null, 2), '```'].join('\n')
    : ''
  const body = [opts.body, fencedErr].join('\n\n').trim()

  // Look for existing open issues with the same title
  const {data: issues} = await context.github.issues.getForRepo({owner, repo, per_page: 100})
  if (issues.some(issue => issue.title === title)) {
    context.log('A comment has already been created for this error: ', title)
    return null
  }

  return context.github.issues.create({owner, repo, title, body})
}
