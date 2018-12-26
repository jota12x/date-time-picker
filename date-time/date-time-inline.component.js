"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTimeInlineComponent = exports.OWL_DATETIME_VALUE_ACCESSOR = void 0;

var _core = require("@angular/core");

var _forms = require("@angular/forms");

var _coercion = require("@angular/cdk/coercion");

var _dateTime = require("./date-time.class");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _dateTimeFormat = require("./adapter/date-time-format.class");

var _dateTimePickerContainer = require("./date-time-picker-container.component");

var __extends = void 0 && (void 0).__extends || function () {
  var extendStatics = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (d, b) {
    d.__proto__ = b;
  } || function (d, b) {
    for (var p in b) {
      if (b.hasOwnProperty(p)) d[p] = b[p];
    }
  };

  return function (d, b) {
    extendStatics(d, b);

    function __() {
      this.constructor = d;
    }

    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
  };
}();

var OWL_DATETIME_VALUE_ACCESSOR = {
  provide: _forms.NG_VALUE_ACCESSOR,
  useExisting: (0, _core.forwardRef)(function () {
    return OwlDateTimeInlineComponent;
  }),
  multi: true
};
exports.OWL_DATETIME_VALUE_ACCESSOR = OWL_DATETIME_VALUE_ACCESSOR;

