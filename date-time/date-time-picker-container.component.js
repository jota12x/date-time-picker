"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTimeContainerComponent = void 0;

var _core = require("@angular/core");

var _dateTimePickerIntl = require("./date-time-picker-intl.service");

var _calendar = require("./calendar.component");

var _timer = require("./timer.component");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _rxjs = require("rxjs");

var _dateTimePicker = require("./date-time-picker.animations");

var _keycodes = require("@angular/cdk/keycodes");

var OwlDateTimeContainerComponent = function () {
  function OwlDateTimeContainerComponent(cdRef, elmRef, pickerIntl, dateTimeAdapter) {
    this.cdRef = cdRef;
    this.elmRef = elmRef;
    this.pickerIntl = pickerIntl;
    this.dateTimeAdapter = dateTimeAdapter;
    this.activeSelectedIndex = 0;
    this.hidePicker$ = new _rxjs.Subject();
    this.confirmSelected$ = new _rxjs.Subject();
    this.pickerOpened$ = new _rxjs.Subject();
  }

  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "hidePickerStream", {
    get: function get() {
      return this.hidePicker$.asObservable();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "confirmSelectedStream", {
    get: function get() {
      return this.confirmSelected$.asObservable();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerOpenedStream", {
    get: function get() {
      return this.pickerOpened$.asObservable();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerMoment", {
    get: function get() {
      return this._clamPickerMoment;
    },
    set: function set(value) {
      if (value) {
        this._clamPickerMoment = this.dateTimeAdapter.clampDate(value, this.picker.minDateTime, this.picker.maxDateTime);
      }

      this.cdRef.markForCheck();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "pickerType", {
    get: function get() {
      return this.picker.pickerType;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "cancelLabel", {
    get: function get() {
      return this.pickerIntl.cancelBtnLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "setLabel", {
    get: function get() {
      return this.pickerIntl.setBtnLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromLabel", {
    get: function get() {
      return this.pickerIntl.rangeFromLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toLabel", {
    get: function get() {
      return this.pickerIntl.rangeToLabel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "fromFormattedValue", {
    get: function get() {
      var value = this.picker.selecteds[0];
      return value ? this.dateTimeAdapter.format(value, this.picker.formatString) : '';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "toFormattedValue", {
    get: function get() {
      var value = this.picker.selecteds[1];
      return value ? this.dateTimeAdapter.format(value, this.picker.formatString) : '';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "showControlButtons", {
    get: function get() {
      return this.picker.pickerMode === 'dialog' || this.picker.pickerType !== 'calendar' && this.picker.pickerMode !== 'inline';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "containerElm", {
    get: function get() {
      return this.elmRef.nativeElement;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerClass", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTPopupContainerClass", {
    get: function get() {
      return this.picker.pickerMode === 'popup';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTDialogContainerClass", {
    get: function get() {
      return this.picker.pickerMode === 'dialog';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTInlineContainerClass", {
    get: function get() {
      return this.picker.pickerMode === 'inline';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerDisabledClass", {
    get: function get() {
      return this.picker.disabled;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerId", {
    get: function get() {
      return this.picker.id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeContainerComponent.prototype, "owlDTContainerAnimation", {
    get: function get() {
      return this.picker.pickerMode === 'inline' ? '' : 'enter';
    },
    enumerable: true,
    configurable: true
  });

  OwlDateTimeContainerComponent.prototype.ngOnInit = function () {};

  OwlDateTimeContainerComponent.prototype.ngAfterContentInit = function () {
    this.initPicker();
  };

  OwlDateTimeContainerComponent.prototype.ngAfterViewInit = function () {
    this.focusPicker();
  };

  OwlDateTimeContainerComponent.prototype.handleContainerAnimationDone = function (event) {
    var toState = event.toState;

    if (toState === 'enter') {
      this.pickerOpened$.next();
    }
  };

  OwlDateTimeContainerComponent.prototype.dateSelected = function (date) {
    var result;

    if (this.picker.isInSingleMode) {
      result = this.dateSelectedInSingleMode(date);

      if (result) {
        this.pickerMoment = result;
        this.picker.select(result);
      } else {
        if (this.pickerType === 'calendar') {
          this.hidePicker$.next(null);
        }
      }

      return;
    }

    if (this.picker.isInRangeMode) {
      result = this.dateSelectedInRangeMode(date);

      if (result) {
        this.pickerMoment = result[this.activeSelectedIndex];
        this.picker.select(result);
      }
    }
  };

  OwlDateTimeContainerComponent.prototype.timeSelected = function (time) {
    this.pickerMoment = this.dateTimeAdapter.clone(time);

    if (!this.picker.dateTimeChecker(this.pickerMoment)) {
      return;
    }

    if (this.picker.isInSingleMode) {
      this.picker.select(this.pickerMoment);
      return;
    }

    if (this.picker.isInRangeMode) {
      var selecteds = this.picker.selecteds.slice();

      if (this.activeSelectedIndex === 0 && selecteds[1] && this.dateTimeAdapter.compare(this.pickerMoment, selecteds[1]) === 1 || this.activeSelectedIndex === 1 && selecteds[0] && this.dateTimeAdapter.compare(this.pickerMoment, selecteds[0]) === -1) {
        selecteds[0] = this.pickerMoment;
        selecteds[1] = this.pickerMoment;
      } else {
        selecteds[this.activeSelectedIndex] = this.pickerMoment;
      }

      this.picker.select(selecteds);
    }
  };

  OwlDateTimeContainerComponent.prototype.onCancelClicked = function (event) {
    this.hidePicker$.next(null);
    event.preventDefault();
    return;
  };

  OwlDateTimeContainerComponent.prototype.onSetClicked = function (event) {
    if (!this.picker.dateTimeChecker(this.pickerMoment)) {
      this.hidePicker$.next(null);
      event.preventDefault();
      return;
    }

    this.confirmSelected$.next(event);
    event.preventDefault();
    return;
  };

  OwlDateTimeContainerComponent.prototype.handleClickOnInfoGroup = function (event, index) {
    this.setActiveSelectedIndex(index);
    event.preventDefault();
    event.stopPropagation();
  };

  OwlDateTimeContainerComponent.prototype.handleKeydownOnInfoGroup = function (event, next, index) {
    switch (event.keyCode) {
      case _keycodes.DOWN_ARROW:
      case _keycodes.RIGHT_ARROW:
      case _keycodes.UP_ARROW:
      case _keycodes.LEFT_ARROW:
        next.focus();
        this.setActiveSelectedIndex(index === 0 ? 1 : 0);
        event.preventDefault();
        event.stopPropagation();
        break;

      case _keycodes.SPACE:
        this.setActiveSelectedIndex(index);
        event.preventDefault();
        event.stopPropagation();
        break;

      default:
        return;
    }
  };

  OwlDateTimeContainerComponent.prototype.setActiveSelectedIndex = function (index) {
    if (this.picker.selectMode === 'range' && this.activeSelectedIndex !== index) {
      this.activeSelectedIndex = index;
      var selected = this.picker.selecteds[this.activeSelectedIndex];

      if (this.picker.selecteds && selected) {
        this.pickerMoment = this.dateTimeAdapter.clone(selected);
      }
    }

    return;
  };

  OwlDateTimeContainerComponent.prototype.initPicker = function () {
    this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now();
    this.activeSelectedIndex = this.picker.selectMode === 'rangeTo' ? 1 : 0;
  };

  OwlDateTimeContainerComponent.prototype.dateSelectedInSingleMode = function (date) {
    if (this.dateTimeAdapter.isSameDay(date, this.picker.selected)) {
      return null;
    }

    return this.updateAndCheckCalendarDate(date);
  };

  OwlDateTimeContainerComponent.prototype.dateSelectedInRangeMode = function (date) {
    var from = this.picker.selecteds[0];
    var to = this.picker.selecteds[1];
    var result = this.updateAndCheckCalendarDate(date);

    if (!result) {
      return null;
    }

    if (this.picker.selectMode === 'range') {
      if (this.picker.selecteds && this.picker.selecteds.length && !to && from && this.dateTimeAdapter.differenceInCalendarDays(result, from) >= 0) {
        to = result;
        this.activeSelectedIndex = 1;
      } else {
        from = result;
        to = null;
        this.activeSelectedIndex = 0;
      }
    } else if (this.picker.selectMode === 'rangeFrom') {
      from = result;

      if (to && this.dateTimeAdapter.compare(from, to) > 0) {
        to = null;
      }
    } else if (this.picker.selectMode === 'rangeTo') {
      to = result;

      if (from && this.dateTimeAdapter.compare(from, to) > 0) {
        from = null;
      }
    }

    return [from, to];
  };

  OwlDateTimeContainerComponent.prototype.updateAndCheckCalendarDate = function (date) {
    var result;

    if (this.picker.pickerType === 'both') {
      result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(date), this.dateTimeAdapter.getMonth(date), this.dateTimeAdapter.getDate(date), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
      result = this.dateTimeAdapter.clampDate(result, this.picker.minDateTime, this.picker.maxDateTime);
    } else {
      result = this.dateTimeAdapter.clone(date);
    }

    return this.picker.dateTimeChecker(result) ? result : null;
  };

  OwlDateTimeContainerComponent.prototype.focusPicker = function () {
    if (this.picker.pickerMode === 'inline') {
      return;
    }

    if (this.calendar) {
      this.calendar.focusActiveCell();
    } else if (this.timer) {
      this.timer.focus();
    }
  };

  OwlDateTimeContainerComponent.decorators = [{
    type: _core.Component,
    args: [{
      exportAs: 'owlDateTimeContainer',
      selector: 'owl-date-time-container',
      template: "<div [cdkTrapFocus]=\"picker.pickerMode !== 'inline'\" [@fadeInPicker]=\"picker.pickerMode === 'inline'? '' : 'enter'\" class=\"owl-dt-container-inner\"><owl-date-time-calendar *ngIf=\"pickerType === 'both' || pickerType === 'calendar'\" class=\"owl-dt-container-row\" [firstDayOfWeek]=\"picker.firstDayOfWeek\" [(pickerMoment)]=\"pickerMoment\" [selected]=\"picker.selected\" [selecteds]=\"picker.selecteds\" [selectMode]=\"picker.selectMode\" [minDate]=\"picker.minDateTime\" [maxDate]=\"picker.maxDateTime\" [dateFilter]=\"picker.dateTimeFilter\" [startView]=\"picker.startView\" [hideOtherMonths]=\"picker.hideOtherMonths\" (yearSelected)=\"picker.selectYear($event)\" (monthSelected)=\"picker.selectMonth($event)\" (selectedChange)=\"dateSelected($event)\"></owl-date-time-calendar><owl-date-time-timer *ngIf=\"pickerType === 'both' || pickerType === 'timer'\" class=\"owl-dt-container-row\" [pickerMoment]=\"pickerMoment\" [minDateTime]=\"picker.minDateTime\" [maxDateTime]=\"picker.maxDateTime\" [showSecondsTimer]=\"picker.showSecondsTimer\" [hour12Timer]=\"picker.hour12Timer\" [stepHour]=\"picker.stepHour\" [stepMinute]=\"picker.stepMinute\" [stepSecond]=\"picker.stepSecond\" (selectedChange)=\"timeSelected($event)\"></owl-date-time-timer><div *ngIf=\"picker.isInRangeMode\" role=\"radiogroup\" class=\"owl-dt-container-info owl-dt-container-row\"><div role=\"radio\" [tabindex]=\"activeSelectedIndex === 0 ? 0 : -1\" [attr.aria-checked]=\"activeSelectedIndex === 0\" class=\"owl-dt-control owl-dt-container-range owl-dt-container-from\" [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 0}\" (click)=\"handleClickOnInfoGroup($event, 0)\" (keydown)=\"handleKeydownOnInfoGroup($event, to, 0)\" #from><span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\"><span class=\"owl-dt-container-info-label\">{{fromLabel}}:</span> <span class=\"owl-dt-container-info-value\">{{fromFormattedValue}}</span></span></div><div role=\"radio\" [tabindex]=\"activeSelectedIndex === 1 ? 0 : -1\" [attr.aria-checked]=\"activeSelectedIndex === 1\" class=\"owl-dt-control owl-dt-container-range owl-dt-container-to\" [ngClass]=\"{'owl-dt-container-info-active': activeSelectedIndex === 1}\" (click)=\"handleClickOnInfoGroup($event, 1)\" (keydown)=\"handleKeydownOnInfoGroup($event, from, 1)\" #to><span class=\"owl-dt-control-content owl-dt-container-range-content\" tabindex=\"-1\"><span class=\"owl-dt-container-info-label\">{{toLabel}}:</span> <span class=\"owl-dt-container-info-value\">{{toFormattedValue}}</span></span></div></div><div *ngIf=\"showControlButtons\" class=\"owl-dt-container-buttons owl-dt-container-row\"><button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\" type=\"button\" tabindex=\"0\" (click)=\"onCancelClicked($event)\"><span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">{{cancelLabel}}</span></button> <button class=\"owl-dt-control owl-dt-control-button owl-dt-container-control-button\" type=\"button\" tabindex=\"0\" (click)=\"onSetClicked($event)\"><span class=\"owl-dt-control-content owl-dt-control-button-content\" tabindex=\"-1\">{{setLabel}}</span></button></div></div>",
      styles: [""],
      changeDetection: _core.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: false,
      animations: [_dateTimePicker.owlDateTimePickerAnimations.transformPicker, _dateTimePicker.owlDateTimePickerAnimations.fadeInPicker]
    }]
  }];

  OwlDateTimeContainerComponent.ctorParameters = function () {
    return [{
      type: _core.ChangeDetectorRef
    }, {
      type: _core.ElementRef
    }, {
      type: _dateTimePickerIntl.OwlDateTimeIntl
    }, {
      type: _dateTimeAdapter.DateTimeAdapter,
      decorators: [{
        type: _core.Optional
      }]
    }];
  };

  OwlDateTimeContainerComponent.propDecorators = {
    "calendar": [{
      type: _core.ViewChild,
      args: [_calendar.OwlCalendarComponent]
    }],
    "timer": [{
      type: _core.ViewChild,
      args: [_timer.OwlTimerComponent]
    }],
    "owlDTContainerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-container']
    }],
    "owlDTPopupContainerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-popup-container']
    }],
    "owlDTDialogContainerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-dialog-container']
    }],
    "owlDTInlineContainerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-inline-container']
    }],
    "owlDTContainerDisabledClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-container-disabled']
    }],
    "owlDTContainerId": [{
      type: _core.HostBinding,
      args: ['attr.id']
    }],
    "owlDTContainerAnimation": [{
      type: _core.HostBinding,
      args: ['@transformPicker']
    }],
    "handleContainerAnimationDone": [{
      type: _core.HostListener,
      args: ['@transformPicker.done', ['$event']]
    }]
  };
  return OwlDateTimeContainerComponent;
}();

exports.OwlDateTimeContainerComponent = OwlDateTimeContainerComponent;