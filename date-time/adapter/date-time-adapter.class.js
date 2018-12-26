"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OWL_DATE_TIME_LOCALE_FACTORY = OWL_DATE_TIME_LOCALE_FACTORY;
exports.DateTimeAdapter = exports.OWL_DATE_TIME_LOCALE_PROVIDER = exports.OWL_DATE_TIME_LOCALE = void 0;

var _rxjs = require("rxjs");

var _core = require("@angular/core");

var OWL_DATE_TIME_LOCALE = new _core.InjectionToken('OWL_DATE_TIME_LOCALE', {
  providedIn: 'root',
  factory: OWL_DATE_TIME_LOCALE_FACTORY
});
exports.OWL_DATE_TIME_LOCALE = OWL_DATE_TIME_LOCALE;

function OWL_DATE_TIME_LOCALE_FACTORY() {
  return (0, _core.inject)(_core.LOCALE_ID);
}

var OWL_DATE_TIME_LOCALE_PROVIDER = {
  provide: OWL_DATE_TIME_LOCALE,
  useExisting: _core.LOCALE_ID
};
exports.OWL_DATE_TIME_LOCALE_PROVIDER = OWL_DATE_TIME_LOCALE_PROVIDER;

var DateTimeAdapter = function () {
  function DateTimeAdapter() {
    this._localeChanges = new _rxjs.Subject();
    this.millisecondsInDay = 86400000;
    this.milliseondsInMinute = 60000;
  }

  Object.defineProperty(DateTimeAdapter.prototype, "localeChanges", {
    get: function get() {
      return this._localeChanges;
    },
    enumerable: true,
    configurable: true
  });

  DateTimeAdapter.prototype.compare = function (first, second) {
    if (!this.isValid(first) || !this.isValid(second)) {
      throw Error('JSNativeDate: Cannot compare invalid dates.');
    }

    var dateFirst = this.clone(first);
    var dateSecond = this.clone(second);
    var diff = this.getTime(dateFirst) - this.getTime(dateSecond);

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return diff;
    }
  };

  DateTimeAdapter.prototype.compareYear = function (first, second) {
    if (!this.isValid(first) || !this.isValid(second)) {
      throw Error('JSNativeDate: Cannot compare invalid dates.');
    }

    var yearLeft = this.getYear(first);
    var yearRight = this.getYear(second);
    var diff = yearLeft - yearRight;

    if (diff < 0) {
      return -1;
    } else if (diff > 0) {
      return 1;
    } else {
      return 0;
    }
  };

  DateTimeAdapter.prototype.deserialize = function (value) {
    if (value == null || this.isDateInstance(value) && this.isValid(value)) {
      return value;
    }

    return this.invalid();
  };

  DateTimeAdapter.prototype.setLocale = function (locale) {
    this.locale = locale;

    this._localeChanges.next();
  };

  DateTimeAdapter.prototype.clampDate = function (date, min, max) {
    if (min && this.compare(date, min) < 0) {
      return min;
    }

    if (max && this.compare(date, max) > 0) {
      return max;
    }

    return date;
  };

  return DateTimeAdapter;
}();

exports.DateTimeAdapter = DateTimeAdapter;