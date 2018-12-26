"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.ɵ0 = exports.OwlNativeDateTimeModule = exports.NativeDateTimeModule = void 0;

var _core = require("@angular/core");

var _platform = require("@angular/cdk/platform");

var _dateTimeAdapter = require("./date-time-adapter.class");

var _nativeDateTimeAdapter = require("./native-date-time-adapter.class");

var _dateTimeFormat = require("./date-time-format.class");

var _nativeDateTimeFormat = require("./native-date-time-format.class");

var NativeDateTimeModule = function () {
  function NativeDateTimeModule() {}

  NativeDateTimeModule.decorators = [{
    type: _core.NgModule,
    args: [{
      imports: [_platform.PlatformModule],
      providers: [{
        provide: _dateTimeAdapter.DateTimeAdapter,
        useClass: _nativeDateTimeAdapter.NativeDateTimeAdapter
      }]
    }]
  }];
  return NativeDateTimeModule;
}();

exports.NativeDateTimeModule = NativeDateTimeModule;
var ɵ0 = _nativeDateTimeFormat.OWL_NATIVE_DATE_TIME_FORMATS;
exports.ɵ0 = ɵ0;

var OwlNativeDateTimeModule = function () {
  function OwlNativeDateTimeModule() {}

  OwlNativeDateTimeModule.decorators = [{
    type: _core.NgModule,
    args: [{
      imports: [NativeDateTimeModule],
      providers: [{
        provide: _dateTimeFormat.OWL_DATE_TIME_FORMATS,
        useValue: ɵ0
      }]
    }]
  }];
  return OwlNativeDateTimeModule;
}();

exports.OwlNativeDateTimeModule = OwlNativeDateTimeModule;