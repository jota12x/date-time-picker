"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTimeIntl = void 0;

var i0 = _interopRequireWildcard(require("@angular/core"));

var _rxjs = require("rxjs");

function _interopRequireWildcard(obj) {
  if (obj && obj.__esModule) {
    return obj;
  } else {
    var newObj = {};

    if (obj != null) {
      for (var key in obj) {
        if (Object.prototype.hasOwnProperty.call(obj, key)) {
          var desc = Object.defineProperty && Object.getOwnPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : {};

          if (desc.get || desc.set) {
            Object.defineProperty(newObj, key, desc);
          } else {
            newObj[key] = obj[key];
          }
        }
      }
    }

    newObj.default = obj;
    return newObj;
  }
}

var OwlDateTimeIntl = function () {
  function OwlDateTimeIntl() {
    this.changes = new _rxjs.Subject();
    this.upSecondLabel = 'Add a second';
    this.downSecondLabel = 'Minus a second';
    this.upMinuteLabel = 'Add a minute';
    this.downMinuteLabel = 'Minus a minute';
    this.upHourLabel = 'Add a hour';
    this.downHourLabel = 'Minus a hour';
    this.prevMonthLabel = 'Previous month';
    this.nextMonthLabel = 'Next month';
    this.prevYearLabel = 'Previous year';
    this.nextYearLabel = 'Next year';
    this.prevMultiYearLabel = 'Previous 21 years';
    this.nextMultiYearLabel = 'Next 21 years';
    this.switchToMonthViewLabel = 'Change to month view';
    this.switchToMultiYearViewLabel = 'Choose month and year';
    this.cancelBtnLabel = 'Cancel';
    this.setBtnLabel = 'Set';
    this.rangeFromLabel = 'From';
    this.rangeToLabel = 'To';
    this.hour12AMLabel = 'AM';
    this.hour12PMLabel = 'PM';
  }

  OwlDateTimeIntl.decorators = [{
    type: i0.Injectable,
    args: [{
      providedIn: 'root'
    }]
  }];
  OwlDateTimeIntl.ngInjectableDef = i0.defineInjectable({
    factory: function OwlDateTimeIntl_Factory() {
      return new OwlDateTimeIntl();
    },
    token: OwlDateTimeIntl,
    providedIn: "root"
  });
  return OwlDateTimeIntl;
}();

exports.OwlDateTimeIntl = OwlDateTimeIntl;