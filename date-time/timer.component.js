"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlTimerComponent = void 0;

var _core = require("@angular/core");

var _dateTimePickerIntl = require("./date-time-picker-intl.service");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _operators = require("rxjs/operators");

var OwlTimerComponent = function () {
  function OwlTimerComponent(ngZone, elmRef, pickerIntl, cdRef, dateTimeAdapter) {
    this.ngZone = ngZone;
    this.elmRef = elmRef;
    this.pickerIntl = pickerIntl;
    this.cdRef = cdRef;
    this.dateTimeAdapter = dateTimeAdapter;
    this.isPM = false;
    this.stepHour = 1;
    this.stepMinute = 1;
    this.stepSecond = 1;
    this.selectedChange = new _core.EventEmitter();
  }

  Object.defineProperty(OwlTimerComponent.prototype, "pickerMoment", {
    get: function get() {
      return this._pickerMoment;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "minDateTime", {
    get: function get() {
      return this._minDateTime;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._minDateTime = this.getValidDate(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "maxDateTime", {
    get: function get() {
      return this._maxDateTime;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._maxDateTime = this.getValidDate(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "hourValue", {
    get: function get() {
      return this.dateTimeAdapter.getHours(this.pickerMoment);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "hourBoxValue", {
    get: function get() {
      var hours = this.hourValue;

      if (!this.hour12Timer) {
        return hours;
      } else {
        if (hours === 0) {
          hours = 12;
          this.isPM = false;
        } else if (hours > 0 && hours < 12) {
          this.isPM = false;
        } else if (hours === 12) {
          this.isPM = true;
        } else if (hours > 12 && hours < 24) {
          hours = hours - 12;
          this.isPM = true;
        }

        return hours;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "minuteValue", {
    get: function get() {
      return this.dateTimeAdapter.getMinutes(this.pickerMoment);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "secondValue", {
    get: function get() {
      return this.dateTimeAdapter.getSeconds(this.pickerMoment);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "upHourButtonLabel", {
    get: function get() {
      return this.pickerIntl.upHourLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "downHourButtonLabel", {
    get: function get() {
      return this.pickerIntl.downHourLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "upMinuteButtonLabel", {
    get: function get() {
      return this.pickerIntl.upMinuteLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "downMinuteButtonLabel", {
    get: function get() {
      return this.pickerIntl.downMinuteLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "upSecondButtonLabel", {
    get: function get() {
      return this.pickerIntl.upSecondLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "downSecondButtonLabel", {
    get: function get() {
      return this.pickerIntl.downSecondLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "hour12ButtonLabel", {
    get: function get() {
      return this.isPM ? this.pickerIntl.hour12PMLabel : this.pickerIntl.hour12AMLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimerClass", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlTimerComponent.prototype, "owlDTTimeTabIndex", {
    get: function get() {
      return -1;
    },
    enumerable: true,
    configurable: true
  });

  OwlTimerComponent.prototype.ngOnInit = function () {};

  OwlTimerComponent.prototype.focus = function () {
    var _this = this;

    this.ngZone.runOutsideAngular(function () {
      _this.ngZone.onStable.asObservable().pipe((0, _operators.take)(1)).subscribe(function () {
        _this.elmRef.nativeElement.focus();
      });
    });
  };

  OwlTimerComponent.prototype.setHourValueViaInput = function (hours) {
    if (this.hour12Timer && this.isPM && hours >= 1 && hours <= 11) {
      hours = hours + 12;
    } else if (this.hour12Timer && !this.isPM && hours === 12) {
      hours = 0;
    }

    this.setHourValue(hours);
  };

  OwlTimerComponent.prototype.setHourValue = function (hours) {
    var m = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
    this.selectedChange.emit(m);
    this.cdRef.markForCheck();
  };

  OwlTimerComponent.prototype.setMinuteValue = function (minutes) {
    var m = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
    this.selectedChange.emit(m);
    this.cdRef.markForCheck();
  };

  OwlTimerComponent.prototype.setSecondValue = function (seconds) {
    var m = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
    this.selectedChange.emit(m);
    this.cdRef.markForCheck();
  };

  OwlTimerComponent.prototype.setMeridiem = function (event) {
    this.isPM = !this.isPM;
    var hours = this.hourValue;

    if (this.isPM) {
      hours = hours + 12;
    } else {
      hours = hours - 12;
    }

    if (hours >= 0 && hours <= 23) {
      this.setHourValue(hours);
    }

    this.cdRef.markForCheck();
    event.preventDefault();
  };

  OwlTimerComponent.prototype.upHourEnabled = function () {
    return !this.maxDateTime || this.compareHours(this.stepHour, this.maxDateTime) < 1;
  };

  OwlTimerComponent.prototype.downHourEnabled = function () {
    return !this.minDateTime || this.compareHours(-this.stepHour, this.minDateTime) > -1;
  };

  OwlTimerComponent.prototype.upMinuteEnabled = function () {
    return !this.maxDateTime || this.compareMinutes(this.stepMinute, this.maxDateTime) < 1;
  };

  OwlTimerComponent.prototype.downMinuteEnabled = function () {
    return !this.minDateTime || this.compareMinutes(-this.stepMinute, this.minDateTime) > -1;
  };

  OwlTimerComponent.prototype.upSecondEnabled = function () {
    return !this.maxDateTime || this.compareSeconds(this.stepSecond, this.maxDateTime) < 1;
  };

  OwlTimerComponent.prototype.downSecondEnabled = function () {
    return !this.minDateTime || this.compareSeconds(-this.stepSecond, this.minDateTime) > -1;
  };

  OwlTimerComponent.prototype.compareHours = function (amount, comparedDate) {
    var hours = this.dateTimeAdapter.getHours(this.pickerMoment) + amount;
    var result = this.dateTimeAdapter.setHours(this.pickerMoment, hours);
    return this.dateTimeAdapter.compare(result, comparedDate);
  };

  OwlTimerComponent.prototype.compareMinutes = function (amount, comparedDate) {
    var minutes = this.dateTimeAdapter.getMinutes(this.pickerMoment) + amount;
    var result = this.dateTimeAdapter.setMinutes(this.pickerMoment, minutes);
    return this.dateTimeAdapter.compare(result, comparedDate);
  };

  OwlTimerComponent.prototype.compareSeconds = function (amount, comparedDate) {
    var seconds = this.dateTimeAdapter.getSeconds(this.pickerMoment) + amount;
    var result = this.dateTimeAdapter.setSeconds(this.pickerMoment, seconds);
    return this.dateTimeAdapter.compare(result, comparedDate);
  };

  OwlTimerComponent.prototype.getValidDate = function (obj) {
    return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj) ? obj : null;
  };

  OwlTimerComponent.decorators = [{
    type: _core.Component,
    args: [{
      exportAs: 'owlDateTimeTimer',
      selector: 'owl-date-time-timer',
      template: "<owl-date-time-timer-box [upBtnAriaLabel]=\"upHourButtonLabel\" [downBtnAriaLabel]=\"downHourButtonLabel\" [upBtnDisabled]=\"!upHourEnabled()\" [downBtnDisabled]=\"!downHourEnabled()\" [boxValue]=\"hourBoxValue\" [value]=\"hourValue\" [min]=\"0\" [max]=\"23\" [step]=\"stepHour\" [inputLabel]=\"'Hour'\" (inputChange)=\"setHourValueViaInput($event)\" (valueChange)=\"setHourValue($event)\"></owl-date-time-timer-box><owl-date-time-timer-box [showDivider]=\"true\" [upBtnAriaLabel]=\"upMinuteButtonLabel\" [downBtnAriaLabel]=\"downMinuteButtonLabel\" [upBtnDisabled]=\"!upMinuteEnabled()\" [downBtnDisabled]=\"!downMinuteEnabled()\" [value]=\"minuteValue\" [min]=\"0\" [max]=\"59\" [step]=\"stepMinute\" [inputLabel]=\"'Minute'\" (inputChange)=\"setMinuteValue($event)\" (valueChange)=\"setMinuteValue($event)\"></owl-date-time-timer-box><owl-date-time-timer-box *ngIf=\"showSecondsTimer\" [showDivider]=\"true\" [upBtnAriaLabel]=\"upSecondButtonLabel\" [downBtnAriaLabel]=\"downSecondButtonLabel\" [upBtnDisabled]=\"!upSecondEnabled()\" [downBtnDisabled]=\"!downSecondEnabled()\" [value]=\"secondValue\" [min]=\"0\" [max]=\"59\" [step]=\"stepSecond\" [inputLabel]=\"'Second'\" (inputChange)=\"setSecondValue($event)\" (valueChange)=\"setSecondValue($event)\"></owl-date-time-timer-box><div *ngIf=\"hour12Timer\" class=\"owl-dt-timer-hour12\"><button class=\"owl-dt-control-button owl-dt-timer-hour12-box\" type=\"button\" tabindex=\"0\" (click)=\"setMeridiem($event)\"><span class=\"owl-dt-control-button-content\" tabindex=\"-1\">{{hour12ButtonLabel}}</span></button></div>",
      styles: [""],
      preserveWhitespaces: false,
      changeDetection: _core.ChangeDetectionStrategy.OnPush
    }]
  }];

  OwlTimerComponent.ctorParameters = function () {
    return [{
      type: _core.NgZone
    }, {
      type: _core.ElementRef
    }, {
      type: _dateTimePickerIntl.OwlDateTimeIntl
    }, {
      type: _core.ChangeDetectorRef
    }, {
      type: _dateTimeAdapter.DateTimeAdapter,
      decorators: [{
        type: _core.Optional
      }]
    }];
  };

  OwlTimerComponent.propDecorators = {
    "pickerMoment": [{
      type: _core.Input
    }],
    "minDateTime": [{
      type: _core.Input
    }],
    "maxDateTime": [{
      type: _core.Input
    }],
    "showSecondsTimer": [{
      type: _core.Input
    }],
    "hour12Timer": [{
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
    "selectedChange": [{
      type: _core.Output
    }],
    "owlDTTimerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-timer']
    }],
    "owlDTTimeTabIndex": [{
      type: _core.HostBinding,
      args: ['attr.tabindex']
    }]
  };
  return OwlTimerComponent;
}();

exports.OwlTimerComponent = OwlTimerComponent;