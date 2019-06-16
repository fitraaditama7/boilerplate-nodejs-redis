/* global _ */

'use strict'

const async = require('async')
const memberModel = require('../models/member')

exports.get = (req, res) => {
  memberModel.get(req, (errMember, resultMember) => {
    if (errMember) {
      return MiscHelper.errorCustomStatus(res, errMember, 400)
    } else {
      return MiscHelper.responses(res, resultMember)
    }
  })
}

exports.insert = (req, res) => {
  req.checkBody('nomeranggota', 'nomeranggota is required').notEmpty()
  req.checkBody('nama', 'nama is required').notEmpty()
  req.checkBody('alamattinggal', 'alamattinggal is required').notEmpty()
  req.checkBody('jeniskelamin', 'jeniskelamin is required').notEmpty()
  req.checkBody('kontak', 'kontak is required').notEmpty()
  req.checkBody('surel', 'surel is required').notEmpty()


  if (req.validationErrors()) {
    return MiscHelper.errorCustomStatus(res, req.validationErrors(true))
  }

  async.waterfall([
    (cb) => {
      const data = {
        nomeranggota: req.body.nomeranggota,
        nama: req.body.nama,
        alamattinggal: req.body.alamattinggal,
        jeniskelamin: req.body.jeniskelamin,
        kontak: req.body.kontak,
        surel: req.body.surel
      }

      memberModel.insert(req, data, (err, result) => {
        cb(err, result)
      })
    }
  ], (errMember, resultMember) => {
    if (!errMember) {
      return MiscHelper.responses(res, resultMember)
    } else {
      return MiscHelper.errorCustomStatus(res, errMember)
    }
  })
}

