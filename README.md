# probot-exercise

Going through https://paper.dropbox.com/doc/Integrations-Coding-Interview-ayNIkTwvYF2zNd04mQJU1

## Notes

- `create-probot app` readme needs some love. It links to the docs, but it would be helpful to at least have the `npx` and `yarn` invocations for trying it out.
- It took a minute to dig through the context object and figure out where owner name and repo name are. There's probably a probot convenience method for this, but I didn't go looking for it.
- probot sample app should use `standard --fix`
- `WEBHOOK_PROXY_URL` is commented out in `.env` in the default app. I have no syntax highlighting for envfiles, and it took me a while to figure out why my app wasn't receiving messages from smee.io
- recurrrrrsion! The failed issue created another failed issue, and so on :) Maybe I should have seen this coming. I definitely should have seen this coming, because the exercise notes warned that it would happen.
- I am just checking the last 100 issue titles for duplicates... not foolproof but good enough for this purpose. Alternatively we do a GitHub API search for issues with the given title, which would probably be a cheaper call.
- I wrote my probot app and error-handling module in the same repo for convenience.


## Time

task | time
--- | ---
reading instructions and bootstrapping app | 30 minutes
error reporting | 10 minutes
duplicate error avoidance | 10 minutes
cosmetics | 10 minutes
tests | 30 minutes
**total** | **90 minutes**
