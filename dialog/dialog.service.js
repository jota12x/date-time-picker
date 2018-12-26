"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY = OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY;
exports.OwlDialogService = exports.OWL_DIALOG_DEFAULT_OPTIONS = exports.OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = exports.OWL_DIALOG_SCROLL_STRATEGY = exports.OWL_DIALOG_DATA = void 0;

var _core = require("@angular/core");

var _common = require("@angular/common");

var _dialogConfig = require("./dialog-config.class");

var _dialogRef = require("./dialog-ref.class");

var _dialogContainer = require("./dialog-container.component");

var _utils = require("../utils");

var _rxjs = require("rxjs");

var _operators = require("rxjs/operators");

var _overlay = require("@angular/cdk/overlay");

var _portal = require("@angular/cdk/portal");

var OWL_DIALOG_DATA = new _core.InjectionToken('OwlDialogData');
exports.OWL_DIALOG_DATA = OWL_DIALOG_DATA;
var OWL_DIALOG_SCROLL_STRATEGY = new _core.InjectionToken('owl-dialog-scroll-strategy');
exports.OWL_DIALOG_SCROLL_STRATEGY = OWL_DIALOG_SCROLL_STRATEGY;

function OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY(overlay) {
  return function () {
    return overlay.scrollStrategies.block();
  };
}

var OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = {
  provide: OWL_DIALOG_SCROLL_STRATEGY,
  deps: [_overlay.Overlay],
  useFactory: OWL_DIALOG_SCROLL_STRATEGY_PROVIDER_FACTORY
};
exports.OWL_DIALOG_SCROLL_STRATEGY_PROVIDER = OWL_DIALOG_SCROLL_STRATEGY_PROVIDER;
var OWL_DIALOG_DEFAULT_OPTIONS = new _core.InjectionToken('owl-dialog-default-options');
exports.OWL_DIALOG_DEFAULT_OPTIONS = OWL_DIALOG_DEFAULT_OPTIONS;