var OwlDateTimeInlineComponent = function (_super) {
  __extends(OwlDateTimeInlineComponent, _super);

  function OwlDateTimeInlineComponent(changeDetector, dateTimeAdapter, dateTimeFormats) {
    var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;

    _this.changeDetector = changeDetector;
    _this.dateTimeAdapter = dateTimeAdapter;
    _this.dateTimeFormats = dateTimeFormats;
    _this._pickerType = 'both';
    _this._disabled = false;
    _this._selectMode = 'single';
    _this._values = [];
    _this.yearSelected = new _core.EventEmitter();
    _this.monthSelected = new _core.EventEmitter();
    _this._selecteds = [];

    _this.onModelChange = function () {};

    _this.onModelTouched = function () {};

    return _this;
  }

  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerType", {
    get: function get() {
      return this._pickerType;
    },
    set: function set(val) {
      if (val !== this._pickerType) {
        this._pickerType = val;
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "disabled", {
    get: function get() {
      return !!this._disabled;
    },
    set: function set(value) {
      this._disabled = (0, _coercion.coerceBooleanProperty)(value);
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selectMode", {
    get: function get() {
      return this._selectMode;
    },
    set: function set(mode) {
      if (mode !== 'single' && mode !== 'range' && mode !== 'rangeFrom' && mode !== 'rangeTo') {
        throw Error('OwlDateTime Error: invalid selectMode value!');
      }

      this._selectMode = mode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "startAt", {
    get: function get() {
      if (this._startAt) {
        return this._startAt;
      }

      if (this.selectMode === 'single') {
        return this.value || null;
      } else if (this.selectMode === 'range' || this.selectMode === 'rangeFrom') {
        return this.values[0] || null;
      } else if (this.selectMode === 'rangeTo') {
        return this.values[1] || null;
      } else {
        return null;
      }
    },
    set: function set(date) {
      this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(date));
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "dateTimeFilter", {
    get: function get() {
      return this._dateTimeFilter;
    },
    set: function set(filter) {
      this._dateTimeFilter = filter;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "minDateTime", {
    get: function get() {
      return this._min || null;
    },
    set: function set(value) {
      this._min = this.getValidDate(this.dateTimeAdapter.deserialize(value));
      this.changeDetector.markForCheck();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "maxDateTime", {
    get: function get() {
      return this._max || null;
    },
    set: function set(value) {
      this._max = this.getValidDate(this.dateTimeAdapter.deserialize(value));
      this.changeDetector.markForCheck();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "value", {
    get: function get() {
      return this._value;
    },
    set: function set(value) {
      value = this.dateTimeAdapter.deserialize(value);
      value = this.getValidDate(value);
      this._value = value;
      this.selected = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "values", {
    get: function get() {
      return this._values;
    },
    set: function set(values) {
      var _this = this;

      if (values && values.length > 0) {
        values = values.map(function (v) {
          v = _this.dateTimeAdapter.deserialize(v);
          v = _this.getValidDate(v);
          return v ? _this.dateTimeAdapter.clone(v) : null;
        });
        this._values = values.slice();
        this.selecteds = values.slice();
      } else {
        this._values = [];
        this.selecteds = [];
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selected", {
    get: function get() {
      return this._selected;
    },
    set: function set(value) {
      this._selected = value;
      this.changeDetector.markForCheck();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "selecteds", {
    get: function get() {
      return this._selecteds;
    },
    set: function set(values) {
      this._selecteds = values;
      this.changeDetector.markForCheck();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "opened", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "pickerMode", {
    get: function get() {
      return 'inline';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInSingleMode", {
    get: function get() {
      return this._selectMode === 'single';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "isInRangeMode", {
    get: function get() {
      return this._selectMode === 'range' || this._selectMode === 'rangeFrom' || this._selectMode === 'rangeTo';
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeInlineComponent.prototype, "owlDTInlineClass", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });

  OwlDateTimeInlineComponent.prototype.ngOnInit = function () {
    this.container.picker = this;
  };

  OwlDateTimeInlineComponent.prototype.writeValue = function (value) {
    if (this.isInSingleMode) {
      this.value = value;
      this.container.pickerMoment = value;
    } else {
      this.values = value;
      this.container.pickerMoment = this._values[this.container.activeSelectedIndex];
    }
  };

  OwlDateTimeInlineComponent.prototype.registerOnChange = function (fn) {
    this.onModelChange = fn;
  };

  OwlDateTimeInlineComponent.prototype.registerOnTouched = function (fn) {
    this.onModelTouched = fn;
  };

  OwlDateTimeInlineComponent.prototype.setDisabledState = function (isDisabled) {
    this.disabled = isDisabled;
  };

  OwlDateTimeInlineComponent.prototype.select = function (date) {
    if (this.disabled) {
      return;
    }

    if (Array.isArray(date)) {
      this.values = date.slice();
    } else {
      this.value = date;
    }

    this.onModelChange(date);
    this.onModelTouched();
  };

  OwlDateTimeInlineComponent.prototype.selectYear = function (normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  };

  OwlDateTimeInlineComponent.prototype.selectMonth = function (normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  };

  OwlDateTimeInlineComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'owl-date-time-inline',
      template: "<owl-date-time-container></owl-date-time-container>",
      styles: [""],
      changeDetection: _core.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: false,
      providers: [OWL_DATETIME_VALUE_ACCESSOR]
    }]
  }];

  OwlDateTimeInlineComponent.ctorParameters = function () {
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

  OwlDateTimeInlineComponent.propDecorators = {
    "container": [{
      type: _core.ViewChild,
      args: [_dateTimePickerContainer.OwlDateTimeContainerComponent]
    }],
    "pickerType": [{
      type: _core.Input
    }],
    "disabled": [{
      type: _core.Input
    }],
    "selectMode": [{
      type: _core.Input
    }],
    "startAt": [{
      type: _core.Input
    }],
    "dateTimeFilter": [{
      type: _core.Input,
      args: ['owlDateTimeFilter']
    }],
    "minDateTime": [{
      type: _core.Input,
      args: ['min']
    }],
    "maxDateTime": [{
      type: _core.Input,
      args: ['max']
    }],
    "value": [{
      type: _core.Input
    }],
    "values": [{
      type: _core.Input
    }],
    "yearSelected": [{
      type: _core.Output
    }],
    "monthSelected": [{
      type: _core.Output
    }],
    "owlDTInlineClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-inline']
    }]
  };
  return OwlDateTimeInlineComponent;
}(_dateTime.OwlDateTime);

exports.OwlDateTimeInlineComponent = OwlDateTimeInlineComponent;