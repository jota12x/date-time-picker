"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.NumberFixedLenPipe = void 0;

var _core = require("@angular/core");

var NumberFixedLenPipe = function () {
  function NumberFixedLenPipe() {}

  NumberFixedLenPipe.prototype.transform = function (num, len) {
    var number = Math.floor(num);
    var length = Math.floor(len);

    if (num === null || isNaN(number) || isNaN(length)) {
      return num;
    }

    var numString = number.toString();

    while (numString.length < length) {
      numString = '0' + numString;
    }

    return numString;
  };

  NumberFixedLenPipe.decorators = [{
    type: _core.Pipe,
    args: [{
      name: 'numberFixedLen'
    }]
  }];
  return NumberFixedLenPipe;
}();

exports.NumberFixedLenPipe = NumberFixedLenPipe;