var OwlDialogService = function () {
  function OwlDialogService(overlay, injector, location, scrollStrategy, defaultOptions, parentDialog, overlayContainer) {
    var _this = this;

    this.overlay = overlay;
    this.injector = injector;
    this.location = location;
    this.scrollStrategy = scrollStrategy;
    this.defaultOptions = defaultOptions;
    this.parentDialog = parentDialog;
    this.overlayContainer = overlayContainer;
    this.ariaHiddenElements = new Map();
    this._openDialogsAtThisLevel = [];
    this._afterOpenAtThisLevel = new _rxjs.Subject();
    this._afterAllClosedAtThisLevel = new _rxjs.Subject();
    this.afterAllClosed = (0, _rxjs.defer)(function () {
      return _this._openDialogsAtThisLevel.length ? _this._afterAllClosed : _this._afterAllClosed.pipe((0, _operators.startWith)(undefined));
    });

    if (!parentDialog && location) {
      location.subscribe(function () {
        return _this.closeAll();
      });
    }
  }

  Object.defineProperty(OwlDialogService.prototype, "openDialogs", {
    get: function get() {
      return this.parentDialog ? this.parentDialog.openDialogs : this._openDialogsAtThisLevel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogService.prototype, "afterOpen", {
    get: function get() {
      return this.parentDialog ? this.parentDialog.afterOpen : this._afterOpenAtThisLevel;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogService.prototype, "_afterAllClosed", {
    get: function get() {
      var parent = this.parentDialog;
      return parent ? parent._afterAllClosed : this._afterAllClosedAtThisLevel;
    },
    enumerable: true,
    configurable: true
  });

  OwlDialogService.prototype.open = function (componentOrTemplateRef, config) {
    var _this = this;

    config = applyConfigDefaults(config, this.defaultOptions);

    if (config.id && this.getDialogById(config.id)) {
      throw Error("Dialog with id \"" + config.id + "\" exists already. The dialog id must be unique.");
    }

    var overlayRef = this.createOverlay(config);
    var dialogContainer = this.attachDialogContainer(overlayRef, config);
    var dialogRef = this.attachDialogContent(componentOrTemplateRef, dialogContainer, overlayRef, config);

    if (!this.openDialogs.length) {
      this.hideNonDialogContentFromAssistiveTechnology();
    }

    this.openDialogs.push(dialogRef);
    dialogRef.afterClosed().subscribe(function () {
      return _this.removeOpenDialog(dialogRef);
    });
    this.afterOpen.next(dialogRef);
    return dialogRef;
  };

  OwlDialogService.prototype.closeAll = function () {
    var i = this.openDialogs.length;

    while (i--) {
      this.openDialogs[i].close();
    }
  };

  OwlDialogService.prototype.getDialogById = function (id) {
    return this.openDialogs.find(function (dialog) {
      return dialog.id === id;
    });
  };

  OwlDialogService.prototype.attachDialogContent = function (componentOrTemplateRef, dialogContainer, overlayRef, config) {
    var dialogRef = new _dialogRef.OwlDialogRef(overlayRef, dialogContainer, config.id, this.location);

    if (config.hasBackdrop) {
      overlayRef.backdropClick().subscribe(function () {
        if (!dialogRef.disableClose) {
          dialogRef.close();
        }
      });
    }

    if (componentOrTemplateRef instanceof _core.TemplateRef) {} else {
      var injector = this.createInjector(config, dialogRef, dialogContainer);
      var contentRef = dialogContainer.attachComponentPortal(new _portal.ComponentPortal(componentOrTemplateRef, undefined, injector));
      dialogRef.componentInstance = contentRef.instance;
    }

    dialogRef.updateSize(config.width, config.height).updatePosition(config.position);
    return dialogRef;
  };

  OwlDialogService.prototype.createInjector = function (config, dialogRef, dialogContainer) {
    var userInjector = config && config.viewContainerRef && config.viewContainerRef.injector;
    var injectionTokens = new WeakMap();
    injectionTokens.set(_dialogRef.OwlDialogRef, dialogRef);
    injectionTokens.set(_dialogContainer.OwlDialogContainerComponent, dialogContainer);
    injectionTokens.set(OWL_DIALOG_DATA, config.data);
    return new _portal.PortalInjector(userInjector || this.injector, injectionTokens);
  };

  OwlDialogService.prototype.createOverlay = function (config) {
    var overlayConfig = this.getOverlayConfig(config);
    return this.overlay.create(overlayConfig);
  };

  OwlDialogService.prototype.attachDialogContainer = function (overlayRef, config) {
    var containerPortal = new _portal.ComponentPortal(_dialogContainer.OwlDialogContainerComponent, config.viewContainerRef);
    var containerRef = overlayRef.attach(containerPortal);
    containerRef.instance.setConfig(config);
    return containerRef.instance;
  };

  OwlDialogService.prototype.getOverlayConfig = function (dialogConfig) {
    var state = new _overlay.OverlayConfig({
      positionStrategy: this.overlay.position().global(),
      scrollStrategy: dialogConfig.scrollStrategy || this.scrollStrategy(),
      panelClass: dialogConfig.paneClass,
      hasBackdrop: dialogConfig.hasBackdrop,
      minWidth: dialogConfig.minWidth,
      minHeight: dialogConfig.minHeight,
      maxWidth: dialogConfig.maxWidth,
      maxHeight: dialogConfig.maxHeight
    });

    if (dialogConfig.backdropClass) {
      state.backdropClass = dialogConfig.backdropClass;
    }

    return state;
  };

  OwlDialogService.prototype.removeOpenDialog = function (dialogRef) {
    var index = this._openDialogsAtThisLevel.indexOf(dialogRef);

    if (index > -1) {
      this.openDialogs.splice(index, 1);

      if (!this.openDialogs.length) {
        this.ariaHiddenElements.forEach(function (previousValue, element) {
          if (previousValue) {
            element.setAttribute('aria-hidden', previousValue);
          } else {
            element.removeAttribute('aria-hidden');
          }
        });
        this.ariaHiddenElements.clear();

        this._afterAllClosed.next();
      }
    }
  };

  OwlDialogService.prototype.hideNonDialogContentFromAssistiveTechnology = function () {
    var overlayContainer = this.overlayContainer.getContainerElement();

    if (overlayContainer.parentElement) {
      var siblings = overlayContainer.parentElement.children;

      for (var i = siblings.length - 1; i > -1; i--) {
        var sibling = siblings[i];

        if (sibling !== overlayContainer && sibling.nodeName !== 'SCRIPT' && sibling.nodeName !== 'STYLE' && !sibling.hasAttribute('aria-live')) {
          this.ariaHiddenElements.set(sibling, sibling.getAttribute('aria-hidden'));
          sibling.setAttribute('aria-hidden', 'true');
        }
      }
    }
  };

  OwlDialogService.decorators = [{
    type: _core.Injectable
  }];

  OwlDialogService.ctorParameters = function () {
    return [{
      type: _overlay.Overlay
    }, {
      type: _core.Injector
    }, {
      type: _common.Location,
      decorators: [{
        type: _core.Optional
      }]
    }, {
      type: undefined,
      decorators: [{
        type: _core.Inject,
        args: [OWL_DIALOG_SCROLL_STRATEGY]
      }]
    }, {
      type: _dialogConfig.OwlDialogConfig,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.Inject,
        args: [OWL_DIALOG_DEFAULT_OPTIONS]
      }]
    }, {
      type: OwlDialogService,
      decorators: [{
        type: _core.Optional
      }, {
        type: _core.SkipSelf
      }]
    }, {
      type: _overlay.OverlayContainer
    }];
  };

  return OwlDialogService;
}();

exports.OwlDialogService = OwlDialogService;

function applyConfigDefaults(config, defaultOptions) {
  return (0, _utils.extendObject)(new _dialogConfig.OwlDialogConfig(), config, defaultOptions);
}