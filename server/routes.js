import express from 'express'
import { authSpotify, spotifyCallback, evalSpotify, authUser, testing } from './controllers'

export default (app) => {
  const router = express.Router()
  // how come these spotify routes need to be off app, and the others it's cool to router?

  app.get('/auth-spotify', authSpotify)

  app.get('/auth-spotify/callback', spotifyCallback)

  router.route('/api/evalSpotify')
        .get(isAuthenticated, evalSpotify)

  router.route('/api/authenticate')
        .post(authUser)

  router.route('/test')
        .post(testing)

  return router
}

// look at potentially passing session.user with next()
function isAuthenticated (req, res, next) {
  req.sessionStore.get(req.sessionID, (err, session) => {
    if (session && session.user) {
      next()
    } else {
      res.json({error: "No session found, please login"})
    }
  })
}
