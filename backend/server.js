require('dotenv').config()
const bodyParser = require('body-parser')
const KJUR = require('jsrsasign')
const cors = require("cors");
const express = require("express");
const path = require("path");
const config = require("./config");
const axios = require("axios")
const qs = require('qs');
const mongoose = require('mongoose')
const zoomMainRouter = require('../backend/routes/zoomMainRoute')
const zoomMeetRouter = require('../backend/routes/zoomMeetRoute')

const app = express()
const port = process.env.PORT || 4000

mongoose.set('strictQuery', true);
app.use(bodyParser.json(), cors())
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
app.options('*', cors())

mongoose.connect("mongodb+srv://aliahmadjan:12345@cluster0.j5u9lxj.mongodb.net/LearnLive?retryWrites=true&w=majority&ssl=true");
const connection = mongoose.connection;
connection.once('open', () => { 
  console.log("MongoDB connection established successfully");
})

app.use('/zoomMain',zoomMainRouter);
app.use('/zoomMeet',zoomMeetRouter);


app.post('/', (req, res) => {

  const iat = Math.round(new Date().getTime() / 1000) - 30;
  const exp = iat + 60 * 60 * 2

  const oHeader = { alg: 'HS256', typ: 'JWT' }

  const oPayload = {
    sdkKey: process.env.ZOOM_SDK_KEY,
    mn: req.body.meetingNumber,
    role: req.body.role,
    iat: iat,
    exp: exp,
    appKey: process.env.ZOOM_SDK_KEY,
    tokenExp: iat + 60 * 60 * 2
  }

  const sHeader = JSON.stringify(oHeader)
  const sPayload = JSON.stringify(oPayload)
  const signature = KJUR.jws.JWS.sign('HS256', sHeader, sPayload, process.env.ZOOM_SDK_SECRET)

  res.json({
    signature: signature
  })

  
})




var email, userid, resp;

//Use the ApiKey and APISecret from config.js
const payload = {
  iss: config.APIKey,
  exp: new Date().getTime() + 5000,
};

app.post("/connectZoom", async(req,res) => {
  try {
    var data = qs.stringify({
      code: req.body.code,
      grant_type: 'authorization_code',
      redirect_uri: process.env.ZOOM_REDIRECT_URL
    });

    var config = {
        method: 'post',
        url: 'https://zoom.us/oauth/token',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded",
            "Authorization": "Basic " + Buffer.from(`${process.env.CLIENT_ID}:${process.env.CLIENT_SECRET}`).toString('base64')
        },
        data: data
    };

    var zoomRes = await axios(config)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    const zoomUserRes = await fetch("https://api.zoom.us/v2/users/me", {
      method: "GET",
      headers: {
        Authorization: `Bearer ${zoomRes.data.access_token}`,
      },
    });
    const zoomUserData = await zoomUserRes.json();
    const temp = await fetch("http:/localhost:4000/zoomMain/addData", {
      // Adding method type
      method: "POST",
      // Adding body or contents to send
      body: JSON.stringify({
        email: zoomUserData.email,
        user_id: zoomUserData.user_id,
        access_token: zoomRes.data.access_token,
        refresh_token: zoomRes.data.refresh_token,
        expires_in: zoomRes.data.expires_in
      }),
      headers: {
          "Content-type": "application/json; charset=UTF-8"
      }
    })
    return res.send('Authorization Successfully Done')
  } catch (e) {
    console.log(e)
    return res.status(500).send("Something went wrong");
  }
})

app.post("/meeting", async (req,res) => {
  //Get access token through email from database
  try {
    var data = qs.stringify({
      email: req.body.email
    });

    var config = {
        method: 'post',
        url: 'http://localhost:4000/zoomMain/getToken',
        headers: {
            "Content-Type": "application/x-www-form-urlencoded"
        },
        data: data
    };

    var zoomRes = await axios(config)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });

    var data1 = JSON.stringify({
      agenda: req.body.agenda,
      duration: req.body.duration
    });

    var config1 = {
        method: 'post',
        url: `https://api.zoom.us/v2/users/${req.body.email}/meetings`,
        headers: {
          Authorization: `Bearer ${zoomRes.data.access_token}`,
          "Content-Type": "application/json; charset=UTF-8",
        },
        data: data1
    };

    var zoomRes1 = await axios(config1)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    console.log(zoomRes1)
    
    var data2 = JSON.stringify({
      zoom_id: zoomRes1.data.id,
      host_email: zoomRes1.data.host_email,
      topic: zoomRes1.data.topic,
      start_time: zoomRes1.data.start_time,
      duration: zoomRes1.data.duration,
      agenda: zoomRes1.data.agenda,
      start_url: zoomRes1.data.start_url,
      join_url: zoomRes1.data.join_url,
      password: zoomRes1.data.password
    });

    var config2 = {
        method: 'post',
        url: 'http://localhost:4000/zoomMeet/addData',
        headers: {
          "Content-Type": "application/json; charset=UTF-8"
        },
        data: data2
    };

    var zoomRes2 = await axios(config2)
        .then(function (response) {
            return response;
        })
        .catch(function (error) {
            return error;
        });
    console.log(zoomRes2)
    res.send('Meet created and data saved to DB')
  }
  catch (e) {
    console.log(e)
    return res.status(500).send("Something went wrong");
  }
})

app.use((req, res, next) => {
  const err = new Error('Not Found');
  err.status = 404;
  next(err);
});

app.listen(port, () => console.log(`Zoom Backend started on port ${port}!`))
