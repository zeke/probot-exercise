module.exports = function reportError (context, opts = {}) {
  opts.title = opts.title || 'error'
  opts.body = opts.body || 'body'

  if (opts.err) {
    opts.body += '\n\n' + JSON.stringify(err, null, 2)
  }

  return context.github.issues.create({
    owner: context.owner,
    repo: context.repo,
    title: opts.title,
    body: opts.body
  })
}