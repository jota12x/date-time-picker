"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlCalendarBodyComponent = exports.CalendarCell = void 0;

var _core = require("@angular/core");

var _operators = require("rxjs/operators");

var CalendarCell = function () {
  function CalendarCell(value, displayValue, ariaLabel, enabled, out, cellClass) {
    if (out === void 0) {
      out = false;
    }

    if (cellClass === void 0) {
      cellClass = '';
    }

    this.value = value;
    this.displayValue = displayValue;
    this.ariaLabel = ariaLabel;
    this.enabled = enabled;
    this.out = out;
    this.cellClass = cellClass;
  }

  return CalendarCell;
}();

exports.CalendarCell = CalendarCell;

var OwlCalendarBodyComponent = function () {
  function OwlCalendarBodyComponent(elmRef, ngZone) {
    this.elmRef = elmRef;
    this.ngZone = ngZone;
    this.activeCell = 0;
    this.numCols = 7;
    this.cellRatio = 1;
    this.select = new _core.EventEmitter();
  }

  Object.defineProperty(OwlCalendarBodyComponent.prototype, "owlDTCalendarBodyClass", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInSingleMode", {
    get: function get() {
      return this.selectMode === 'single';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlCalendarBodyComponent.prototype, "isInRangeMode", {
    get: function get() {
      return this.selectMode === 'range' || this.selectMode === 'rangeFrom' || this.selectMode === 'rangeTo';
    },
    enumerable: true,
    configurable: true
  });

  OwlCalendarBodyComponent.prototype.ngOnInit = function () {};

  OwlCalendarBodyComponent.prototype.selectCell = function (cell) {
    this.select.emit(cell);
  };

  OwlCalendarBodyComponent.prototype.isActiveCell = function (rowIndex, colIndex) {
    var cellNumber = rowIndex * this.numCols + colIndex;
    return cellNumber === this.activeCell;
  };

  OwlCalendarBodyComponent.prototype.isSelected = function (value) {
    if (!this.selectedValues || this.selectedValues.length === 0) {
      return false;
    }

    if (this.isInSingleMode) {
      return value === this.selectedValues[0];
    }

    if (this.isInRangeMode) {
      var fromValue = this.selectedValues[0];
      var toValue = this.selectedValues[1];
      return value === fromValue || value === toValue;
    }
  };

  OwlCalendarBodyComponent.prototype.isInRange = function (value) {
    if (this.isInRangeMode) {
      var fromValue = this.selectedValues[0];
      var toValue = this.selectedValues[1];

      if (fromValue !== null && toValue !== null) {
        return value >= fromValue && value <= toValue;
      } else {
        return value === fromValue || value === toValue;
      }
    }
  };

  OwlCalendarBodyComponent.prototype.isRangeFrom = function (value) {
    if (this.isInRangeMode) {
      var fromValue = this.selectedValues[0];
      return fromValue !== null && value === fromValue;
    }
  };

  OwlCalendarBodyComponent.prototype.isRangeTo = function (value) {
    if (this.isInRangeMode) {
      var toValue = this.selectedValues[1];
      return toValue !== null && value === toValue;
    }
  };

  OwlCalendarBodyComponent.prototype.focusActiveCell = function () {
    var _this = this;

    this.ngZone.runOutsideAngular(function () {
      _this.ngZone.onStable.asObservable().pipe((0, _operators.take)(1)).subscribe(function () {
        _this.elmRef.nativeElement.querySelector('.owl-dt-calendar-cell-active').focus();
      });
    });
  };

  OwlCalendarBodyComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: '[owl-date-time-calendar-body]',
      exportAs: 'owlDateTimeCalendarBody',
      template: "<tr *ngFor=\"let row of rows; let rowIndex = index\" role=\"row\"><td *ngFor=\"let item of row; let colIndex = index\" class=\"owl-dt-calendar-cell {{item.cellClass}}\" [tabindex]=\"isActiveCell(rowIndex, colIndex) ? 0 : -1\" [class.owl-dt-calendar-cell-active]=\"isActiveCell(rowIndex, colIndex)\" [class.owl-dt-calendar-cell-disabled]=\"!item.enabled\" [class.owl-dt-calendar-cell-in-range]=\"isInRange(item.value)\" [class.owl-dt-calendar-cell-range-from]=\"isRangeFrom(item.value)\" [class.owl-dt-calendar-cell-range-to]=\"isRangeTo(item.value)\" [attr.aria-label]=\"item.ariaLabel\" [attr.aria-disabled]=\"!item.enabled || null\" [style.width.%]=\"100 / numCols\" [style.paddingTop.%]=\"50 * cellRatio / numCols\" [style.paddingBottom.%]=\"50 * cellRatio / numCols\" (click)=\"selectCell(item)\"><span class=\"owl-dt-calendar-cell-content\" [ngClass]=\"{\n                'owl-dt-calendar-cell-out': item.out,\n                'owl-dt-calendar-cell-today': item.value === todayValue,\n                'owl-dt-calendar-cell-selected': isSelected(item.value)\n              }\">{{item.displayValue}}</span></td></tr>",
      styles: [""],
      preserveWhitespaces: false,
      changeDetection: _core.ChangeDetectionStrategy.OnPush
    }]
  }];

  OwlCalendarBodyComponent.ctorParameters = function () {
    return [{
      type: _core.ElementRef
    }, {
      type: _core.NgZone
    }];
  };

  OwlCalendarBodyComponent.propDecorators = {
    "activeCell": [{
      type: _core.Input
    }],
    "rows": [{
      type: _core.Input
    }],
    "numCols": [{
      type: _core.Input
    }],
    "cellRatio": [{
      type: _core.Input
    }],
    "todayValue": [{
      type: _core.Input
    }],
    "selectedValues": [{
      type: _core.Input
    }],
    "selectMode": [{
      type: _core.Input
    }],
    "select": [{
      type: _core.Output
    }],
    "owlDTCalendarBodyClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-calendar-body']
    }]
  };
  return OwlCalendarBodyComponent;
}();

exports.OwlCalendarBodyComponent = OwlCalendarBodyComponent;