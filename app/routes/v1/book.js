/* global BookControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', BookControllers.get)
  .post('/insert', BookControllers.insert)
  .get('/search', BookControllers.search)

module.exports = Route
