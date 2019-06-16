/* global BookControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', BookControllers.get)
  .post('/insert', BookControllers.insert)

module.exports = Route
