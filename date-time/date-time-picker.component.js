"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY = OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY;
exports.OwlDateTimeComponent = exports.OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = exports.OWL_DTPICKER_SCROLL_STRATEGY = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _portal = require("@angular/cdk/portal");

var _overlay = require("@angular/cdk/overlay");

var _keycodes = require("@angular/cdk/keycodes");

var _coercion = require("@angular/cdk/coercion");

var _dateTimePickerContainer = require("./date-time-picker-container.component");

var _dateTimeAdapter = require("./adapter/date-time-adapter.class");

var _dateTimeFormat = require("./adapter/date-time-format.class");

var _dateTime = require("./date-time.class");

var _dialog = require("../dialog");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

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

var OWL_DTPICKER_SCROLL_STRATEGY = new _core.InjectionToken('owl-dtpicker-scroll-strategy');
exports.OWL_DTPICKER_SCROLL_STRATEGY = OWL_DTPICKER_SCROLL_STRATEGY;

function OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return function () {
    return overlay.scrollStrategies.block();
  };
}

var OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = {
  provide: OWL_DTPICKER_SCROLL_STRATEGY,
  deps: [_overlay.Overlay],
  useFactory: OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER_FACTORY
};
exports.OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER = OWL_DTPICKER_SCROLL_STRATEGY_PROVIDER;

