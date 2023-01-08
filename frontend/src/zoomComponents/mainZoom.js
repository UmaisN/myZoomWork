import React from 'react';
import '../App.css';
import { ZoomMtg } from "@zoomus/websdk";
require('dotenv').config();

ZoomMtg.setZoomJSLib('https://source.zoom.us/2.9.5/lib', '/av');

ZoomMtg.preLoadWasm();
ZoomMtg.prepareWebSDK();
// loads language files, also passes any error messages to the ui
ZoomMtg.i18n.load('en-US');
ZoomMtg.i18n.reload('en-US');

function JoinMeet() {
  console.log(process.env);
  
  var signatureEndpoint = 'http://localhost:4000'
  var sdkKey = 'sJ6V1zLdiXFWJ4vJPKhzDOzqt1Hx8GzPCDzp'
  var meetingNumber = '73325902782'
  var role = 1
  var leaveUrl = 'http://localhost:3000'
  var userName = 'Umais NU ID'
  var userEmail = ''
  var passWord = 'hEQ1d4'
  var registrantToken = ''


  function getSignature(e) {
    e.preventDefault();

    fetch(signatureEndpoint, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({
        meetingNumber: meetingNumber,
        role: role
      })
    }).then(res => res.json())
    .then(response => {
      startMeeting(response.signature)
    }).catch(error => {
      console.error(error)
    })
  }

  function startMeeting(signature) {
    document.getElementById('zmmtg-root').style.display = 'block'

    ZoomMtg.init({
      leaveUrl: leaveUrl,
      success: (success) => {
        console.log(success)

        ZoomMtg.join({
          signature: signature,
          meetingNumber: meetingNumber,
          userName: userName,
          sdkKey: sdkKey,
          userEmail: userEmail,
          passWord: passWord,
          tk: registrantToken,
          success: (success) => {
            console.log(success)
          },
          error: (error) => {
            console.log(error)
          }
        })

      },
      error: (error) => {
        console.log(error)
      }
    })
  }

  return (
    <div className="App">
      <main>
        <h1>Zoom Meeting</h1>
        <button onClick={getSignature}>Join Meeting</button>
      </main>
    </div>
  );
}

export default JoinMeet;