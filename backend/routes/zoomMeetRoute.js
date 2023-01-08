const express = require('express');
const router = express.Router();

const ZoomController = require('../controller/zoomMeetController')

router.post('/addData',ZoomController.AddMeetingDetails);
router.get('/getData',ZoomController.GetMeetData);

module.exports = router;