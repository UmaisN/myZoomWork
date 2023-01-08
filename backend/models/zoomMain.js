const mongoose = require('mongoose');

const zoomMainSchema = new mongoose.Schema({
  email : {
        type: String
    },
  user_id : {
    type: String
  },
  access_token : {
    type: String
  },
  refresh_token : {
    type: String
  },
  expires_in: {
    type: Number
  }
})

const ZoomMainSchema = mongoose.model('ZoomMainSchema',zoomMainSchema);

module.exports = ZoomMainSchema;