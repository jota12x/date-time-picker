"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.OwlDialogContainerComponent = void 0;

var _core = require("@angular/core");

var _animations = require("@angular/animations");

var _common = require("@angular/common");

var _a11y = require("@angular/cdk/a11y");

var _portal = require("@angular/cdk/portal");

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

var zoomFadeIn = {
  opacity: 0,
  transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})'
};
var zoomFadeInFrom = {
  opacity: 0,
  transform: 'translateX({{ x }}) translateY({{ y }}) scale({{scale}})',
  transformOrigin: '{{ ox }} {{ oy }}'
};

var OwlDialogContainerComponent = function (_super) {
  __extends(OwlDialogContainerComponent, _super);

  function OwlDialogContainerComponent(changeDetector, elementRef, focusTrapFactory, document) {
    var _this = _super.call(this) || this;

    _this.changeDetector = changeDetector;
    _this.elementRef = elementRef;
    _this.focusTrapFactory = focusTrapFactory;
    _this.document = document;
    _this.ariaLabelledBy = null;
    _this.animationStateChanged = new _core.EventEmitter();
    _this.isAnimating = false;
    _this.state = 'enter';
    _this.params = {
      x: '0px',
      y: '0px',
      ox: '50%',
      oy: '50%',
      scale: 0
    };
    _this.elementFocusedBeforeDialogWasOpened = null;
    return _this;
  }

  Object.defineProperty(OwlDialogContainerComponent.prototype, "config", {
    get: function get() {
      return this._config;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerClass", {
    get: function get() {
      return true;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerTabIndex", {
    get: function get() {
      return -1;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerId", {
    get: function get() {
      return this._config.id;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerRole", {
    get: function get() {
      return this._config.role || null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaLabelledby", {
    get: function get() {
      return this.ariaLabelledBy;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAriaDescribedby", {
    get: function get() {
      return this._config.ariaDescribedBy || null;
    },
    enumerable: true,
    configurable: true
  });
  Object.defineProperty(OwlDialogContainerComponent.prototype, "owlDialogContainerAnimation", {
    get: function get() {
      return {
        value: this.state,
        params: this.params
      };
    },
    enumerable: true,
    configurable: true
  });

  OwlDialogContainerComponent.prototype.ngOnInit = function () {};

  OwlDialogContainerComponent.prototype.attachComponentPortal = function (portal) {
    if (this.portalOutlet.hasAttached()) {
      throw Error('Attempting to attach dialog content after content is already attached');
    }

    this.savePreviouslyFocusedElement();
    return this.portalOutlet.attachComponentPortal(portal);
  };

  OwlDialogContainerComponent.prototype.attachTemplatePortal = function (portal) {
    throw new Error('Method not implemented.');
  };

  OwlDialogContainerComponent.prototype.setConfig = function (config) {
    this._config = config;

    if (config.event) {
      this.calculateZoomOrigin(event);
    }
  };

  OwlDialogContainerComponent.prototype.onAnimationStart = function (event) {
    this.isAnimating = true;
    this.animationStateChanged.emit(event);
  };

  OwlDialogContainerComponent.prototype.onAnimationDone = function (event) {
    if (event.toState === 'enter') {
      this.trapFocus();
    } else if (event.toState === 'exit') {
      this.restoreFocus();
    }

    this.animationStateChanged.emit(event);
    this.isAnimating = false;
  };

  OwlDialogContainerComponent.prototype.startExitAnimation = function () {
    this.state = 'exit';
    this.changeDetector.markForCheck();
  };

  OwlDialogContainerComponent.prototype.calculateZoomOrigin = function (event) {
    if (!event) {
      return;
    }

    var clientX = event.clientX;
    var clientY = event.clientY;
    var wh = window.innerWidth / 2;
    var hh = window.innerHeight / 2;
    var x = clientX - wh;
    var y = clientY - hh;
    var ox = clientX / window.innerWidth;
    var oy = clientY / window.innerHeight;
    this.params.x = x + "px";
    this.params.y = y + "px";
    this.params.ox = ox * 100 + "%";
    this.params.oy = oy * 100 + "%";
    this.params.scale = 0;
    return;
  };

  OwlDialogContainerComponent.prototype.savePreviouslyFocusedElement = function () {
    var _this = this;

    if (this.document) {
      this.elementFocusedBeforeDialogWasOpened = this.document.activeElement;
      Promise.resolve().then(function () {
        return _this.elementRef.nativeElement.focus();
      });
    }
  };

  OwlDialogContainerComponent.prototype.trapFocus = function () {
    if (!this.focusTrap) {
      this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement);
    }

    if (this._config.autoFocus) {
      this.focusTrap.focusInitialElementWhenReady();
    }
  };

  OwlDialogContainerComponent.prototype.restoreFocus = function () {
    var toFocus = this.elementFocusedBeforeDialogWasOpened;

    if (toFocus && typeof toFocus.focus === 'function') {
      toFocus.focus();
    }

    if (this.focusTrap) {
      this.focusTrap.destroy();
    }
  };

  OwlDialogContainerComponent.decorators = [{
    type: _core.Component,
    args: [{
      selector: 'owl-dialog-container',
      template: "<ng-template cdkPortalOutlet></ng-template>",
      animations: [(0, _animations.trigger)('slideModal', [(0, _animations.transition)('void => enter', [(0, _animations.style)(zoomFadeInFrom), (0, _animations.animate)('300ms cubic-bezier(0.35, 0, 0.25, 1)', (0, _animations.style)('*')), (0, _animations.animate)('150ms', (0, _animations.keyframes)([(0, _animations.style)({
        transform: 'scale(1)',
        offset: 0
      }), (0, _animations.style)({
        transform: 'scale(1.05)',
        offset: 0.3
      }), (0, _animations.style)({
        transform: 'scale(.95)',
        offset: 0.8
      }), (0, _animations.style)({
        transform: 'scale(1)',
        offset: 1.0
      })])), (0, _animations.animateChild)()], {
        params: {
          x: '0px',
          y: '0px',
          ox: '50%',
          oy: '50%',
          scale: 1
        }
      }), (0, _animations.transition)('enter => exit', [(0, _animations.animateChild)(), (0, _animations.animate)(200, (0, _animations.style)(zoomFadeIn))], {
        params: {
          x: '0px',
          y: '0px',
          ox: '50%',
          oy: '50%'
        }
      })])]
    }]
  }];

  OwlDialogContainerComponent.ctorParameters = function () {
    return [{
      type: _core.ChangeDetectorRef
    }, {
      type: _core.ElementRef
    }, {
      type: _a11y.FocusTrapFactory
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

  OwlDialogContainerComponent.propDecorators = {
    "portalOutlet": [{
      type: _core.ViewChild,
      args: [_portal.CdkPortalOutlet]
    }],
    "owlDialogContainerClass": [{
      type: _core.HostBinding,
      args: ['class.owl-dialog-container']
    }],
    "owlDialogContainerTabIndex": [{
      type: _core.HostBinding,
      args: ['attr.tabindex']
    }],
    "owlDialogContainerId": [{
      type: _core.HostBinding,
      args: ['attr.id']
    }],
    "owlDialogContainerRole": [{
      type: _core.HostBinding,
      args: ['attr.role']
    }],
    "owlDialogContainerAriaLabelledby": [{
      type: _core.HostBinding,
      args: ['attr.aria-labelledby']
    }],
    "owlDialogContainerAriaDescribedby": [{
      type: _core.HostBinding,
      args: ['attr.aria-describedby']
    }],
    "owlDialogContainerAnimation": [{
      type: _core.HostBinding,
      args: ['@slideModal']
    }],
    "onAnimationStart": [{
      type: _core.HostListener,
      args: ['@slideModal.start', ['$event']]
    }],
    "onAnimationDone": [{
      type: _core.HostListener,
      args: ['@slideModal.done', ['$event']]
    }]
  };
  return OwlDialogContainerComponent;
}(_portal.BasePortalOutlet);

exports.OwlDialogContainerComponent = OwlDialogContainerComponent;