"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTimeModule = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _a11y = require("@angular/cdk/a11y");

var _overlay = require("@angular/cdk/overlay");

var _dateTimePickerTrigger = require("./date-time-picker-trigger.directive");

var _dateTimePicker = require("./date-time-picker.component");

var _dateTimePickerContainer = require("./date-time-picker-container.component");

var _dateTimePickerInput = require("./date-time-picker-input.directive");

var _dateTimePickerIntl = require("./date-time-picker-intl.service");

var _calendarMonthView = require("./calendar-month-view.component");

var _calendarBody = require("./calendar-body.component");

var _calendarYearView = require("./calendar-year-view.component");

var _calendarMultiYearView = require("./calendar-multi-year-view.component");

var _timerBox = require("./timer-box.component");

var _timer = require("./timer.component");

var _numberedFixLen = require("./numberedFixLen.pipe");

var _calendar = require("./calendar.component");

var _dateTimeInline = require("./date-time-inline.component");

var _dialog = require("../dialog");

var OwlDateTimeModule = function () {
  function OwlDateTimeModule() {}

  OwlDateTimeModule.decorators = [{
    type: _core.NgModule,
    args: [{
      imports: [_common.CommonModule, _overlay.OverlayModule, _dialog.OwlDialogModule, _a11y.A11yModule],
      exports: [_calendar.OwlCalendarComponent, _timer.OwlTimerComponent, _dateTimePickerTrigger.OwlDateTimeTriggerDirective, _dateTimePickerInput.OwlDateTimeInputDirective, _dateTimePicker.OwlDateTimeComponent, _dateTimeInline.OwlDateTimeInlineComponent, _calendarMultiYearView.OwlMultiYearViewComponent, _calendarYearView.OwlYearViewComponent, _calendarMonthView.OwlMonthViewComponent],
      declarations: [_dateTimePickerTrigger.OwlDateTimeTriggerDirective, _dateTimePickerInput.OwlDateTimeInputDirective, _dateTimePicker.OwlDateTimeComponent, _dateTimePickerContainer.OwlDateTimeContainerComponent, _calendarMultiYearView.OwlMultiYearViewComponent, _calendarYearView.OwlYearViewComponent, _calendarMonthView.OwlMonthViewComponent, _timer.OwlTimerComponent, _timerBox.OwlTimerBoxComponent, _calendar.OwlCalendarComponent, _calendarBody.OwlCalendarBodyComponent, _numberedFixLen.NumberFixedLenPipe, _dateTimeInline.OwlDateTimeInlineComponent],
      providers: [_dateTimePickerIntl.OwlDateTimeIntl, _dateTimePicker.OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER],
      entryComponents: [_dateTimePickerContainer.OwlDateTimeContainerComponent]
    }]
  }];
  return OwlDateTimeModule;
}();

exports.OwlDateTimeModule = OwlDateTimeModule;