var OwlDateTimeComponent = function (_super) {
  __extends(OwlDateTimeComponent, _super);

  function OwlDateTimeComponent(overlay, viewContainerRef, dialogService, ngZone, changeDetector, dateTimeAdapter, defaultScrollStrategy, dateTimeFormats, document) {
    var _this = _super.call(this, dateTimeAdapter, dateTimeFormats) || this;

    _this.overlay = overlay;
    _this.viewContainerRef = viewContainerRef;
    _this.dialogService = dialogService;
    _this.ngZone = ngZone;
    _this.changeDetector = changeDetector;
    _this.dateTimeAdapter = dateTimeAdapter;
    _this.defaultScrollStrategy = defaultScrollStrategy;
    _this.dateTimeFormats = dateTimeFormats;
    _this.document = document;
    _this.backdropClass = [];
    _this.panelClass = [];
    _this._pickerType = 'both';
    _this._pickerMode = 'popup';
    _this._opened = false;
    _this.afterPickerClosed = new _core.EventEmitter();
    _this.afterPickerOpen = new _core.EventEmitter();
    _this.yearSelected = new _core.EventEmitter();
    _this.monthSelected = new _core.EventEmitter();
    _this.confirmSelectedChange = new _core.EventEmitter();
    _this.disabledChange = new _core.EventEmitter();
    _this.dtInputSub = _rxjs.Subscription.EMPTY;
    _this.hidePickerStreamSub = _rxjs.Subscription.EMPTY;
    _this.confirmSelectedStreamSub = _rxjs.Subscription.EMPTY;
    _this.pickerOpenedStreamSub = _rxjs.Subscription.EMPTY;
    _this.focusedElementBeforeOpen = null;
    _this._selecteds = [];
    return _this;
  }

  Object.defineProperty(OwlDateTimeComponent.prototype, "startAt", {
    get: function get() {
      if (this._startAt) {
        return this._startAt;
      }

      if (this._dtInput) {
        if (this._dtInput.selectMode === 'single') {
          return this._dtInput.value || null;
        } else if (this._dtInput.selectMode === 'range' || this._dtInput.selectMode === 'rangeFrom') {
          return this._dtInput.values[0] || null;
        } else if (this._dtInput.selectMode === 'rangeTo') {
          return this._dtInput.values[1] || null;
        }
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
  Object.defineProperty(OwlDateTimeComponent.prototype, "pickerType", {
    get: function get() {
      return this._pickerType;
    },
    set: function set(val) {
      if (val !== this._pickerType) {
        this._pickerType = val;

        if (this._dtInput) {
          this._dtInput.formatNativeInputValue();
        }
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "pickerMode", {
    get: function get() {
      return this._pickerMode;
    },
    set: function set(mode) {
      if (mode === 'popup') {
        this._pickerMode = mode;
      } else {
        this._pickerMode = 'dialog';
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "disabled", {
    get: function get() {
      return this._disabled === undefined && this._dtInput ? this._dtInput.disabled : !!this._disabled;
    },
    set: function set(value) {
      value = (0, _coercion.coerceBooleanProperty)(value);

      if (value !== this._disabled) {
        this._disabled = value;
        this.disabledChange.next(value);
      }
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "opened", {
    get: function get() {
      return this._opened;
    },
    set: function set(val) {
      val ? this.open() : this.close();
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "dtInput", {
    get: function get() {
      return this._dtInput;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "selected", {
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
  Object.defineProperty(OwlDateTimeComponent.prototype, "selecteds", {
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
  Object.defineProperty(OwlDateTimeComponent.prototype, "minDateTime", {
    get: function get() {
      return this._dtInput && this._dtInput.min;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "maxDateTime", {
    get: function get() {
      return this._dtInput && this._dtInput.max;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "dateTimeFilter", {
    get: function get() {
      return this._dtInput && this._dtInput.dateTimeFilter;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "selectMode", {
    get: function get() {
      return this._dtInput.selectMode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "isInSingleMode", {
    get: function get() {
      return this._dtInput.isInSingleMode;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeComponent.prototype, "isInRangeMode", {
    get: function get() {
      return this._dtInput.isInRangeMode;
    },
    enumerable: true,
    configurable: true
  });

  OwlDateTimeComponent.prototype.ngOnInit = function () {};

  OwlDateTimeComponent.prototype.ngOnDestroy = function () {
    this.close();
    this.dtInputSub.unsubscribe();
    this.disabledChange.complete();

    if (this.popupRef) {
      this.popupRef.dispose();
    }
  };

  OwlDateTimeComponent.prototype.registerInput = function (input) {
    var _this = this;

    if (this._dtInput) {
      throw Error('A Owl DateTimePicker can only be associated with a single input.');
    }

    this._dtInput = input;
    this.dtInputSub = this._dtInput.valueChange.subscribe(function (value) {
      if (Array.isArray(value)) {
        _this.selecteds = value;
      } else {
        _this.selected = value;
      }
    });
  };

  OwlDateTimeComponent.prototype.open = function () {
    var _this = this;

    if (this._opened || this.disabled) {
      return;
    }

    if (!this._dtInput) {
      throw Error('Attempted to open an DateTimePicker with no associated input.');
    }

    if (this.document) {
      this.focusedElementBeforeOpen = this.document.activeElement;
    }

    if (this.isInSingleMode) {
      this.selected = this._dtInput.value;
    } else if (this.isInRangeMode) {
      this.selecteds = this._dtInput.values;
    }

    if (this.selected && this.pickerType !== 'calendar' && this._startAt) {
      this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt));
    }

    this.pickerMode === 'dialog' ? this.openAsDialog() : this.openAsPopup();
    this.pickerContainer.picker = this;
    this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe(function () {
      _this.close();
    });
    this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe(function (event) {
      _this.confirmSelect(event);
    });
  };

  OwlDateTimeComponent.prototype.select = function (date) {
    if (Array.isArray(date)) {
      this.selecteds = date.slice();
    } else {
      this.selected = date;
    }

    if (this.pickerMode !== 'dialog' && this.pickerType === 'calendar' && (this.selectMode === 'single' && this.selected || this.selectMode === 'rangeFrom' && this.selecteds[0] || this.selectMode === 'rangeTo' && this.selecteds[1] || this.selectMode === 'range' && this.selecteds[0] && this.selecteds[1])) {
      this.confirmSelect();
    }
  };

  OwlDateTimeComponent.prototype.selectYear = function (normalizedYear) {
    this.yearSelected.emit(normalizedYear);
  };

  OwlDateTimeComponent.prototype.selectMonth = function (normalizedMonth) {
    this.monthSelected.emit(normalizedMonth);
  };

  OwlDateTimeComponent.prototype.close = function () {
    var _this = this;

    if (!this._opened) {
      return;
    }

    if (this.popupRef && this.popupRef.hasAttached()) {
      this.popupRef.detach();
    }

    if (this.pickerContainerPortal && this.pickerContainerPortal.isAttached) {
      this.pickerContainerPortal.detach();
    }

    if (this.hidePickerStreamSub) {
      this.hidePickerStreamSub.unsubscribe();
      this.hidePickerStreamSub = null;
    }

    if (this.confirmSelectedStreamSub) {
      this.confirmSelectedStreamSub.unsubscribe();
      this.confirmSelectedStreamSub = null;
    }

    if (this.pickerOpenedStreamSub) {
      this.pickerOpenedStreamSub.unsubscribe();
      this.pickerOpenedStreamSub = null;
    }

    if (this.dialogRef) {
      this.dialogRef.close();
      this.dialogRef = null;
    }

    var completeClose = function completeClose() {
      if (_this._opened) {
        _this._opened = false;

        _this.afterPickerClosed.emit(null);

        _this.focusedElementBeforeOpen = null;
      }
    };

    if (this.focusedElementBeforeOpen && typeof this.focusedElementBeforeOpen.focus === 'function') {
      this.focusedElementBeforeOpen.focus();
      setTimeout(completeClose);
    } else {
      completeClose();
    }
  };

  OwlDateTimeComponent.prototype.confirmSelect = function (event) {
    if (this.isInSingleMode) {
      var selected = this.selected || this.startAt || this.dateTimeAdapter.now();
      this.confirmSelectedChange.emit(selected);
    } else if (this.isInRangeMode) {
      this.confirmSelectedChange.emit(this.selecteds);
    }

    this.close();
    return;
  };

  OwlDateTimeComponent.prototype.openAsDialog = function () {
    var _this = this;

    this.dialogRef = this.dialogService.open(_dateTimePickerContainer.OwlDateTimeContainerComponent, {
      autoFocus: false,
      backdropClass: ['cdk-overlay-dark-backdrop'].concat((0, _coercion.coerceArray)(this.backdropClass)),
      paneClass: ['owl-dt-dialog'].concat((0, _coercion.coerceArray)(this.panelClass)),
      viewContainerRef: this.viewContainerRef,
      scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
    });
    this.pickerContainer = this.dialogRef.componentInstance;
    this.dialogRef.afterOpen().subscribe(function () {
      _this.afterPickerOpen.emit(null);

      _this._opened = true;
    });
    this.dialogRef.afterClosed().subscribe(function () {
      return _this.close();
    });
  };

  OwlDateTimeComponent.prototype.openAsPopup = function () {
    var _this = this;

    if (!this.pickerContainerPortal) {
      this.pickerContainerPortal = new _portal.ComponentPortal(_dateTimePickerContainer.OwlDateTimeContainerComponent, this.viewContainerRef);
    }

    if (!this.popupRef) {
      this.createPopup();
    }

    if (!this.popupRef.hasAttached()) {
      var componentRef = this.popupRef.attach(this.pickerContainerPortal);
      this.pickerContainer = componentRef.instance;
      this.ngZone.onStable.asObservable().pipe((0, _operators.take)(1)).subscribe(function () {
        _this.popupRef.updatePosition();
      });
      this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream.pipe((0, _operators.take)(1)).subscribe(function () {
        _this.afterPickerOpen.emit(null);

        _this._opened = true;
      });
    }
  };

  OwlDateTimeComponent.prototype.createPopup = function () {
    var _this = this;

    var overlayConfig = new _overlay.OverlayConfig({
      positionStrategy: this.createPopupPositionStrategy(),
      hasBackdrop: true,
      backdropClass: ['cdk-overlay-transparent-backdrop'].concat((0, _coercion.coerceArray)(this.backdropClass)),
      scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
      panelClass: ['owl-dt-popup'].concat((0, _coercion.coerceArray)(this.panelClass))
    });
    this.popupRef = this.overlay.create(overlayConfig);
    (0, _rxjs.merge)(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe((0, _operators.filter)(function (event) {
      return event.keyCode === _keycodes.ESCAPE || _this._dtInput && event.altKey && event.keyCode === _keycodes.UP_ARROW;
    }))).subscribe(function () {
      return _this.close();
    });
  };

  OwlDateTimeComponent.prototype.createPopupPositionStrategy = function () {
    return this.overlay.position().flexibleConnectedTo(this._dtInput.elementRef).withTransformOriginOn('.owl-dt-container').withFlexibleDimensions(false).withPush(false).withPositions([{
      originX: 'start',
      originY: 'bottom',
      overlayX: 'start',
      overlayY: 'top'
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'bottom'
    }, {
      originX: 'end',
      originY: 'bottom',
      overlayX: 'end',
      overlayY: 'top'
    }, {
      originX: 'end',
      originY: 'top',
      overlayX: 'end',
      overlayY: 'bottom'
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: -176
    }, {
      originX: 'start',
      originY: 'top',
      overlayX: 'start',
      overlayY: 'top',
      offsetY: -352
    }]);
  };

  OwlDateTimeComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'owl-date-time',
      exportAs: 'owlDateTime',
      template: "",
      styles: [""],
      changeDetection: _core.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: false
    }]
  }];

  OwlDateTimeComponent.ctorParameters = function () {
    return [{
      type: _overlay.Overlay
    }, {
      type: _core.ViewContainerRef
    }, {
      type: _dialog.OwlDialogService
    }, {
      type: _core.NgZone
    }, {
      type: _core.ChangeDetectorRef
    }, {
      type: _dateTimeAdapter.DateTimeAdapter,
      decorators: [{
        type: _core.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _core.Inject,
        args: [OWL_DTPICKER_SCROLL_STRATEGY]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.Inject,
        args: [_dateTimeFormat.OWL_DATE_TIME_FORMATS]
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.Inject,
        args: [_common.DOCUMENT]
      }]
    }];
  };

  OwlDateTimeComponent.propDecorators = {
    "backdropClass": [{
      type: _core.Input
    }],
    "panelClass": [{
      type: _core.Input
    }],
    "startAt": [{
      type: _core.Input
    }],
    "pickerType": [{
      type: _core.Input
    }],
    "pickerMode": [{
      type: _core.Input
    }],
    "disabled": [{
      type: _core.Input
    }],
    "opened": [{
      type: _core.Input
    }],
    "scrollStrategy": [{
      type: _core.Input
    }],
    "afterPickerClosed": [{
      type: _core.Output
    }],
    "afterPickerOpen": [{
      type: _core.Output
    }],
    "yearSelected": [{
      type: _core.Output
    }],
    "monthSelected": [{
      type: _core.Output
    }]
  };
  return OwlDateTimeComponent;
}(_dateTime.OwlDateTime);

exports.OwlDateTimeComponent = OwlDateTimeComponent;