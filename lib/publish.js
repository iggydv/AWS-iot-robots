//aws vars

const awsIot = require('aws-iot-device-sdk');
const username = 'DrikusStanderP' // TODO: replace this
const device = awsIot.device(
  {
   keyPath: 'certificates/private.pem.key',
  certPath: 'certificates/certificate.pem.crt',
    caPath: 'certificates/ca.pem',
  clientId: `${username}-publish`,
      host: 'a2yujzh40clf9c.iot.us-east-2.amazonaws.com'
});
//sphero vars
"use strict";

var sphero = require("sphero");
var spheroId = process.argv[2];
var orb = sphero(spheroId);

console.log('trying to connect to sphero...');

// device.on('connect', () => 
// {
  // console.log('Publisher client connected to AWS IoT cloud.\n');
  orb.connect(
     function() 
    {
      console.log('connected to sphero...');

      orb.streamImuAngles();
      orb.setStabilization(false);
      orb.on("imuAngles", async function(data) 
      {
        var pitch = data.pitchAngle.value[0];
        var roll = data.rollAngle.value[0];
        // console.log("imuAngles:");
        // console.log("pitch: ", pitch);
        // console.log("roll: ", roll);
        
        //publish nothing
        if (Math.abs(pitch) < 20 && Math.abs(roll) < 20) 
        {
          // console.log("Doing nothing")
          orb.color('blue');
          //  setTimeout(function () {device.publish('makers/build/move', JSON.stringify(
          //   {
          //        "angle":0,
          //        "speed":0
          //   }))}, 100);
        }
        
        //decrement speed
        if (pitch > 20) 
        {
          orb.color('red');
           setTimeout(function () {device.publish('makers/build/move', JSON.stringify(
            {
                 "angle":0,
                 "speed":2
            }))}, 100);
        }
        //increment speed
        else if (pitch < -20 )
        {
          orb.color('green');
           setTimeout(function () {device.publish('makers/build/move', JSON.stringify(
            {
                 "angle":0,
                 "speed":1
            }))}, 100);
        }
        //move left
        if (roll > 20) 
        {
          orb.color('yellow');
           setTimeout(function () { device.publish('makers/build/move', JSON.stringify(
            {
                 "angle":1,
                 "speed":0
            }))}, 100);
        }
        // move  right
        else if (roll < -20 ) 
        {
          orb.color('pink');
           setTimeout(function () { device.publish('makers/build/move', JSON.stringify(
            {
                 "angle":2,
                 "speed":0
            }))}, 100);
        }
      });
    });

  
// });





