"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTime = void 0;

var _core = require("@angular/core");

var _coercion = require("@angular/cdk/coercion");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _dateTimeFormat = require("./adapter/date-time-format.class");

var nextUniqueId = 0;

var OwlDateTime = function () {
  function OwlDateTime(dateTimeAdapter, dateTimeFormats) {
    var _this = this;

    this.dateTimeAdapter = dateTimeAdapter;
    this.dateTimeFormats = dateTimeFormats;
    this._showSecondsTimer = false;
    this._hour12Timer = false;
    this.startView = 'month';
    this._stepHour = 1;
    this._stepMinute = 1;
    this._stepSecond = 1;
    this._firstDayOfWeek = 0;
    this._hideOtherMonths = false;

    this.dateTimeChecker = function (dateTime) {
      return !!dateTime && (!_this.dateTimeFilter || _this.dateTimeFilter(dateTime)) && (!_this.minDateTime || _this.dateTimeAdapter.compare(dateTime, _this.minDateTime) >= 0) && (!_this.maxDateTime || _this.dateTimeAdapter.compare(dateTime, _this.maxDateTime) <= 0);
    };

    if (!this.dateTimeAdapter) {
      throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following " + "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " + "custom implementation.");
    }

    if (!this.dateTimeFormats) {
      throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following " + "modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a " + "custom implementation.");
    }

    this._id = "owl-dt-picker-" + nextUniqueId++;
  }

  Object.defineProperty(OwlDateTime.prototype, "showSecondsTimer", {
    get: function get() {
      return this._showSecondsTimer;
    },
    set: function set(val) {
      this._showSecondsTimer = (0, _coercion.coerceBooleanProperty)(val);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "hour12Timer", {
    get: function get() {
      return this._hour12Timer;
    },
    set: function set(val) {
      this._hour12Timer = (0, _coercion.coerceBooleanProperty)(val);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "stepHour", {
    get: function get() {
      return this._stepHour;
    },
    set: function set(val) {
      this._stepHour = (0, _coercion.coerceNumberProperty)(val, 1);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "stepMinute", {
    get: function get() {
      return this._stepMinute;
    },
    set: function set(val) {
      this._stepMinute = (0, _coercion.coerceNumberProperty)(val, 1);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "stepSecond", {
    get: function get() {
      return this._stepSecond;
    },
    set: function set(val) {
      this._stepSecond = (0, _coercion.coerceNumberProperty)(val, 1);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "firstDayOfWeek", {
    get: function get() {
      return this._firstDayOfWeek;
    },
    set: function set(value) {
      value = (0, _coercion.coerceNumberProperty)(value, 0);

      if (value > 6 || value < 0) {
        this._firstDayOfWeek = 0;
      } else {
        this._firstDayOfWeek = value;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "hideOtherMonths", {
    get: function get() {
      return this._hideOtherMonths;
    },
    set: function set(val) {
      this._hideOtherMonths = (0, _coercion.coerceBooleanProperty)(val);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "id", {
    get: function get() {
      return this._id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "formatString", {
    get: function get() {
      return this.pickerType === 'both' ? this.dateTimeFormats.fullPickerInput : this.pickerType === 'calendar' ? this.dateTimeFormats.datePickerInput : this.dateTimeFormats.timePickerInput;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTime.prototype, "disabled", {
    get: function get() {
      return false;
    },
    enumerable: true,
    configurable: true
  });

  OwlDateTime.prototype.getValidDate = function (obj) {
    return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj) ? obj : null;
  };

  OwlDateTime.ctorParameters = function () {
    return [{
      type: _dateTimeAdapter.DateTimeAdapter,
      decorators: [{
        type: _core.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.Inject,
        args: [_dateTimeFormat.OWL_DATE_TIME_FORMATS]
      }]
    }];
  };

  OwlDateTime.propDecorators = {
    "showSecondsTimer": [{
      type: _core.Input
    }],
    "hour12Timer": [{
      type: _core.Input
    }],
    "startView": [{
      type: _core.Input
    }],
    "stepHour": [{
      type: _core.Input
    }],
    "stepMinute": [{
      type: _core.Input
    }],
    "stepSecond": [{
      type: _core.Input
    }],
    "firstDayOfWeek": [{
      type: _core.Input
    }],
    "hideOtherMonths": [{
      type: _core.Input
    }]
  };
  return OwlDateTime;
}();

exports.OwlDateTime = OwlDateTime;