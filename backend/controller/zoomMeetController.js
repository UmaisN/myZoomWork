const express = require('express');
const https = require('https');
const zoomMeetSchema = require('../models/zoomMeet')

const AddMeetingDetails = (req,res,next) => {
    const zoom = new zoomMeetSchema({
        zoom_id : req.body.zoom_id,
        host_email: req.body.host_email,
        topic: req.body.topic,
        start_time: req.body.start_time,
        duration: req.body.duration,
        agenda: req.body.agenda,
        start_url: req.body.start_url,
        join_url: req.body.join_url,
        password: req.body.password,
    })
    try {
        zoom.save()
        res.send(zoom)
    }
    catch (e) {
        console.log(e)
        return res.status(500).send({error: err.message})
    }
}

const GetMeetData = (req,res,next) => 
{
    zoomMeetSchema.find((error,data) => {
        if (error) {
            res.send('Could not find main zoom data')
        }
        else {
            res.json(data)
        }
    })
}

exports.GetMeetData = GetMeetData;
exports.AddMeetingDetails = AddMeetingDetails;