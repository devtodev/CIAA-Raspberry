/*
*   API RESTful CIAA Restroom 
*
*    Author: Carlos Miguens
*
*/

var express = require('express');
var app = express();

var typeRequested = ['S', 'M']; // CIAA protocol communication
var dataRequested = 0;
var allData = {};

// EXPRESS

app.get('/', function (req, res) {
   res.send('API Rest for a restroom');
});

app.get('/sensors/get', function (req, res) {
/*  var sensores;
  sensores['Temperature'] = allData[typeRequested[dataRequested]];
  sensores[typeRequested.MOVE] = allData[typeRequested.MOVE];
  sensores[typeRequested.HUMIDITY] = allData[typeRequested.HUMIDITY];  */
  res.send(allData);
});

app.get('/actions/get', function (req, res) {
 /* var actions;
  actions[typeRequested.LIGHT1] = allData[typeRequested.LIGHT1];
  actions[typeRequested.LIGHT2] = allData[typeRequested.LIGHT2];
  actions[typeRequested.FAN] = allData[typeRequested.FAN];  */
  res.send(allData);
});

var server = app.listen(8081, function () {
   var host = server.address().address;
   var port = server.address().port;
   
   console.log("Example app listening at http://%s:%s", host, port);
});


// M2M Communication

var SerialPort = require('serialport');
var port = new SerialPort('/dev/ttyUSB1', {
  baudRate: 115200
});

// Switches the port into "flowing mode" 

port.on('data', function (data) {
  allData[dataRequested] = data;
  
  dataRequested = (typeRequested.length > dataRequested + 1)?dataRequested+1:0;
  requestData();
  console.log('Data:', data);
});
 
// Read data that is available but keep the stream from entering "flowing mode" 
port.on('readable', function () {
  console.log('Data:', port.read());
});

port.on('error', function(err) {
  console.log('Error: ', err.message);
});

function requestData()
{
  port.write(typeRequested[dataRequested],  function(err) {
                      if (err) {
                        return console.log('Error on write: ', err.message);
                      }
                      console.log('COPY OK');
                    });  
  return 0;
}
// to begin the M2M communication
requestData();

