module.exports = async function reportError (context, opts = {}) {
  const owner = context.payload.repository.owner.login
  const repo = context.payload.repository.name
  const title = opts.title || 'error'
  const fencedErr = ['```json', JSON.stringify(opts.err, null, 2), '```'].join('\n')
  const body = [opts.body, fencedErr].join('\n\n')

  // Look for existing open issues with the same title
  const {data:issues} = await context.github.issues.getForRepo({owner, repo, per_page: 100})
  
  if (issues.some(issue => issue.title === title)) {
    console.log('A comment has already been created for this error: ', title)
    return
  }

  return context.github.issues.create({
    owner,
    repo,
    title: opts.title,
    body: opts.body
  })
}