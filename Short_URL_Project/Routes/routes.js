const express = require('express')
const {handlGetRequestByShortId,handleGetAnalytics,handlePostRequestForAllUsers} = require('../Controller/controler')
const router = express.Router()

router.get('/:shortid',handlGetRequestByShortId)

router.post('/',handlePostRequestForAllUsers)

router.get('/analytics/:shortid',handleGetAnalytics)

router
module.exports = router;