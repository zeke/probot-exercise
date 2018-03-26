// This is the thing you'll be building
const reportError = require('./lib/report-error')

const defaults = {
  welcome: 'Thank you for helping make the world a better place.'
}

module.exports = robot => {
  robot.on('issues.opened', async context => {
    let config

    try {
      config = await context.config('config.yml', defaults)
    } catch (err) {
      context.log({err}, 'Reporting error')

      return reportError(context, {
        title: 'Error loading .github/config.yml',
        body: 'It looks like there is an error in your `.github/config.yml:` file',
        err
      })
    }

    return context.github.issues.createComment(context.issue({body: config.welcome}))
  })
}