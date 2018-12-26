"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlYearViewComponent = void 0;

var _core = require("@angular/core");

var _calendarBody = require("./calendar-body.component");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _dateTimeFormat = require("./adapter/date-time-format.class");

var _rxjs = require("rxjs");

var _keycodes = require("@angular/cdk/keycodes");

var MONTHS_PER_YEAR = 12;
var MONTHS_PER_ROW = 3;

var OwlYearViewComponent = function () {
  function OwlYearViewComponent(cdRef, dateTimeAdapter, dateTimeFormats) {
    this.cdRef = cdRef;
    this.dateTimeAdapter = dateTimeAdapter;
    this.dateTimeFormats = dateTimeFormats;
    this._selectMode = 'single';
    this._selecteds = [];
    this.localeSub = _rxjs.Subscription.EMPTY;
    this.initiated = false;
    this.selectedMonths = [];
    this.change = new _core.EventEmitter();
    this.monthSelected = new _core.EventEmitter();
    this.pickerMomentChange = new _core.EventEmitter();
    this.keyboardEnter = new _core.EventEmitter();
    this.monthNames = this.dateTimeAdapter.getMonthNames('short');
  }

  Object.defineProperty(OwlYearViewComponent.prototype, "selectMode", {
    get: function get() {
      return this._selectMode;
    },
    set: function set(val) {
      this._selectMode = val;

      if (this.initiated) {
        this.generateMonthList();
        this.cdRef.markForCheck();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "selected", {
    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._selected = this.getValidDate(value);
      this.setSelectedMonths();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "selecteds", {
    get: function get() {
      return this._selecteds;
    },
    set: function set(values) {
      this._selecteds = [];

      for (var i = 0; i < values.length; i++) {
        var value = this.dateTimeAdapter.deserialize(values[i]);

        this._selecteds.push(this.getValidDate(value));
      }

      this.setSelectedMonths();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "pickerMoment", {
    get: function get() {
      return this._pickerMoment;
    },
    set: function set(value) {
      var oldMoment = this._pickerMoment;
      value = this.dateTimeAdapter.deserialize(value);
      this._pickerMoment = this.getValidDate(value) || this.dateTimeAdapter.now();

      if (!this.hasSameYear(oldMoment, this._pickerMoment) && this.initiated) {
        this.generateMonthList();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "dateFilter", {
    get: function get() {
      return this._dateFilter;
    },
    set: function set(filter) {
      this._dateFilter = filter;

      if (this.initiated) {
        this.generateMonthList();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "minDate", {
    get: function get() {
      return this._minDate;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._minDate = this.getValidDate(value);

      if (this.initiated) {
        this.generateMonthList();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "maxDate", {
    get: function get() {
      return this._maxDate;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      this._maxDate = this.getValidDate(value);

      if (this.initiated) {
        this.generateMonthList();
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "months", {
    get: function get() {
      return this._months;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "activeCell", {
    get: function get() {
      if (this._pickerMoment) {
        return this.dateTimeAdapter.getMonth(this._pickerMoment);
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "isInSingleMode", {
    get: function get() {
      return this.selectMode === 'single';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "isInRangeMode", {
    get: function get() {
      return this.selectMode === 'range' || this.selectMode === 'rangeFrom' || this.selectMode === 'rangeTo';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlYearViewComponent.prototype, "owlDTCalendarView", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });

  OwlYearViewComponent.prototype.ngOnInit = function () {
    var _this = this;

    this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
      _this.generateMonthList();

      _this.cdRef.markForCheck();
    });
  };

  OwlYearViewComponent.prototype.ngAfterContentInit = function () {
    this.generateMonthList();
    this.initiated = true;
  };

  OwlYearViewComponent.prototype.ngOnDestroy = function () {
    this.localeSub.unsubscribe();
  };

  OwlYearViewComponent.prototype.selectCalendarCell = function (cell) {
    this.selectMonth(cell.value);
  };

  OwlYearViewComponent.prototype.selectMonth = function (month) {
    var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
    this.monthSelected.emit(firstDateOfMonth);
    var daysInMonth = this.dateTimeAdapter.getNumDaysInMonth(firstDateOfMonth);
    var result = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, Math.min(daysInMonth, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
    this.change.emit(result);
  };

  OwlYearViewComponent.prototype.handleCalendarKeydown = function (event) {
    var moment;

    switch (event.keyCode) {
      case _keycodes.LEFT_ARROW:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.RIGHT_ARROW:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.UP_ARROW:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.DOWN_ARROW:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.HOME:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment));
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.END:
        moment = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment));
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.PAGE_UP:
        moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? -10 : -1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.PAGE_DOWN:
        moment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, event.altKey ? 10 : 1);
        this.pickerMomentChange.emit(moment);
        break;

      case _keycodes.ENTER:
        this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment));
        this.keyboardEnter.emit();
        break;

      default:
        return;
    }

    this.focusActiveCell();
    event.preventDefault();
  };

  OwlYearViewComponent.prototype.generateMonthList = function () {
    if (!this.pickerMoment) {
      return;
    }

    this.setSelectedMonths();
    this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now());
    this._months = [];

    for (var i = 0; i < MONTHS_PER_YEAR / MONTHS_PER_ROW; i++) {
      var row = [];

      for (var j = 0; j < MONTHS_PER_ROW; j++) {
        var month = j + i * MONTHS_PER_ROW;
        var monthCell = this.createMonthCell(month);
        row.push(monthCell);
      }

      this._months.push(row);
    }

    return;
  };

  OwlYearViewComponent.prototype.createMonthCell = function (month) {
    var startDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);
    var ariaLabel = this.dateTimeAdapter.format(startDateOfMonth, this.dateTimeFormats.monthYearA11yLabel);
    var cellClass = 'owl-dt-month-' + month;
    return new _calendarBody.CalendarCell(month, this.monthNames[month], ariaLabel, this.isMonthEnabled(month), false, cellClass);
  };

  OwlYearViewComponent.prototype.isMonthEnabled = function (month) {
    var firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), month, 1);

    for (var date = firstDateOfMonth; this.dateTimeAdapter.getMonth(date) === month; date = this.dateTimeAdapter.addCalendarDays(date, 1)) {
      if (!!date && (!this.dateFilter || this.dateFilter(date)) && (!this.minDate || this.dateTimeAdapter.compare(date, this.minDate) >= 0) && (!this.maxDate || this.dateTimeAdapter.compare(date, this.maxDate) <= 0)) {
        return true;
      }
    }

    return false;
  };

  OwlYearViewComponent.prototype.getMonthInCurrentYear = function (date) {
    if (this.getValidDate(date) && this.getValidDate(this._pickerMoment)) {
      var result = this.dateTimeAdapter.compareYear(date, this._pickerMoment);

      if (result < 0) {
        return -1;
      } else if (result > 0) {
        return 12;
      } else {
        return this.dateTimeAdapter.getMonth(date);
      }
    } else {
      return null;
    }
  };

  OwlYearViewComponent.prototype.setSelectedMonths = function () {
    this.selectedMonths = [];

    if (this.isInSingleMode && this.selected) {
      this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected);
    }

    if (this.isInRangeMode && this.selecteds) {
      this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]);
      this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]);
    }
  };

  OwlYearViewComponent.prototype.hasSameYear = function (dateLeft, dateRight) {
    return !!(dateLeft && dateRight && this.dateTimeAdapter.getYear(dateLeft) === this.dateTimeAdapter.getYear(dateRight));
  };

  OwlYearViewComponent.prototype.getValidDate = function (obj) {
    return this.dateTimeAdapter.isDateInstance(obj) && this.dateTimeAdapter.isValid(obj) ? obj : null;
  };

  OwlYearViewComponent.prototype.focusActiveCell = function () {
    this.calendarBodyElm.focusActiveCell();
  };

  OwlYearViewComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'owl-date-time-year-view',
      exportAs: 'owlMonthView',
      template: "<table class=\"owl-dt-calendar-table owl-dt-calendar-year-table\"><thead class=\"owl-dt-calendar-header\"><tr><th class=\"owl-dt-calendar-table-divider\" aria-hidden=\"true\" colspan=\"3\"></th></tr></thead><tbody owl-date-time-calendar-body role=\"grid\" [rows]=\"months\" [numCols]=\"3\" [cellRatio]=\"3 / 7\" [activeCell]=\"activeCell\" [todayValue]=\"todayMonth\" [selectedValues]=\"selectedMonths\" [selectMode]=\"selectMode\" (keydown)=\"handleCalendarKeydown($event)\" (select)=\"selectCalendarCell($event)\"></tbody></table>",
      styles: [""],
      preserveWhitespaces: false,
      changeDetection: _core.ChangeDetectionStrategy.OnPush
    }]
  }];

  OwlYearViewComponent.ctorParameters = function () {
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

  OwlYearViewComponent.propDecorators = {
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
    "change": [{
      type: _core.Output
    }],
    "monthSelected": [{
      type: _core.Output
    }],
    "pickerMomentChange": [{
      type: _core.Output
    }],
    "keyboardEnter": [{
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
  return OwlYearViewComponent;
}();

exports.OwlYearViewComponent = OwlYearViewComponent;