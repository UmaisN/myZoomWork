const express = require('express');
const router = express.Router();

const ZoomController = require('../controller/zoomMainController')

router.post('/addData',ZoomController.AddZoom);
router.get('/getData',ZoomController.GetZoomData);
router.delete('/deleteData',ZoomController.DeleteZoomData)
router.post('/getToken',ZoomController.findAccessToken)

module.exports = router;