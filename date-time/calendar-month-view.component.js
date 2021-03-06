"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlMonthViewComponent = void 0;

var _core = require("@angular/core");

var _calendarBody = require("./calendar-body.component");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _dateTimeFormat = require("./adapter/date-time-format.class");

var _rxjs = require("rxjs");

var _keycodes = require("@angular/cdk/keycodes");

var _coercion = require("@angular/cdk/coercion");

var DAYS_PER_WEEK = 7;
var WEEKS_PER_VIEW = 6;

var OwlMonthViewComponent = function () {
  function OwlMonthViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
    this.cdRef = cdRef;
    this.dateTimeAdapter = dateTimeAdapter;
    this.dateTimeFormats = dateTimeFormats;
    this.hideOtherMonths = false;
    this._firstDayOfWeek = 0;
    this._selectMode = 'single';
    this._selecteds = [];
    this.localeSub = _rxjs.Subscription.EMPTY;
    this.initiated = false;
    this.selectedDates = [];
    this.selectedChange = new _core.EventEmitter();
    this.userSelection = new _core.EventEmitter();
    this.pickerMomentChange = new _core.EventEmitter();
  }

  Object.defineProperty(OwlMonthViewComponent.prototype, "firstDayOfWeek", {
    get: function get() {
      return this._firstDayOfWeek;
    },
    set: function set(val) {
      val = (0, _coercion.coerceNumberProperty)(val);

      if (val >= 0 && val <= 6 && val !== this._firstDayOfWeek) {
        this._firstDayOfWeek = val;

        if (this.initiated) {
          this.generateWeekDays();
          this.generateCalendar();
          this.cdRef.markForCheck();
        }
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "selectMode", {
    get: function get() {
      return this._selectMode;
    },
    set: function set(val) {
      this._selectMode = val;

      if (this.initiated) {
        this.generateCalendar();
        this.cdRef.markForCheck();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "selected", {
    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      var oldSelected = this._selected;
      value = this.dateTimeAdapter.deserialize(value);
      this._selected = this.getValidDate(value);

      if (!this.dateTimeAdapter.isSameDay(oldSelected, this._selected)) {
        this.setSelectedDates();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "selecteds", {
    get: function get() {
      return this._selecteds;
    },
    set: function set(values) {
      var _this = this;

      this._selecteds = values.map(function (v) {
        v = _this.dateTimeAdapter.deserialize(v);
        return _this.getValidDate(v);
      });
      this.setSelectedDates();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "pickerMoment", {
    get: function get() {
      return this._pickerMoment;
    },
    set: function set(value) {
      var oldMoment = this._pickerMoment;
      value = this.dateTimeAdapter.deserialize(value);
      this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();
      this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1);

      if (!this.isSameMonth(oldMoment, this._pickerMoment) && this.initiated) {
        this.generateCalendar();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "dateFilter", {
    get: function get() {
      return this._dateFilter;
    },
    set: function set(filter) {
      this._dateFilter = filter;

      if (this.initiated) {
        this.generateCalendar();
        this.cdRef.markForCheck();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "minDate", {
    get: function get() {
      return this._minDate;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._minDate = this.getValidDate(value);

      if (this.initiated) {
        this.generateCalendar();
        this.cdRef.markForCheck();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "maxDate", {
    get: function get() {
      return this._maxDate;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._maxDate = this.getValidDate(value);

      if (this.initiated) {
        this.generateCalendar();
        this.cdRef.markForCheck();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "weekdays", {
    get: function get() {
      return this._weekdays;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "days", {
    get: function get() {
      return this._days;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "activeCell", {
    get: function get() {
      if (this.pickerMoment) {
        return this.dateTimeAdapter.getDate(this.pickerMoment) + this.firstRowOffset - 1;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "isInSingleMode", {
    get: function get() {
      return this.selectMode === 'single';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "isInRangeMode", {
    get: function get() {
      return this.selectMode === 'range' || this.selectMode === 'rangeFrom' || this.selectMode === 'rangeTo';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlMonthViewComponent.prototype, "owlDTCalendarView", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });

  OwlMonthViewComponent.prototype.ngOnInit = function () {
    var _this = this;

    this.generateWeekDays();
    this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
      _this.generateWeekDays();

      _this.generateCalendar();

      _this.cdRef.markForCheck();
    });
  };

  OwlMonthViewComponent.prototype.ngAfterContentInit = function () {
    this.generateCalendar();
    this.initiated = true;
  };

  OwlMonthViewComponent.prototype.ngOnDestroy = function () {
    this.localeSub.unsubscribe();
  };

  OwlMonthViewComponent.prototype.selectCalendarCell = function (cell) {
    if (!cell.enabled || this.hideOtherMonths && cell.out) {
      return;
    }

    this.selectDate(cell.value);
  };

  OwlMonthViewComponent.prototype.selectDate = function (date) {
    var daysDiff = date - 1;
    var selected = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
    this.selectedChange.emit(selected);
    this.userSelection.emit();
  };

  OwlMonthViewComponent.prototype.handleCalendarKeydown = function (event) {
    var moment;

    switch (event.keyCode) {
      case _keycodes.LEFT_ARROW:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.RIGHT_ARROW:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.UP_ARROW:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.DOWN_ARROW:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.HOME:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment));
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.END:
        moment = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) - this.dateTimeAdapter.getDate(this.pickerMoment));
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.PAGE_UP:
        moment = event.altKey ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1) : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.PAGE_DOWN:
        moment = event.altKey ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1) : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.ENTER:
        if (!this.dateFilter || this.dateFilter(this.pickerMoment)) {
          this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
        }

        break;

      default:
        return;
    }

    this.focusActiveCell();
    event.preventDefault();
  };

  OwlMonthViewComponent.prototype.generateWeekDays = function () {
    var longWeekdays = this.dateTimeAdapter.getDayOfWeekNames('long');
    var shortWeekdays = this.dateTimeAdapter.getDayOfWeekNames('short');
    var narrowWeekdays = this.dateTimeAdapter.getDayOfWeekNames('narrow');
    var firstDayOfWeek = this.firstDayOfWeek;
    var weekdays = longWeekdays.map(function (long, i) {
      return {
        long: long,
        short: shortWeekdays[i],
        narrow: narrowWeekdays[i]
      };
    });
    this._weekdays = weekdays.slice(firstDayOfWeek).concat(weekdays.slice(0, firstDayOfWeek));
    this.dateNames = this.dateTimeAdapter.getDateNames();
    return;
  };

  OwlMonthViewComponent.prototype.generateCalendar = function () {
    if (!this.pickerMoment) {
      return;
    }

    this.todayDate = null;
    var startWeekdayOfMonth = this.dateTimeAdapter.getDay(this.firstDateOfMonth);
    var firstDayOfWeek = this.firstDayOfWeek;
    var daysDiff = 0 - (startWeekdayOfMonth + (DAYS_PER_WEEK - firstDayOfWeek)) % DAYS_PER_WEEK;
    this.firstRowOffset = Math.abs(daysDiff);
    this._days = [];

    for (var i = 0; i < WEEKS_PER_VIEW; i++) {
      var week = [];

      for (var j = 0; j < DAYS_PER_WEEK; j++) {
        var date = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, daysDiff);
        var dateCell = this.createDateCell(date, daysDiff);

        if (this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), date)) {
          this.todayDate = daysDiff + 1;
        }

        week.push(dateCell);
        daysDiff += 1;
      }

      this._days.push(week);
    }

    this.setSelectedDates();
  };

  OwlMonthViewComponent.prototype.createDateCell = function (date, daysDiff) {
    var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment);
    var dateNum = this.dateTimeAdapter.getDate(date);
    var dateName = dateNum.toString();
    var ariaLabel = this.dateTimeAdapter.format(date, this.dateTimeFormats.dateA11yLabel);
    var enabled = this.isDateEnabled(date);
    var dayValue = daysDiff + 1;
    var out = dayValue < 1 || dayValue > daysInMonth;
    var cellClass = 'owl-dt-day-' + this.dateTimeAdapter.getDay(date);
    return new _calendarBody.CalendarCell(dayValue, dateName, ariaLabel, enabled, out, cellClass);
  };

  OwlMonthViewComponent.prototype.isDateEnabled = function (date) {
    return !!date && (!this.dateFilter || this.dateFilter(date)) && (!this.minDate || this.dateTimeAdapter.compare(date, this.minDate) >= 0) && (!this.maxDate || this.dateTimeAdapter.compare(date, this.maxDate) <= 0);
  };

  OwlMonthViewComponent.prototype.getValidDate = function (obj) {
    return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj) ? obj : null;
  };

  OwlMonthViewComponent.prototype.isSameMonth = function (dateLeft, dateRight) {
    return !!(dateLeft && dateRight && this.dateTimeAdapter.isValid(dateLeft) && this.dateTimeAdapter.isValid(dateRight) && this.dateTimeAdapter.getYear(dateLeft) === this.dateTimeAdapter.getYear(dateRight) && this.dateTimeAdapter.getMonth(dateLeft) === this.dateTimeAdapter.getMonth(dateRight));
  };

  OwlMonthViewComponent.prototype.setSelectedDates = function () {
    var _this = this;

    this.selectedDates = [];

    if (!this.firstDateOfMonth) {
      return;
    }

    if (this.isInSingleMode && this.selected) {
      var dayDiff = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
      this.selectedDates[0] = dayDiff + 1;
      return;
    }

    if (this.isInRangeMode && this.selecteds) {
      this.selectedDates = this.selecteds.map(function (selected) {
        if (_this.dateTimeAdapter.isValid(selected)) {
          var dayDiff = _this.dateTimeAdapter.differenceInCalendarDays(selected, _this.firstDateOfMonth);

          return dayDiff + 1;
        } else {
          return null;
        }
      });
    }
  };

  OwlMonthViewComponent.prototype.focusActiveCell = function () {
    this.calendarBodyElm.focusActiveCell();
  };

  OwlMonthViewComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'owl-date-time-month-view',
      exportAs: 'owlYearView',
      template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-month-table\" [class.owl-dt-calendar-only-current-month]=\"hideOtherMonths\"><thead class=\"owl-dt-calendar-header\"><tr class=\"owl-dt-weekdays\"><th *ngFor=\"let weekday of weekdays\" [attr.aria-label]=\"weekday.long\" class=\"owl-dt-weekday\" scope=\"col\"><span>{{weekday.short}}</span></th></tr><tr><th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"7\"></th></tr></thead><tbody owl-date-time-calendar-body role=\"grid\" [rows]=\"days\" [todayValue]=\"todayDate\" [selectedValues]=\"selectedDates\" [selectMode]=\"selectMode\" [activeCell]=\"activeCell\" (keydown)=\"handleCalendarKeydown($event)\" (select)=\"selectCalendarCell($event)\"></tbody></table>",
      styles: [""],
      preserveWhitespaces: false,
      changeDetection: _core.ChangeDetectionStrategy.OnPush
    }]
  }];

  OwlMonthViewComponent.ctorParameters = function () {
    return [{
      type: _core.ChangeDetectorRef
    }, {
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

  OwlMonthViewComponent.propDecorators = {
    "hideOtherMonths": [{
      type: _core.Input
    }],
    "firstDayOfWeek": [{
      type: _core.Input
    }],
    "selectMode": [{
      type: _core.Input
    }],
    "selected": [{
      type: _core.Input
    }],
    "selecteds": [{
      type: _core.Input
    }],
    "pickerMoment": [{
      type: _core.Input
    }],
    "dateFilter": [{
      type: _core.Input
    }],
    "minDate": [{
      type: _core.Input
    }],
    "maxDate": [{
      type: _core.Input
    }],
    "selectedChange": [{
      type: _core.Output
    }],
    "userSelection": [{
      type: _core.Output
    }],
    "pickerMomentChange": [{
      type: _core.Output
    }],
    "calendarBodyElm": [{
      type: _core.ViewChild,
      args: [_calendarBody.OwlCalendarBodyComponent]
    }],
    "owlDTCalendarView": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-calendar-view']
    }]
  };
  return OwlMonthViewComponent;
}();

exports.OwlMonthViewComponent = OwlMonthViewComponent;