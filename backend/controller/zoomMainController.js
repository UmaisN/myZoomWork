const express = require('express');
const https = require('https');
const zoomMainSchema = require('../models/zoomMain')

const AddZoom = (req,res,next) => 
{
    const zoom = new zoomMainSchema({
        user_id : req.body.user_id,
        email: req.body.email,
        access_token: req.body.access_token,
        refresh_token: req.body.refresh_token,
        expires_in: req.body.expires_in
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

const GetZoomData = (req,res,next) => 
{
    zoomMainSchema.find((error,data) => {
        if (error) {
            res.send('Could not find main zoom data')
        }
        else {
            res.json(data)
        }
    })
}

const DeleteZoomData = (req,res,next) => 
{
    try {
        zoomMainSchema.deleteMany({})
        res.send('Data deleted')
    }
    catch (e){
        console.log(e)
        return res.status(500).send({error: err.message})
    }
}

const findAccessToken = (req,res,next) => 
{
    const email = req.body.email
    try {
        zoomMainSchema.findOne({email:"i190573@nu.edu.pk"})
        .then(data => {
            console.log(data)
            res.json(data)
        })
        .catch(err => {
            res.status(500).send(err)
        })
    }
    catch (e) {
        res.status(500).send(e)
    }
}

exports.AddZoom = AddZoom
exports.GetZoomData = GetZoomData
exports.DeleteZoomData = DeleteZoomData
exports.findAccessToken = findAccessToken