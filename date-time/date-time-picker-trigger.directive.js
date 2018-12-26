"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDateTimeTriggerDirective = void 0;

var _core = require("@angular/core");

var _dateTimePicker = require("./date-time-picker.component");

var _rxjs = require("rxjs");

var OwlDateTimeTriggerDirective = function () {
  function OwlDateTimeTriggerDirective(changeDetector) {
    this.changeDetector = changeDetector;
    this.stateChanges = _rxjs.Subscription.EMPTY;
  }

  Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "disabled", {
    get: function get() {
      return this._disabled === undefined ? this.dtPicker.disabled : !!this._disabled;
    },
    set: function set(value) {
      this._disabled = value;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDateTimeTriggerDirective.prototype, "owlDTTriggerDisabledClass", {
    get: function get() {
      return this.disabled;
    },
    enumerable: true,
    configurable: true
  });

  OwlDateTimeTriggerDirective.prototype.ngOnInit = function () {};

  OwlDateTimeTriggerDirective.prototype.ngOnChanges = function (changes) {
    if (changes.datepicker) {
      this.watchStateChanges();
    }
  };

  OwlDateTimeTriggerDirective.prototype.ngAfterContentInit = function () {
    this.watchStateChanges();
  };

  OwlDateTimeTriggerDirective.prototype.ngOnDestroy = function () {
    this.stateChanges.unsubscribe();
  };

  OwlDateTimeTriggerDirective.prototype.handleClickOnHost = function (event) {
    if (this.dtPicker) {
      this.dtPicker.open();
      event.stopPropagation();
    }
  };

  OwlDateTimeTriggerDirective.prototype.watchStateChanges = function () {
    var _this = this;

    this.stateChanges.unsubscribe();
    var inputDisabled = this.dtPicker && this.dtPicker.dtInput ? this.dtPicker.dtInput.disabledChange : (0, _rxjs.of)();
    var pickerDisabled = this.dtPicker ? this.dtPicker.disabledChange : (0, _rxjs.of)();
    this.stateChanges = (0, _rxjs.merge)(pickerDisabled, inputDisabled).subscribe(function () {
      _this.changeDetector.markForCheck();
    });
  };

  OwlDateTimeTriggerDirective.decorators = [{
    type: _core.Directive,
    args: [{
      selector: '[owlDateTimeTrigger]'
    }]
  }];

  OwlDateTimeTriggerDirective.ctorParameters = function () {
    return [{
      type: _core.ChangeDetectorRef
    }];
  };

  OwlDateTimeTriggerDirective.propDecorators = {
    "dtPicker": [{
      type: _core.Input,
      args: ['owlDateTimeTrigger']
    }],
    "disabled": [{
      type: _core.Input
    }],
    "owlDTTriggerDisabledClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dt-trigger-disabled']
    }],
    "handleClickOnHost": [{
      type: _core.HostListener,
      args: ['click', ['$event']]
    }]
  };
  return OwlDateTimeTriggerDirective;
}();

exports.OwlDateTimeTriggerDirective = OwlDateTimeTriggerDirective;