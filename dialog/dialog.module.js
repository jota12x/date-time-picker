"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDialogModule = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _a11y = require("@angular/cdk/a11y");

var _overlay = require("@angular/cdk/overlay");

var _portal = require("@angular/cdk/portal");

var _dialog = require("./dialog.service");

var _dialogContainer = require("./dialog-container.component");

var OwlDialogModule = function () {
  function OwlDialogModule() {}

  OwlDialogModule.decorators = [{
    type: _core.NgModule,
    args: [{
      imports: [_common.CommonModule, _a11y.A11yModule, _overlay.OverlayModule, _portal.PortalModule],
      exports: [],
      declarations: [_dialogContainer.OwlDialogContainerComponent],
      providers: [_dialog.OWL_DIALOG_SCROLL_STRATEGY_PROVIDER, _dialog.OwlDialogService],
      entryComponents: [_dialogContainer.OwlDialogContainerComponent]
    }]
  }];
  return OwlDialogModule;
}();

exports.OwlDialogModule = OwlDialogModule;