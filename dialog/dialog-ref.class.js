"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDialogRef = void 0;

var _keycodes = require("@angular/cdk/keycodes");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var OwlDialogRef = function () {
  function OwlDialogRef(overlayRef, container, id, location) {
    var _this = this;

    this.overlayRef = overlayRef;
    this.container = container;
    this.id = id;
    this._beforeClose$ = new _rxjs.Subject();
    this._afterOpen$ = new _rxjs.Subject();
    this._afterClosed$ = new _rxjs.Subject();
    this.locationChanged = _rxjs.Subscription.EMPTY;
    this.disableClose = this.container.config.disableClose;
    this.container.animationStateChanged.pipe((0, _operators.filter)(function (event) {
      return event.phaseName === 'done' && event.toState === 'enter';
    }), (0, _operators.take)(1)).subscribe(function () {
      _this._afterOpen$.next();

      _this._afterOpen$.complete();
    });
    this.container.animationStateChanged.pipe((0, _operators.filter)(function (event) {
      return event.phaseName === 'done' && event.toState === 'exit';
    }), (0, _operators.take)(1)).subscribe(function () {
      _this.overlayRef.dispose();

      _this.locationChanged.unsubscribe();

      _this._afterClosed$.next(_this.result);

      _this._afterClosed$.complete();

      _this.componentInstance = null;
    });
    this.overlayRef.keydownEvents().pipe((0, _operators.filter)(function (event) {
      return event.keyCode === _keycodes.ESCAPE && !_this.disableClose;
    })).subscribe(function () {
      return _this.close();
    });

    if (location) {
      this.locationChanged = location.subscribe(function () {
        if (_this.container.config.closeOnNavigation) {
          _this.close();
        }
      });
    }
  }

  OwlDialogRef.prototype.close = function (dialogResult) {
    var _this = this;

    this.result = dialogResult;
    this.container.animationStateChanged.pipe((0, _operators.filter)(function (event) {
      return event.phaseName === 'start';
    }), (0, _operators.take)(1)).subscribe(function () {
      _this._beforeClose$.next(dialogResult);

      _this._beforeClose$.complete();

      _this.overlayRef.detachBackdrop();
    });
    this.container.startExitAnimation();
  };

  OwlDialogRef.prototype.backdropClick = function () {
    return this.overlayRef.backdropClick();
  };

  OwlDialogRef.prototype.keydownEvents = function () {
    return this.overlayRef.keydownEvents();
  };

  OwlDialogRef.prototype.updatePosition = function (position) {
    var strategy = this.getPositionStrategy();

    if (position && (position.left || position.right)) {
      position.left ? strategy.left(position.left) : strategy.right(position.right);
    } else {
      strategy.centerHorizontally();
    }

    if (position && (position.top || position.bottom)) {
      position.top ? strategy.top(position.top) : strategy.bottom(position.bottom);
    } else {
      strategy.centerVertically();
    }

    this.overlayRef.updatePosition();
    return this;
  };

  OwlDialogRef.prototype.updateSize = function (width, height) {
    if (width === void 0) {
      width = 'auto';
    }

    if (height === void 0) {
      height = 'auto';
    }

    this.getPositionStrategy().width(width).height(height);
    this.overlayRef.updatePosition();
    return this;
  };

  OwlDialogRef.prototype.isAnimating = function () {
    return this.container.isAnimating;
  };

  OwlDialogRef.prototype.afterOpen = function () {
    return this._afterOpen$.asObservable();
  };

  OwlDialogRef.prototype.beforeClose = function () {
    return this._beforeClose$.asObservable();
  };

  OwlDialogRef.prototype.afterClosed = function () {
    return this._afterClosed$.asObservable();
  };

  OwlDialogRef.prototype.getPositionStrategy = function () {
    return this.overlayRef.getConfig().positionStrategy;
  };

  return OwlDialogRef;
}();

exports.OwlDialogRef = OwlDialogRef;