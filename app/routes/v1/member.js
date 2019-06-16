/* global MemberControllers */

'use strict'

var Route = express.Router()

Route
  .get('/get', MemberControllers.get)
  .post('/insert', MemberControllers.insert)


module.exports = Route
