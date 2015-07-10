'use strict'

var fs = require('fs');
var buf = fs.readFileSync('palette-bitmap.bmp');

var endPalette = buf.readUInt32LE(10);

//Invert all colors
function invertColors() {
  for (var i = 54; i < buf.readUInt32LE(10); i++) {
    if((i - 53) % 4 != 0) {
      buf.writeUInt8(255 - buf.readUInt8(i), i);
    }
  }
}


//Grayscale
function greyScale() {
  for (var i = 54; i < endPalette; i += 4){
    var grey = Math.floor((buf.readUInt8(i) + buf.readUInt8(i+1) + buf.readUInt8(i+2)) / 3);
    buf.writeUInt8(grey, i);
    buf.writeUInt8(grey, i + 1);
    buf.writeUInt8(grey, i + 2);
  }
}

//Scale one color
function scaleOneColor(color) {
  for (var i = 54; i < endPalette; i += 4) {

    var blue = buf.readUInt8(i);
    var green = buf.readUInt8(i + 1);
    var red = buf.readUInt8(i + 2);
    var grey = Math.floor((blue + green + red) / 3);

    if (color == 'blue') {
      buf.writeUInt8(255, i);
    } else if (color == 'green') {
      buf.writeUInt8(255, i + 1);
    } else if (color == 'red') {
      buf.writeUInt8(255, i + 2);
    }
  }
}

//Transform the file SELECT ONE
//invertColors();
greyScale();
//scaleOneColor('blue');
//scaleOneColor('green');
//scaleOneColor('red');

//Write buf to newFile.bmp
fs.writeFileSync('newFilePaletted.bmp', buf);



