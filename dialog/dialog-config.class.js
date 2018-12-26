"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDialogConfig = void 0;

var _overlay = require("@angular/cdk/overlay");

var uniqueId = 0;

var OwlDialogConfig = function () {
  function OwlDialogConfig() {
    this.ariaDescribedBy = null;
    this.autoFocus = true;
    this.hasBackdrop = true;
    this.data = null;
    this.disableClose = false;
    this.role = 'dialog';
    this.paneClass = '';
    this.event = null;
    this.backdropClass = '';
    this.closeOnNavigation = true;
    this.width = '';
    this.height = '';
    this.maxWidth = '85vw';
    this.scrollStrategy = new _overlay.NoopScrollStrategy();
    this.id = "owl-dialog-" + uniqueId++;
  }

  return OwlDialogConfig;
}();

exports.OwlDialogConfig = OwlDialogConfig;