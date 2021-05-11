var express = require('express')
var router = express.Router()

router.post('/listicle/:channel', function(req, res, next) {
    res.send('send')
})

module.exports = router