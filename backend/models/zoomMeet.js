const mongoose = require('mongoose')

const zoomMeetSchema = new mongoose.Schema({
    zoom_id: {
        type: Number
    },
    host_email: {
        type: String
    },
    topic: {
        type: String
    },
    start_time: {
        type: String
    },
    duration: {
        type: Number
    },
    agenda: {
        type: String
    },
    start_url: {
        type: String
    },
    join_url: {
        type: String
    },
    password: {
        type: String
    }
})

const ZoomMeetSchema = mongoose.model('ZoomMeetSchema',zoomMeetSchema);

module.exports = ZoomMeetSchema;