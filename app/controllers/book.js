/* global _ */

'use strict'

const async = require('async')
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

exports.search = (req, res) => {
  const keyword = _.result(req.query, 'keyword')

  async.waterfall([
    (cb) => {
      bookModel.search(req, keyword, (errBook, resultBook) => {
        if (_.isEmpty(resultBook)) {
          cb(errBook, { message: 'pencarian tidak ditemukan' })
        } else {
          cb(errBook, resultBook)
        }
      })
    }
  ], (errBook, resultBook) => {
    if (!errBook) {
      MiscHelper.responses(res, resultBook)
    } else {
      MiscHelper.errorCustomStatus(res, errBook)
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
