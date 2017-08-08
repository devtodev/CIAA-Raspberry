/*
*   API RESTful CIAA Restroom 
*
*    Author: Carlos Miguens
*
*/

var express = require('express');
var app = express();


app.get('/', function (req, res) {
   res.send('Hello World');
})

var server = app.listen(8081, function () {
   var host = server.address().address
   var port = server.address().port
   
   console.log("Example app listening at http://%s:%s", host, port)
})

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB1', {
  baudRate: 115200
});

port.write('main screen turn on', function(err) {
  if (err) {
    return console.log('Error on write: ', err.message);
  }
  console.log('message written');
});

// Switches the port into "flowing mode" 
port.on('data', function (data) {
  console.log('Data:', data);
});
 
port.on('error', function(err) {
  console.log('Error: ', err.message);
})