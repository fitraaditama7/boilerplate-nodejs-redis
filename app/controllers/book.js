/* global _ */

'use strict'

// const async = require('async')
const bookModel = require('../models/book')

exports.get = (req, res) => {
  bookModel.get(req, (errBook, resultBook) => {
    if (errBook) {
      return MiscHelper.errorCustomStatus(res, errBook, 400)
    } else {
      return MiscHelper.responses(res, resultBook)
    }
  })
}

exports.insert = (req, res) => {
  req.checkBody('ISBN', 'ISBN is required').notEmpty()
  req.checkBody('judulbuku', 'judulbuku is required').notEmpty()

  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const data = {
        ISBN: req.body.ISBN,
        judulbuku: req.body.judulbuku,
        tahunterbit: req.body.tahunterbit,
        penulis: req.body.penulis,
        tanggalimport: req.body.tanggalimport,
      }
      if (_.isEmpty(data.tahunterbit)) {
        data.tahunterbit = null
      }
      if (_.isEmpty(data.penulis)) {
        data.penulis = null
      }
      if (_.isEmpty(data.tanggalimport)) {
        data.tanggalimport = null
      }
      bookModel.insert(req, data, (err, result) => {
        cb(err, result)
      })
    }
  ], (errBook, resultBook) => {
    if (!errInsert) {
      return MiscHelper.responses(res, resultBook)
    } else {
      return MiscHelper.errorCustomStatus(res, errBook)
    }
  })
}
