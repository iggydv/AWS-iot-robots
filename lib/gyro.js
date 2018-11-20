"use strict";

var sphero = require("sphero");
var spheroId = process.argv[2];
var orb = sphero(spheroId);
console.log('trying to connect to sphero...');

orb.connect(function() {
  orb.streamImuAngles();
  console.log("hey: ");
  orb.setStabilization(false);
  orb.on("imuAngles", function(data) {
	var pitch = data.pitchAngle.value[0];
	var roll = data.rollAngle.value[0];
    console.log("imuAngles:");
    console.log("pitch: ", pitch);
    console.log("roll: ", roll);
    
    if (Math.abs(pitch) < 20 && Math.abs(roll) < 20) {
		console.log("Doing nothing")
		orb.color('blue');
	}
    
    if (pitch > 20) {
		orb.color('red');
	}
	else if (pitch < -20 ) {
		orb.color('green');
	}
	
	if (roll > 20) {
		orb.color('yellow');
	}
	else if (roll < -20 ) {
		orb.color('pink');
	}
    //console.log("    range:", data.xGyro.range);
    //console.log("    units:", data.xGyro.units);
    //console.log("    value:", data.xGyro.value[0]);
    //if (data.xGyro.value[0] > 10000) {
	//	orb.color('green');
	//}
	//else if (data.xGyro.value[0] < 10000) {
	//	orb.color('red');
	//}
	
    //console.log("  sensor:", data.yGyro.sensor);
    //console.log("    range:", data.yGyro.range);
    //console.log("    units:", data.yGyro.units);
    //console.log("    value:", data.yGyro.value[0]);

    //console.log("  sensor:", data.zGyro.sensor);
    //console.log("    range:", data.zGyro.range);
    //console.log("    units:", data.zGyro.units);
    //console.log("    value:", data.zGyro.value[0]);
  });

});
