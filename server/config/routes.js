const controllers = require('../controllers/')
const auth = require('./auth')

module.exports = (app) => {
  const onlyAuthenticated = auth.enforceAuthStatus(true)
  const onlyAdmins = auth.isInRole('admin')

  app.get('/api/users', controllers.users.getByEmail)
  app.get('/api/users/:userId', controllers.users.getById)
  app.post('/api/users', controllers.users.register)
  app.post('/api/users/_login', controllers.users.login)
  app.post('/api/users/_logout', onlyAuthenticated, controllers.users.logout)

  app.get('/api/games/:gameId', onlyAuthenticated, controllers.games.getById)
  app.get('/api/users/:userId/stats', onlyAuthenticated, controllers.users.getStats)
  app.get('/api/users/:userId/matches', onlyAuthenticated, controllers.users.getMatches)

  app.get('/api/admin/users', onlyAdmins, controllers.users.getAllUsers)
  app.put('/api/admin/users/:userId', onlyAdmins, controllers.users.editUser)
  app.delete('/api/admin/users/:userId', onlyAdmins, controllers.users.deleteUser)
  app.get('/api/admin/games', onlyAdmins, controllers.games.getAll)
  app.delete('/api/admin/games/:gameId', onlyAdmins, controllers.games.deleteById)

  app.get('/*', controllers.home.index)
}
