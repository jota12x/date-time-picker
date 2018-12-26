"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.owlDateTimePickerAnimations = void 0;

var _animations = require("@angular/animations");

var owlDateTimePickerAnimations = {
  transformPicker: (0, _animations.trigger)('transformPicker', [(0, _animations.state)('void', (0, _animations.style)({
    opacity: 0,
    transform: 'scale(1, 0)'
  })), (0, _animations.state)('enter', (0, _animations.style)({
    opacity: 1,
    transform: 'scale(1, 1)'
  })), (0, _animations.transition)('void => enter', (0, _animations.group)([(0, _animations.query)('@fadeInPicker', (0, _animations.animateChild)(), {
    optional: true
  }), (0, _animations.animate)('400ms cubic-bezier(0.25, 0.8, 0.25, 1)')])), (0, _animations.transition)('enter => void', (0, _animations.animate)('100ms linear', (0, _animations.style)({
    opacity: 0
  })))]),
  fadeInPicker: (0, _animations.trigger)('fadeInPicker', [(0, _animations.state)('enter', (0, _animations.style)({
    opacity: 1
  })), (0, _animations.state)('void', (0, _animations.style)({
    opacity: 0
  })), (0, _animations.transition)('void => enter', (0, _animations.animate)('400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)'))])
};
exports.owlDateTimePickerAnimations = owlDateTimePickerAnimations;