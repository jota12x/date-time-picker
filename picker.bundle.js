"use strict";

function _typeof4(obj) { if (typeof Symbol === "function" && typeof Symbol.iterator === "symbol") { _typeof4 = function _typeof4(obj) { return typeof obj; }; } else { _typeof4 = function _typeof4(obj) { return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : typeof obj; }; } return _typeof4(obj); }

function _typeof3(obj) {
  if (typeof Symbol === "function" && _typeof4(Symbol.iterator) === "symbol") {
    _typeof3 = function _typeof3(obj) {
      return _typeof4(obj);
    };
  } else {
    _typeof3 = function _typeof3(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof4(obj);
    };
  }

  return _typeof3(obj);
}

function _typeof2(obj) {
  if (typeof Symbol === "function" && _typeof3(Symbol.iterator) === "symbol") {
    _typeof2 = function _typeof2(obj) {
      return _typeof3(obj);
    };
  } else {
    _typeof2 = function _typeof2(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof3(obj);
    };
  }

  return _typeof2(obj);
}

function _typeof(obj) {
  if (typeof Symbol === "function" && _typeof2(Symbol.iterator) === "symbol") {
    _typeof = function _typeof(obj) {
      return _typeof2(obj);
    };
  } else {
    _typeof = function _typeof(obj) {
      return obj && typeof Symbol === "function" && obj.constructor === Symbol && obj !== Symbol.prototype ? "symbol" : _typeof2(obj);
    };
  }

  return _typeof(obj);
}

!function (e, t) {
  "object" == (typeof exports === "undefined" ? "undefined" : _typeof(exports)) && "undefined" != typeof module ? t(exports, require("@angular/core"), require("@angular/common"), require("@angular/animations"), require("@angular/forms")) : "function" == typeof define && define.amd ? define(["exports", "@angular/core", "@angular/common", "@angular/animations", "@angular/forms"], t) : t(e["ng-pick-datetime"] = {}, e.vendor._angular_core, e.vendor._angular_common, e.vendor._angular_animations, e.vendor._angular_forms);
}(void 0, function (e, t, i, n, r) {
  "use strict";

  var o = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  };

  function s(e, t) {
    function i() {
      this.constructor = e;
    }

    o(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }

  function a(e) {
    return "function" == typeof e;
  }

  var c = !1,
      l = {
    Promise: void 0,

    set useDeprecatedSynchronousErrorHandling(e) {
      if (e) {
        var t = new Error();
        t.stack;
      }

      c = e;
    },

    get useDeprecatedSynchronousErrorHandling() {
      return c;
    }

  };

  function u(e) {
    setTimeout(function () {
      throw e;
    });
  }

  var p = {
    closed: !0,
    next: function next(e) {},
    error: function error(e) {
      if (l.useDeprecatedSynchronousErrorHandling) throw e;
      u(e);
    },
    complete: function complete() {}
  },
      d = Array.isArray || function (e) {
    return e && "number" == typeof e.length;
  };

  function h(e) {
    return null != e && "object" == _typeof(e);
  }

  var f,
      m = {
    e: {}
  };

  function y() {
    try {
      return f.apply(this, arguments);
    } catch (e) {
      return m.e = e, m;
    }
  }

  function g(e) {
    return f = e, y;
  }

  var b = function (e) {
    function t(i) {
      var n = e.call(this, i ? i.length + " errors occurred during unsubscription:\n  " + i.map(function (e, t) {
        return t + 1 + ") " + e.toString();
      }).join("\n  ") : "") || this;
      return n.errors = i, n.name = "UnsubscriptionError", Object.setPrototypeOf(n, t.prototype), n;
    }

    return s(t, e), t;
  }(Error),
      v = function () {
    function e(e) {
      this.closed = !1, this._parent = null, this._parents = null, this._subscriptions = null, e && (this._unsubscribe = e);
    }

    var t;
    return e.prototype.unsubscribe = function () {
      var e,
          t = !1;

      if (!this.closed) {
        var i = this._parent,
            n = this._parents,
            r = this._unsubscribe,
            o = this._subscriptions;
        this.closed = !0, this._parent = null, this._parents = null, this._subscriptions = null;

        for (var s = -1, c = n ? n.length : 0; i;) {
          i.remove(this), i = ++s < c && n[s] || null;
        }

        if (a(r)) g(r).call(this) === m && (t = !0, e = e || (m.e instanceof b ? _(m.e.errors) : [m.e]));
        if (d(o)) for (s = -1, c = o.length; ++s < c;) {
          var l = o[s];
          if (h(l)) if (g(l.unsubscribe).call(l) === m) {
            t = !0, e = e || [];
            var u = m.e;
            u instanceof b ? e = e.concat(_(u.errors)) : e.push(u);
          }
        }
        if (t) throw new b(e);
      }
    }, e.prototype.add = function (t) {
      if (!t || t === e.EMPTY) return e.EMPTY;
      if (t === this) return this;
      var i = t;

      switch (_typeof(t)) {
        case "function":
          i = new e(t);

        case "object":
          if (i.closed || "function" != typeof i.unsubscribe) return i;
          if (this.closed) return i.unsubscribe(), i;

          if ("function" != typeof i._addParent) {
            var n = i;
            (i = new e())._subscriptions = [n];
          }

          break;

        default:
          throw new Error("unrecognized teardown " + t + " added to Subscription.");
      }

      return (this._subscriptions || (this._subscriptions = [])).push(i), i._addParent(this), i;
    }, e.prototype.remove = function (e) {
      var t = this._subscriptions;

      if (t) {
        var i = t.indexOf(e);
        -1 !== i && t.splice(i, 1);
      }
    }, e.prototype._addParent = function (e) {
      var t = this._parent,
          i = this._parents;
      t && t !== e ? i ? -1 === i.indexOf(e) && i.push(e) : this._parents = [e] : this._parent = e;
    }, e.EMPTY = ((t = new e()).closed = !0, t), e;
  }();

  function _(e) {
    return e.reduce(function (e, t) {
      return e.concat(t instanceof b ? t.errors : t);
    }, []);
  }

  var w = "function" == typeof Symbol && "function" == typeof Symbol.for ? Symbol.for("rxSubscriber") : "@@rxSubscriber",
      O = function (e) {
    function t(t, i, n) {
      var r,
          o = e.call(this) || this;

      switch (o.syncErrorValue = null, o.syncErrorThrown = !1, o.syncErrorThrowable = !1, o.isStopped = !1, arguments.length) {
        case 0:
          o.destination = p;
          break;

        case 1:
          if (!t) {
            o.destination = p;
            break;
          }

          if ("object" == _typeof(t)) {
            if ((r = t) instanceof O || "syncErrorThrowable" in r && r[w]) {
              var s = t[w]();
              o.syncErrorThrowable = s.syncErrorThrowable, o.destination = s, s.add(o);
            } else o.syncErrorThrowable = !0, o.destination = new k(o, t);

            break;
          }

        default:
          o.syncErrorThrowable = !0, o.destination = new k(o, t, i, n);
      }

      return o;
    }

    return s(t, e), t.prototype[w] = function () {
      return this;
    }, t.create = function (e, i, n) {
      var r = new t(e, i, n);
      return r.syncErrorThrowable = !1, r;
    }, t.prototype.next = function (e) {
      this.isStopped || this._next(e);
    }, t.prototype.error = function (e) {
      this.isStopped || (this.isStopped = !0, this._error(e));
    }, t.prototype.complete = function () {
      this.isStopped || (this.isStopped = !0, this._complete());
    }, t.prototype.unsubscribe = function () {
      this.closed || (this.isStopped = !0, e.prototype.unsubscribe.call(this));
    }, t.prototype._next = function (e) {
      this.destination.next(e);
    }, t.prototype._error = function (e) {
      this.destination.error(e), this.unsubscribe();
    }, t.prototype._complete = function () {
      this.destination.complete(), this.unsubscribe();
    }, t.prototype._unsubscribeAndRecycle = function () {
      var e = this._parent,
          t = this._parents;
      return this._parent = null, this._parents = null, this.unsubscribe(), this.closed = !1, this.isStopped = !1, this._parent = e, this._parents = t, this;
    }, t;
  }(v),
      k = function (e) {
    function t(t, i, n, r) {
      var o,
          s = e.call(this) || this;
      s._parentSubscriber = t;
      var c = s;
      return a(i) ? o = i : i && (o = i.next, n = i.error, r = i.complete, i !== p && (a((c = Object.create(i)).unsubscribe) && s.add(c.unsubscribe.bind(c)), c.unsubscribe = s.unsubscribe.bind(s))), s._context = c, s._next = o, s._error = n, s._complete = r, s;
    }

    return s(t, e), t.prototype.next = function (e) {
      if (!this.isStopped && this._next) {
        var t = this._parentSubscriber;
        l.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? this.__tryOrSetError(t, this._next, e) && this.unsubscribe() : this.__tryOrUnsub(this._next, e);
      }
    }, t.prototype.error = function (e) {
      if (!this.isStopped) {
        var t = this._parentSubscriber,
            i = l.useDeprecatedSynchronousErrorHandling;
        if (this._error) i && t.syncErrorThrowable ? (this.__tryOrSetError(t, this._error, e), this.unsubscribe()) : (this.__tryOrUnsub(this._error, e), this.unsubscribe());else if (t.syncErrorThrowable) i ? (t.syncErrorValue = e, t.syncErrorThrown = !0) : u(e), this.unsubscribe();else {
          if (this.unsubscribe(), i) throw e;
          u(e);
        }
      }
    }, t.prototype.complete = function () {
      var e = this;

      if (!this.isStopped) {
        var t = this._parentSubscriber;

        if (this._complete) {
          var i = function i() {
            return e._complete.call(e._context);
          };

          l.useDeprecatedSynchronousErrorHandling && t.syncErrorThrowable ? (this.__tryOrSetError(t, i), this.unsubscribe()) : (this.__tryOrUnsub(i), this.unsubscribe());
        } else this.unsubscribe();
      }
    }, t.prototype.__tryOrUnsub = function (e, t) {
      try {
        e.call(this._context, t);
      } catch (e) {
        if (this.unsubscribe(), l.useDeprecatedSynchronousErrorHandling) throw e;
        u(e);
      }
    }, t.prototype.__tryOrSetError = function (e, t, i) {
      if (!l.useDeprecatedSynchronousErrorHandling) throw new Error("bad call");

      try {
        t.call(this._context, i);
      } catch (t) {
        return l.useDeprecatedSynchronousErrorHandling ? (e.syncErrorValue = t, e.syncErrorThrown = !0, !0) : (u(t), !0);
      }

      return !1;
    }, t.prototype._unsubscribe = function () {
      var e = this._parentSubscriber;
      this._context = null, this._parentSubscriber = null, e.unsubscribe();
    }, t;
  }(O);

  var T = "function" == typeof Symbol && Symbol.observable || "@@observable";

  function C() {}

  var D = function () {
    function e(e) {
      this._isScalar = !1, e && (this._subscribe = e);
    }

    return e.prototype.lift = function (t) {
      var i = new e();
      return i.source = this, i.operator = t, i;
    }, e.prototype.subscribe = function (e, t, i) {
      var n = this.operator,
          r = function (e, t, i) {
        if (e) {
          if (e instanceof O) return e;
          if (e[w]) return e[w]();
        }

        return e || t || i ? new O(e, t, i) : new O(p);
      }(e, t, i);

      if (n ? n.call(r, this.source) : r.add(this.source || !r.syncErrorThrowable ? this._subscribe(r) : this._trySubscribe(r)), l.useDeprecatedSynchronousErrorHandling && r.syncErrorThrowable && (r.syncErrorThrowable = !1, r.syncErrorThrown)) throw r.syncErrorValue;
      return r;
    }, e.prototype._trySubscribe = function (e) {
      try {
        return this._subscribe(e);
      } catch (t) {
        l.useDeprecatedSynchronousErrorHandling && (e.syncErrorThrown = !0, e.syncErrorValue = t), e.error(t);
      }
    }, e.prototype.forEach = function (e, t) {
      var i = this;
      return new (t = M(t))(function (t, n) {
        var r;
        r = i.subscribe(function (t) {
          try {
            e(t);
          } catch (e) {
            n(e), r && r.unsubscribe();
          }
        }, n, t);
      });
    }, e.prototype._subscribe = function (e) {
      var t = this.source;
      return t && t.subscribe(e);
    }, e.prototype[T] = function () {
      return this;
    }, e.prototype.pipe = function () {
      for (var e, t = [], i = 0; i < arguments.length; i++) {
        t[i] = arguments[i];
      }

      return 0 === t.length ? this : ((e = t) ? 1 === e.length ? e[0] : function (t) {
        return e.reduce(function (e, t) {
          return t(e);
        }, t);
      } : C)(this);
    }, e.prototype.toPromise = function (e) {
      var t = this;
      return new (e = M(e))(function (e, i) {
        var n;
        t.subscribe(function (e) {
          return n = e;
        }, function (e) {
          return i(e);
        }, function () {
          return e(n);
        });
      });
    }, e.create = function (t) {
      return new e(t);
    }, e;
  }();

  function M(e) {
    if (e || (e = l.Promise || Promise), !e) throw new Error("no Promise impl found");
    return e;
  }

  var I = function (e) {
    function t() {
      var i = e.call(this, "object unsubscribed") || this;
      return i.name = "ObjectUnsubscribedError", Object.setPrototypeOf(i, t.prototype), i;
    }

    return s(t, e), t;
  }(Error),
      S = function (e) {
    function t(t, i) {
      var n = e.call(this) || this;
      return n.subject = t, n.subscriber = i, n.closed = !1, n;
    }

    return s(t, e), t.prototype.unsubscribe = function () {
      if (!this.closed) {
        this.closed = !0;
        var e = this.subject,
            t = e.observers;

        if (this.subject = null, t && 0 !== t.length && !e.isStopped && !e.closed) {
          var i = t.indexOf(this.subscriber);
          -1 !== i && t.splice(i, 1);
        }
      }
    }, t;
  }(v),
      A = function (e) {
    function t(t) {
      var i = e.call(this, t) || this;
      return i.destination = t, i;
    }

    return s(t, e), t;
  }(O),
      E = function (e) {
    function t() {
      var t = e.call(this) || this;
      return t.observers = [], t.closed = !1, t.isStopped = !1, t.hasError = !1, t.thrownError = null, t;
    }

    return s(t, e), t.prototype[w] = function () {
      return new A(this);
    }, t.prototype.lift = function (e) {
      var t = new P(this, this);
      return t.operator = e, t;
    }, t.prototype.next = function (e) {
      if (this.closed) throw new I();
      if (!this.isStopped) for (var t = this.observers, i = t.length, n = t.slice(), r = 0; r < i; r++) {
        n[r].next(e);
      }
    }, t.prototype.error = function (e) {
      if (this.closed) throw new I();
      this.hasError = !0, this.thrownError = e, this.isStopped = !0;

      for (var t = this.observers, i = t.length, n = t.slice(), r = 0; r < i; r++) {
        n[r].error(e);
      }

      this.observers.length = 0;
    }, t.prototype.complete = function () {
      if (this.closed) throw new I();
      this.isStopped = !0;

      for (var e = this.observers, t = e.length, i = e.slice(), n = 0; n < t; n++) {
        i[n].complete();
      }

      this.observers.length = 0;
    }, t.prototype.unsubscribe = function () {
      this.isStopped = !0, this.closed = !0, this.observers = null;
    }, t.prototype._trySubscribe = function (t) {
      if (this.closed) throw new I();
      return e.prototype._trySubscribe.call(this, t);
    }, t.prototype._subscribe = function (e) {
      if (this.closed) throw new I();
      return this.hasError ? (e.error(this.thrownError), v.EMPTY) : this.isStopped ? (e.complete(), v.EMPTY) : (this.observers.push(e), new S(this, e));
    }, t.prototype.asObservable = function () {
      var e = new D();
      return e.source = this, e;
    }, t.create = function (e, t) {
      return new P(e, t);
    }, t;
  }(D),
      P = function (e) {
    function t(t, i) {
      var n = e.call(this) || this;
      return n.destination = t, n.source = i, n;
    }

    return s(t, e), t.prototype.next = function (e) {
      var t = this.destination;
      t && t.next && t.next(e);
    }, t.prototype.error = function (e) {
      var t = this.destination;
      t && t.error && this.destination.error(e);
    }, t.prototype.complete = function () {
      var e = this.destination;
      e && e.complete && this.destination.complete();
    }, t.prototype._subscribe = function (e) {
      return this.source ? this.source.subscribe(e) : v.EMPTY;
    }, t;
  }(E);

  var x = function (e) {
    function t(t, i) {
      var n = e.call(this, t, i) || this;
      return n.scheduler = t, n.work = i, n.pending = !1, n;
    }

    return s(t, e), t.prototype.schedule = function (e, t) {
      if (void 0 === t && (t = 0), this.closed) return this;
      this.state = e;
      var i = this.id,
          n = this.scheduler;
      return null != i && (this.id = this.recycleAsyncId(n, i, t)), this.pending = !0, this.delay = t, this.id = this.id || this.requestAsyncId(n, this.id, t), this;
    }, t.prototype.requestAsyncId = function (e, t, i) {
      return void 0 === i && (i = 0), setInterval(e.flush.bind(e, this), i);
    }, t.prototype.recycleAsyncId = function (e, t, i) {
      if (void 0 === i && (i = 0), null !== i && this.delay === i && !1 === this.pending) return t;
      clearInterval(t);
    }, t.prototype.execute = function (e, t) {
      if (this.closed) return new Error("executing a cancelled action");
      this.pending = !1;

      var i = this._execute(e, t);

      if (i) return i;
      !1 === this.pending && null != this.id && (this.id = this.recycleAsyncId(this.scheduler, this.id, null));
    }, t.prototype._execute = function (e, t) {
      var i = !1,
          n = void 0;

      try {
        this.work(e);
      } catch (e) {
        i = !0, n = !!e && e || new Error(e);
      }

      if (i) return this.unsubscribe(), n;
    }, t.prototype._unsubscribe = function () {
      var e = this.id,
          t = this.scheduler,
          i = t.actions,
          n = i.indexOf(this);
      this.work = null, this.state = null, this.pending = !1, this.scheduler = null, -1 !== n && i.splice(n, 1), null != e && (this.id = this.recycleAsyncId(t, e, null)), this.delay = null;
    }, t;
  }(function (e) {
    function t(t, i) {
      return e.call(this) || this;
    }

    return s(t, e), t.prototype.schedule = function (e, t) {
      return void 0 === t && (t = 0), this;
    }, t;
  }(v)),
      j = function () {
    function e(t, i) {
      void 0 === i && (i = e.now), this.SchedulerAction = t, this.now = i;
    }

    return e.prototype.schedule = function (e, t, i) {
      return void 0 === t && (t = 0), new this.SchedulerAction(this, e).schedule(i, t);
    }, e.now = Date.now ? Date.now : function () {
      return +new Date();
    }, e;
  }(),
      R = function (e) {
    function t(i, n) {
      void 0 === n && (n = j.now);
      var r = e.call(this, i, function () {
        return t.delegate && t.delegate !== r ? t.delegate.now() : n();
      }) || this;
      return r.actions = [], r.active = !1, r.scheduled = void 0, r;
    }

    return s(t, e), t.prototype.schedule = function (i, n, r) {
      return void 0 === n && (n = 0), t.delegate && t.delegate !== this ? t.delegate.schedule(i, n, r) : e.prototype.schedule.call(this, i, n, r);
    }, t.prototype.flush = function (e) {
      var t = this.actions;
      if (this.active) t.push(e);else {
        var i;
        this.active = !0;

        do {
          if (i = e.execute(e.state, e.delay)) break;
        } while (e = t.shift());

        if (this.active = !1, i) {
          for (; e = t.shift();) {
            e.unsubscribe();
          }

          throw i;
        }
      }
    }, t;
  }(j),
      V = new D(function (e) {
    return e.complete();
  });

  function F(e) {
    return e ? (t = e, new D(function (e) {
      return t.schedule(function () {
        return e.complete();
      });
    })) : V;
    var t;
  }

  function L(e) {
    return e && "function" == typeof e.schedule;
  }

  var B = function B(e) {
    return function (t) {
      for (var i = 0, n = e.length; i < n && !t.closed; i++) {
        t.next(e[i]);
      }

      t.closed || t.complete();
    };
  };

  function N(e, t) {
    return new D(t ? function (i) {
      var n = new v(),
          r = 0;
      return n.add(t.schedule(function () {
        r !== e.length ? (i.next(e[r++]), i.closed || n.add(this.schedule())) : i.complete();
      })), n;
    } : B(e));
  }

  function Y(e) {
    var t = new D(function (t) {
      t.next(e), t.complete();
    });
    return t._isScalar = !0, t.value = e, t;
  }

  function H() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }

    var i = e[e.length - 1];

    switch (L(i) ? e.pop() : i = void 0, e.length) {
      case 0:
        return F(i);

      case 1:
        return i ? N(e, i) : Y(e[0]);

      default:
        return N(e, i);
    }
  }

  var z = new R(x);

  function W(e) {
    return e;
  }

  var X = function (e) {
    function t() {
      var i = e.call(this, "argument out of range") || this;
      return i.name = "ArgumentOutOfRangeError", Object.setPrototypeOf(i, t.prototype), i;
    }

    return s(t, e), t;
  }(Error);

  Error, Error;

  function Z(e, t) {
    return function (i) {
      if ("function" != typeof e) throw new TypeError("argument is not a function. Are you looking for `mapTo()`?");
      return i.lift(new $(e, t));
    };
  }

  var $ = function () {
    function e(e, t) {
      this.project = e, this.thisArg = t;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new K(e, this.project, this.thisArg));
    }, e;
  }(),
      K = function (e) {
    function t(t, i, n) {
      var r = e.call(this, t) || this;
      return r.project = i, r.count = 0, r.thisArg = n || r, r;
    }

    return s(t, e), t.prototype._next = function (e) {
      var t;

      try {
        t = this.project.call(this.thisArg, e, this.count++);
      } catch (e) {
        return void this.destination.error(e);
      }

      this.destination.next(t);
    }, t;
  }(O),
      U = function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }

    return s(t, e), t.prototype.notifyNext = function (e, t, i, n, r) {
      this.destination.next(t);
    }, t.prototype.notifyError = function (e, t) {
      this.destination.error(e);
    }, t.prototype.notifyComplete = function (e) {
      this.destination.complete();
    }, t;
  }(O),
      G = function (e) {
    function t(t, i, n) {
      var r = e.call(this) || this;
      return r.parent = t, r.outerValue = i, r.outerIndex = n, r.index = 0, r;
    }

    return s(t, e), t.prototype._next = function (e) {
      this.parent.notifyNext(this.outerValue, e, this.outerIndex, this.index++, this);
    }, t.prototype._error = function (e) {
      this.parent.notifyError(e, this), this.unsubscribe();
    }, t.prototype._complete = function () {
      this.parent.notifyComplete(this), this.unsubscribe();
    }, t;
  }(O),
      q = function q(e) {
    return function (t) {
      return e.then(function (e) {
        t.closed || (t.next(e), t.complete());
      }, function (e) {
        return t.error(e);
      }).then(null, u), t;
    };
  };

  var J = function () {
    return "function" == typeof Symbol && Symbol.iterator ? Symbol.iterator : "@@iterator";
  }(),
      Q = function Q(e) {
    return function (t) {
      for (var i = e[J]();;) {
        var n = i.next();

        if (n.done) {
          t.complete();
          break;
        }

        if (t.next(n.value), t.closed) break;
      }

      return "function" == typeof i.return && t.add(function () {
        i.return && i.return();
      }), t;
    };
  },
      ee = function ee(e) {
    return function (t) {
      var i = e[T]();
      if ("function" != typeof i.subscribe) throw new TypeError("Provided object does not correctly implement Symbol.observable");
      return i.subscribe(t);
    };
  },
      te = function te(e) {
    return e && "number" == typeof e.length && "function" != typeof e;
  };

  function ie(e) {
    return e && "function" != typeof e.subscribe && "function" == typeof e.then;
  }

  var ne = function ne(e) {
    if (e instanceof D) return function (t) {
      return e._isScalar ? (t.next(e.value), void t.complete()) : e.subscribe(t);
    };
    if (te(e)) return B(e);
    if (ie(e)) return q(e);
    if (e && "function" == typeof e[J]) return Q(e);
    if (e && "function" == typeof e[T]) return ee(e);
    var t = h(e) ? "an invalid object" : "'" + e + "'";
    throw new TypeError("You provided " + t + " where a stream was expected. You can provide an Observable, Promise, Array, or Iterable.");
  };

  function re(e, t, i, n) {
    var r = new G(e, i, n);
    return ne(t)(r);
  }

  function oe(e, t) {
    if (!t) return e instanceof D ? e : new D(ne(e));

    if (null != e) {
      if ((a = e) && "function" == typeof a[T]) return o = e, new D((s = t) ? function (e) {
        var t = new v();
        return t.add(s.schedule(function () {
          var i = o[T]();
          t.add(i.subscribe({
            next: function next(i) {
              t.add(s.schedule(function () {
                return e.next(i);
              }));
            },
            error: function error(i) {
              t.add(s.schedule(function () {
                return e.error(i);
              }));
            },
            complete: function complete() {
              t.add(s.schedule(function () {
                return e.complete();
              }));
            }
          }));
        })), t;
      } : ee(o));
      if (ie(e)) return n = e, new D((r = t) ? function (e) {
        var t = new v();
        return t.add(r.schedule(function () {
          return n.then(function (i) {
            t.add(r.schedule(function () {
              e.next(i), t.add(r.schedule(function () {
                return e.complete();
              }));
            }));
          }, function (i) {
            t.add(r.schedule(function () {
              return e.error(i);
            }));
          });
        })), t;
      } : q(n));
      if (te(e)) return N(e, t);
      if ((i = e) && "function" == typeof i[J] || "string" == typeof e) return function (e, t) {
        if (!e) throw new Error("Iterable cannot be null");
        return new D(t ? function (i) {
          var n,
              r = new v();
          return r.add(function () {
            n && "function" == typeof n.return && n.return();
          }), r.add(t.schedule(function () {
            n = e[J](), r.add(t.schedule(function () {
              if (!i.closed) {
                var e, t;

                try {
                  var r = n.next();
                  e = r.value, t = r.done;
                } catch (e) {
                  return void i.error(e);
                }

                t ? i.complete() : (i.next(e), this.schedule());
              }
            }));
          })), r;
        } : Q(e));
      }(e, t);
    }

    var i, n, r, o, s, a;
    throw new TypeError((null !== e && _typeof(e) || e) + " is not observable");
  }

  var se = function () {
    function e(e, t) {
      void 0 === t && (t = Number.POSITIVE_INFINITY), this.project = e, this.concurrent = t;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new ae(e, this.project, this.concurrent));
    }, e;
  }(),
      ae = function (e) {
    function t(t, i, n) {
      void 0 === n && (n = Number.POSITIVE_INFINITY);
      var r = e.call(this, t) || this;
      return r.project = i, r.concurrent = n, r.hasCompleted = !1, r.buffer = [], r.active = 0, r.index = 0, r;
    }

    return s(t, e), t.prototype._next = function (e) {
      this.active < this.concurrent ? this._tryNext(e) : this.buffer.push(e);
    }, t.prototype._tryNext = function (e) {
      var t,
          i = this.index++;

      try {
        t = this.project(e, i);
      } catch (e) {
        return void this.destination.error(e);
      }

      this.active++, this._innerSub(t, e, i);
    }, t.prototype._innerSub = function (e, t, i) {
      this.add(re(this, e, t, i));
    }, t.prototype._complete = function () {
      this.hasCompleted = !0, 0 === this.active && 0 === this.buffer.length && this.destination.complete();
    }, t.prototype.notifyNext = function (e, t, i, n, r) {
      this.destination.next(t);
    }, t.prototype.notifyComplete = function (e) {
      var t = this.buffer;
      this.remove(e), this.active--, t.length > 0 ? this._next(t.shift()) : 0 === this.active && this.hasCompleted && this.destination.complete();
    }, t;
  }(U);

  function ce(e) {
    return void 0 === e && (e = Number.POSITIVE_INFINITY), function e(t, i, n) {
      return void 0 === n && (n = Number.POSITIVE_INFINITY), "function" == typeof i ? function (r) {
        return r.pipe(e(function (e, n) {
          return oe(t(e, n)).pipe(Z(function (t, r) {
            return i(e, t, n, r);
          }));
        }, n));
      } : ("number" == typeof i && (n = i), function (e) {
        return e.lift(new se(t, n));
      });
    }(W, e);
  }

  function le() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }

    return 1 === e.length || 2 === e.length && L(e[1]) ? oe(e[0]) : ce(1)(H.apply(void 0, e));
  }

  function ue(e, t, i, n) {
    return a(i) && (n = i, i = void 0), n ? ue(e, t, i).pipe(Z(function (e) {
      return d(e) ? n.apply(void 0, e) : n(e);
    })) : new D(function (n) {
      !function e(t, i, n, r, o) {
        var s;

        if (f = t, f && "function" == typeof f.addEventListener && "function" == typeof f.removeEventListener) {
          var a = t;
          t.addEventListener(i, n, o), s = function s() {
            return a.removeEventListener(i, n, o);
          };
        } else if (h = t, h && "function" == typeof h.on && "function" == typeof h.off) {
          var c = t;
          t.on(i, n), s = function s() {
            return c.off(i, n);
          };
        } else if (d = t, d && "function" == typeof d.addListener && "function" == typeof d.removeListener) {
          var l = t;
          t.addListener(i, n), s = function s() {
            return l.removeListener(i, n);
          };
        } else {
          if (!t || !t.length) throw new TypeError("Invalid event target");

          for (var u = 0, p = t.length; u < p; u++) {
            e(t[u], i, n, r, o);
          }
        }

        var d;
        var h;
        var f;
        r.add(s);
      }(e, t, function (e) {
        arguments.length > 1 ? n.next(Array.prototype.slice.call(arguments)) : n.next(e);
      }, n, i);
    });
  }

  function pe(e) {
    return !d(e) && e - parseFloat(e) + 1 >= 0;
  }

  function de() {
    for (var e = [], t = 0; t < arguments.length; t++) {
      e[t] = arguments[t];
    }

    var i = Number.POSITIVE_INFINITY,
        n = null,
        r = e[e.length - 1];
    return L(r) ? (n = e.pop(), e.length > 1 && "number" == typeof e[e.length - 1] && (i = e.pop())) : "number" == typeof r && (i = e.pop()), null === n && 1 === e.length && e[0] instanceof D ? e[0] : ce(i)(N(e, n));
  }

  function he(e) {
    var t = e.index,
        i = e.period,
        n = e.subscriber;

    if (n.next(t), !n.closed) {
      if (-1 === i) return n.complete();
      e.index = t + 1, this.schedule(e, i);
    }
  }

  var fe = 27;

  var me = function () {
    function e(e) {
      this.durationSelector = e;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new ye(e, this.durationSelector));
    }, e;
  }(),
      ye = function (e) {
    function t(t, i) {
      var n = e.call(this, t) || this;
      return n.durationSelector = i, n.hasValue = !1, n;
    }

    return s(t, e), t.prototype._next = function (e) {
      if (this.value = e, this.hasValue = !0, !this.throttled) {
        var t = g(this.durationSelector)(e);
        if (t === m) this.destination.error(m.e);else {
          var i = re(this, t);
          !i || i.closed ? this.clearThrottle() : this.add(this.throttled = i);
        }
      }
    }, t.prototype.clearThrottle = function () {
      var e = this.value,
          t = this.hasValue,
          i = this.throttled;
      i && (this.remove(i), this.throttled = null, i.unsubscribe()), t && (this.value = null, this.hasValue = !1, this.destination.next(e));
    }, t.prototype.notifyNext = function (e, t, i, n) {
      this.clearThrottle();
    }, t.prototype.notifyComplete = function () {
      this.clearThrottle();
    }, t;
  }(U);

  function ge(e, t) {
    return void 0 === t && (t = z), i = function i() {
      return function (e, t, i) {
        void 0 === e && (e = 0);
        var n = -1;
        return pe(t) ? n = Number(t) < 1 ? 1 : Number(t) : L(t) && (i = t), L(i) || (i = z), new D(function (t) {
          var r = pe(e) ? e : +e - i.now();
          return i.schedule(he, r, {
            index: 0,
            period: n,
            subscriber: t
          });
        });
      }(e, t);
    }, function (e) {
      return e.lift(new me(i));
    };
    var i;
  }

  function be(e, t) {
    return void 0 === t && (t = z), function (i) {
      return i.lift(new ve(e, t));
    };
  }

  var ve = function () {
    function e(e, t) {
      this.dueTime = e, this.scheduler = t;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new _e(e, this.dueTime, this.scheduler));
    }, e;
  }(),
      _e = function (e) {
    function t(t, i, n) {
      var r = e.call(this, t) || this;
      return r.dueTime = i, r.scheduler = n, r.debouncedSubscription = null, r.lastValue = null, r.hasValue = !1, r;
    }

    return s(t, e), t.prototype._next = function (e) {
      this.clearDebounce(), this.lastValue = e, this.hasValue = !0, this.add(this.debouncedSubscription = this.scheduler.schedule(we, this.dueTime, this));
    }, t.prototype._complete = function () {
      this.debouncedNext(), this.destination.complete();
    }, t.prototype.debouncedNext = function () {
      if (this.clearDebounce(), this.hasValue) {
        var e = this.lastValue;
        this.lastValue = null, this.hasValue = !1, this.destination.next(e);
      }
    }, t.prototype.clearDebounce = function () {
      var e = this.debouncedSubscription;
      null !== e && (this.remove(e), e.unsubscribe(), this.debouncedSubscription = null);
    }, t;
  }(O);

  function we(e) {
    e.debouncedNext();
  }

  var Oe = function () {
    function e(e, t) {
      this.compare = e, this.keySelector = t;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new ke(e, this.compare, this.keySelector));
    }, e;
  }(),
      ke = function (e) {
    function t(t, i, n) {
      var r = e.call(this, t) || this;
      return r.keySelector = n, r.hasKey = !1, "function" == typeof i && (r.compare = i), r;
    }

    return s(t, e), t.prototype.compare = function (e, t) {
      return e === t;
    }, t.prototype._next = function (e) {
      var t = e;
      if (this.keySelector && (t = g(this.keySelector)(e)) === m) return this.destination.error(m.e);
      var i = !1;

      if (this.hasKey) {
        if ((i = g(this.compare)(this.key, t)) === m) return this.destination.error(m.e);
      } else this.hasKey = !0;

      !1 === Boolean(i) && (this.key = t, this.destination.next(e));
    }, t;
  }(O);

  function Te(e, t) {
    return function (i) {
      return i.lift(new Ce(e, t));
    };
  }

  var Ce = function () {
    function e(e, t) {
      this.predicate = e, this.thisArg = t;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new De(e, this.predicate, this.thisArg));
    }, e;
  }(),
      De = function (e) {
    function t(t, i, n) {
      var r = e.call(this, t) || this;
      return r.predicate = i, r.thisArg = n, r.count = 0, r;
    }

    return s(t, e), t.prototype._next = function (e) {
      var t;

      try {
        t = this.predicate.call(this.thisArg, e, this.count++);
      } catch (e) {
        return void this.destination.error(e);
      }

      t && this.destination.next(e);
    }, t;
  }(O);

  var Me = function () {
    function e(e, t, i) {
      this.nextOrObserver = e, this.error = t, this.complete = i;
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new Ie(e, this.nextOrObserver, this.error, this.complete));
    }, e;
  }(),
      Ie = function (e) {
    function t(t, i, n, r) {
      var o = e.call(this, t) || this;
      return o._tapNext = C, o._tapError = C, o._tapComplete = C, o._tapError = n || C, o._tapComplete = r || C, a(i) ? (o._context = o, o._tapNext = i) : i && (o._context = i, o._tapNext = i.next || C, o._tapError = i.error || C, o._tapComplete = i.complete || C), o;
    }

    return s(t, e), t.prototype._next = function (e) {
      try {
        this._tapNext.call(this._context, e);
      } catch (e) {
        return void this.destination.error(e);
      }

      this.destination.next(e);
    }, t.prototype._error = function (e) {
      try {
        this._tapError.call(this._context, e);
      } catch (e) {
        return void this.destination.error(e);
      }

      this.destination.error(e);
    }, t.prototype._complete = function () {
      try {
        this._tapComplete.call(this._context);
      } catch (e) {
        return void this.destination.error(e);
      }

      return this.destination.complete();
    }, t;
  }(O);

  function Se(e) {
    return function (t) {
      return 0 === e ? F() : t.lift(new Ae(e));
    };
  }

  var Ae = function () {
    function e(e) {
      if (this.total = e, this.total < 0) throw new X();
    }

    return e.prototype.call = function (e, t) {
      return t.subscribe(new Ee(e, this.total));
    }, e;
  }(),
      Ee = function (e) {
    function t(t, i) {
      var n = e.call(this, t) || this;
      return n.total = i, n.count = 0, n;
    }

    return s(t, e), t.prototype._next = function (e) {
      var t = this.total,
          i = ++this.count;
      i <= t && (this.destination.next(e), i === t && (this.destination.complete(), this.unsubscribe()));
    }, t;
  }(O);

  var Pe = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  };

  function xe(e, t) {
    function i() {
      this.constructor = e;
    }

    Pe(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }

  var je,
      Re = Object.assign || function (e) {
    for (var t, i = 1, n = arguments.length; i < n; i++) {
      t = arguments[i];

      for (var r in t) {
        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      }
    }

    return e;
  },
      Ve = "undefined" != typeof Intl && Intl.v8BreakIterator,
      Fe = function () {
    function e(e) {
      this._platformId = e, this.isBrowser = this._platformId ? i.isPlatformBrowser(this._platformId) : "object" == (typeof document === "undefined" ? "undefined" : _typeof(document)) && !!document, this.EDGE = this.isBrowser && /(edge)/i.test(navigator.userAgent), this.TRIDENT = this.isBrowser && /(msie|trident)/i.test(navigator.userAgent), this.BLINK = this.isBrowser && !(!window.chrome && !Ve) && "undefined" != typeof CSS && !this.EDGE && !this.TRIDENT, this.WEBKIT = this.isBrowser && /AppleWebKit/i.test(navigator.userAgent) && !this.BLINK && !this.EDGE && !this.TRIDENT, this.IOS = this.isBrowser && /iPad|iPhone|iPod/.test(navigator.userAgent) && !window.MSStream, this.FIREFOX = this.isBrowser && /(firefox|minefield)/i.test(navigator.userAgent), this.ANDROID = this.isBrowser && /android/i.test(navigator.userAgent) && !this.TRIDENT, this.SAFARI = this.isBrowser && /safari/i.test(navigator.userAgent) && this.WEBKIT;
    }

    return e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: Object,
        decorators: [{
          type: t.Optional
        }, {
          type: t.Inject,
          args: [t.PLATFORM_ID]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(t.PLATFORM_ID, 8));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  function Le() {
    if (null == je && "undefined" != typeof window) try {
      window.addEventListener("test", null, Object.defineProperty({}, "passive", {
        get: function get() {
          return je = !0;
        }
      }));
    } finally {
      je = je || !1;
    }
    return je;
  }

  var Be = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule
    }], e;
  }();

  function Ne(e) {
    return null != e && "" + e != "false";
  }

  function Ye(e, t) {
    return void 0 === t && (t = 0), i = e, isNaN(parseFloat(i)) || isNaN(Number(i)) ? t : Number(e);
    var i;
  }

  function He(e) {
    return Array.isArray(e) ? e : [e];
  }

  function ze(e) {
    return null == e ? "" : "string" == typeof e ? e : e + "px";
  }

  var We = function () {
    function e() {}

    return e.prototype.create = function (e) {
      return "undefined" == typeof MutationObserver ? null : new MutationObserver(e);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e();
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      Xe = function () {
    function e(e) {
      this._mutationObserverFactory = e, this._observedElements = new Map();
    }

    return e.prototype.ngOnDestroy = function () {
      var e = this;

      this._observedElements.forEach(function (t, i) {
        return e._cleanupObserver(i);
      });
    }, e.prototype.observe = function (e) {
      var t = this;
      return D.create(function (i) {
        var n = t._observeElement(e).subscribe(i);

        return function () {
          n.unsubscribe(), t._unobserveElement(e);
        };
      });
    }, e.prototype._observeElement = function (e) {
      if (this._observedElements.has(e)) this._observedElements.get(e).count++;else {
        var t = new E(),
            i = this._mutationObserverFactory.create(function (e) {
          return t.next(e);
        });

        i && i.observe(e, {
          characterData: !0,
          childList: !0,
          subtree: !0
        }), this._observedElements.set(e, {
          observer: i,
          stream: t,
          count: 1
        });
      }
      return this._observedElements.get(e).stream;
    }, e.prototype._unobserveElement = function (e) {
      this._observedElements.has(e) && (this._observedElements.get(e).count--, this._observedElements.get(e).count || this._cleanupObserver(e));
    }, e.prototype._cleanupObserver = function (e) {
      if (this._observedElements.has(e)) {
        var t = this._observedElements.get(e),
            i = t.observer,
            n = t.stream;

        i && i.disconnect(), n.complete(), this._observedElements.delete(e);
      }
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: We
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(We));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      Ze = function () {
    function e(e, i, n) {
      this._contentObserver = e, this._elementRef = i, this._ngZone = n, this.event = new t.EventEmitter(), this._disabled = !1, this._currentSubscription = null;
    }

    return Object.defineProperty(e.prototype, "disabled", {
      get: function get() {
        return this._disabled;
      },
      set: function set(e) {
        this._disabled = Ne(e), this._disabled ? this._unsubscribe() : this._subscribe();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "debounce", {
      get: function get() {
        return this._debounce;
      },
      set: function set(e) {
        this._debounce = Ye(e), this._subscribe();
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngAfterContentInit = function () {
      this._currentSubscription || this.disabled || this._subscribe();
    }, e.prototype.ngOnDestroy = function () {
      this._unsubscribe();
    }, e.prototype._subscribe = function () {
      var e = this;

      this._unsubscribe();

      var t = this._contentObserver.observe(this._elementRef.nativeElement);

      this._ngZone.runOutsideAngular(function () {
        e._currentSubscription = (e.debounce ? t.pipe(be(e.debounce)) : t).subscribe(e.event);
      });
    }, e.prototype._unsubscribe = function () {
      this._currentSubscription && this._currentSubscription.unsubscribe();
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdkObserveContent]",
        exportAs: "cdkObserveContent"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: Xe
      }, {
        type: t.ElementRef
      }, {
        type: t.NgZone
      }];
    }, e.propDecorators = {
      event: [{
        type: t.Output,
        args: ["cdkObserveContent"]
      }],
      disabled: [{
        type: t.Input,
        args: ["cdkObserveContentDisabled"]
      }],
      debounce: [{
        type: t.Input
      }]
    }, e;
  }(),
      $e = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        exports: [Ze],
        declarations: [Ze],
        providers: [We]
      }]
    }], e;
  }(),
      Ke = " ";

  function Ue(e, t) {
    return (e.getAttribute(t) || "").match(/\S+/g) || [];
  }

  var Ge = "cdk-describedby-message",
      qe = "cdk-describedby-host",
      Je = 0,
      Qe = new Map(),
      et = null,
      tt = function () {
    function e(e) {
      this._document = e;
    }

    return e.prototype.describe = function (e, t) {
      this._canBeDescribed(e, t) && (Qe.has(t) || this._createMessageElement(t), this._isElementDescribedByMessage(e, t) || this._addMessageReference(e, t));
    }, e.prototype.removeDescription = function (e, t) {
      if (this._canBeDescribed(e, t)) {
        this._isElementDescribedByMessage(e, t) && this._removeMessageReference(e, t);
        var i = Qe.get(t);
        i && 0 === i.referenceCount && this._deleteMessageElement(t), et && 0 === et.childNodes.length && this._deleteMessagesContainer();
      }
    }, e.prototype.ngOnDestroy = function () {
      for (var e = this._document.querySelectorAll("[" + qe + "]"), t = 0; t < e.length; t++) {
        this._removeCdkDescribedByReferenceIds(e[t]), e[t].removeAttribute(qe);
      }

      et && this._deleteMessagesContainer(), Qe.clear();
    }, e.prototype._createMessageElement = function (e) {
      var t = this._document.createElement("div");

      t.setAttribute("id", Ge + "-" + Je++), t.appendChild(this._document.createTextNode(e)), et || this._createMessagesContainer(), et.appendChild(t), Qe.set(e, {
        messageElement: t,
        referenceCount: 0
      });
    }, e.prototype._deleteMessageElement = function (e) {
      var t = Qe.get(e),
          i = t && t.messageElement;
      et && i && et.removeChild(i), Qe.delete(e);
    }, e.prototype._createMessagesContainer = function () {
      (et = this._document.createElement("div")).setAttribute("id", "cdk-describedby-message-container"), et.setAttribute("aria-hidden", "true"), et.style.display = "none", this._document.body.appendChild(et);
    }, e.prototype._deleteMessagesContainer = function () {
      et && et.parentNode && (et.parentNode.removeChild(et), et = null);
    }, e.prototype._removeCdkDescribedByReferenceIds = function (e) {
      var t = Ue(e, "aria-describedby").filter(function (e) {
        return 0 != e.indexOf(Ge);
      });
      e.setAttribute("aria-describedby", t.join(" "));
    }, e.prototype._addMessageReference = function (e, t) {
      var i,
          n,
          r,
          o,
          s = Qe.get(t);
      i = e, n = "aria-describedby", r = s.messageElement.id, (o = Ue(i, n)).some(function (e) {
        return e.trim() == r.trim();
      }) || (o.push(r.trim()), i.setAttribute(n, o.join(Ke))), e.setAttribute(qe, ""), s.referenceCount++;
    }, e.prototype._removeMessageReference = function (e, t) {
      var i,
          n,
          r,
          o,
          s = Qe.get(t);
      s.referenceCount--, i = e, n = "aria-describedby", r = s.messageElement.id, o = Ue(i, n).filter(function (e) {
        return e != r.trim();
      }), i.setAttribute(n, o.join(Ke)), e.removeAttribute(qe);
    }, e.prototype._isElementDescribedByMessage = function (e, t) {
      var i = Ue(e, "aria-describedby"),
          n = Qe.get(t),
          r = n && n.messageElement.id;
      return !!r && -1 != i.indexOf(r);
    }, e.prototype._canBeDescribed = function (e, t) {
      return e.nodeType === this._document.ELEMENT_NODE && null != t && !!("" + t).trim();
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  new t.Optional(), new t.SkipSelf(), i.DOCUMENT;

  var it = function () {
    function e(e) {
      var i = this;
      this._items = e, this._activeItemIndex = -1, this._wrap = !1, this._letterKeyStream = new E(), this._typeaheadSubscription = v.EMPTY, this._vertical = !0, this._skipPredicateFn = function (e) {
        return e.disabled;
      }, this._pressedLetters = [], this.tabOut = new E(), this.change = new E(), e instanceof t.QueryList && e.changes.subscribe(function (e) {
        if (i._activeItem) {
          var t = e.toArray().indexOf(i._activeItem);
          t > -1 && t !== i._activeItemIndex && (i._activeItemIndex = t);
        }
      });
    }

    return e.prototype.skipPredicate = function (e) {
      return this._skipPredicateFn = e, this;
    }, e.prototype.withWrap = function () {
      return this._wrap = !0, this;
    }, e.prototype.withVerticalOrientation = function (e) {
      return void 0 === e && (e = !0), this._vertical = e, this;
    }, e.prototype.withHorizontalOrientation = function (e) {
      return this._horizontal = e, this;
    }, e.prototype.withTypeAhead = function (e) {
      var t,
          i,
          n,
          r = this;
      if (void 0 === e && (e = 200), this._items.length && this._items.some(function (e) {
        return "function" != typeof e.getLabel;
      })) throw Error("ListKeyManager items in typeahead mode must implement the `getLabel` method.");
      return this._typeaheadSubscription.unsubscribe(), this._typeaheadSubscription = this._letterKeyStream.pipe((t = function t(e) {
        return r._pressedLetters.push(e);
      }, function (e) {
        return e.lift(new Me(t, i, n));
      }), be(e), Te(function () {
        return r._pressedLetters.length > 0;
      }), Z(function () {
        return r._pressedLetters.join("");
      })).subscribe(function (e) {
        for (var t = r._getItemsArray(), i = 1; i < t.length + 1; i++) {
          var n = (r._activeItemIndex + i) % t.length,
              o = t[n];

          if (!r._skipPredicateFn(o) && 0 === o.getLabel().toUpperCase().trim().indexOf(e)) {
            r.setActiveItem(n);
            break;
          }
        }

        r._pressedLetters = [];
      }), this;
    }, e.prototype.setActiveItem = function (e) {
      var t = this._activeItemIndex;
      this.updateActiveItem(e), this._activeItemIndex !== t && this.change.next(this._activeItemIndex);
    }, e.prototype.onKeydown = function (e) {
      var t = e.keyCode;

      switch (t) {
        case 9:
          return void this.tabOut.next();

        case 40:
          if (this._vertical) {
            this.setNextItemActive();
            break;
          }

          return;

        case 38:
          if (this._vertical) {
            this.setPreviousItemActive();
            break;
          }

          return;

        case 39:
          if ("ltr" === this._horizontal) {
            this.setNextItemActive();
            break;
          }

          if ("rtl" === this._horizontal) {
            this.setPreviousItemActive();
            break;
          }

          return;

        case 37:
          if ("ltr" === this._horizontal) {
            this.setPreviousItemActive();
            break;
          }

          if ("rtl" === this._horizontal) {
            this.setNextItemActive();
            break;
          }

          return;

        default:
          return void (e.key && 1 === e.key.length ? this._letterKeyStream.next(e.key.toLocaleUpperCase()) : (t >= 65 && t <= 90 || t >= 48 && t <= 57) && this._letterKeyStream.next(String.fromCharCode(t)));
      }

      this._pressedLetters = [], e.preventDefault();
    }, Object.defineProperty(e.prototype, "activeItemIndex", {
      get: function get() {
        return this._activeItemIndex;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "activeItem", {
      get: function get() {
        return this._activeItem;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.setFirstItemActive = function () {
      this._setActiveItemByIndex(0, 1);
    }, e.prototype.setLastItemActive = function () {
      this._setActiveItemByIndex(this._items.length - 1, -1);
    }, e.prototype.setNextItemActive = function () {
      this._activeItemIndex < 0 ? this.setFirstItemActive() : this._setActiveItemByDelta(1);
    }, e.prototype.setPreviousItemActive = function () {
      this._activeItemIndex < 0 && this._wrap ? this.setLastItemActive() : this._setActiveItemByDelta(-1);
    }, e.prototype.updateActiveItem = function (e) {
      var t = this._getItemsArray(),
          i = "number" == typeof e ? e : t.indexOf(e);

      this._activeItemIndex = i, this._activeItem = t[i];
    }, e.prototype.updateActiveItemIndex = function (e) {
      this.updateActiveItem(e);
    }, e.prototype._setActiveItemByDelta = function (e) {
      this._wrap ? this._setActiveInWrapMode(e) : this._setActiveInDefaultMode(e);
    }, e.prototype._setActiveInWrapMode = function (e) {
      for (var t = this._getItemsArray(), i = 1; i <= t.length; i++) {
        var n = (this._activeItemIndex + e * i + t.length) % t.length,
            r = t[n];
        if (!this._skipPredicateFn(r)) return void this.setActiveItem(n);
      }
    }, e.prototype._setActiveInDefaultMode = function (e) {
      this._setActiveItemByIndex(this._activeItemIndex + e, e);
    }, e.prototype._setActiveItemByIndex = function (e, t) {
      var i = this._getItemsArray();

      if (i[e]) {
        for (; this._skipPredicateFn(i[e]);) {
          if (!i[e += t]) return;
        }

        this.setActiveItem(e);
      }
    }, e.prototype._getItemsArray = function () {
      return this._items instanceof t.QueryList ? this._items.toArray() : this._items;
    }, e;
  }(),
      nt = (function (e) {
    function t() {
      return null !== e && e.apply(this, arguments) || this;
    }

    xe(t, e), t.prototype.setActiveItem = function (t) {
      this.activeItem && this.activeItem.setInactiveStyles(), e.prototype.setActiveItem.call(this, t), this.activeItem && this.activeItem.setActiveStyles();
    };
  }(it), function (e) {
    function t() {
      var t = null !== e && e.apply(this, arguments) || this;
      return t._origin = "program", t;
    }

    xe(t, e), t.prototype.setFocusOrigin = function (e) {
      return this._origin = e, this;
    }, t.prototype.setActiveItem = function (t) {
      e.prototype.setActiveItem.call(this, t), this.activeItem && this.activeItem.focus(this._origin);
    };
  }(it), function () {
    function e(e) {
      this._platform = e;
    }

    return e.prototype.isDisabled = function (e) {
      return e.hasAttribute("disabled");
    }, e.prototype.isVisible = function (e) {
      return !!((t = e).offsetWidth || t.offsetHeight || "function" == typeof t.getClientRects && t.getClientRects().length) && "visible" === getComputedStyle(e).visibility;
      var t;
    }, e.prototype.isTabbable = function (e) {
      if (!this._platform.isBrowser) return !1;

      var t = function (e) {
        try {
          return e.frameElement;
        } catch (e) {
          return null;
        }
      }(e.ownerDocument.defaultView || window);

      if (t) {
        var i = t && t.nodeName.toLowerCase();
        if (-1 === ot(t)) return !1;
        if ((this._platform.BLINK || this._platform.WEBKIT) && "object" === i) return !1;
        if ((this._platform.BLINK || this._platform.WEBKIT) && !this.isVisible(t)) return !1;
      }

      var n,
          r,
          o,
          s = e.nodeName.toLowerCase(),
          a = ot(e);
      if (e.hasAttribute("contenteditable")) return -1 !== a;
      if ("iframe" === s) return !1;

      if ("audio" === s) {
        if (!e.hasAttribute("controls")) return !1;
        if (this._platform.BLINK) return !0;
      }

      if ("video" === s) {
        if (!e.hasAttribute("controls") && this._platform.TRIDENT) return !1;
        if (this._platform.BLINK || this._platform.FIREFOX) return !0;
      }

      return ("object" !== s || !this._platform.BLINK && !this._platform.WEBKIT) && (!this._platform.WEBKIT || !this._platform.IOS || (r = (n = e).nodeName.toLowerCase(), "text" === (o = "input" === r && n.type) || "password" === o || "select" === r || "textarea" === r)) && e.tabIndex >= 0;
    }, e.prototype.isFocusable = function (e) {
      return function (e) {
        if (t = e, i = t, "input" == i.nodeName.toLowerCase() && "hidden" == t.type) return !1;
        var t, i;
        return o = e, s = o.nodeName.toLowerCase(), "input" === s || "select" === s || "button" === s || "textarea" === s || (n = e, r = n, "a" == r.nodeName.toLowerCase() && n.hasAttribute("href")) || e.hasAttribute("contenteditable") || rt(e);
        var n, r;
        var o, s;
      }(e) && !this.isDisabled(e) && this.isVisible(e);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: Fe
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(Fe));
      },
      token: e,
      providedIn: "root"
    }), e;
  }());

  function rt(e) {
    if (!e.hasAttribute("tabindex") || void 0 === e.tabIndex) return !1;
    var t = e.getAttribute("tabindex");
    return "-32768" != t && !(!t || isNaN(parseInt(t, 10)));
  }

  function ot(e) {
    if (!rt(e)) return null;
    var t = parseInt(e.getAttribute("tabindex") || "", 10);
    return isNaN(t) ? -1 : t;
  }

  var st = function () {
    function e(e, t, i, n, r) {
      void 0 === r && (r = !1), this._element = e, this._checker = t, this._ngZone = i, this._document = n, this._enabled = !0, r || this.attachAnchors();
    }

    return Object.defineProperty(e.prototype, "enabled", {
      get: function get() {
        return this._enabled;
      },
      set: function set(e) {
        this._enabled = e, this._startAnchor && this._endAnchor && (this._startAnchor.tabIndex = this._endAnchor.tabIndex = this._enabled ? 0 : -1);
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.destroy = function () {
      this._startAnchor && this._startAnchor.parentNode && this._startAnchor.parentNode.removeChild(this._startAnchor), this._endAnchor && this._endAnchor.parentNode && this._endAnchor.parentNode.removeChild(this._endAnchor), this._startAnchor = this._endAnchor = null;
    }, e.prototype.attachAnchors = function () {
      var e = this;
      this._startAnchor || (this._startAnchor = this._createAnchor()), this._endAnchor || (this._endAnchor = this._createAnchor()), this._ngZone.runOutsideAngular(function () {
        e._startAnchor.addEventListener("focus", function () {
          e.focusLastTabbableElement();
        }), e._endAnchor.addEventListener("focus", function () {
          e.focusFirstTabbableElement();
        }), e._element.parentNode && (e._element.parentNode.insertBefore(e._startAnchor, e._element), e._element.parentNode.insertBefore(e._endAnchor, e._element.nextSibling));
      });
    }, e.prototype.focusInitialElementWhenReady = function () {
      var e = this;
      return new Promise(function (t) {
        e._executeOnStable(function () {
          return t(e.focusInitialElement());
        });
      });
    }, e.prototype.focusFirstTabbableElementWhenReady = function () {
      var e = this;
      return new Promise(function (t) {
        e._executeOnStable(function () {
          return t(e.focusFirstTabbableElement());
        });
      });
    }, e.prototype.focusLastTabbableElementWhenReady = function () {
      var e = this;
      return new Promise(function (t) {
        e._executeOnStable(function () {
          return t(e.focusLastTabbableElement());
        });
      });
    }, e.prototype._getRegionBoundary = function (e) {
      for (var t = this._element.querySelectorAll("[cdk-focus-region-" + e + "], [cdkFocusRegion" + e + "], [cdk-focus-" + e + "]"), i = 0; i < t.length; i++) {
        t[i].hasAttribute("cdk-focus-" + e) ? console.warn("Found use of deprecated attribute 'cdk-focus-" + e + "', use 'cdkFocusRegion" + e + "' instead. The deprecated attribute will be removed in 7.0.0.", t[i]) : t[i].hasAttribute("cdk-focus-region-" + e) && console.warn("Found use of deprecated attribute 'cdk-focus-region-" + e + "', use 'cdkFocusRegion" + e + "' instead. The deprecated attribute will be removed in 7.0.0.", t[i]);
      }

      return "start" == e ? t.length ? t[0] : this._getFirstTabbableElement(this._element) : t.length ? t[t.length - 1] : this._getLastTabbableElement(this._element);
    }, e.prototype.focusInitialElement = function () {
      var e = this._element.querySelector("[cdk-focus-initial], [cdkFocusInitial]");

      return e ? (e.hasAttribute("cdk-focus-initial") && console.warn("Found use of deprecated attribute 'cdk-focus-initial', use 'cdkFocusInitial' instead. The deprecated attribute will be removed in 7.0.0", e), e.focus(), !0) : this.focusFirstTabbableElement();
    }, e.prototype.focusFirstTabbableElement = function () {
      var e = this._getRegionBoundary("start");

      return e && e.focus(), !!e;
    }, e.prototype.focusLastTabbableElement = function () {
      var e = this._getRegionBoundary("end");

      return e && e.focus(), !!e;
    }, e.prototype._getFirstTabbableElement = function (e) {
      if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;

      for (var t = e.children || e.childNodes, i = 0; i < t.length; i++) {
        var n = t[i].nodeType === this._document.ELEMENT_NODE ? this._getFirstTabbableElement(t[i]) : null;
        if (n) return n;
      }

      return null;
    }, e.prototype._getLastTabbableElement = function (e) {
      if (this._checker.isFocusable(e) && this._checker.isTabbable(e)) return e;

      for (var t = e.children || e.childNodes, i = t.length - 1; i >= 0; i--) {
        var n = t[i].nodeType === this._document.ELEMENT_NODE ? this._getLastTabbableElement(t[i]) : null;
        if (n) return n;
      }

      return null;
    }, e.prototype._createAnchor = function () {
      var e = this._document.createElement("div");

      return e.tabIndex = this._enabled ? 0 : -1, e.classList.add("cdk-visually-hidden"), e.classList.add("cdk-focus-trap-anchor"), e;
    }, e.prototype._executeOnStable = function (e) {
      this._ngZone.isStable ? e() : this._ngZone.onStable.asObservable().pipe(Se(1)).subscribe(e);
    }, e;
  }(),
      at = function () {
    function e(e, t, i) {
      this._checker = e, this._ngZone = t, this._document = i;
    }

    return e.prototype.create = function (e, t) {
      return void 0 === t && (t = !1), new st(e, this._checker, this._ngZone, this._document, t);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: nt
      }, {
        type: t.NgZone
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(nt), t.inject(t.NgZone), t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      ct = function () {
    function e(e, t, i) {
      this._elementRef = e, this._focusTrapFactory = t, this._previouslyFocusedElement = null, this._document = i, this.focusTrap = this._focusTrapFactory.create(this._elementRef.nativeElement, !0);
    }

    return Object.defineProperty(e.prototype, "enabled", {
      get: function get() {
        return this.focusTrap.enabled;
      },
      set: function set(e) {
        this.focusTrap.enabled = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "autoCapture", {
      get: function get() {
        return this._autoCapture;
      },
      set: function set(e) {
        this._autoCapture = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnDestroy = function () {
      this.focusTrap.destroy(), this._previouslyFocusedElement && (this._previouslyFocusedElement.focus(), this._previouslyFocusedElement = null);
    }, e.prototype.ngAfterContentInit = function () {
      this.focusTrap.attachAnchors(), this.autoCapture && (this._previouslyFocusedElement = this._document.activeElement, this.focusTrap.focusInitialElementWhenReady());
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdkTrapFocus]",
        exportAs: "cdkTrapFocus"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.ElementRef
      }, {
        type: at
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.propDecorators = {
      enabled: [{
        type: t.Input,
        args: ["cdkTrapFocus"]
      }],
      autoCapture: [{
        type: t.Input,
        args: ["cdkTrapFocusAutoCapture"]
      }]
    }, e;
  }(),
      lt = new t.InjectionToken("liveAnnouncerElement", {
    providedIn: "root",
    factory: function factory() {
      return null;
    }
  });

  var ut = function () {
    function e(e, t) {
      this._document = t, this._liveElement = e || this._createLiveElement();
    }

    return e.prototype.announce = function (e, t) {
      var i = this;
      return void 0 === t && (t = "polite"), this._liveElement.textContent = "", this._liveElement.setAttribute("aria-live", t), new Promise(function (t) {
        setTimeout(function () {
          i._liveElement.textContent = e, t();
        }, 100);
      });
    }, e.prototype.ngOnDestroy = function () {
      this._liveElement && this._liveElement.parentNode && this._liveElement.parentNode.removeChild(this._liveElement);
    }, e.prototype._createLiveElement = function () {
      var e = this._document.createElement("div");

      return e.classList.add("cdk-visually-hidden"), e.setAttribute("aria-atomic", "true"), e.setAttribute("aria-live", "polite"), this._document.body.appendChild(e), e;
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Optional
        }, {
          type: t.Inject,
          args: [lt]
        }]
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(lt, 8), t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      pt = function () {
    function e(e, t, i, n) {
      this._elementRef = e, this._liveAnnouncer = t, this._contentObserver = i, this._ngZone = n, this._politeness = "off";
    }

    return Object.defineProperty(e.prototype, "politeness", {
      get: function get() {
        return this._politeness;
      },
      set: function set(e) {
        var t = this;
        this._politeness = "polite" === e || "assertive" === e ? e : "off", "off" === this._politeness ? this._subscription && (this._subscription.unsubscribe(), this._subscription = null) : this._subscription || (this._subscription = this._ngZone.runOutsideAngular(function () {
          return t._contentObserver.observe(t._elementRef.nativeElement).subscribe(function () {
            return t._liveAnnouncer.announce(t._elementRef.nativeElement.innerText, t._politeness);
          });
        }));
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnDestroy = function () {
      this._subscription && this._subscription.unsubscribe();
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdkAriaLive]",
        exportAs: "cdkAriaLive"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.ElementRef
      }, {
        type: ut
      }, {
        type: Xe
      }, {
        type: t.NgZone
      }];
    }, e.propDecorators = {
      politeness: [{
        type: t.Input,
        args: ["cdkAriaLive"]
      }]
    }, e;
  }();

  new t.Optional(), new t.SkipSelf(), new t.Optional(), new t.Inject(lt), i.DOCUMENT;

  var dt = function () {
    function e(e, t) {
      this._ngZone = e, this._platform = t, this._origin = null, this._windowFocused = !1, this._elementInfo = new Map(), this._unregisterGlobalListeners = function () {}, this._monitoredElementCount = 0;
    }

    return e.prototype.monitor = function (e, t) {
      var i = this;
      if (void 0 === t && (t = !1), !this._platform.isBrowser) return H(null);

      if (this._elementInfo.has(e)) {
        var n = this._elementInfo.get(e);

        return n.checkChildren = t, n.subject.asObservable();
      }

      var r = {
        unlisten: function unlisten() {},
        checkChildren: t,
        subject: new E()
      };
      this._elementInfo.set(e, r), this._incrementMonitoredElementCount();

      var o = function o(t) {
        return i._onFocus(t, e);
      },
          s = function s(t) {
        return i._onBlur(t, e);
      };

      return this._ngZone.runOutsideAngular(function () {
        e.addEventListener("focus", o, !0), e.addEventListener("blur", s, !0);
      }), r.unlisten = function () {
        e.removeEventListener("focus", o, !0), e.removeEventListener("blur", s, !0);
      }, r.subject.asObservable();
    }, e.prototype.stopMonitoring = function (e) {
      var t = this._elementInfo.get(e);

      t && (t.unlisten(), t.subject.complete(), this._setClasses(e), this._elementInfo.delete(e), this._decrementMonitoredElementCount());
    }, e.prototype.focusVia = function (e, t) {
      this._setOriginForCurrentEventQueue(t), "function" == typeof e.focus && e.focus();
    }, e.prototype.ngOnDestroy = function () {
      var e = this;

      this._elementInfo.forEach(function (t, i) {
        return e.stopMonitoring(i);
      });
    }, e.prototype._registerGlobalListeners = function () {
      var e = this;

      if (this._platform.isBrowser) {
        var t = function t() {
          e._lastTouchTarget = null, e._setOriginForCurrentEventQueue("keyboard");
        },
            i = function i() {
          e._lastTouchTarget || e._setOriginForCurrentEventQueue("mouse");
        },
            n = function n(t) {
          null != e._touchTimeoutId && clearTimeout(e._touchTimeoutId), e._lastTouchTarget = t.target, e._touchTimeoutId = setTimeout(function () {
            return e._lastTouchTarget = null;
          }, 650);
        },
            r = function r() {
          e._windowFocused = !0, e._windowFocusTimeoutId = setTimeout(function () {
            return e._windowFocused = !1;
          });
        };

        this._ngZone.runOutsideAngular(function () {
          document.addEventListener("keydown", t, !0), document.addEventListener("mousedown", i, !0), document.addEventListener("touchstart", n, !Le() || {
            passive: !0,
            capture: !0
          }), window.addEventListener("focus", r);
        }), this._unregisterGlobalListeners = function () {
          document.removeEventListener("keydown", t, !0), document.removeEventListener("mousedown", i, !0), document.removeEventListener("touchstart", n, !Le() || {
            passive: !0,
            capture: !0
          }), window.removeEventListener("focus", r), clearTimeout(e._windowFocusTimeoutId), clearTimeout(e._touchTimeoutId), clearTimeout(e._originTimeoutId);
        };
      }
    }, e.prototype._toggleClass = function (e, t, i) {
      i ? e.classList.add(t) : e.classList.remove(t);
    }, e.prototype._setClasses = function (e, t) {
      this._elementInfo.get(e) && (this._toggleClass(e, "cdk-focused", !!t), this._toggleClass(e, "cdk-touch-focused", "touch" === t), this._toggleClass(e, "cdk-keyboard-focused", "keyboard" === t), this._toggleClass(e, "cdk-mouse-focused", "mouse" === t), this._toggleClass(e, "cdk-program-focused", "program" === t));
    }, e.prototype._setOriginForCurrentEventQueue = function (e) {
      var t = this;

      this._ngZone.runOutsideAngular(function () {
        t._origin = e, t._originTimeoutId = setTimeout(function () {
          return t._origin = null;
        });
      });
    }, e.prototype._wasCausedByTouch = function (e) {
      var t = e.target;
      return this._lastTouchTarget instanceof Node && t instanceof Node && (t === this._lastTouchTarget || t.contains(this._lastTouchTarget));
    }, e.prototype._onFocus = function (e, t) {
      var i = this._elementInfo.get(t);

      if (i && (i.checkChildren || t === e.target)) {
        var n = this._origin;
        n || (n = this._windowFocused && this._lastFocusOrigin ? this._lastFocusOrigin : this._wasCausedByTouch(e) ? "touch" : "program"), this._setClasses(t, n), this._emitOrigin(i.subject, n), this._lastFocusOrigin = n;
      }
    }, e.prototype._onBlur = function (e, t) {
      var i = this._elementInfo.get(t);

      !i || i.checkChildren && e.relatedTarget instanceof Node && t.contains(e.relatedTarget) || (this._setClasses(t), this._emitOrigin(i.subject, null));
    }, e.prototype._emitOrigin = function (e, t) {
      this._ngZone.run(function () {
        return e.next(t);
      });
    }, e.prototype._incrementMonitoredElementCount = function () {
      1 == ++this._monitoredElementCount && this._registerGlobalListeners();
    }, e.prototype._decrementMonitoredElementCount = function () {
      --this._monitoredElementCount || (this._unregisterGlobalListeners(), this._unregisterGlobalListeners = function () {});
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.NgZone
      }, {
        type: Fe
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(t.NgZone), t.inject(Fe));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      ht = function () {
    function e(e, i) {
      var n = this;
      this._elementRef = e, this._focusMonitor = i, this.cdkFocusChange = new t.EventEmitter(), this._monitorSubscription = this._focusMonitor.monitor(this._elementRef.nativeElement, this._elementRef.nativeElement.hasAttribute("cdkMonitorSubtreeFocus")).subscribe(function (e) {
        return n.cdkFocusChange.emit(e);
      });
    }

    return e.prototype.ngOnDestroy = function () {
      this._focusMonitor.stopMonitoring(this._elementRef.nativeElement), this._monitorSubscription.unsubscribe();
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdkMonitorElementFocus], [cdkMonitorSubtreeFocus]"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.ElementRef
      }, {
        type: dt
      }];
    }, e.propDecorators = {
      cdkFocusChange: [{
        type: t.Output
      }]
    }, e;
  }();

  new t.Optional(), new t.SkipSelf(), t.NgZone;

  var ft = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        imports: [i.CommonModule, Be, $e],
        declarations: [pt, ct, ht],
        exports: [pt, ct, ht]
      }]
    }], e;
  }(),
      mt = function () {
    function e(e, t) {
      this._ngZone = e, this._platform = t, this._scrolled = new E(), this._globalSubscription = null, this._scrolledCount = 0, this.scrollContainers = new Map();
    }

    return e.prototype.register = function (e) {
      var t = this,
          i = e.elementScrolled().subscribe(function () {
        return t._scrolled.next(e);
      });
      this.scrollContainers.set(e, i);
    }, e.prototype.deregister = function (e) {
      var t = this.scrollContainers.get(e);
      t && (t.unsubscribe(), this.scrollContainers.delete(e));
    }, e.prototype.scrolled = function (e) {
      var t = this;
      return void 0 === e && (e = 20), this._platform.isBrowser ? D.create(function (i) {
        t._globalSubscription || t._addGlobalListener();
        var n = e > 0 ? t._scrolled.pipe(ge(e)).subscribe(i) : t._scrolled.subscribe(i);
        return t._scrolledCount++, function () {
          n.unsubscribe(), t._scrolledCount--, t._scrolledCount || t._removeGlobalListener();
        };
      }) : H();
    }, e.prototype.ngOnDestroy = function () {
      var e = this;
      this._removeGlobalListener(), this.scrollContainers.forEach(function (t, i) {
        return e.deregister(i);
      }), this._scrolled.complete();
    }, e.prototype.ancestorScrolled = function (e, t) {
      var i = this.getAncestorScrollContainers(e);
      return this.scrolled(t).pipe(Te(function (e) {
        return !e || i.indexOf(e) > -1;
      }));
    }, e.prototype.getAncestorScrollContainers = function (e) {
      var t = this,
          i = [];
      return this.scrollContainers.forEach(function (n, r) {
        t._scrollableContainsElement(r, e) && i.push(r);
      }), i;
    }, e.prototype._scrollableContainsElement = function (e, t) {
      var i = t.nativeElement,
          n = e.getElementRef().nativeElement;

      do {
        if (i == n) return !0;
      } while (i = i.parentElement);

      return !1;
    }, e.prototype._addGlobalListener = function () {
      var e = this;
      this._globalSubscription = this._ngZone.runOutsideAngular(function () {
        return ue(window.document, "scroll").subscribe(function () {
          return e._scrolled.next();
        });
      });
    }, e.prototype._removeGlobalListener = function () {
      this._globalSubscription && (this._globalSubscription.unsubscribe(), this._globalSubscription = null);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.NgZone
      }, {
        type: Fe
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(t.NgZone), t.inject(Fe));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  new t.Optional(), new t.SkipSelf(), t.NgZone;

  var yt = function () {
    function e(e, t, i) {
      var n = this;
      this._elementRef = e, this._scroll = t, this._ngZone = i, this._elementScrolled = new E(), this._scrollListener = function (e) {
        return n._elementScrolled.next(e);
      };
    }

    return e.prototype.ngOnInit = function () {
      var e = this;
      this._ngZone.runOutsideAngular(function () {
        e.getElementRef().nativeElement.addEventListener("scroll", e._scrollListener);
      }), this._scroll.register(this);
    }, e.prototype.ngOnDestroy = function () {
      this._scroll.deregister(this), this._scrollListener && this.getElementRef().nativeElement.removeEventListener("scroll", this._scrollListener), this._elementScrolled.complete();
    }, e.prototype.elementScrolled = function () {
      return this._elementScrolled.asObservable();
    }, e.prototype.getElementRef = function () {
      return this._elementRef;
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdk-scrollable], [cdkScrollable]"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.ElementRef
      }, {
        type: mt
      }, {
        type: t.NgZone
      }];
    }, e;
  }(),
      gt = function () {
    function e(e, t) {
      var i = this;
      this._platform = e, this._change = e.isBrowser ? t.runOutsideAngular(function () {
        return de(ue(window, "resize"), ue(window, "orientationchange"));
      }) : H(), this._invalidateCache = this.change().subscribe(function () {
        return i._updateViewportSize();
      });
    }

    return e.prototype.ngOnDestroy = function () {
      this._invalidateCache.unsubscribe();
    }, e.prototype.getViewportSize = function () {
      this._viewportSize || this._updateViewportSize();
      var e = {
        width: this._viewportSize.width,
        height: this._viewportSize.height
      };
      return this._platform.isBrowser || (this._viewportSize = null), e;
    }, e.prototype.getViewportRect = function () {
      var e = this.getViewportScrollPosition(),
          t = this.getViewportSize(),
          i = t.width,
          n = t.height;
      return {
        top: e.top,
        left: e.left,
        bottom: e.top + n,
        right: e.left + i,
        height: n,
        width: i
      };
    }, e.prototype.getViewportScrollPosition = function () {
      if (!this._platform.isBrowser) return {
        top: 0,
        left: 0
      };
      var e = document.documentElement.getBoundingClientRect();
      return {
        top: -e.top || document.body.scrollTop || window.scrollY || document.documentElement.scrollTop || 0,
        left: -e.left || document.body.scrollLeft || window.scrollX || document.documentElement.scrollLeft || 0
      };
    }, e.prototype.change = function (e) {
      return void 0 === e && (e = 20), e > 0 ? this._change.pipe(ge(e)) : this._change;
    }, e.prototype._updateViewportSize = function () {
      this._viewportSize = this._platform.isBrowser ? {
        width: window.innerWidth,
        height: window.innerHeight
      } : {
        width: 0,
        height: 0
      };
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: Fe
      }, {
        type: t.NgZone
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(Fe), t.inject(t.NgZone));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  new t.Optional(), new t.SkipSelf(), t.NgZone;

  var bt = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        imports: [Be],
        exports: [yt],
        declarations: [yt]
      }]
    }], e;
  }(),
      vt = new t.InjectionToken("cdk-dir-doc", {
    providedIn: "root",
    factory: function factory() {
      return t.inject(i.DOCUMENT);
    }
  });

  var _t = function () {
    function e(e) {
      if (this.value = "ltr", this.change = new t.EventEmitter(), e) {
        var i = e.body ? e.body.dir : null,
            n = e.documentElement ? e.documentElement.dir : null;
        this.value = i || n || "ltr";
      }
    }

    return e.prototype.ngOnDestroy = function () {
      this.change.complete();
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Optional
        }, {
          type: t.Inject,
          args: [vt]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(vt, 8));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      wt = function () {
    function e() {
      this._dir = "ltr", this._isInitialized = !1, this.change = new t.EventEmitter();
    }

    return Object.defineProperty(e.prototype, "dir", {
      get: function get() {
        return this._dir;
      },
      set: function set(e) {
        var t = this._dir;
        this._dir = e, t !== this._dir && this._isInitialized && this.change.emit(this._dir);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "value", {
      get: function get() {
        return this.dir;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngAfterContentInit = function () {
      this._isInitialized = !0;
    }, e.prototype.ngOnDestroy = function () {
      this.change.complete();
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[dir]",
        providers: [{
          provide: _t,
          useExisting: e
        }],
        host: {
          "[dir]": "dir"
        },
        exportAs: "dir"
      }]
    }], e.propDecorators = {
      change: [{
        type: t.Output,
        args: ["dirChange"]
      }],
      dir: [{
        type: t.Input
      }]
    }, e;
  }(),
      Ot = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        exports: [wt],
        declarations: [wt]
      }]
    }], e;
  }();

  function kt() {
    throw Error("Host already has a portal attached");
  }

  var Tt = function () {
    function e() {}

    return e.prototype.attach = function (e) {
      return null == e && function () {
        throw Error("Attempting to attach a portal to a null PortalOutlet");
      }(), e.hasAttached() && kt(), this._attachedHost = e, e.attach(this);
    }, e.prototype.detach = function () {
      var e = this._attachedHost;
      null == e ? function () {
        throw Error("Attempting to detach a portal that is not attached to a host");
      }() : (this._attachedHost = null, e.detach());
    }, Object.defineProperty(e.prototype, "isAttached", {
      get: function get() {
        return null != this._attachedHost;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.setAttachedHost = function (e) {
      this._attachedHost = e;
    }, e;
  }(),
      Ct = function (e) {
    function t(t, i, n) {
      var r = e.call(this) || this;
      return r.component = t, r.viewContainerRef = i, r.injector = n, r;
    }

    return xe(t, e), t;
  }(Tt),
      Dt = function (e) {
    function t(t, i, n) {
      var r = e.call(this) || this;
      return r.templateRef = t, r.viewContainerRef = i, r.context = n, r;
    }

    return xe(t, e), Object.defineProperty(t.prototype, "origin", {
      get: function get() {
        return this.templateRef.elementRef;
      },
      enumerable: !0,
      configurable: !0
    }), t.prototype.attach = function (t, i) {
      return void 0 === i && (i = this.context), this.context = i, e.prototype.attach.call(this, t);
    }, t.prototype.detach = function () {
      return this.context = void 0, e.prototype.detach.call(this);
    }, t;
  }(Tt),
      Mt = function () {
    function e() {
      this._isDisposed = !1;
    }

    return e.prototype.hasAttached = function () {
      return !!this._attachedPortal;
    }, e.prototype.attach = function (e) {
      return e || function () {
        throw Error("Must provide a portal to attach");
      }(), this.hasAttached() && kt(), this._isDisposed && function () {
        throw Error("This PortalOutlet has already been disposed");
      }(), e instanceof Ct ? (this._attachedPortal = e, this.attachComponentPortal(e)) : e instanceof Dt ? (this._attachedPortal = e, this.attachTemplatePortal(e)) : void function () {
        throw Error("Attempting to attach an unknown Portal type. BasePortalOutlet accepts either a ComponentPortal or a TemplatePortal.");
      }();
    }, e.prototype.detach = function () {
      this._attachedPortal && (this._attachedPortal.setAttachedHost(null), this._attachedPortal = null), this._invokeDisposeFn();
    }, e.prototype.dispose = function () {
      this.hasAttached() && this.detach(), this._invokeDisposeFn(), this._isDisposed = !0;
    }, e.prototype.setDisposeFn = function (e) {
      this._disposeFn = e;
    }, e.prototype._invokeDisposeFn = function () {
      this._disposeFn && (this._disposeFn(), this._disposeFn = null);
    }, e;
  }(),
      It = function (e) {
    function t(t, i, n, r) {
      var o = e.call(this) || this;
      return o.outletElement = t, o._componentFactoryResolver = i, o._appRef = n, o._defaultInjector = r, o;
    }

    return xe(t, e), t.prototype.attachComponentPortal = function (e) {
      var t,
          i = this,
          n = this._componentFactoryResolver.resolveComponentFactory(e.component);

      return e.viewContainerRef ? (t = e.viewContainerRef.createComponent(n, e.viewContainerRef.length, e.injector || e.viewContainerRef.parentInjector), this.setDisposeFn(function () {
        return t.destroy();
      })) : (t = n.create(e.injector || this._defaultInjector), this._appRef.attachView(t.hostView), this.setDisposeFn(function () {
        i._appRef.detachView(t.hostView), t.destroy();
      })), this.outletElement.appendChild(this._getComponentRootNode(t)), t;
    }, t.prototype.attachTemplatePortal = function (e) {
      var t = this,
          i = e.viewContainerRef,
          n = i.createEmbeddedView(e.templateRef, e.context);
      return n.detectChanges(), n.rootNodes.forEach(function (e) {
        return t.outletElement.appendChild(e);
      }), this.setDisposeFn(function () {
        var e = i.indexOf(n);
        -1 !== e && i.remove(e);
      }), n;
    }, t.prototype.dispose = function () {
      e.prototype.dispose.call(this), null != this.outletElement.parentNode && this.outletElement.parentNode.removeChild(this.outletElement);
    }, t.prototype._getComponentRootNode = function (e) {
      return e.hostView.rootNodes[0];
    }, t;
  }(Mt),
      St = function (e) {
    function i(t, i) {
      return e.call(this, t, i) || this;
    }

    return xe(i, e), i.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdk-portal], [cdkPortal], [portal]",
        exportAs: "cdkPortal"
      }]
    }], i.ctorParameters = function () {
      return [{
        type: t.TemplateRef
      }, {
        type: t.ViewContainerRef
      }];
    }, i;
  }(Dt),
      At = function (e) {
    function i(i, n) {
      var r = e.call(this) || this;
      return r._componentFactoryResolver = i, r._viewContainerRef = n, r._isInitialized = !1, r.attached = new t.EventEmitter(), r;
    }

    return xe(i, e), Object.defineProperty(i.prototype, "portal", {
      get: function get() {
        return this._attachedPortal;
      },
      set: function set(t) {
        (!this.hasAttached() || t || this._isInitialized) && (this.hasAttached() && e.prototype.detach.call(this), t && e.prototype.attach.call(this, t), this._attachedPortal = t);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "attachedRef", {
      get: function get() {
        return this._attachedRef;
      },
      enumerable: !0,
      configurable: !0
    }), i.prototype.ngOnInit = function () {
      this._isInitialized = !0;
    }, i.prototype.ngOnDestroy = function () {
      e.prototype.dispose.call(this), this._attachedPortal = null, this._attachedRef = null;
    }, i.prototype.attachComponentPortal = function (t) {
      t.setAttachedHost(this);

      var i = null != t.viewContainerRef ? t.viewContainerRef : this._viewContainerRef,
          n = this._componentFactoryResolver.resolveComponentFactory(t.component),
          r = i.createComponent(n, i.length, t.injector || i.parentInjector);

      return e.prototype.setDisposeFn.call(this, function () {
        return r.destroy();
      }), this._attachedPortal = t, this._attachedRef = r, this.attached.emit(r), r;
    }, i.prototype.attachTemplatePortal = function (t) {
      var i = this;
      t.setAttachedHost(this);

      var n = this._viewContainerRef.createEmbeddedView(t.templateRef, t.context);

      return e.prototype.setDisposeFn.call(this, function () {
        return i._viewContainerRef.clear();
      }), this._attachedPortal = t, this._attachedRef = n, this.attached.emit(n), n;
    }, i.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdkPortalOutlet], [cdkPortalHost], [portalHost]",
        exportAs: "cdkPortalOutlet, cdkPortalHost",
        inputs: ["portal: cdkPortalOutlet"]
      }]
    }], i.ctorParameters = function () {
      return [{
        type: t.ComponentFactoryResolver
      }, {
        type: t.ViewContainerRef
      }];
    }, i.propDecorators = {
      attached: [{
        type: t.Output
      }]
    }, i;
  }(Mt),
      Et = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        exports: [St, At],
        declarations: [St, At]
      }]
    }], e;
  }(),
      Pt = function () {
    function e(e, t) {
      this._parentInjector = e, this._customTokens = t;
    }

    return e.prototype.get = function (e, t) {
      var i = this._customTokens.get(e);

      return void 0 !== i ? i : this._parentInjector.get(e, t);
    }, e;
  }(),
      xt = function () {
    function e() {}

    return e.prototype.enable = function () {}, e.prototype.disable = function () {}, e.prototype.attach = function () {}, e;
  }(),
      jt = function () {
    return function (e) {
      var t = this;
      this.scrollStrategy = new xt(), this.panelClass = "", this.hasBackdrop = !1, this.backdropClass = "cdk-overlay-dark-backdrop", e && Object.keys(e).filter(function (t) {
        return void 0 !== e[t];
      }).forEach(function (i) {
        return t[i] = e[i];
      });
    };
  }(),
      Rt = function () {
    return function (e, t, i, n) {
      this.offsetX = i, this.offsetY = n, this.originX = e.originX, this.originY = e.originY, this.overlayX = t.overlayX, this.overlayY = t.overlayY;
    };
  }(),
      Vt = function () {
    return function () {};
  }(),
      Ft = function () {
    function e(e, t) {
      this.connectionPair = e, this.scrollableViewProperties = t;
    }

    return e.ctorParameters = function () {
      return [{
        type: Rt
      }, {
        type: Vt,
        decorators: [{
          type: t.Optional
        }]
      }];
    }, e;
  }();

  function Lt(e, t) {
    if ("top" !== t && "bottom" !== t && "center" !== t) throw Error("ConnectedPosition: Invalid " + e + ' "' + t + '". Expected "top", "bottom" or "center".');
  }

  function Bt(e, t) {
    if ("start" !== t && "end" !== t && "center" !== t) throw Error("ConnectedPosition: Invalid " + e + ' "' + t + '". Expected "start", "end" or "center".');
  }

  var Nt = function () {
    function e(e, t) {
      this._viewportRuler = e, this._previousHTMLStyles = {
        top: "",
        left: ""
      }, this._isEnabled = !1, this._document = t;
    }

    return e.prototype.attach = function () {}, e.prototype.enable = function () {
      if (this._canBeEnabled()) {
        var e = this._document.documentElement;
        this._previousScrollPosition = this._viewportRuler.getViewportScrollPosition(), this._previousHTMLStyles.left = e.style.left || "", this._previousHTMLStyles.top = e.style.top || "", e.style.left = ze(-this._previousScrollPosition.left), e.style.top = ze(-this._previousScrollPosition.top), e.classList.add("cdk-global-scrollblock"), this._isEnabled = !0;
      }
    }, e.prototype.disable = function () {
      if (this._isEnabled) {
        var e = this._document.documentElement,
            t = this._document.body,
            i = e.style.scrollBehavior || "",
            n = t.style.scrollBehavior || "";
        this._isEnabled = !1, e.style.left = this._previousHTMLStyles.left, e.style.top = this._previousHTMLStyles.top, e.classList.remove("cdk-global-scrollblock"), e.style.scrollBehavior = t.style.scrollBehavior = "auto", window.scroll(this._previousScrollPosition.left, this._previousScrollPosition.top), e.style.scrollBehavior = i, t.style.scrollBehavior = n;
      }
    }, e.prototype._canBeEnabled = function () {
      if (this._document.documentElement.classList.contains("cdk-global-scrollblock") || this._isEnabled) return !1;

      var e = this._document.body,
          t = this._viewportRuler.getViewportSize();

      return e.scrollHeight > t.height || e.scrollWidth > t.width;
    }, e;
  }();

  function Yt() {
    return Error("Scroll strategy has already been attached.");
  }

  var Ht = function () {
    function e(e, t, i, n) {
      var r = this;
      this._scrollDispatcher = e, this._ngZone = t, this._viewportRuler = i, this._config = n, this._scrollSubscription = null, this._detach = function () {
        r.disable(), r._overlayRef.hasAttached() && r._ngZone.run(function () {
          return r._overlayRef.detach();
        });
      };
    }

    return e.prototype.attach = function (e) {
      if (this._overlayRef) throw Yt();
      this._overlayRef = e;
    }, e.prototype.enable = function () {
      var e = this;

      if (!this._scrollSubscription) {
        var t = this._scrollDispatcher.scrolled(0);

        this._config && this._config.threshold && this._config.threshold > 1 ? (this._initialScrollPosition = this._viewportRuler.getViewportScrollPosition().top, this._scrollSubscription = t.subscribe(function () {
          var t = e._viewportRuler.getViewportScrollPosition().top;

          Math.abs(t - e._initialScrollPosition) > e._config.threshold ? e._detach() : e._overlayRef.updatePosition();
        })) : this._scrollSubscription = t.subscribe(this._detach);
      }
    }, e.prototype.disable = function () {
      this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null);
    }, e;
  }();

  function zt(e, t) {
    return t.some(function (t) {
      var i = e.bottom < t.top,
          n = e.top > t.bottom,
          r = e.right < t.left,
          o = e.left > t.right;
      return i || n || r || o;
    });
  }

  function Wt(e, t) {
    return t.some(function (t) {
      var i = e.top < t.top,
          n = e.bottom > t.bottom,
          r = e.left < t.left,
          o = e.right > t.right;
      return i || n || r || o;
    });
  }

  var Xt = function () {
    function e(e, t, i, n) {
      this._scrollDispatcher = e, this._viewportRuler = t, this._ngZone = i, this._config = n, this._scrollSubscription = null;
    }

    return e.prototype.attach = function (e) {
      if (this._overlayRef) throw Yt();
      this._overlayRef = e;
    }, e.prototype.enable = function () {
      var e = this;

      if (!this._scrollSubscription) {
        var t = this._config ? this._config.scrollThrottle : 0;
        this._scrollSubscription = this._scrollDispatcher.scrolled(t).subscribe(function () {
          if (e._overlayRef.updatePosition(), e._config && e._config.autoClose) {
            var t = e._overlayRef.overlayElement.getBoundingClientRect(),
                i = e._viewportRuler.getViewportSize(),
                n = i.width,
                r = i.height;

            zt(t, [{
              width: n,
              height: r,
              bottom: r,
              right: n,
              top: 0,
              left: 0
            }]) && (e.disable(), e._ngZone.run(function () {
              return e._overlayRef.detach();
            }));
          }
        });
      }
    }, e.prototype.disable = function () {
      this._scrollSubscription && (this._scrollSubscription.unsubscribe(), this._scrollSubscription = null);
    }, e;
  }(),
      Zt = function () {
    function e(e, t, i, n) {
      var r = this;
      this._scrollDispatcher = e, this._viewportRuler = t, this._ngZone = i, this.noop = function () {
        return new xt();
      }, this.close = function (e) {
        return new Ht(r._scrollDispatcher, r._ngZone, r._viewportRuler, e);
      }, this.block = function () {
        return new Nt(r._viewportRuler, r._document);
      }, this.reposition = function (e) {
        return new Xt(r._scrollDispatcher, r._viewportRuler, r._ngZone, e);
      }, this._document = n;
    }

    return e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: mt
      }, {
        type: gt
      }, {
        type: t.NgZone
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(mt), t.inject(gt), t.inject(t.NgZone), t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      $t = function () {
    function e(e) {
      var t = this;
      this._attachedOverlays = [], this._keydownListener = function (e) {
        t._attachedOverlays.length && t._attachedOverlays[t._attachedOverlays.length - 1]._keydownEvents.next(e);
      }, this._document = e;
    }

    return e.prototype.ngOnDestroy = function () {
      this._detach();
    }, e.prototype.add = function (e) {
      this._isAttached || (this._document.body.addEventListener("keydown", this._keydownListener, !0), this._isAttached = !0), this._attachedOverlays.push(e);
    }, e.prototype.remove = function (e) {
      var t = this._attachedOverlays.indexOf(e);

      t > -1 && this._attachedOverlays.splice(t, 1), 0 === this._attachedOverlays.length && this._detach();
    }, e.prototype._detach = function () {
      this._isAttached && (this._document.body.removeEventListener("keydown", this._keydownListener, !0), this._isAttached = !1);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  new t.Optional(), new t.SkipSelf(), i.DOCUMENT;

  var Kt = function () {
    function e(e) {
      this._document = e;
    }

    return e.prototype.ngOnDestroy = function () {
      this._containerElement && this._containerElement.parentNode && this._containerElement.parentNode.removeChild(this._containerElement);
    }, e.prototype.getContainerElement = function () {
      return this._containerElement || this._createContainer(), this._containerElement;
    }, e.prototype._createContainer = function () {
      var e = this._document.createElement("div");

      e.classList.add("cdk-overlay-container"), this._document.body.appendChild(e), this._containerElement = e;
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(i.DOCUMENT));
      },
      token: e,
      providedIn: "root"
    }), e;
  }();

  new t.Optional(), new t.SkipSelf(), i.DOCUMENT;

  var Ut = function () {
    function e(e, t, i, n, r, o, s) {
      this._portalOutlet = e, this._host = t, this._pane = i, this._config = n, this._ngZone = r, this._keyboardDispatcher = o, this._document = s, this._backdropElement = null, this._backdropClick = new E(), this._attachments = new E(), this._detachments = new E(), this._keydownEvents = new E(), n.scrollStrategy && n.scrollStrategy.attach(this);
    }

    return Object.defineProperty(e.prototype, "overlayElement", {
      get: function get() {
        return this._pane;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "backdropElement", {
      get: function get() {
        return this._backdropElement;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hostElement", {
      get: function get() {
        return this._host;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.attach = function (e) {
      var t = this,
          i = this._portalOutlet.attach(e);

      return this._config.positionStrategy && this._config.positionStrategy.attach(this), this._updateStackingOrder(), this._updateElementSize(), this._updateElementDirection(), this._config.scrollStrategy && this._config.scrollStrategy.enable(), this._ngZone.onStable.asObservable().pipe(Se(1)).subscribe(function () {
        t.hasAttached() && t.updatePosition();
      }), this._togglePointerEvents(!0), this._config.hasBackdrop && this._attachBackdrop(), this._config.panelClass && this._toggleClasses(this._pane, this._config.panelClass, !0), this._attachments.next(), this._keyboardDispatcher.add(this), i;
    }, e.prototype.detach = function () {
      if (this.hasAttached()) {
        this.detachBackdrop(), this._togglePointerEvents(!1), this._config.positionStrategy && this._config.positionStrategy.detach && this._config.positionStrategy.detach(), this._config.scrollStrategy && this._config.scrollStrategy.disable();

        var e = this._portalOutlet.detach();

        return this._detachments.next(), this._keyboardDispatcher.remove(this), e;
      }
    }, e.prototype.dispose = function () {
      var e = this.hasAttached();
      this._config.positionStrategy && this._config.positionStrategy.dispose(), this._config.scrollStrategy && this._config.scrollStrategy.disable(), this.detachBackdrop(), this._keyboardDispatcher.remove(this), this._portalOutlet.dispose(), this._attachments.complete(), this._backdropClick.complete(), this._keydownEvents.complete(), this._host && this._host.parentNode && (this._host.parentNode.removeChild(this._host), this._host = null), this._pane = null, e && this._detachments.next(), this._detachments.complete();
    }, e.prototype.hasAttached = function () {
      return this._portalOutlet.hasAttached();
    }, e.prototype.backdropClick = function () {
      return this._backdropClick.asObservable();
    }, e.prototype.attachments = function () {
      return this._attachments.asObservable();
    }, e.prototype.detachments = function () {
      return this._detachments.asObservable();
    }, e.prototype.keydownEvents = function () {
      return this._keydownEvents.asObservable();
    }, e.prototype.getConfig = function () {
      return this._config;
    }, e.prototype.updatePosition = function () {
      this._config.positionStrategy && this._config.positionStrategy.apply();
    }, e.prototype.updateSize = function (e) {
      this._config = Re({}, this._config, e), this._updateElementSize();
    }, e.prototype.setDirection = function (e) {
      this._config = Re({}, this._config, {
        direction: e
      }), this._updateElementDirection();
    }, e.prototype.getDirection = function () {
      var e = this._config.direction;
      return e ? "string" == typeof e ? e : e.value : "ltr";
    }, e.prototype._updateElementDirection = function () {
      this._host.setAttribute("dir", this.getDirection());
    }, e.prototype._updateElementSize = function () {
      var e = this._pane.style;
      e.width = ze(this._config.width), e.height = ze(this._config.height), e.minWidth = ze(this._config.minWidth), e.minHeight = ze(this._config.minHeight), e.maxWidth = ze(this._config.maxWidth), e.maxHeight = ze(this._config.maxHeight);
    }, e.prototype._togglePointerEvents = function (e) {
      this._pane.style.pointerEvents = e ? "auto" : "none";
    }, e.prototype._attachBackdrop = function () {
      var e = this,
          t = "cdk-overlay-backdrop-showing";
      this._backdropElement = this._document.createElement("div"), this._backdropElement.classList.add("cdk-overlay-backdrop"), this._config.backdropClass && this._toggleClasses(this._backdropElement, this._config.backdropClass, !0), this._host.parentElement.insertBefore(this._backdropElement, this._host), this._backdropElement.addEventListener("click", function (t) {
        return e._backdropClick.next(t);
      }), "undefined" != typeof requestAnimationFrame ? this._ngZone.runOutsideAngular(function () {
        requestAnimationFrame(function () {
          e._backdropElement && e._backdropElement.classList.add(t);
        });
      }) : this._backdropElement.classList.add(t);
    }, e.prototype._updateStackingOrder = function () {
      this._host.nextSibling && this._host.parentNode.appendChild(this._host);
    }, e.prototype.detachBackdrop = function () {
      var e = this,
          t = this._backdropElement;

      if (t) {
        var i = function i() {
          t && t.parentNode && t.parentNode.removeChild(t), e._backdropElement == t && (e._backdropElement = null);
        };

        t.classList.remove("cdk-overlay-backdrop-showing"), this._config.backdropClass && this._toggleClasses(t, this._config.backdropClass, !1), t.addEventListener("transitionend", i), t.style.pointerEvents = "none", this._ngZone.runOutsideAngular(function () {
          return setTimeout(i, 500);
        });
      }
    }, e.prototype._toggleClasses = function (e, t, i) {
      var n = e.classList;
      He(t).forEach(function (e) {
        i ? n.add(e) : n.remove(e);
      });
    }, e;
  }(),
      Gt = function () {
    function e(e, t, i, n) {
      var r = this;
      this._viewportRuler = t, this._document = i, this._platform = n, this._isInitialRender = !0, this._lastBoundingBoxSize = {
        width: 0,
        height: 0
      }, this._isPushed = !1, this._canPush = !0, this._growAfterOpen = !1, this._hasFlexibleDimensions = !0, this._positionLocked = !1, this._viewportMargin = 0, this.scrollables = [], this._preferredPositions = [], this._positionChanges = new E(), this._resizeSubscription = v.EMPTY, this._offsetX = 0, this._offsetY = 0, this._positionChangeSubscriptions = 0, this.positionChanges = D.create(function (e) {
        var t = r._positionChanges.subscribe(e);

        return r._positionChangeSubscriptions++, function () {
          t.unsubscribe(), r._positionChangeSubscriptions--;
        };
      }), this.setOrigin(e);
    }

    return Object.defineProperty(e.prototype, "positions", {
      get: function get() {
        return this._preferredPositions;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.attach = function (e) {
      var t = this;
      if (this._overlayRef && e !== this._overlayRef) throw Error("This position strategy is already attached to an overlay");
      this._validatePositions(), e.hostElement.classList.add("cdk-overlay-connected-position-bounding-box"), this._overlayRef = e, this._boundingBox = e.hostElement, this._pane = e.overlayElement, this._resizeSubscription.unsubscribe(), this._resizeSubscription = this._viewportRuler.change().subscribe(function () {
        return t.apply();
      });
    }, e.prototype.apply = function () {
      if (!(this._isDisposed || this._platform && !this._platform.isBrowser)) if (!this._isInitialRender && this._positionLocked && this._lastPosition) this.reapplyLastPosition();else {
        this._resetOverlayElementStyles(), this._resetBoundingBoxStyles(), this._viewportRect = this._getNarrowedViewportRect(), this._originRect = this._origin.getBoundingClientRect(), this._overlayRect = this._pane.getBoundingClientRect();

        for (var e, t = this._originRect, i = this._overlayRect, n = this._viewportRect, r = [], o = 0, s = this._preferredPositions; o < s.length; o++) {
          var a = s[o],
              c = this._getOriginPoint(t, a),
              l = this._getOverlayPoint(c, i, a),
              u = this._getOverlayFit(l, i, n, a);

          if (u.isCompletelyWithinViewport) return this._isPushed = !1, void this._applyPosition(a, c);
          this._canFitWithFlexibleDimensions(u, l, n) ? r.push({
            position: a,
            origin: c,
            overlayRect: i,
            boundingBoxRect: this._calculateBoundingBoxRect(c, a)
          }) : (!e || e.overlayFit.visibleArea < u.visibleArea) && (e = {
            overlayFit: u,
            overlayPoint: l,
            originPoint: c,
            position: a,
            overlayRect: i
          });
        }

        if (r.length) {
          for (var p = null, d = -1, h = 0, f = r; h < f.length; h++) {
            var m = f[h],
                y = m.boundingBoxRect.width * m.boundingBoxRect.height * (m.position.weight || 1);
            y > d && (d = y, p = m);
          }

          return this._isPushed = !1, void this._applyPosition(p.position, p.origin);
        }

        if (this._canPush) return this._isPushed = !0, void this._applyPosition(e.position, e.originPoint);

        this._applyPosition(e.position, e.originPoint);
      }
    }, e.prototype.detach = function () {
      this._resizeSubscription.unsubscribe();
    }, e.prototype.dispose = function () {
      this._isDisposed || (this.detach(), this._boundingBox = null, this._positionChanges.complete(), this._isDisposed = !0);
    }, e.prototype.reapplyLastPosition = function () {
      if (!this._isDisposed && (!this._platform || this._platform.isBrowser)) {
        this._originRect = this._origin.getBoundingClientRect(), this._overlayRect = this._pane.getBoundingClientRect(), this._viewportRect = this._getNarrowedViewportRect();

        var e = this._lastPosition || this._preferredPositions[0],
            t = this._getOriginPoint(this._originRect, e);

        this._applyPosition(e, t);
      }
    }, e.prototype.withScrollableContainers = function (e) {
      this.scrollables = e;
    }, e.prototype.withPositions = function (e) {
      return this._preferredPositions = e, -1 === e.indexOf(this._lastPosition) && (this._lastPosition = null), this._validatePositions(), this;
    }, e.prototype.withViewportMargin = function (e) {
      return this._viewportMargin = e, this;
    }, e.prototype.withFlexibleDimensions = function (e) {
      return void 0 === e && (e = !0), this._hasFlexibleDimensions = e, this;
    }, e.prototype.withGrowAfterOpen = function (e) {
      return void 0 === e && (e = !0), this._growAfterOpen = e, this;
    }, e.prototype.withPush = function (e) {
      return void 0 === e && (e = !0), this._canPush = e, this;
    }, e.prototype.withLockedPosition = function (e) {
      return void 0 === e && (e = !0), this._positionLocked = e, this;
    }, e.prototype.setOrigin = function (e) {
      return this._origin = e instanceof t.ElementRef ? e.nativeElement : e, this;
    }, e.prototype.withDefaultOffsetX = function (e) {
      return this._offsetX = e, this;
    }, e.prototype.withDefaultOffsetY = function (e) {
      return this._offsetY = e, this;
    }, e.prototype.withTransformOriginOn = function (e) {
      return this._transformOriginSelector = e, this;
    }, e.prototype._getOriginPoint = function (e, t) {
      var i;
      if ("center" == t.originX) i = e.left + e.width / 2;else {
        var n = this._isRtl() ? e.right : e.left,
            r = this._isRtl() ? e.left : e.right;
        i = "start" == t.originX ? n : r;
      }
      return {
        x: i,
        y: "center" == t.originY ? e.top + e.height / 2 : "top" == t.originY ? e.top : e.bottom
      };
    }, e.prototype._getOverlayPoint = function (e, t, i) {
      var n, r;
      return n = "center" == i.overlayX ? -t.width / 2 : "start" === i.overlayX ? this._isRtl() ? -t.width : 0 : this._isRtl() ? 0 : -t.width, r = "center" == i.overlayY ? -t.height / 2 : "top" == i.overlayY ? 0 : -t.height, {
        x: e.x + n,
        y: e.y + r
      };
    }, e.prototype._getOverlayFit = function (e, t, i, n) {
      var r = e.x,
          o = e.y,
          s = this._getOffset(n, "x"),
          a = this._getOffset(n, "y");

      s && (r += s), a && (o += a);

      var c = 0 - r,
          l = r + t.width - i.width,
          u = 0 - o,
          p = o + t.height - i.height,
          d = this._subtractOverflows(t.width, c, l),
          h = this._subtractOverflows(t.height, u, p),
          f = d * h;

      return {
        visibleArea: f,
        isCompletelyWithinViewport: t.width * t.height === f,
        fitsInViewportVertically: h === t.height,
        fitsInViewportHorizontally: d == t.width
      };
    }, e.prototype._canFitWithFlexibleDimensions = function (e, t, i) {
      if (this._hasFlexibleDimensions) {
        var n = i.bottom - t.y,
            r = i.right - t.x,
            o = this._overlayRef.getConfig().minHeight,
            s = this._overlayRef.getConfig().minWidth,
            a = e.fitsInViewportVertically || null != o && o <= n,
            c = e.fitsInViewportHorizontally || null != s && s <= r;

        return a && c;
      }
    }, e.prototype._pushOverlayOnScreen = function (e, t) {
      var i,
          n = this._viewportRect,
          r = Math.max(e.x + t.width - n.right, 0),
          o = Math.max(e.y + t.height - n.bottom, 0),
          s = Math.max(n.top - e.y, 0),
          a = Math.max(n.left - e.x, 0),
          c = 0;
      return i = t.width <= n.width ? a || -r : n.left - e.x, c = t.height <= n.height ? s || -o : n.top - e.y, {
        x: e.x + i,
        y: e.y + c
      };
    }, e.prototype._applyPosition = function (e, t) {
      if (this._setTransformOrigin(e), this._setOverlayElementStyles(t, e), this._setBoundingBoxStyles(t, e), this._lastPosition = e, this._positionChangeSubscriptions > 0) {
        var i = this._getScrollVisibility(),
            n = new Ft(e, i);

        this._positionChanges.next(n);
      }

      this._isInitialRender = !1;
    }, e.prototype._setTransformOrigin = function (e) {
      if (this._transformOriginSelector) {
        var t,
            i = this._boundingBox.querySelectorAll(this._transformOriginSelector),
            n = e.overlayY;

        t = "center" === e.overlayX ? "center" : this._isRtl() ? "start" === e.overlayX ? "right" : "left" : "start" === e.overlayX ? "left" : "right";

        for (var r = 0; r < i.length; r++) {
          i[r].style.transformOrigin = t + " " + n;
        }
      }
    }, e.prototype._calculateBoundingBoxRect = function (e, t) {
      var i,
          n,
          r,
          o = this._viewportRect,
          s = this._isRtl();

      if ("top" === t.overlayY) n = e.y, i = o.bottom - e.y;else if ("bottom" === t.overlayY) r = o.height - e.y + 2 * this._viewportMargin, i = o.height - r + this._viewportMargin;else {
        var a = Math.min(o.bottom - e.y, e.y - o.left),
            c = this._lastBoundingBoxSize.height;
        i = 2 * a, n = e.y - a, i > c && !this._isInitialRender && !this._growAfterOpen && (n = e.y - c / 2);
      }
      var l,
          u,
          p,
          d = "start" === t.overlayX && !s || "end" === t.overlayX && s;
      if ("end" === t.overlayX && !s || "start" === t.overlayX && s) p = o.right - e.x + this._viewportMargin, l = e.x - o.left;else if (d) u = e.x, l = o.right - e.x;else {
        a = Math.min(o.right - e.x, e.x - o.top);
        var h = this._lastBoundingBoxSize.width;
        l = 2 * a, u = e.x - a, l > h && !this._isInitialRender && !this._growAfterOpen && (u = e.x - h / 2);
      }
      return {
        top: n,
        left: u,
        bottom: r,
        right: p,
        width: l,
        height: i
      };
    }, e.prototype._setBoundingBoxStyles = function (e, t) {
      var i = this._calculateBoundingBoxRect(e, t);

      this._isInitialRender || this._growAfterOpen || (i.height = Math.min(i.height, this._lastBoundingBoxSize.height), i.width = Math.min(i.width, this._lastBoundingBoxSize.width));
      var n = {};
      if (this._hasExactPosition()) n.top = n.left = "0", n.bottom = n.right = "", n.width = n.height = "100%";else {
        var r = this._overlayRef.getConfig().maxHeight,
            o = this._overlayRef.getConfig().maxWidth;

        n.height = ze(i.height), n.top = ze(i.top), n.bottom = ze(i.bottom), n.width = ze(i.width), n.left = ze(i.left), n.right = ze(i.right), "center" === t.overlayX ? n.alignItems = "center" : n.alignItems = "end" === t.overlayX ? "flex-end" : "flex-start", "center" === t.overlayY ? n.justifyContent = "center" : n.justifyContent = "bottom" === t.overlayY ? "flex-end" : "flex-start", r && (n.maxHeight = ze(r)), o && (n.maxWidth = ze(o));
      }
      this._lastBoundingBoxSize = i, qt(this._boundingBox.style, n);
    }, e.prototype._resetBoundingBoxStyles = function () {
      qt(this._boundingBox.style, {
        top: "0",
        left: "0",
        right: "0",
        bottom: "0",
        height: "",
        width: "",
        alignItems: "",
        justifyContent: ""
      });
    }, e.prototype._resetOverlayElementStyles = function () {
      qt(this._pane.style, {
        top: "",
        left: "",
        bottom: "",
        right: "",
        position: ""
      });
    }, e.prototype._setOverlayElementStyles = function (e, t) {
      var i = {};
      this._hasExactPosition() ? (qt(i, this._getExactOverlayY(t, e)), qt(i, this._getExactOverlayX(t, e))) : i.position = "static";

      var n = "",
          r = this._getOffset(t, "x"),
          o = this._getOffset(t, "y");

      r && (n += "translateX(" + r + "px) "), o && (n += "translateY(" + o + "px)"), i.transform = n.trim(), this._hasFlexibleDimensions && this._overlayRef.getConfig().maxHeight && (i.maxHeight = ""), this._hasFlexibleDimensions && this._overlayRef.getConfig().maxWidth && (i.maxWidth = ""), qt(this._pane.style, i);
    }, e.prototype._getExactOverlayY = function (e, t) {
      var i = {
        top: null,
        bottom: null
      },
          n = this._getOverlayPoint(t, this._overlayRect, e);

      if (this._isPushed && (n = this._pushOverlayOnScreen(n, this._overlayRect)), "bottom" === e.overlayY) {
        var r = this._document.documentElement.clientHeight;
        i.bottom = r - (n.y + this._overlayRect.height) + "px";
      } else i.top = ze(n.y);

      return i;
    }, e.prototype._getExactOverlayX = function (e, t) {
      var i = {
        left: null,
        right: null
      },
          n = this._getOverlayPoint(t, this._overlayRect, e);

      if (this._isPushed && (n = this._pushOverlayOnScreen(n, this._overlayRect)), "right" === (this._isRtl() ? "end" === e.overlayX ? "left" : "right" : "end" === e.overlayX ? "right" : "left")) {
        var r = this._document.documentElement.clientWidth;
        i.right = r - (n.x + this._overlayRect.width) + "px";
      } else i.left = ze(n.x);

      return i;
    }, e.prototype._getScrollVisibility = function () {
      var e = this._origin.getBoundingClientRect(),
          t = this._pane.getBoundingClientRect(),
          i = this.scrollables.map(function (e) {
        return e.getElementRef().nativeElement.getBoundingClientRect();
      });

      return {
        isOriginClipped: Wt(e, i),
        isOriginOutsideView: zt(e, i),
        isOverlayClipped: Wt(t, i),
        isOverlayOutsideView: zt(t, i)
      };
    }, e.prototype._subtractOverflows = function (e) {
      for (var t = [], i = 1; i < arguments.length; i++) {
        t[i - 1] = arguments[i];
      }

      return t.reduce(function (e, t) {
        return e - Math.max(t, 0);
      }, e);
    }, e.prototype._getNarrowedViewportRect = function () {
      var e = this._document.documentElement.clientWidth,
          t = this._document.documentElement.clientHeight,
          i = this._viewportRuler.getViewportScrollPosition();

      return {
        top: i.top + this._viewportMargin,
        left: i.left + this._viewportMargin,
        right: i.left + e - this._viewportMargin,
        bottom: i.top + t - this._viewportMargin,
        width: e - 2 * this._viewportMargin,
        height: t - 2 * this._viewportMargin
      };
    }, e.prototype._isRtl = function () {
      return "rtl" === this._overlayRef.getDirection();
    }, e.prototype._hasExactPosition = function () {
      return !this._hasFlexibleDimensions || this._isPushed;
    }, e.prototype._getOffset = function (e, t) {
      return "x" === t ? null == e.offsetX ? this._offsetX : e.offsetX : null == e.offsetY ? this._offsetY : e.offsetY;
    }, e.prototype._validatePositions = function () {
      if (!this._preferredPositions.length) throw Error("FlexibleConnectedPositionStrategy: At least one position is required.");

      this._preferredPositions.forEach(function (e) {
        Bt("originX", e.originX), Lt("originY", e.originY), Bt("overlayX", e.overlayX), Lt("overlayY", e.overlayY);
      });
    }, e;
  }();

  function qt(e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }

    return e;
  }

  var Jt = function () {
    function e(e, t, i, n, r, o) {
      this._preferredPositions = [], this._positionStrategy = new Gt(i, n, r, o).withFlexibleDimensions(!1).withPush(!1).withViewportMargin(0), this.withFallbackPosition(e, t);
    }

    return Object.defineProperty(e.prototype, "_isRtl", {
      get: function get() {
        return "rtl" === this._overlayRef.getDirection();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "onPositionChange", {
      get: function get() {
        return this._positionStrategy.positionChanges;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "positions", {
      get: function get() {
        return this._preferredPositions;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.attach = function (e) {
      this._overlayRef = e, this._positionStrategy.attach(e), this._direction && (e.setDirection(this._direction), this._direction = null);
    }, e.prototype.dispose = function () {
      this._positionStrategy.dispose();
    }, e.prototype.detach = function () {
      this._positionStrategy.detach();
    }, e.prototype.apply = function () {
      this._positionStrategy.apply();
    }, e.prototype.recalculateLastPosition = function () {
      this._positionStrategy.reapplyLastPosition();
    }, e.prototype.withScrollableContainers = function (e) {
      this._positionStrategy.withScrollableContainers(e);
    }, e.prototype.withFallbackPosition = function (e, t, i, n) {
      var r = new Rt(e, t, i, n);
      return this._preferredPositions.push(r), this._positionStrategy.withPositions(this._preferredPositions), this;
    }, e.prototype.withDirection = function (e) {
      return this._overlayRef ? this._overlayRef.setDirection(e) : this._direction = e, this;
    }, e.prototype.withOffsetX = function (e) {
      return this._positionStrategy.withDefaultOffsetX(e), this;
    }, e.prototype.withOffsetY = function (e) {
      return this._positionStrategy.withDefaultOffsetY(e), this;
    }, e.prototype.withLockedPosition = function (e) {
      return this._positionStrategy.withLockedPosition(e), this;
    }, e.prototype.withPositions = function (e) {
      return this._preferredPositions = e.slice(), this._positionStrategy.withPositions(this._preferredPositions), this;
    }, e.prototype.setOrigin = function (e) {
      return this._positionStrategy.setOrigin(e), this;
    }, e;
  }(),
      Qt = function () {
    function e() {
      this._cssPosition = "static", this._topOffset = "", this._bottomOffset = "", this._leftOffset = "", this._rightOffset = "", this._alignItems = "", this._justifyContent = "", this._width = "", this._height = "";
    }

    return e.prototype.attach = function (e) {
      var t = e.getConfig();
      this._overlayRef = e, this._width && !t.width && e.updateSize({
        width: this._width
      }), this._height && !t.height && e.updateSize({
        height: this._height
      }), e.hostElement.classList.add("cdk-global-overlay-wrapper");
    }, e.prototype.top = function (e) {
      return void 0 === e && (e = ""), this._bottomOffset = "", this._topOffset = e, this._alignItems = "flex-start", this;
    }, e.prototype.left = function (e) {
      return void 0 === e && (e = ""), this._rightOffset = "", this._leftOffset = e, this._justifyContent = "flex-start", this;
    }, e.prototype.bottom = function (e) {
      return void 0 === e && (e = ""), this._topOffset = "", this._bottomOffset = e, this._alignItems = "flex-end", this;
    }, e.prototype.right = function (e) {
      return void 0 === e && (e = ""), this._leftOffset = "", this._rightOffset = e, this._justifyContent = "flex-end", this;
    }, e.prototype.width = function (e) {
      return void 0 === e && (e = ""), this._overlayRef ? this._overlayRef.updateSize({
        width: e
      }) : this._width = e, this;
    }, e.prototype.height = function (e) {
      return void 0 === e && (e = ""), this._overlayRef ? this._overlayRef.updateSize({
        height: e
      }) : this._height = e, this;
    }, e.prototype.centerHorizontally = function (e) {
      return void 0 === e && (e = ""), this.left(e), this._justifyContent = "center", this;
    }, e.prototype.centerVertically = function (e) {
      return void 0 === e && (e = ""), this.top(e), this._alignItems = "center", this;
    }, e.prototype.apply = function () {
      if (this._overlayRef.hasAttached()) {
        var e = this._overlayRef.overlayElement.style,
            t = this._overlayRef.hostElement.style,
            i = this._overlayRef.getConfig();

        e.position = this._cssPosition, e.marginLeft = "100%" === i.width ? "0" : this._leftOffset, e.marginTop = "100%" === i.height ? "0" : this._topOffset, e.marginBottom = this._bottomOffset, e.marginRight = this._rightOffset, "100%" === i.width ? t.justifyContent = "flex-start" : "rtl" === this._overlayRef.getConfig().direction ? "flex-start" === this._justifyContent ? t.justifyContent = "flex-end" : "flex-end" === this._justifyContent && (t.justifyContent = "flex-start") : t.justifyContent = this._justifyContent, t.alignItems = "100%" === i.height ? "flex-start" : this._alignItems;
      }
    }, e.prototype.dispose = function () {}, e;
  }(),
      ei = function () {
    function e(e, t, i) {
      this._viewportRuler = e, this._document = t, this._platform = i;
    }

    return e.prototype.global = function () {
      return new Qt();
    }, e.prototype.connectedTo = function (e, t, i) {
      return new Jt(t, i, e, this._viewportRuler, this._document);
    }, e.prototype.flexibleConnectedTo = function (e) {
      return new Gt(e, this._viewportRuler, this._document, this._platform);
    }, e.decorators = [{
      type: t.Injectable,
      args: [{
        providedIn: "root"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: gt
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }, {
        type: Fe,
        decorators: [{
          type: t.Optional
        }]
      }];
    }, e.ngInjectableDef = t.defineInjectable({
      factory: function factory() {
        return new e(t.inject(gt), t.inject(i.DOCUMENT), t.inject(Fe, 8));
      },
      token: e,
      providedIn: "root"
    }), e;
  }(),
      ti = 0,
      ii = function () {
    function e(e, t, i, n, r, o, s, a, c) {
      this.scrollStrategies = e, this._overlayContainer = t, this._componentFactoryResolver = i, this._positionBuilder = n, this._keyboardDispatcher = r, this._injector = o, this._ngZone = s, this._document = a, this._directionality = c;
    }

    return e.prototype.create = function (e) {
      var t = this._createHostElement(),
          i = this._createPaneElement(t),
          n = this._createPortalOutlet(i),
          r = new jt(e);

      return r.direction = r.direction || this._directionality.value, new Ut(n, t, i, r, this._ngZone, this._keyboardDispatcher, this._document);
    }, e.prototype.position = function () {
      return this._positionBuilder;
    }, e.prototype._createPaneElement = function (e) {
      var t = this._document.createElement("div");

      return t.id = "cdk-overlay-" + ti++, t.classList.add("cdk-overlay-pane"), e.appendChild(t), t;
    }, e.prototype._createHostElement = function () {
      var e = this._document.createElement("div");

      return this._overlayContainer.getContainerElement().appendChild(e), e;
    }, e.prototype._createPortalOutlet = function (e) {
      return this._appRef || (this._appRef = this._injector.get(t.ApplicationRef)), new It(e, this._componentFactoryResolver, this._appRef, this._injector);
    }, e.decorators = [{
      type: t.Injectable
    }], e.ctorParameters = function () {
      return [{
        type: Zt
      }, {
        type: Kt
      }, {
        type: t.ComponentFactoryResolver
      }, {
        type: ei
      }, {
        type: $t
      }, {
        type: t.Injector
      }, {
        type: t.NgZone
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }, {
        type: _t
      }];
    }, e;
  }(),
      ni = [{
    originX: "start",
    originY: "bottom",
    overlayX: "start",
    overlayY: "top"
  }, {
    originX: "start",
    originY: "top",
    overlayX: "start",
    overlayY: "bottom"
  }, {
    originX: "end",
    originY: "top",
    overlayX: "end",
    overlayY: "bottom"
  }, {
    originX: "end",
    originY: "bottom",
    overlayX: "end",
    overlayY: "top"
  }],
      ri = new t.InjectionToken("cdk-connected-overlay-scroll-strategy"),
      oi = function () {
    function e(e) {
      this.elementRef = e;
    }

    return e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdk-overlay-origin], [overlay-origin], [cdkOverlayOrigin]",
        exportAs: "cdkOverlayOrigin"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: t.ElementRef
      }];
    }, e;
  }(),
      si = function () {
    function e(e, i, n, r, o) {
      this._overlay = e, this._scrollStrategy = r, this._dir = o, this._hasBackdrop = !1, this._lockPosition = !1, this._growAfterOpen = !1, this._flexibleDimensions = !1, this._push = !1, this._backdropSubscription = v.EMPTY, this.viewportMargin = 0, this.scrollStrategy = this._scrollStrategy(), this.open = !1, this.backdropClick = new t.EventEmitter(), this.positionChange = new t.EventEmitter(), this.attach = new t.EventEmitter(), this.detach = new t.EventEmitter(), this._templatePortal = new Dt(i, n);
    }

    return Object.defineProperty(e.prototype, "offsetX", {
      get: function get() {
        return this._offsetX;
      },
      set: function set(e) {
        this._offsetX = e, this._position && this._setPositions(this._position);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "offsetY", {
      get: function get() {
        return this._offsetY;
      },
      set: function set(e) {
        this._offsetY = e, this._position && this._setPositions(this._position);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hasBackdrop", {
      get: function get() {
        return this._hasBackdrop;
      },
      set: function set(e) {
        this._hasBackdrop = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "lockPosition", {
      get: function get() {
        return this._lockPosition;
      },
      set: function set(e) {
        this._lockPosition = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "flexibleDiemsions", {
      get: function get() {
        return this._flexibleDimensions;
      },
      set: function set(e) {
        this._flexibleDimensions = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "growAfterOpen", {
      get: function get() {
        return this._growAfterOpen;
      },
      set: function set(e) {
        this._growAfterOpen = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "push", {
      get: function get() {
        return this._push;
      },
      set: function set(e) {
        this._push = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "overlayRef", {
      get: function get() {
        return this._overlayRef;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dir", {
      get: function get() {
        return this._dir ? this._dir.value : "ltr";
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnDestroy = function () {
      this._destroyOverlay();
    }, e.prototype.ngOnChanges = function (e) {
      this._position && (e.positions && this._position.withPositions(this.positions), e.lockPosition && this._position.withLockedPosition(this.lockPosition), e.origin && (this._position.setOrigin(this.origin.elementRef), this.open && this._position.apply())), e.open && (this.open ? this._attachOverlay() : this._detachOverlay());
    }, e.prototype._createOverlay = function () {
      this.positions && this.positions.length || (this.positions = ni), this._overlayRef = this._overlay.create(this._buildConfig());
    }, e.prototype._buildConfig = function () {
      var e = this._position = this._createPositionStrategy(),
          t = new jt({
        direction: this._dir,
        positionStrategy: e,
        scrollStrategy: this.scrollStrategy,
        hasBackdrop: this.hasBackdrop
      });

      return (this.width || 0 === this.width) && (t.width = this.width), (this.height || 0 === this.height) && (t.height = this.height), (this.minWidth || 0 === this.minWidth) && (t.minWidth = this.minWidth), (this.minHeight || 0 === this.minHeight) && (t.minHeight = this.minHeight), this.backdropClass && (t.backdropClass = this.backdropClass), t;
    }, e.prototype._createPositionStrategy = function () {
      var e = this,
          t = this._overlay.position().flexibleConnectedTo(this.origin.elementRef).withFlexibleDimensions(this.flexibleDiemsions).withPush(this.push).withGrowAfterOpen(this.growAfterOpen).withViewportMargin(this.viewportMargin).withLockedPosition(this.lockPosition);

      return this._setPositions(t), t.positionChanges.subscribe(function (t) {
        return e.positionChange.emit(t);
      }), t;
    }, e.prototype._setPositions = function (e) {
      var t = this,
          i = this.positions.map(function (e) {
        return {
          originX: e.originX,
          originY: e.originY,
          overlayX: e.overlayX,
          overlayY: e.overlayY,
          offsetX: e.offsetX || t.offsetX,
          offsetY: e.offsetY || t.offsetY
        };
      });
      e.withPositions(i);
    }, e.prototype._attachOverlay = function () {
      var e = this;
      this._overlayRef ? this._overlayRef.updateSize({
        width: this.width,
        minWidth: this.minWidth,
        height: this.height,
        minHeight: this.minHeight
      }) : (this._createOverlay(), this._overlayRef.keydownEvents().subscribe(function (t) {
        t.keyCode === fe && e._detachOverlay();
      })), this._overlayRef.hasAttached() || (this._overlayRef.attach(this._templatePortal), this.attach.emit()), this.hasBackdrop && (this._backdropSubscription = this._overlayRef.backdropClick().subscribe(function (t) {
        e.backdropClick.emit(t);
      }));
    }, e.prototype._detachOverlay = function () {
      this._overlayRef && (this._overlayRef.detach(), this.detach.emit()), this._backdropSubscription.unsubscribe();
    }, e.prototype._destroyOverlay = function () {
      this._overlayRef && this._overlayRef.dispose(), this._backdropSubscription.unsubscribe();
    }, e.decorators = [{
      type: t.Directive,
      args: [{
        selector: "[cdk-connected-overlay], [connected-overlay], [cdkConnectedOverlay]",
        exportAs: "cdkConnectedOverlay"
      }]
    }], e.ctorParameters = function () {
      return [{
        type: ii
      }, {
        type: t.TemplateRef
      }, {
        type: t.ViewContainerRef
      }, {
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [ri]
        }]
      }, {
        type: _t,
        decorators: [{
          type: t.Optional
        }]
      }];
    }, e.propDecorators = {
      origin: [{
        type: t.Input,
        args: ["cdkConnectedOverlayOrigin"]
      }],
      positions: [{
        type: t.Input,
        args: ["cdkConnectedOverlayPositions"]
      }],
      offsetX: [{
        type: t.Input,
        args: ["cdkConnectedOverlayOffsetX"]
      }],
      offsetY: [{
        type: t.Input,
        args: ["cdkConnectedOverlayOffsetY"]
      }],
      width: [{
        type: t.Input,
        args: ["cdkConnectedOverlayWidth"]
      }],
      height: [{
        type: t.Input,
        args: ["cdkConnectedOverlayHeight"]
      }],
      minWidth: [{
        type: t.Input,
        args: ["cdkConnectedOverlayMinWidth"]
      }],
      minHeight: [{
        type: t.Input,
        args: ["cdkConnectedOverlayMinHeight"]
      }],
      backdropClass: [{
        type: t.Input,
        args: ["cdkConnectedOverlayBackdropClass"]
      }],
      viewportMargin: [{
        type: t.Input,
        args: ["cdkConnectedOverlayViewportMargin"]
      }],
      scrollStrategy: [{
        type: t.Input,
        args: ["cdkConnectedOverlayScrollStrategy"]
      }],
      open: [{
        type: t.Input,
        args: ["cdkConnectedOverlayOpen"]
      }],
      hasBackdrop: [{
        type: t.Input,
        args: ["cdkConnectedOverlayHasBackdrop"]
      }],
      lockPosition: [{
        type: t.Input,
        args: ["cdkConnectedOverlayLockPosition"]
      }],
      flexibleDiemsions: [{
        type: t.Input,
        args: ["cdkConnectedOverlayFlexibleDimensions"]
      }],
      growAfterOpen: [{
        type: t.Input,
        args: ["cdkConnectedOverlayGrowAfterOpen"]
      }],
      push: [{
        type: t.Input,
        args: ["cdkConnectedOverlayPush"]
      }],
      backdropClick: [{
        type: t.Output
      }],
      positionChange: [{
        type: t.Output
      }],
      attach: [{
        type: t.Output
      }],
      detach: [{
        type: t.Output
      }]
    }, e;
  }();

  var ai = {
    provide: ri,
    deps: [ii],
    useFactory: function useFactory(e) {
      return function () {
        return e.scrollStrategies.reposition();
      };
    }
  },
      ci = function () {
    function e() {}

    return e.decorators = [{
      type: t.NgModule,
      args: [{
        imports: [Ot, Et, bt],
        exports: [si, oi, bt],
        declarations: [si, oi],
        providers: [ii, ai]
      }]
    }], e;
  }(),
      li = (function (e) {
    function n(t) {
      return e.call(this, t) || this;
    }

    xe(n, e), n.prototype.ngOnDestroy = function () {
      e.prototype.ngOnDestroy.call(this), this._fullScreenEventName && this._fullScreenListener && this._document.removeEventListener(this._fullScreenEventName, this._fullScreenListener);
    }, n.prototype._createContainer = function () {
      var t = this;
      e.prototype._createContainer.call(this), this._adjustParentForFullscreenChange(), this._addFullscreenChangeListener(function () {
        return t._adjustParentForFullscreenChange();
      });
    }, n.prototype._adjustParentForFullscreenChange = function () {
      this._containerElement && (this.getFullscreenElement() || this._document.body).appendChild(this._containerElement);
    }, n.prototype._addFullscreenChangeListener = function (e) {
      var t = this._getEventName();

      t && (this._fullScreenListener && this._document.removeEventListener(t, this._fullScreenListener), this._document.addEventListener(t, e), this._fullScreenListener = e);
    }, n.prototype._getEventName = function () {
      return this._fullScreenEventName || (this._document.fullscreenEnabled ? this._fullScreenEventName = "fullscreenchange" : this._document.webkitFullscreenEnabled ? this._fullScreenEventName = "webkitfullscreenchange" : this._document.mozFullScreenEnabled ? this._fullScreenEventName = "mozfullscreenchange" : this._document.msFullscreenEnabled && (this._fullScreenEventName = "MSFullscreenChange")), this._fullScreenEventName;
    }, n.prototype.getFullscreenElement = function () {
      return this._document.fullscreenElement || this._document.webkitFullscreenElement || this._document.mozFullScreenElement || this._document.msFullscreenElement || null;
    }, n.decorators = [{
      type: t.Injectable
    }], n.ctorParameters = function () {
      return [{
        type: void 0,
        decorators: [{
          type: t.Inject,
          args: [i.DOCUMENT]
        }]
      }];
    };
  }(Kt), function (e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  }),
      ui = function () {
    function e() {
      this.changes = new E(), this.upSecondLabel = "Add a second", this.downSecondLabel = "Minus a second", this.upMinuteLabel = "Add a minute", this.downMinuteLabel = "Minus a minute", this.upHourLabel = "Add a hour", this.downHourLabel = "Minus a hour", this.prevMonthLabel = "Previous month", this.nextMonthLabel = "Next month", this.prevYearLabel = "Previous year", this.nextYearLabel = "Next year", this.prevMultiYearLabel = "Previous 21 years", this.nextMultiYearLabel = "Next 21 years", this.switchToMonthViewLabel = "Change to month view", this.switchToMultiYearViewLabel = "Choose month and year", this.cancelBtnLabel = "Cancel", this.setBtnLabel = "Set", this.rangeFromLabel = "From", this.rangeToLabel = "To", this.hour12AMLabel = "AM", this.hour12PMLabel = "PM";
    }

    return e = li([t.Injectable({
      providedIn: "root"
    })], e);
  }(),
      pi = new t.InjectionToken("OWL_DATE_TIME_LOCALE", {
    providedIn: "root",
    factory: function factory() {
      return t.inject(t.LOCALE_ID);
    }
  });

  var di,
      hi = {
    provide: pi,
    useExisting: t.LOCALE_ID
  },
      fi = function () {
    function e() {
      this._localeChanges = new E(), this.millisecondsInDay = 864e5, this.milliseondsInMinute = 6e4;
    }

    return Object.defineProperty(e.prototype, "localeChanges", {
      get: function get() {
        return this._localeChanges;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.compare = function (e, t) {
      if (!this.isValid(e) || !this.isValid(t)) throw Error("JSNativeDate: Cannot compare invalid dates.");
      var i = this.clone(e),
          n = this.clone(t),
          r = this.getTime(i) - this.getTime(n);
      return r < 0 ? -1 : r > 0 ? 1 : r;
    }, e.prototype.compareYear = function (e, t) {
      if (!this.isValid(e) || !this.isValid(t)) throw Error("JSNativeDate: Cannot compare invalid dates.");
      var i = this.getYear(e) - this.getYear(t);
      return i < 0 ? -1 : i > 0 ? 1 : 0;
    }, e.prototype.deserialize = function (e) {
      return null == e || this.isDateInstance(e) && this.isValid(e) ? e : this.invalid();
    }, e.prototype.setLocale = function (e) {
      this.locale = e, this._localeChanges.next();
    }, e.prototype.clampDate = function (e, t, i) {
      return t && this.compare(e, t) < 0 ? t : i && this.compare(e, i) > 0 ? i : e;
    }, e;
  }(),
      mi = new t.InjectionToken("OWL_DATE_TIME_FORMATS"),
      yi = function yi(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      gi = function gi(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      bi = function bi(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      vi = function () {
    function e(e, i, n, r, o, s) {
      var a = this;
      this.elmRef = e, this.pickerIntl = i, this.ngZone = n, this.cdRef = r, this.dateTimeAdapter = o, this.dateTimeFormats = s, this.firstDayOfWeek = 0, this._selecteds = [], this.startView = "month", this.pickerMomentChange = new t.EventEmitter(), this.selectedChange = new t.EventEmitter(), this.userSelection = new t.EventEmitter(), this.yearSelected = new t.EventEmitter(), this.monthSelected = new t.EventEmitter(), this.dateFilterForViews = function (e) {
        return !!e && (!a.dateFilter || a.dateFilter(e)) && (!a.minDate || a.dateTimeAdapter.compare(e, a.minDate) >= 0) && (!a.maxDate || a.dateTimeAdapter.compare(e, a.maxDate) <= 0);
      }, this.intlChangesSub = v.EMPTY, this.moveFocusOnNextTick = !1, this.intlChangesSub = this.pickerIntl.changes.subscribe(function () {
        a.cdRef.markForCheck();
      });
    }

    return Object.defineProperty(e.prototype, "minDate", {
      get: function get() {
        return this._minDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), e = this.getValidDate(e), this._minDate = e ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(e), this.dateTimeAdapter.getMonth(e), this.dateTimeAdapter.getDate(e)) : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxDate", {
      get: function get() {
        return this._maxDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), e = this.getValidDate(e), this._maxDate = e ? this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(e), this.dateTimeAdapter.getMonth(e), this.dateTimeAdapter.getDate(e)) : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._pickerMoment;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._pickerMoment = this.getValidDate(e) || this.dateTimeAdapter.now();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._selected = this.getValidDate(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        var t = this;
        this._selecteds = e.map(function (e) {
          return e = t.dateTimeAdapter.deserialize(e), t.getValidDate(e);
        });
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "periodButtonText", {
      get: function get() {
        return this.isMonthView ? this.dateTimeAdapter.format(this.pickerMoment, this.dateTimeFormats.monthYearLabel) : this.dateTimeAdapter.getYearName(this.pickerMoment);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "periodButtonLabel", {
      get: function get() {
        return this.isMonthView ? this.pickerIntl.switchToMultiYearViewLabel : this.pickerIntl.switchToMonthViewLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "prevButtonLabel", {
      get: function get() {
        return "month" === this._currentView ? this.pickerIntl.prevMonthLabel : "year" === this._currentView ? this.pickerIntl.prevYearLabel : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextButtonLabel", {
      get: function get() {
        return "month" === this._currentView ? this.pickerIntl.nextMonthLabel : "year" === this._currentView ? this.pickerIntl.nextYearLabel : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "currentView", {
      get: function get() {
        return this._currentView;
      },
      set: function set(e) {
        this._currentView = e, this.moveFocusOnNextTick = !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this.selectMode || "rangeFrom" === this.selectMode || "rangeTo" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "showControlArrows", {
      get: function get() {
        return "multi-years" !== this._currentView;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isMonthView", {
      get: function get() {
        return "month" === this._currentView;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTCalendarClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.ngAfterContentInit = function () {
      this._currentView = this.startView;
    }, e.prototype.ngAfterViewChecked = function () {
      this.moveFocusOnNextTick && (this.moveFocusOnNextTick = !1, this.focusActiveCell());
    }, e.prototype.ngOnDestroy = function () {
      this.intlChangesSub.unsubscribe();
    }, e.prototype.toggleViews = function () {
      this.currentView = "month" == this._currentView ? "multi-years" : "month";
    }, e.prototype.previousClicked = function () {
      this.pickerMoment = this.isMonthView ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1) : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1), this.pickerMomentChange.emit(this.pickerMoment);
    }, e.prototype.nextClicked = function () {
      this.pickerMoment = this.isMonthView ? this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1) : this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1), this.pickerMomentChange.emit(this.pickerMoment);
    }, e.prototype.dateSelected = function (e) {
      this.dateFilterForViews(e) && this.selectedChange.emit(e);
    }, e.prototype.goToDateInView = function (e, t) {
      this.handlePickerMomentChange(e), this.currentView = t;
    }, e.prototype.handlePickerMomentChange = function (e) {
      this.pickerMoment = this.dateTimeAdapter.clampDate(e, this.minDate, this.maxDate), this.pickerMomentChange.emit(this.pickerMoment);
    }, e.prototype.userSelected = function () {
      this.userSelection.emit();
    }, e.prototype.prevButtonEnabled = function () {
      return !this.minDate || !this.isSameView(this.pickerMoment, this.minDate);
    }, e.prototype.nextButtonEnabled = function () {
      return !this.maxDate || !this.isSameView(this.pickerMoment, this.maxDate);
    }, e.prototype.focusActiveCell = function () {
      var e = this;
      this.ngZone.runOutsideAngular(function () {
        e.ngZone.onStable.asObservable().pipe(Se(1)).subscribe(function () {
          e.elmRef.nativeElement.querySelector(".owl-dt-calendar-cell-active").focus();
        });
      });
    }, e.prototype.selectYearInMultiYearView = function (e) {
      this.yearSelected.emit(e);
    }, e.prototype.selectMonthInYearView = function (e) {
      this.monthSelected.emit(e);
    }, e.prototype.isSameView = function (e, t) {
      return "month" === this._currentView ? !(!e || !t || this.dateTimeAdapter.getYear(e) !== this.dateTimeAdapter.getYear(t) || this.dateTimeAdapter.getMonth(e) !== this.dateTimeAdapter.getMonth(t)) : "year" === this._currentView && !(!e || !t || this.dateTimeAdapter.getYear(e) !== this.dateTimeAdapter.getYear(t));
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, yi([t.Input(), gi("design:type", Function)], e.prototype, "dateFilter", void 0), yi([t.Input(), gi("design:type", Object)], e.prototype, "firstDayOfWeek", void 0), yi([t.Input(), gi("design:type", Object), gi("design:paramtypes", [Object])], e.prototype, "minDate", null), yi([t.Input(), gi("design:type", Object), gi("design:paramtypes", [Object])], e.prototype, "maxDate", null), yi([t.Input(), gi("design:type", Object), gi("design:paramtypes", [Object])], e.prototype, "pickerMoment", null), yi([t.Input(), gi("design:type", String)], e.prototype, "selectMode", void 0), yi([t.Input(), gi("design:type", Object), gi("design:paramtypes", [Object])], e.prototype, "selected", null), yi([t.Input(), gi("design:type", Array), gi("design:paramtypes", [Array])], e.prototype, "selecteds", null), yi([t.Input(), gi("design:type", String)], e.prototype, "startView", void 0), yi([t.Input(), gi("design:type", Boolean)], e.prototype, "hideOtherMonths", void 0), yi([t.Output(), gi("design:type", Object)], e.prototype, "pickerMomentChange", void 0), yi([t.Output(), gi("design:type", Object)], e.prototype, "selectedChange", void 0), yi([t.Output(), gi("design:type", Object)], e.prototype, "userSelection", void 0), yi([t.Output(), gi("design:type", Object)], e.prototype, "yearSelected", void 0), yi([t.Output(), gi("design:type", Object)], e.prototype, "monthSelected", void 0), yi([t.HostBinding("class.owl-dt-calendar"), gi("design:type", Boolean), gi("design:paramtypes", [])], e.prototype, "owlDTCalendarClass", null), e = yi([t.Component({
      selector: "owl-date-time-calendar",
      exportAs: "owlDateTimeCalendar",
      template: '<div class="owl-dt-calendar-control">\x3c!-- focus when keyboard tab (http://kizu.ru/en/blog/keyboard-only-focus/#x) --\x3e <button class="owl-dt-control owl-dt-control-button owl-dt-control-arrow-button" type="button" tabindex="0" [style.visibility]="showControlArrows? \'visible\': \'hidden\'" [disabled]="!prevButtonEnabled()" [attr.aria-label]="prevButtonLabel" (click)="previousClicked()"><span class="owl-dt-control-content owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Left"> --\x3e <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 250.738 250.738" style="enable-background:new 0 0 250.738 250.738;" xml:space="preserve" width="100%" height="100%"><path style="fill-rule: evenodd; clip-rule: evenodd;" d="M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button><div class="owl-dt-calendar-control-content"><button class="owl-dt-control owl-dt-control-button owl-dt-control-period-button" type="button" tabindex="0" [attr.aria-label]="periodButtonLabel" (click)="toggleViews()"><span class="owl-dt-control-content owl-dt-control-button-content" tabindex="-1">{{periodButtonText}} <span class="owl-dt-control-button-arrow" [style.transform]="\'rotate(\' + (isMonthView? 0 : 180) +\'deg)\'">\x3c!-- <editor-fold desc="SVG Arrow"> --\x3e <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" width="50%" height="50%" viewBox="0 0 292.362 292.362" style="enable-background:new 0 0 292.362 292.362;" xml:space="preserve"><g><path d="M286.935,69.377c-3.614-3.617-7.898-5.424-12.848-5.424H18.274c-4.952,0-9.233,1.807-12.85,5.424\n                                C1.807,72.998,0,77.279,0,82.228c0,4.948,1.807,9.229,5.424,12.847l127.907,127.907c3.621,3.617,7.902,5.428,12.85,5.428\n                                s9.233-1.811,12.847-5.428L286.935,95.074c3.613-3.617,5.427-7.898,5.427-12.847C292.362,77.279,290.548,72.998,286.935,69.377z"/></g></svg>\x3c!-- </editor-fold> --\x3e</span></span></button></div><button class="owl-dt-control owl-dt-control-button owl-dt-control-arrow-button" type="button" tabindex="0" [style.visibility]="showControlArrows? \'visible\': \'hidden\'" [disabled]="!nextButtonEnabled()" [attr.aria-label]="nextButtonLabel" (click)="nextClicked()"><span class="owl-dt-control-content owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Right"> --\x3e <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 250.738 250.738" style="enable-background:new 0 0 250.738 250.738;" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                    c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                    c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                    C197.237,120.447,195.534,115.448,191.75,111.689z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button></div><div class="owl-dt-calendar-main" cdkMonitorSubtreeFocus [ngSwitch]="currentView" tabindex="-1"><owl-date-time-month-view *ngSwitchCase="\'month\'" [pickerMoment]="pickerMoment" [firstDayOfWeek]="firstDayOfWeek" [selected]="selected" [selecteds]="selecteds" [selectMode]="selectMode" [minDate]="minDate" [maxDate]="maxDate" [dateFilter]="dateFilter" [hideOtherMonths]="hideOtherMonths" (pickerMomentChange)="handlePickerMomentChange($event)" (selectedChange)="dateSelected($event)" (userSelection)="userSelected()"></owl-date-time-month-view><owl-date-time-year-view *ngSwitchCase="\'year\'" [pickerMoment]="pickerMoment" [selected]="selected" [selecteds]="selecteds" [selectMode]="selectMode" [minDate]="minDate" [maxDate]="maxDate" [dateFilter]="dateFilter" (keyboardEnter)="focusActiveCell()" (pickerMomentChange)="handlePickerMomentChange($event)" (monthSelected)="selectMonthInYearView($event)" (change)="goToDateInView($event, \'month\')"></owl-date-time-year-view><owl-date-time-multi-year-view *ngSwitchCase="\'multi-years\'" [pickerMoment]="pickerMoment" [selected]="selected" [selecteds]="selecteds" [selectMode]="selectMode" [minDate]="minDate" [maxDate]="maxDate" [dateFilter]="dateFilter" (keyboardEnter)="focusActiveCell()" (pickerMomentChange)="handlePickerMomentChange($event)" (yearSelected)="selectYearInMultiYearView($event)" (change)="goToDateInView($event, \'year\')"></owl-date-time-multi-year-view></div>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), bi(4, t.Optional()), bi(5, t.Optional()), bi(5, t.Inject(mi)), gi("design:paramtypes", [t.ElementRef, ui, t.NgZone, t.ChangeDetectorRef, fi, Object])], e);
  }(),
      _i = function _i(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      wi = function wi(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Oi = function Oi(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      ki = function () {
    function e(e, i, n, r, o) {
      this.ngZone = e, this.elmRef = i, this.pickerIntl = n, this.cdRef = r, this.dateTimeAdapter = o, this.isPM = !1, this.stepHour = 1, this.stepMinute = 1, this.stepSecond = 1, this.selectedChange = new t.EventEmitter();
    }

    return Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._pickerMoment;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._pickerMoment = this.getValidDate(e) || this.dateTimeAdapter.now();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minDateTime", {
      get: function get() {
        return this._minDateTime;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._minDateTime = this.getValidDate(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxDateTime", {
      get: function get() {
        return this._maxDateTime;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._maxDateTime = this.getValidDate(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hourValue", {
      get: function get() {
        return this.dateTimeAdapter.getHours(this.pickerMoment);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hourBoxValue", {
      get: function get() {
        var e = this.hourValue;
        return this.hour12Timer ? (0 === e ? (e = 12, this.isPM = !1) : e > 0 && e < 12 ? this.isPM = !1 : 12 === e ? this.isPM = !0 : e > 12 && e < 24 && (e -= 12, this.isPM = !0), e) : e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minuteValue", {
      get: function get() {
        return this.dateTimeAdapter.getMinutes(this.pickerMoment);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "secondValue", {
      get: function get() {
        return this.dateTimeAdapter.getSeconds(this.pickerMoment);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "upHourButtonLabel", {
      get: function get() {
        return this.pickerIntl.upHourLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "downHourButtonLabel", {
      get: function get() {
        return this.pickerIntl.downHourLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "upMinuteButtonLabel", {
      get: function get() {
        return this.pickerIntl.upMinuteLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "downMinuteButtonLabel", {
      get: function get() {
        return this.pickerIntl.downMinuteLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "upSecondButtonLabel", {
      get: function get() {
        return this.pickerIntl.upSecondLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "downSecondButtonLabel", {
      get: function get() {
        return this.pickerIntl.downSecondLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hour12ButtonLabel", {
      get: function get() {
        return this.isPM ? this.pickerIntl.hour12PMLabel : this.pickerIntl.hour12AMLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTTimerClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTTimeTabIndex", {
      get: function get() {
        return -1;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.focus = function () {
      var e = this;
      this.ngZone.runOutsideAngular(function () {
        e.ngZone.onStable.asObservable().pipe(Se(1)).subscribe(function () {
          e.elmRef.nativeElement.focus();
        });
      });
    }, e.prototype.setHourValueViaInput = function (e) {
      this.hour12Timer && this.isPM && e >= 1 && e <= 11 ? e += 12 : this.hour12Timer && !this.isPM && 12 === e && (e = 0), this.setHourValue(e);
    }, e.prototype.setHourValue = function (e) {
      var t = this.dateTimeAdapter.setHours(this.pickerMoment, e);
      this.selectedChange.emit(t), this.cdRef.markForCheck();
    }, e.prototype.setMinuteValue = function (e) {
      var t = this.dateTimeAdapter.setMinutes(this.pickerMoment, e);
      this.selectedChange.emit(t), this.cdRef.markForCheck();
    }, e.prototype.setSecondValue = function (e) {
      var t = this.dateTimeAdapter.setSeconds(this.pickerMoment, e);
      this.selectedChange.emit(t), this.cdRef.markForCheck();
    }, e.prototype.setMeridiem = function (e) {
      this.isPM = !this.isPM;
      var t = this.hourValue;
      this.isPM ? t += 12 : t -= 12, t >= 0 && t <= 23 && this.setHourValue(t), this.cdRef.markForCheck(), e.preventDefault();
    }, e.prototype.upHourEnabled = function () {
      return !this.maxDateTime || this.compareHours(this.stepHour, this.maxDateTime) < 1;
    }, e.prototype.downHourEnabled = function () {
      return !this.minDateTime || this.compareHours(-this.stepHour, this.minDateTime) > -1;
    }, e.prototype.upMinuteEnabled = function () {
      return !this.maxDateTime || this.compareMinutes(this.stepMinute, this.maxDateTime) < 1;
    }, e.prototype.downMinuteEnabled = function () {
      return !this.minDateTime || this.compareMinutes(-this.stepMinute, this.minDateTime) > -1;
    }, e.prototype.upSecondEnabled = function () {
      return !this.maxDateTime || this.compareSeconds(this.stepSecond, this.maxDateTime) < 1;
    }, e.prototype.downSecondEnabled = function () {
      return !this.minDateTime || this.compareSeconds(-this.stepSecond, this.minDateTime) > -1;
    }, e.prototype.compareHours = function (e, t) {
      var i = this.dateTimeAdapter.getHours(this.pickerMoment) + e,
          n = this.dateTimeAdapter.setHours(this.pickerMoment, i);
      return this.dateTimeAdapter.compare(n, t);
    }, e.prototype.compareMinutes = function (e, t) {
      var i = this.dateTimeAdapter.getMinutes(this.pickerMoment) + e,
          n = this.dateTimeAdapter.setMinutes(this.pickerMoment, i);
      return this.dateTimeAdapter.compare(n, t);
    }, e.prototype.compareSeconds = function (e, t) {
      var i = this.dateTimeAdapter.getSeconds(this.pickerMoment) + e,
          n = this.dateTimeAdapter.setSeconds(this.pickerMoment, i);
      return this.dateTimeAdapter.compare(n, t);
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, _i([t.Input(), wi("design:type", Object), wi("design:paramtypes", [Object])], e.prototype, "pickerMoment", null), _i([t.Input(), wi("design:type", Object), wi("design:paramtypes", [Object])], e.prototype, "minDateTime", null), _i([t.Input(), wi("design:type", Object), wi("design:paramtypes", [Object])], e.prototype, "maxDateTime", null), _i([t.Input(), wi("design:type", Boolean)], e.prototype, "showSecondsTimer", void 0), _i([t.Input(), wi("design:type", Boolean)], e.prototype, "hour12Timer", void 0), _i([t.Input(), wi("design:type", Object)], e.prototype, "stepHour", void 0), _i([t.Input(), wi("design:type", Object)], e.prototype, "stepMinute", void 0), _i([t.Input(), wi("design:type", Object)], e.prototype, "stepSecond", void 0), _i([t.Output(), wi("design:type", Object)], e.prototype, "selectedChange", void 0), _i([t.HostBinding("class.owl-dt-timer"), wi("design:type", Boolean), wi("design:paramtypes", [])], e.prototype, "owlDTTimerClass", null), _i([t.HostBinding("attr.tabindex"), wi("design:type", Number), wi("design:paramtypes", [])], e.prototype, "owlDTTimeTabIndex", null), e = _i([t.Component({
      exportAs: "owlDateTimeTimer",
      selector: "owl-date-time-timer",
      template: '<owl-date-time-timer-box [upBtnAriaLabel]="upHourButtonLabel" [downBtnAriaLabel]="downHourButtonLabel" [upBtnDisabled]="!upHourEnabled()" [downBtnDisabled]="!downHourEnabled()" [boxValue]="hourBoxValue" [value]="hourValue" [min]="0" [max]="23" [step]="stepHour" [inputLabel]="\'Hour\'" (inputChange)="setHourValueViaInput($event)" (valueChange)="setHourValue($event)"></owl-date-time-timer-box><owl-date-time-timer-box [showDivider]="true" [upBtnAriaLabel]="upMinuteButtonLabel" [downBtnAriaLabel]="downMinuteButtonLabel" [upBtnDisabled]="!upMinuteEnabled()" [downBtnDisabled]="!downMinuteEnabled()" [value]="minuteValue" [min]="0" [max]="59" [step]="stepMinute" [inputLabel]="\'Minute\'" (inputChange)="setMinuteValue($event)" (valueChange)="setMinuteValue($event)"></owl-date-time-timer-box><owl-date-time-timer-box *ngIf="showSecondsTimer" [showDivider]="true" [upBtnAriaLabel]="upSecondButtonLabel" [downBtnAriaLabel]="downSecondButtonLabel" [upBtnDisabled]="!upSecondEnabled()" [downBtnDisabled]="!downSecondEnabled()" [value]="secondValue" [min]="0" [max]="59" [step]="stepSecond" [inputLabel]="\'Second\'" (inputChange)="setSecondValue($event)" (valueChange)="setSecondValue($event)"></owl-date-time-timer-box><div *ngIf="hour12Timer" class="owl-dt-timer-hour12"><button class="owl-dt-control-button owl-dt-timer-hour12-box" type="button" tabindex="0" (click)="setMeridiem($event)"><span class="owl-dt-control-button-content" tabindex="-1">{{hour12ButtonLabel}}</span></button></div>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), Oi(4, t.Optional()), wi("design:paramtypes", [t.NgZone, t.ElementRef, ui, t.ChangeDetectorRef, fi])], e);
  }(),
      Ti = {
    transformPicker: n.trigger("transformPicker", [n.state("void", n.style({
      opacity: 0,
      transform: "scale(1, 0)"
    })), n.state("enter", n.style({
      opacity: 1,
      transform: "scale(1, 1)"
    })), n.transition("void => enter", n.group([n.query("@fadeInPicker", n.animateChild(), {
      optional: !0
    }), n.animate("400ms cubic-bezier(0.25, 0.8, 0.25, 1)")])), n.transition("enter => void", n.animate("100ms linear", n.style({
      opacity: 0
    })))]),
    fadeInPicker: n.trigger("fadeInPicker", [n.state("enter", n.style({
      opacity: 1
    })), n.state("void", n.style({
      opacity: 0
    })), n.transition("void => enter", n.animate("400ms 100ms cubic-bezier(0.55, 0, 0.55, 0.2)"))])
  },
      Ci = function Ci(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Di = function Di(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Mi = function Mi(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Ii = function () {
    function e(e, t, i, n) {
      this.cdRef = e, this.elmRef = t, this.pickerIntl = i, this.dateTimeAdapter = n, this.activeSelectedIndex = 0, this.hidePicker$ = new E(), this.confirmSelected$ = new E(), this.pickerOpened$ = new E();
    }

    return Object.defineProperty(e.prototype, "hidePickerStream", {
      get: function get() {
        return this.hidePicker$.asObservable();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "confirmSelectedStream", {
      get: function get() {
        return this.confirmSelected$.asObservable();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerOpenedStream", {
      get: function get() {
        return this.pickerOpened$.asObservable();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._clamPickerMoment;
      },
      set: function set(e) {
        e && (this._clamPickerMoment = this.dateTimeAdapter.clampDate(e, this.picker.minDateTime, this.picker.maxDateTime)), this.cdRef.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerType", {
      get: function get() {
        return this.picker.pickerType;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "cancelLabel", {
      get: function get() {
        return this.pickerIntl.cancelBtnLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "setLabel", {
      get: function get() {
        return this.pickerIntl.setBtnLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "fromLabel", {
      get: function get() {
        return this.pickerIntl.rangeFromLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "toLabel", {
      get: function get() {
        return this.pickerIntl.rangeToLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "fromFormattedValue", {
      get: function get() {
        var e = this.picker.selecteds[0];
        return e ? this.dateTimeAdapter.format(e, this.picker.formatString) : "";
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "toFormattedValue", {
      get: function get() {
        var e = this.picker.selecteds[1];
        return e ? this.dateTimeAdapter.format(e, this.picker.formatString) : "";
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "showControlButtons", {
      get: function get() {
        return "dialog" === this.picker.pickerMode || "calendar" !== this.picker.pickerType && "inline" !== this.picker.pickerMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "containerElm", {
      get: function get() {
        return this.elmRef.nativeElement;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTContainerClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTPopupContainerClass", {
      get: function get() {
        return "popup" === this.picker.pickerMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTDialogContainerClass", {
      get: function get() {
        return "dialog" === this.picker.pickerMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTInlineContainerClass", {
      get: function get() {
        return "inline" === this.picker.pickerMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTContainerDisabledClass", {
      get: function get() {
        return this.picker.disabled;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTContainerId", {
      get: function get() {
        return this.picker.id;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTContainerAnimation", {
      get: function get() {
        return "inline" === this.picker.pickerMode ? "" : "enter";
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.ngAfterContentInit = function () {
      this.initPicker();
    }, e.prototype.ngAfterViewInit = function () {
      this.focusPicker();
    }, e.prototype.handleContainerAnimationDone = function (e) {
      "enter" === e.toState && this.pickerOpened$.next();
    }, e.prototype.dateSelected = function (e) {
      var t;
      this.picker.isInSingleMode ? (t = this.dateSelectedInSingleMode(e)) ? (this.pickerMoment = t, this.picker.select(t)) : "calendar" === this.pickerType && this.hidePicker$.next(null) : this.picker.isInRangeMode && (t = this.dateSelectedInRangeMode(e)) && (this.pickerMoment = t[this.activeSelectedIndex], this.picker.select(t));
    }, e.prototype.timeSelected = function (e) {
      if (this.pickerMoment = this.dateTimeAdapter.clone(e), this.picker.dateTimeChecker(this.pickerMoment)) if (this.picker.isInSingleMode) this.picker.select(this.pickerMoment);else if (this.picker.isInRangeMode) {
        var t = this.picker.selecteds.slice();
        0 === this.activeSelectedIndex && t[1] && 1 === this.dateTimeAdapter.compare(this.pickerMoment, t[1]) || 1 === this.activeSelectedIndex && t[0] && -1 === this.dateTimeAdapter.compare(this.pickerMoment, t[0]) ? (t[0] = this.pickerMoment, t[1] = this.pickerMoment) : t[this.activeSelectedIndex] = this.pickerMoment, this.picker.select(t);
      }
    }, e.prototype.onCancelClicked = function (e) {
      this.hidePicker$.next(null), e.preventDefault();
    }, e.prototype.onSetClicked = function (e) {
      if (!this.picker.dateTimeChecker(this.pickerMoment)) return this.hidePicker$.next(null), void e.preventDefault();
      this.confirmSelected$.next(e), e.preventDefault();
    }, e.prototype.handleClickOnInfoGroup = function (e, t) {
      this.setActiveSelectedIndex(t), e.preventDefault(), e.stopPropagation();
    }, e.prototype.handleKeydownOnInfoGroup = function (e, t, i) {
      switch (e.keyCode) {
        case 40:
        case 39:
        case 38:
        case 37:
          t.focus(), this.setActiveSelectedIndex(0 === i ? 1 : 0), e.preventDefault(), e.stopPropagation();
          break;

        case 32:
          this.setActiveSelectedIndex(i), e.preventDefault(), e.stopPropagation();
          break;

        default:
          return;
      }
    }, e.prototype.setActiveSelectedIndex = function (e) {
      if ("range" === this.picker.selectMode && this.activeSelectedIndex !== e) {
        this.activeSelectedIndex = e;
        var t = this.picker.selecteds[this.activeSelectedIndex];
        this.picker.selecteds && t && (this.pickerMoment = this.dateTimeAdapter.clone(t));
      }
    }, e.prototype.initPicker = function () {
      this.pickerMoment = this.picker.startAt || this.dateTimeAdapter.now(), this.activeSelectedIndex = "rangeTo" === this.picker.selectMode ? 1 : 0;
    }, e.prototype.dateSelectedInSingleMode = function (e) {
      return this.dateTimeAdapter.isSameDay(e, this.picker.selected) ? null : this.updateAndCheckCalendarDate(e);
    }, e.prototype.dateSelectedInRangeMode = function (e) {
      var t = this.picker.selecteds[0],
          i = this.picker.selecteds[1],
          n = this.updateAndCheckCalendarDate(e);
      return n ? ("range" === this.picker.selectMode ? this.picker.selecteds && this.picker.selecteds.length && !i && t && this.dateTimeAdapter.differenceInCalendarDays(n, t) >= 0 ? (i = n, this.activeSelectedIndex = 1) : (t = n, i = null, this.activeSelectedIndex = 0) : "rangeFrom" === this.picker.selectMode ? (t = n, i && this.dateTimeAdapter.compare(t, i) > 0 && (i = null)) : "rangeTo" === this.picker.selectMode && (i = n, t && this.dateTimeAdapter.compare(t, i) > 0 && (t = null)), [t, i]) : null;
    }, e.prototype.updateAndCheckCalendarDate = function (e) {
      var t;
      return "both" === this.picker.pickerType ? (t = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(e), this.dateTimeAdapter.getMonth(e), this.dateTimeAdapter.getDate(e), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment)), t = this.dateTimeAdapter.clampDate(t, this.picker.minDateTime, this.picker.maxDateTime)) : t = this.dateTimeAdapter.clone(e), this.picker.dateTimeChecker(t) ? t : null;
    }, e.prototype.focusPicker = function () {
      "inline" !== this.picker.pickerMode && (this.calendar ? this.calendar.focusActiveCell() : this.timer && this.timer.focus());
    }, Ci([t.ViewChild(vi), Di("design:type", vi)], e.prototype, "calendar", void 0), Ci([t.ViewChild(ki), Di("design:type", ki)], e.prototype, "timer", void 0), Ci([t.HostBinding("class.owl-dt-container"), Di("design:type", Boolean), Di("design:paramtypes", [])], e.prototype, "owlDTContainerClass", null), Ci([t.HostBinding("class.owl-dt-popup-container"), Di("design:type", Boolean), Di("design:paramtypes", [])], e.prototype, "owlDTPopupContainerClass", null), Ci([t.HostBinding("class.owl-dt-dialog-container"), Di("design:type", Boolean), Di("design:paramtypes", [])], e.prototype, "owlDTDialogContainerClass", null), Ci([t.HostBinding("class.owl-dt-inline-container"), Di("design:type", Boolean), Di("design:paramtypes", [])], e.prototype, "owlDTInlineContainerClass", null), Ci([t.HostBinding("class.owl-dt-container-disabled"), Di("design:type", Boolean), Di("design:paramtypes", [])], e.prototype, "owlDTContainerDisabledClass", null), Ci([t.HostBinding("attr.id"), Di("design:type", String), Di("design:paramtypes", [])], e.prototype, "owlDTContainerId", null), Ci([t.HostBinding("@transformPicker"), Di("design:type", Object), Di("design:paramtypes", [])], e.prototype, "owlDTContainerAnimation", null), Ci([t.HostListener("@transformPicker.done", ["$event"]), Di("design:type", Function), Di("design:paramtypes", [Object]), Di("design:returntype", void 0)], e.prototype, "handleContainerAnimationDone", null), e = Ci([t.Component({
      exportAs: "owlDateTimeContainer",
      selector: "owl-date-time-container",
      template: '<div [cdkTrapFocus]="picker.pickerMode !== \'inline\'" [@fadeInPicker]="picker.pickerMode === \'inline\'? \'\' : \'enter\'" class="owl-dt-container-inner"><owl-date-time-calendar *ngIf="pickerType === \'both\' || pickerType === \'calendar\'" class="owl-dt-container-row" [firstDayOfWeek]="picker.firstDayOfWeek" [(pickerMoment)]="pickerMoment" [selected]="picker.selected" [selecteds]="picker.selecteds" [selectMode]="picker.selectMode" [minDate]="picker.minDateTime" [maxDate]="picker.maxDateTime" [dateFilter]="picker.dateTimeFilter" [startView]="picker.startView" [hideOtherMonths]="picker.hideOtherMonths" (yearSelected)="picker.selectYear($event)" (monthSelected)="picker.selectMonth($event)" (selectedChange)="dateSelected($event)"></owl-date-time-calendar><owl-date-time-timer *ngIf="pickerType === \'both\' || pickerType === \'timer\'" class="owl-dt-container-row" [pickerMoment]="pickerMoment" [minDateTime]="picker.minDateTime" [maxDateTime]="picker.maxDateTime" [showSecondsTimer]="picker.showSecondsTimer" [hour12Timer]="picker.hour12Timer" [stepHour]="picker.stepHour" [stepMinute]="picker.stepMinute" [stepSecond]="picker.stepSecond" (selectedChange)="timeSelected($event)"></owl-date-time-timer><div *ngIf="picker.isInRangeMode" role="radiogroup" class="owl-dt-container-info owl-dt-container-row"><div role="radio" [tabindex]="activeSelectedIndex === 0 ? 0 : -1" [attr.aria-checked]="activeSelectedIndex === 0" class="owl-dt-control owl-dt-container-range owl-dt-container-from" [ngClass]="{\'owl-dt-container-info-active\': activeSelectedIndex === 0}" (click)="handleClickOnInfoGroup($event, 0)" (keydown)="handleKeydownOnInfoGroup($event, to, 0)" #from><span class="owl-dt-control-content owl-dt-container-range-content" tabindex="-1"><span class="owl-dt-container-info-label">{{fromLabel}}:</span> <span class="owl-dt-container-info-value">{{fromFormattedValue}}</span></span></div><div role="radio" [tabindex]="activeSelectedIndex === 1 ? 0 : -1" [attr.aria-checked]="activeSelectedIndex === 1" class="owl-dt-control owl-dt-container-range owl-dt-container-to" [ngClass]="{\'owl-dt-container-info-active\': activeSelectedIndex === 1}" (click)="handleClickOnInfoGroup($event, 1)" (keydown)="handleKeydownOnInfoGroup($event, from, 1)" #to><span class="owl-dt-control-content owl-dt-container-range-content" tabindex="-1"><span class="owl-dt-container-info-label">{{toLabel}}:</span> <span class="owl-dt-container-info-value">{{toFormattedValue}}</span></span></div></div><div *ngIf="showControlButtons" class="owl-dt-container-buttons owl-dt-container-row"><button class="owl-dt-control owl-dt-control-button owl-dt-container-control-button" type="button" tabindex="0" (click)="onCancelClicked($event)"><span class="owl-dt-control-content owl-dt-control-button-content" tabindex="-1">{{cancelLabel}}</span></button> <button class="owl-dt-control owl-dt-control-button owl-dt-container-control-button" type="button" tabindex="0" (click)="onSetClicked($event)"><span class="owl-dt-control-content owl-dt-control-button-content" tabindex="-1">{{setLabel}}</span></button></div></div>',
      styles: [""],
      changeDetection: t.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: !1,
      animations: [Ti.transformPicker, Ti.fadeInPicker]
    }), Mi(3, t.Optional()), Di("design:paramtypes", [t.ChangeDetectorRef, t.ElementRef, ui, fi])], e);
  }(),
      Si = function Si(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Ai = function Ai(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Ei = function Ei(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Pi = 0,
      xi = function () {
    function e(e, t) {
      var i = this;
      if (this.dateTimeAdapter = e, this.dateTimeFormats = t, this._showSecondsTimer = !1, this._hour12Timer = !1, this.startView = "month", this._stepHour = 1, this._stepMinute = 1, this._stepSecond = 1, this._firstDayOfWeek = 0, this._hideOtherMonths = !1, this.dateTimeChecker = function (e) {
        return !!e && (!i.dateTimeFilter || i.dateTimeFilter(e)) && (!i.minDateTime || i.dateTimeAdapter.compare(e, i.minDateTime) >= 0) && (!i.maxDateTime || i.dateTimeAdapter.compare(e, i.maxDateTime) <= 0);
      }, !this.dateTimeAdapter) throw Error("OwlDateTimePicker: No provider found for DateTimeAdapter. You must import one of the following modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a custom implementation.");
      if (!this.dateTimeFormats) throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a custom implementation.");
      this._id = "owl-dt-picker-" + Pi++;
    }

    return Object.defineProperty(e.prototype, "showSecondsTimer", {
      get: function get() {
        return this._showSecondsTimer;
      },
      set: function set(e) {
        this._showSecondsTimer = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hour12Timer", {
      get: function get() {
        return this._hour12Timer;
      },
      set: function set(e) {
        this._hour12Timer = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "stepHour", {
      get: function get() {
        return this._stepHour;
      },
      set: function set(e) {
        this._stepHour = Ye(e, 1);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "stepMinute", {
      get: function get() {
        return this._stepMinute;
      },
      set: function set(e) {
        this._stepMinute = Ye(e, 1);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "stepSecond", {
      get: function get() {
        return this._stepSecond;
      },
      set: function set(e) {
        this._stepSecond = Ye(e, 1);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "firstDayOfWeek", {
      get: function get() {
        return this._firstDayOfWeek;
      },
      set: function set(e) {
        e = Ye(e, 0), this._firstDayOfWeek = e > 6 || e < 0 ? 0 : e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "hideOtherMonths", {
      get: function get() {
        return this._hideOtherMonths;
      },
      set: function set(e) {
        this._hideOtherMonths = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "id", {
      get: function get() {
        return this._id;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "formatString", {
      get: function get() {
        return "both" === this.pickerType ? this.dateTimeFormats.fullPickerInput : "calendar" === this.pickerType ? this.dateTimeFormats.datePickerInput : this.dateTimeFormats.timePickerInput;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "disabled", {
      get: function get() {
        return !1;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, Si([t.Input(), Ai("design:type", Boolean), Ai("design:paramtypes", [Boolean])], e.prototype, "showSecondsTimer", null), Si([t.Input(), Ai("design:type", Boolean), Ai("design:paramtypes", [Boolean])], e.prototype, "hour12Timer", null), Si([t.Input(), Ai("design:type", String)], e.prototype, "startView", void 0), Si([t.Input(), Ai("design:type", Number), Ai("design:paramtypes", [Number])], e.prototype, "stepHour", null), Si([t.Input(), Ai("design:type", Number), Ai("design:paramtypes", [Number])], e.prototype, "stepMinute", null), Si([t.Input(), Ai("design:type", Number), Ai("design:paramtypes", [Number])], e.prototype, "stepSecond", null), Si([t.Input(), Ai("design:type", Object), Ai("design:paramtypes", [Number])], e.prototype, "firstDayOfWeek", null), Si([t.Input(), Ai("design:type", Boolean), Ai("design:paramtypes", [Boolean])], e.prototype, "hideOtherMonths", null), e = Si([Ei(0, t.Optional()), Ei(1, t.Optional()), Ei(1, t.Inject(mi)), Ai("design:paramtypes", [fi, Object])], e);
  }(),
      ji = 0,
      Ri = function () {
    return function () {
      this.ariaDescribedBy = null, this.autoFocus = !0, this.hasBackdrop = !0, this.data = null, this.disableClose = !1, this.role = "dialog", this.paneClass = "", this.event = null, this.backdropClass = "", this.closeOnNavigation = !0, this.width = "", this.height = "", this.maxWidth = "85vw", this.scrollStrategy = new xt(), this.id = "owl-dialog-" + ji++;
    };
  }(),
      Vi = function () {
    function e(e, t, i, n) {
      var r = this;
      this.overlayRef = e, this.container = t, this.id = i, this._beforeClose$ = new E(), this._afterOpen$ = new E(), this._afterClosed$ = new E(), this.locationChanged = v.EMPTY, this.disableClose = this.container.config.disableClose, this.container.animationStateChanged.pipe(Te(function (e) {
        return "done" === e.phaseName && "enter" === e.toState;
      }), Se(1)).subscribe(function () {
        r._afterOpen$.next(), r._afterOpen$.complete();
      }), this.container.animationStateChanged.pipe(Te(function (e) {
        return "done" === e.phaseName && "exit" === e.toState;
      }), Se(1)).subscribe(function () {
        r.overlayRef.dispose(), r.locationChanged.unsubscribe(), r._afterClosed$.next(r.result), r._afterClosed$.complete(), r.componentInstance = null;
      }), this.overlayRef.keydownEvents().pipe(Te(function (e) {
        return e.keyCode === fe && !r.disableClose;
      })).subscribe(function () {
        return r.close();
      }), n && (this.locationChanged = n.subscribe(function () {
        r.container.config.closeOnNavigation && r.close();
      }));
    }

    return e.prototype.close = function (e) {
      var t = this;
      this.result = e, this.container.animationStateChanged.pipe(Te(function (e) {
        return "start" === e.phaseName;
      }), Se(1)).subscribe(function () {
        t._beforeClose$.next(e), t._beforeClose$.complete(), t.overlayRef.detachBackdrop();
      }), this.container.startExitAnimation();
    }, e.prototype.backdropClick = function () {
      return this.overlayRef.backdropClick();
    }, e.prototype.keydownEvents = function () {
      return this.overlayRef.keydownEvents();
    }, e.prototype.updatePosition = function (e) {
      var t = this.getPositionStrategy();
      return e && (e.left || e.right) ? e.left ? t.left(e.left) : t.right(e.right) : t.centerHorizontally(), e && (e.top || e.bottom) ? e.top ? t.top(e.top) : t.bottom(e.bottom) : t.centerVertically(), this.overlayRef.updatePosition(), this;
    }, e.prototype.updateSize = function (e, t) {
      return void 0 === e && (e = "auto"), void 0 === t && (t = "auto"), this.getPositionStrategy().width(e).height(t), this.overlayRef.updatePosition(), this;
    }, e.prototype.isAnimating = function () {
      return this.container.isAnimating;
    }, e.prototype.afterOpen = function () {
      return this._afterOpen$.asObservable();
    }, e.prototype.beforeClose = function () {
      return this._beforeClose$.asObservable();
    }, e.prototype.afterClosed = function () {
      return this._afterClosed$.asObservable();
    }, e.prototype.getPositionStrategy = function () {
      return this.overlayRef.getConfig().positionStrategy;
    }, e;
  }(),
      Fi = (di = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  }, function (e, t) {
    function i() {
      this.constructor = e;
    }

    di(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }),
      Li = function Li(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Bi = function Bi(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Ni = function Ni(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Yi = {
    opacity: 0,
    transform: "translateX({{ x }}) translateY({{ y }}) scale({{scale}})"
  },
      Hi = {
    opacity: 0,
    transform: "translateX({{ x }}) translateY({{ y }}) scale({{scale}})",
    transformOrigin: "{{ ox }} {{ oy }}"
  },
      zi = function (e) {
    function r(i, n, r, o) {
      var s = e.call(this) || this;
      return s.changeDetector = i, s.elementRef = n, s.focusTrapFactory = r, s.document = o, s.ariaLabelledBy = null, s.animationStateChanged = new t.EventEmitter(), s.isAnimating = !1, s.state = "enter", s.params = {
        x: "0px",
        y: "0px",
        ox: "50%",
        oy: "50%",
        scale: 0
      }, s.elementFocusedBeforeDialogWasOpened = null, s;
    }

    return Fi(r, e), Object.defineProperty(r.prototype, "config", {
      get: function get() {
        return this._config;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerTabIndex", {
      get: function get() {
        return -1;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerId", {
      get: function get() {
        return this._config.id;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerRole", {
      get: function get() {
        return this._config.role || null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerAriaLabelledby", {
      get: function get() {
        return this.ariaLabelledBy;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerAriaDescribedby", {
      get: function get() {
        return this._config.ariaDescribedBy || null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(r.prototype, "owlDialogContainerAnimation", {
      get: function get() {
        return {
          value: this.state,
          params: this.params
        };
      },
      enumerable: !0,
      configurable: !0
    }), r.prototype.ngOnInit = function () {}, r.prototype.attachComponentPortal = function (e) {
      if (this.portalOutlet.hasAttached()) throw Error("Attempting to attach dialog content after content is already attached");
      return this.savePreviouslyFocusedElement(), this.portalOutlet.attachComponentPortal(e);
    }, r.prototype.attachTemplatePortal = function (e) {
      throw new Error("Method not implemented.");
    }, r.prototype.setConfig = function (e) {
      this._config = e, e.event && this.calculateZoomOrigin(event);
    }, r.prototype.onAnimationStart = function (e) {
      this.isAnimating = !0, this.animationStateChanged.emit(e);
    }, r.prototype.onAnimationDone = function (e) {
      "enter" === e.toState ? this.trapFocus() : "exit" === e.toState && this.restoreFocus(), this.animationStateChanged.emit(e), this.isAnimating = !1;
    }, r.prototype.startExitAnimation = function () {
      this.state = "exit", this.changeDetector.markForCheck();
    }, r.prototype.calculateZoomOrigin = function (e) {
      if (e) {
        var t = e.clientX,
            i = e.clientY,
            n = t - window.innerWidth / 2,
            r = i - window.innerHeight / 2,
            o = t / window.innerWidth,
            s = i / window.innerHeight;
        this.params.x = n + "px", this.params.y = r + "px", this.params.ox = 100 * o + "%", this.params.oy = 100 * s + "%", this.params.scale = 0;
      }
    }, r.prototype.savePreviouslyFocusedElement = function () {
      var e = this;
      this.document && (this.elementFocusedBeforeDialogWasOpened = this.document.activeElement, Promise.resolve().then(function () {
        return e.elementRef.nativeElement.focus();
      }));
    }, r.prototype.trapFocus = function () {
      this.focusTrap || (this.focusTrap = this.focusTrapFactory.create(this.elementRef.nativeElement)), this._config.autoFocus && this.focusTrap.focusInitialElementWhenReady();
    }, r.prototype.restoreFocus = function () {
      var e = this.elementFocusedBeforeDialogWasOpened;
      e && "function" == typeof e.focus && e.focus(), this.focusTrap && this.focusTrap.destroy();
    }, Li([t.ViewChild(At), Bi("design:type", At)], r.prototype, "portalOutlet", void 0), Li([t.HostBinding("class.owl-dialog-container"), Bi("design:type", Boolean), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerClass", null), Li([t.HostBinding("attr.tabindex"), Bi("design:type", Number), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerTabIndex", null), Li([t.HostBinding("attr.id"), Bi("design:type", String), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerId", null), Li([t.HostBinding("attr.role"), Bi("design:type", String), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerRole", null), Li([t.HostBinding("attr.aria-labelledby"), Bi("design:type", String), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerAriaLabelledby", null), Li([t.HostBinding("attr.aria-describedby"), Bi("design:type", String), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerAriaDescribedby", null), Li([t.HostBinding("@slideModal"), Bi("design:type", Object), Bi("design:paramtypes", [])], r.prototype, "owlDialogContainerAnimation", null), Li([t.HostListener("@slideModal.start", ["$event"]), Bi("design:type", Function), Bi("design:paramtypes", [Object]), Bi("design:returntype", void 0)], r.prototype, "onAnimationStart", null), Li([t.HostListener("@slideModal.done", ["$event"]), Bi("design:type", Function), Bi("design:paramtypes", [Object]), Bi("design:returntype", void 0)], r.prototype, "onAnimationDone", null), r = Li([t.Component({
      selector: "owl-dialog-container",
      template: "<ng-template cdkPortalOutlet></ng-template>",
      animations: [n.trigger("slideModal", [n.transition("void => enter", [n.style(Hi), n.animate("300ms cubic-bezier(0.35, 0, 0.25, 1)", n.style("*")), n.animate("150ms", n.keyframes([n.style({
        transform: "scale(1)",
        offset: 0
      }), n.style({
        transform: "scale(1.05)",
        offset: .3
      }), n.style({
        transform: "scale(.95)",
        offset: .8
      }), n.style({
        transform: "scale(1)",
        offset: 1
      })])), n.animateChild()], {
        params: {
          x: "0px",
          y: "0px",
          ox: "50%",
          oy: "50%",
          scale: 1
        }
      }), n.transition("enter => exit", [n.animateChild(), n.animate(200, n.style(Yi))], {
        params: {
          x: "0px",
          y: "0px",
          ox: "50%",
          oy: "50%"
        }
      })])]
    }), Ni(3, t.Optional()), Ni(3, t.Inject(i.DOCUMENT)), Bi("design:paramtypes", [t.ChangeDetectorRef, t.ElementRef, at, Object])], r);
  }(Mt);

  var Wi = function Wi(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Xi = function Xi(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Zi = function Zi(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      $i = new t.InjectionToken("OwlDialogData"),
      Ki = new t.InjectionToken("owl-dialog-scroll-strategy");

  var Ui = {
    provide: Ki,
    deps: [ii],
    useFactory: function useFactory(e) {
      return function () {
        return e.scrollStrategies.block();
      };
    }
  },
      Gi = new t.InjectionToken("owl-dialog-default-options"),
      qi = function () {
    function e(e, t, i, n, r, o, s) {
      var a,
          c = this;
      this.overlay = e, this.injector = t, this.location = i, this.scrollStrategy = n, this.defaultOptions = r, this.parentDialog = o, this.overlayContainer = s, this.ariaHiddenElements = new Map(), this._openDialogsAtThisLevel = [], this._afterOpenAtThisLevel = new E(), this._afterAllClosedAtThisLevel = new E(), this.afterAllClosed = (a = function a() {
        return c._openDialogsAtThisLevel.length ? c._afterAllClosed : c._afterAllClosed.pipe(function () {
          for (var e = [], t = 0; t < arguments.length; t++) {
            e[t] = arguments[t];
          }

          return function (t) {
            var i = e[e.length - 1];
            L(i) ? e.pop() : i = null;
            var n = e.length;
            return le(1 !== n || i ? n > 0 ? N(e, i) : F(i) : Y(e[0]), t);
          };
        }(void 0));
      }, new D(function (e) {
        var t;

        try {
          t = a();
        } catch (t) {
          return void e.error(t);
        }

        return (t ? oe(t) : F()).subscribe(e);
      })), !o && i && i.subscribe(function () {
        return c.closeAll();
      });
    }

    return Object.defineProperty(e.prototype, "openDialogs", {
      get: function get() {
        return this.parentDialog ? this.parentDialog.openDialogs : this._openDialogsAtThisLevel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "afterOpen", {
      get: function get() {
        return this.parentDialog ? this.parentDialog.afterOpen : this._afterOpenAtThisLevel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "_afterAllClosed", {
      get: function get() {
        var e = this.parentDialog;
        return e ? e._afterAllClosed : this._afterAllClosedAtThisLevel;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.open = function (e, t) {
      var i,
          n,
          r = this;
      if (i = t, n = this.defaultOptions, (t = function (e) {
        for (var t = [], i = 1; i < arguments.length; i++) {
          t[i - 1] = arguments[i];
        }

        if (null == e) throw TypeError("Cannot convert undefined or null to object");

        for (var n = 0, r = t; n < r.length; n++) {
          var o = r[n];
          if (null != o) for (var s in o) {
            o.hasOwnProperty(s) && (e[s] = o[s]);
          }
        }

        return e;
      }(new Ri(), i, n)).id && this.getDialogById(t.id)) throw Error('Dialog with id "' + t.id + '" exists already. The dialog id must be unique.');
      var o = this.createOverlay(t),
          s = this.attachDialogContainer(o, t),
          a = this.attachDialogContent(e, s, o, t);
      return this.openDialogs.length || this.hideNonDialogContentFromAssistiveTechnology(), this.openDialogs.push(a), a.afterClosed().subscribe(function () {
        return r.removeOpenDialog(a);
      }), this.afterOpen.next(a), a;
    }, e.prototype.closeAll = function () {
      for (var e = this.openDialogs.length; e--;) {
        this.openDialogs[e].close();
      }
    }, e.prototype.getDialogById = function (e) {
      return this.openDialogs.find(function (t) {
        return t.id === e;
      });
    }, e.prototype.attachDialogContent = function (e, i, n, r) {
      var o = new Vi(n, i, r.id, this.location);
      if (r.hasBackdrop && n.backdropClick().subscribe(function () {
        o.disableClose || o.close();
      }), e instanceof t.TemplateRef) ;else {
        var s = this.createInjector(r, o, i),
            a = i.attachComponentPortal(new Ct(e, void 0, s));
        o.componentInstance = a.instance;
      }
      return o.updateSize(r.width, r.height).updatePosition(r.position), o;
    }, e.prototype.createInjector = function (e, t, i) {
      var n = e && e.viewContainerRef && e.viewContainerRef.injector,
          r = new WeakMap();
      return r.set(Vi, t), r.set(zi, i), r.set($i, e.data), new Pt(n || this.injector, r);
    }, e.prototype.createOverlay = function (e) {
      var t = this.getOverlayConfig(e);
      return this.overlay.create(t);
    }, e.prototype.attachDialogContainer = function (e, t) {
      var i = new Ct(zi, t.viewContainerRef),
          n = e.attach(i);
      return n.instance.setConfig(t), n.instance;
    }, e.prototype.getOverlayConfig = function (e) {
      var t = new jt({
        positionStrategy: this.overlay.position().global(),
        scrollStrategy: e.scrollStrategy || this.scrollStrategy(),
        panelClass: e.paneClass,
        hasBackdrop: e.hasBackdrop,
        minWidth: e.minWidth,
        minHeight: e.minHeight,
        maxWidth: e.maxWidth,
        maxHeight: e.maxHeight
      });
      return e.backdropClass && (t.backdropClass = e.backdropClass), t;
    }, e.prototype.removeOpenDialog = function (e) {
      var t = this._openDialogsAtThisLevel.indexOf(e);

      t > -1 && (this.openDialogs.splice(t, 1), this.openDialogs.length || (this.ariaHiddenElements.forEach(function (e, t) {
        e ? t.setAttribute("aria-hidden", e) : t.removeAttribute("aria-hidden");
      }), this.ariaHiddenElements.clear(), this._afterAllClosed.next()));
    }, e.prototype.hideNonDialogContentFromAssistiveTechnology = function () {
      var e = this.overlayContainer.getContainerElement();
      if (e.parentElement) for (var t = e.parentElement.children, i = t.length - 1; i > -1; i--) {
        var n = t[i];
        n === e || "SCRIPT" === n.nodeName || "STYLE" === n.nodeName || n.hasAttribute("aria-live") || (this.ariaHiddenElements.set(n, n.getAttribute("aria-hidden")), n.setAttribute("aria-hidden", "true"));
      }
    }, e = Wi([t.Injectable(), Zi(2, t.Optional()), Zi(3, t.Inject(Ki)), Zi(4, t.Optional()), Zi(4, t.Inject(Gi)), Zi(5, t.Optional()), Zi(5, t.SkipSelf()), Xi("design:paramtypes", [ii, t.Injector, i.Location, Function, Ri, e, Kt])], e);
  }();

  var Ji,
      Qi = function Qi(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      en = function () {
    function e() {}

    return e = Qi([t.NgModule({
      imports: [i.CommonModule, ft, ci, Et],
      exports: [],
      declarations: [zi],
      providers: [Ui, qi],
      entryComponents: [zi]
    })], e);
  }(),
      tn = (Ji = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  }, function (e, t) {
    function i() {
      this.constructor = e;
    }

    Ji(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }),
      nn = function nn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      rn = function rn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      on = function on(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      sn = new t.InjectionToken("owl-dtpicker-scroll-strategy");

  var an,
      cn,
      ln = {
    provide: sn,
    deps: [ii],
    useFactory: function useFactory(e) {
      return function () {
        return e.scrollStrategies.block();
      };
    }
  },
      un = function (e) {
    function n(i, n, r, o, s, a, c, l, u) {
      var p = e.call(this, a, l) || this;
      return p.overlay = i, p.viewContainerRef = n, p.dialogService = r, p.ngZone = o, p.changeDetector = s, p.dateTimeAdapter = a, p.defaultScrollStrategy = c, p.dateTimeFormats = l, p.document = u, p.backdropClass = [], p.panelClass = [], p._pickerType = "both", p._pickerMode = "popup", p._opened = !1, p.afterPickerClosed = new t.EventEmitter(), p.afterPickerOpen = new t.EventEmitter(), p.yearSelected = new t.EventEmitter(), p.monthSelected = new t.EventEmitter(), p.confirmSelectedChange = new t.EventEmitter(), p.disabledChange = new t.EventEmitter(), p.dtInputSub = v.EMPTY, p.hidePickerStreamSub = v.EMPTY, p.confirmSelectedStreamSub = v.EMPTY, p.pickerOpenedStreamSub = v.EMPTY, p.focusedElementBeforeOpen = null, p._selecteds = [], p;
    }

    return tn(n, e), Object.defineProperty(n.prototype, "startAt", {
      get: function get() {
        return this._startAt ? this._startAt : this._dtInput ? "single" === this._dtInput.selectMode ? this._dtInput.value || null : "range" === this._dtInput.selectMode || "rangeFrom" === this._dtInput.selectMode ? this._dtInput.values[0] || null : "rangeTo" === this._dtInput.selectMode ? this._dtInput.values[1] || null : void 0 : null;
      },
      set: function set(e) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(e));
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "pickerType", {
      get: function get() {
        return this._pickerType;
      },
      set: function set(e) {
        e !== this._pickerType && (this._pickerType = e, this._dtInput && this._dtInput.formatNativeInputValue());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "pickerMode", {
      get: function get() {
        return this._pickerMode;
      },
      set: function set(e) {
        this._pickerMode = "popup" === e ? e : "dialog";
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "disabled", {
      get: function get() {
        return void 0 === this._disabled && this._dtInput ? this._dtInput.disabled : !!this._disabled;
      },
      set: function set(e) {
        (e = Ne(e)) !== this._disabled && (this._disabled = e, this.disabledChange.next(e));
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "opened", {
      get: function get() {
        return this._opened;
      },
      set: function set(e) {
        e ? this.open() : this.close();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dtInput", {
      get: function get() {
        return this._dtInput;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        this._selected = e, this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        this._selecteds = e, this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "minDateTime", {
      get: function get() {
        return this._dtInput && this._dtInput.min;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "maxDateTime", {
      get: function get() {
        return this._dtInput && this._dtInput.max;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "dateTimeFilter", {
      get: function get() {
        return this._dtInput && this._dtInput.dateTimeFilter;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "selectMode", {
      get: function get() {
        return this._dtInput.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "isInSingleMode", {
      get: function get() {
        return this._dtInput.isInSingleMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(n.prototype, "isInRangeMode", {
      get: function get() {
        return this._dtInput.isInRangeMode;
      },
      enumerable: !0,
      configurable: !0
    }), n.prototype.ngOnInit = function () {}, n.prototype.ngOnDestroy = function () {
      this.close(), this.dtInputSub.unsubscribe(), this.disabledChange.complete(), this.popupRef && this.popupRef.dispose();
    }, n.prototype.registerInput = function (e) {
      var t = this;
      if (this._dtInput) throw Error("A Owl DateTimePicker can only be associated with a single input.");
      this._dtInput = e, this.dtInputSub = this._dtInput.valueChange.subscribe(function (e) {
        Array.isArray(e) ? t.selecteds = e : t.selected = e;
      });
    }, n.prototype.open = function () {
      var e = this;

      if (!this._opened && !this.disabled) {
        if (!this._dtInput) throw Error("Attempted to open an DateTimePicker with no associated input.");
        this.document && (this.focusedElementBeforeOpen = this.document.activeElement), this.isInSingleMode ? this.selected = this._dtInput.value : this.isInRangeMode && (this.selecteds = this._dtInput.values), this.selected && "calendar" !== this.pickerType && this._startAt && (this.selected = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.selected), this.dateTimeAdapter.getMonth(this.selected), this.dateTimeAdapter.getDate(this.selected), this.dateTimeAdapter.getHours(this._startAt), this.dateTimeAdapter.getMinutes(this._startAt), this.dateTimeAdapter.getSeconds(this._startAt))), "dialog" === this.pickerMode ? this.openAsDialog() : this.openAsPopup(), this.pickerContainer.picker = this, this.hidePickerStreamSub = this.pickerContainer.hidePickerStream.subscribe(function () {
          e.close();
        }), this.confirmSelectedStreamSub = this.pickerContainer.confirmSelectedStream.subscribe(function (t) {
          e.confirmSelect(t);
        });
      }
    }, n.prototype.select = function (e) {
      Array.isArray(e) ? this.selecteds = e.slice() : this.selected = e, "dialog" !== this.pickerMode && "calendar" === this.pickerType && ("single" === this.selectMode && this.selected || "rangeFrom" === this.selectMode && this.selecteds[0] || "rangeTo" === this.selectMode && this.selecteds[1] || "range" === this.selectMode && this.selecteds[0] && this.selecteds[1]) && this.confirmSelect();
    }, n.prototype.selectYear = function (e) {
      this.yearSelected.emit(e);
    }, n.prototype.selectMonth = function (e) {
      this.monthSelected.emit(e);
    }, n.prototype.close = function () {
      var e = this;

      if (this._opened) {
        this.popupRef && this.popupRef.hasAttached() && this.popupRef.detach(), this.pickerContainerPortal && this.pickerContainerPortal.isAttached && this.pickerContainerPortal.detach(), this.hidePickerStreamSub && (this.hidePickerStreamSub.unsubscribe(), this.hidePickerStreamSub = null), this.confirmSelectedStreamSub && (this.confirmSelectedStreamSub.unsubscribe(), this.confirmSelectedStreamSub = null), this.pickerOpenedStreamSub && (this.pickerOpenedStreamSub.unsubscribe(), this.pickerOpenedStreamSub = null), this.dialogRef && (this.dialogRef.close(), this.dialogRef = null);

        var t = function t() {
          e._opened && (e._opened = !1, e.afterPickerClosed.emit(null), e.focusedElementBeforeOpen = null);
        };

        this.focusedElementBeforeOpen && "function" == typeof this.focusedElementBeforeOpen.focus ? (this.focusedElementBeforeOpen.focus(), setTimeout(t)) : t();
      }
    }, n.prototype.confirmSelect = function (e) {
      if (this.isInSingleMode) {
        var t = this.selected || this.startAt || this.dateTimeAdapter.now();
        this.confirmSelectedChange.emit(t);
      } else this.isInRangeMode && this.confirmSelectedChange.emit(this.selecteds);

      this.close();
    }, n.prototype.openAsDialog = function () {
      var e = this;
      this.dialogRef = this.dialogService.open(Ii, {
        autoFocus: !1,
        backdropClass: ["cdk-overlay-dark-backdrop"].concat(He(this.backdropClass)),
        paneClass: ["owl-dt-dialog"].concat(He(this.panelClass)),
        viewContainerRef: this.viewContainerRef,
        scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy()
      }), this.pickerContainer = this.dialogRef.componentInstance, this.dialogRef.afterOpen().subscribe(function () {
        e.afterPickerOpen.emit(null), e._opened = !0;
      }), this.dialogRef.afterClosed().subscribe(function () {
        return e.close();
      });
    }, n.prototype.openAsPopup = function () {
      var e = this;

      if (this.pickerContainerPortal || (this.pickerContainerPortal = new Ct(Ii, this.viewContainerRef)), this.popupRef || this.createPopup(), !this.popupRef.hasAttached()) {
        var t = this.popupRef.attach(this.pickerContainerPortal);
        this.pickerContainer = t.instance, this.ngZone.onStable.asObservable().pipe(Se(1)).subscribe(function () {
          e.popupRef.updatePosition();
        }), this.pickerOpenedStreamSub = this.pickerContainer.pickerOpenedStream.pipe(Se(1)).subscribe(function () {
          e.afterPickerOpen.emit(null), e._opened = !0;
        });
      }
    }, n.prototype.createPopup = function () {
      var e = this,
          t = new jt({
        positionStrategy: this.createPopupPositionStrategy(),
        hasBackdrop: !0,
        backdropClass: ["cdk-overlay-transparent-backdrop"].concat(He(this.backdropClass)),
        scrollStrategy: this.scrollStrategy || this.defaultScrollStrategy(),
        panelClass: ["owl-dt-popup"].concat(He(this.panelClass))
      });
      this.popupRef = this.overlay.create(t), de(this.popupRef.backdropClick(), this.popupRef.detachments(), this.popupRef.keydownEvents().pipe(Te(function (t) {
        return t.keyCode === fe || e._dtInput && t.altKey && 38 === t.keyCode;
      }))).subscribe(function () {
        return e.close();
      });
    }, n.prototype.createPopupPositionStrategy = function () {
      return this.overlay.position().flexibleConnectedTo(this._dtInput.elementRef).withTransformOriginOn(".owl-dt-container").withFlexibleDimensions(!1).withPush(!1).withPositions([{
        originX: "start",
        originY: "bottom",
        overlayX: "start",
        overlayY: "top"
      }, {
        originX: "start",
        originY: "top",
        overlayX: "start",
        overlayY: "bottom"
      }, {
        originX: "end",
        originY: "bottom",
        overlayX: "end",
        overlayY: "top"
      }, {
        originX: "end",
        originY: "top",
        overlayX: "end",
        overlayY: "bottom"
      }, {
        originX: "start",
        originY: "top",
        overlayX: "start",
        overlayY: "top",
        offsetY: -176
      }, {
        originX: "start",
        originY: "top",
        overlayX: "start",
        overlayY: "top",
        offsetY: -352
      }]);
    }, nn([t.Input(), rn("design:type", Object)], n.prototype, "backdropClass", void 0), nn([t.Input(), rn("design:type", Object)], n.prototype, "panelClass", void 0), nn([t.Input(), rn("design:type", Object), rn("design:paramtypes", [Object])], n.prototype, "startAt", null), nn([t.Input(), rn("design:type", String), rn("design:paramtypes", [String])], n.prototype, "pickerType", null), nn([t.Input(), rn("design:type", Object), rn("design:paramtypes", [String])], n.prototype, "pickerMode", null), nn([t.Input(), rn("design:type", Boolean), rn("design:paramtypes", [Boolean])], n.prototype, "disabled", null), nn([t.Input(), rn("design:type", Boolean), rn("design:paramtypes", [Boolean])], n.prototype, "opened", null), nn([t.Input(), rn("design:type", Object)], n.prototype, "scrollStrategy", void 0), nn([t.Output(), rn("design:type", Object)], n.prototype, "afterPickerClosed", void 0), nn([t.Output(), rn("design:type", Object)], n.prototype, "afterPickerOpen", void 0), nn([t.Output(), rn("design:type", Object)], n.prototype, "yearSelected", void 0), nn([t.Output(), rn("design:type", Object)], n.prototype, "monthSelected", void 0), n = nn([t.Component({
      selector: "owl-date-time",
      exportAs: "owlDateTime",
      template: "",
      styles: [""],
      changeDetection: t.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: !1
    }), on(5, t.Optional()), on(6, t.Inject(sn)), on(7, t.Optional()), on(7, t.Inject(mi)), on(8, t.Optional()), on(8, t.Inject(i.DOCUMENT)), rn("design:paramtypes", [ii, t.ViewContainerRef, qi, t.NgZone, t.ChangeDetectorRef, fi, Function, Object, Object])], n);
  }(xi),
      pn = function pn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      dn = function dn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      hn = function () {
    function e(e) {
      this.changeDetector = e, this.stateChanges = v.EMPTY;
    }

    return Object.defineProperty(e.prototype, "disabled", {
      get: function get() {
        return void 0 === this._disabled ? this.dtPicker.disabled : !!this._disabled;
      },
      set: function set(e) {
        this._disabled = e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTTriggerDisabledClass", {
      get: function get() {
        return this.disabled;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.ngOnChanges = function (e) {
      e.datepicker && this.watchStateChanges();
    }, e.prototype.ngAfterContentInit = function () {
      this.watchStateChanges();
    }, e.prototype.ngOnDestroy = function () {
      this.stateChanges.unsubscribe();
    }, e.prototype.handleClickOnHost = function (e) {
      this.dtPicker && (this.dtPicker.open(), e.stopPropagation());
    }, e.prototype.watchStateChanges = function () {
      var e = this;
      this.stateChanges.unsubscribe();
      var t = this.dtPicker && this.dtPicker.dtInput ? this.dtPicker.dtInput.disabledChange : H(),
          i = this.dtPicker ? this.dtPicker.disabledChange : H();
      this.stateChanges = de(i, t).subscribe(function () {
        e.changeDetector.markForCheck();
      });
    }, pn([t.Input("owlDateTimeTrigger"), dn("design:type", un)], e.prototype, "dtPicker", void 0), pn([t.Input(), dn("design:type", Boolean), dn("design:paramtypes", [Boolean])], e.prototype, "disabled", null), pn([t.HostBinding("class.owl-dt-trigger-disabled"), dn("design:type", Boolean), dn("design:paramtypes", [])], e.prototype, "owlDTTriggerDisabledClass", null), pn([t.HostListener("click", ["$event"]), dn("design:type", Function), dn("design:paramtypes", [Event]), dn("design:returntype", void 0)], e.prototype, "handleClickOnHost", null), e = pn([t.Directive({
      selector: "[owlDateTimeTrigger]"
    }), dn("design:paramtypes", [t.ChangeDetectorRef])], e);
  }(),
      fn = function fn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      mn = function mn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      yn = function yn(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      gn = {
    provide: r.NG_VALUE_ACCESSOR,
    useExisting: t.forwardRef(function () {
      return vn;
    }),
    multi: !0
  },
      bn = {
    provide: r.NG_VALIDATORS,
    useExisting: t.forwardRef(function () {
      return vn;
    }),
    multi: !0
  },
      vn = function () {
    function e(e, i, n, o) {
      var s = this;
      if (this.elmRef = e, this.renderer = i, this.dateTimeAdapter = n, this.dateTimeFormats = o, this._selectMode = "single", this.rangeSeparator = "~", this._values = [], this.dateTimeChange = new t.EventEmitter(), this.dateTimeInput = new t.EventEmitter(), this.dtPickerSub = v.EMPTY, this.localeSub = v.EMPTY, this.lastValueValid = !0, this.onModelChange = function () {}, this.onModelTouched = function () {}, this.validatorOnChange = function () {}, this.parseValidator = function () {
        return s.lastValueValid ? null : {
          owlDateTimeParse: {
            text: s.elmRef.nativeElement.value
          }
        };
      }, this.minValidator = function (e) {
        if (s.isInSingleMode) {
          var t = s.getValidDate(s.dateTimeAdapter.deserialize(e.value));
          return !s.min || !t || s.dateTimeAdapter.compare(s.min, t) <= 0 ? null : {
            owlDateTimeMin: {
              min: s.min,
              actual: t
            }
          };
        }

        if (s.isInRangeMode && e.value) {
          var i = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[0])),
              n = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[1]));
          return !s.min || !i || !n || s.dateTimeAdapter.compare(s.min, i) <= 0 ? null : {
            owlDateTimeMin: {
              min: s.min,
              actual: [i, n]
            }
          };
        }
      }, this.maxValidator = function (e) {
        if (s.isInSingleMode) {
          var t = s.getValidDate(s.dateTimeAdapter.deserialize(e.value));
          return !s.max || !t || s.dateTimeAdapter.compare(s.max, t) >= 0 ? null : {
            owlDateTimeMax: {
              max: s.max,
              actual: t
            }
          };
        }

        if (s.isInRangeMode && e.value) {
          var i = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[0])),
              n = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[1]));
          return !s.max || !i || !n || s.dateTimeAdapter.compare(s.max, n) >= 0 ? null : {
            owlDateTimeMax: {
              max: s.max,
              actual: [i, n]
            }
          };
        }
      }, this.filterValidator = function (e) {
        var t = s.getValidDate(s.dateTimeAdapter.deserialize(e.value));
        return s._dateTimeFilter && t && !s._dateTimeFilter(t) ? {
          owlDateTimeFilter: !0
        } : null;
      }, this.rangeValidator = function (e) {
        if (s.isInSingleMode || !e.value) return null;
        var t = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[0])),
            i = s.getValidDate(s.dateTimeAdapter.deserialize(e.value[1]));
        return !t || !i || s.dateTimeAdapter.compare(t, i) <= 0 ? null : {
          owlDateTimeRange: !0
        };
      }, this.validator = r.Validators.compose([this.parseValidator, this.minValidator, this.maxValidator, this.filterValidator, this.rangeValidator]), this.valueChange = new t.EventEmitter(), this.disabledChange = new t.EventEmitter(), !this.dateTimeAdapter) throw Error("OwlDateTimePicker: No provider found for DateTimePicker. You must import one of the following modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a custom implementation.");
      if (!this.dateTimeFormats) throw Error("OwlDateTimePicker: No provider found for OWL_DATE_TIME_FORMATS. You must import one of the following modules at your application root: OwlNativeDateTimeModule, OwlMomentDateTimeModule, or provide a custom implementation.");
      this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
        s.value = s.value;
      });
    }

    return Object.defineProperty(e.prototype, "owlDateTime", {
      set: function set(e) {
        this.registerDateTimePicker(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDateTimeFilter", {
      set: function set(e) {
        this._dateTimeFilter = e, this.validatorOnChange();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dateTimeFilter", {
      get: function get() {
        return this._dateTimeFilter;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "disabled", {
      get: function get() {
        return !!this._disabled;
      },
      set: function set(e) {
        var t = Ne(e),
            i = this.elmRef.nativeElement;
        this._disabled !== t && (this._disabled = t, this.disabledChange.emit(t)), t && i.blur && i.blur();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "min", {
      get: function get() {
        return this._min;
      },
      set: function set(e) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(e)), this.validatorOnChange();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "max", {
      get: function get() {
        return this._max;
      },
      set: function set(e) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(e)), this.validatorOnChange();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selectMode", {
      get: function get() {
        return this._selectMode;
      },
      set: function set(e) {
        if ("single" !== e && "range" !== e && "rangeFrom" !== e && "rangeTo" !== e) throw Error("OwlDateTime Error: invalid selectMode value!");
        this._selectMode = e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "value", {
      get: function get() {
        return this._value;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this.lastValueValid = !e || this.dateTimeAdapter.isValid(e), e = this.getValidDate(e);
        var t = this._value;
        this._value = e, this.formatNativeInputValue(), this.dateTimeAdapter.isEqual(t, e) || this.valueChange.emit(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "values", {
      get: function get() {
        return this._values;
      },
      set: function set(e) {
        var t = this;
        e && e.length > 0 ? (this._values = e.map(function (e) {
          return e = t.dateTimeAdapter.deserialize(e), t.getValidDate(e);
        }), this.lastValueValid = (!this._values[0] || this.dateTimeAdapter.isValid(this._values[0])) && (!this._values[1] || this.dateTimeAdapter.isValid(this._values[1]))) : (this._values = [], this.lastValueValid = !0), this.formatNativeInputValue(), this.valueChange.emit(this._values);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "elementRef", {
      get: function get() {
        return this.elmRef;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this._selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this._selectMode || "rangeFrom" === this._selectMode || "rangeTo" === this._selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDateTimeInputAriaHaspopup", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDateTimeInputAriaOwns", {
      get: function get() {
        return this.dtPicker.opened && this.dtPicker.id || null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minIso8601", {
      get: function get() {
        return this.min ? this.dateTimeAdapter.toIso8601(this.min) : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxIso8601", {
      get: function get() {
        return this.max ? this.dateTimeAdapter.toIso8601(this.max) : null;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDateTimeInputDisabled", {
      get: function get() {
        return this.disabled;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {
      if (!this.dtPicker) throw Error("OwlDateTimePicker: the picker input doesn't have any associated owl-date-time component");
    }, e.prototype.ngAfterContentInit = function () {
      var e = this;
      this.dtPickerSub = this.dtPicker.confirmSelectedChange.subscribe(function (t) {
        Array.isArray(t) ? e.values = t : e.value = t, e.onModelChange(t), e.onModelTouched(), e.dateTimeChange.emit({
          source: e,
          value: t,
          input: e.elmRef.nativeElement
        }), e.dateTimeInput.emit({
          source: e,
          value: t,
          input: e.elmRef.nativeElement
        });
      });
    }, e.prototype.ngOnDestroy = function () {
      this.dtPickerSub.unsubscribe(), this.localeSub.unsubscribe(), this.valueChange.complete(), this.disabledChange.complete();
    }, e.prototype.writeValue = function (e) {
      this.isInSingleMode ? this.value = e : this.values = e;
    }, e.prototype.registerOnChange = function (e) {
      this.onModelChange = e;
    }, e.prototype.registerOnTouched = function (e) {
      this.onModelTouched = e;
    }, e.prototype.setDisabledState = function (e) {
      this.disabled = e;
    }, e.prototype.validate = function (e) {
      return this.validator ? this.validator(e) : null;
    }, e.prototype.registerOnValidatorChange = function (e) {
      this.validatorOnChange = e;
    }, e.prototype.handleKeydownOnHost = function (e) {
      e.altKey && 40 === e.keyCode && (this.dtPicker.open(), e.preventDefault());
    }, e.prototype.handleBlurOnHost = function (e) {
      this.onModelTouched();
    }, e.prototype.handleInputOnHost = function (e) {
      var t = e.target.value;
      "single" === this._selectMode ? this.changeInputInSingleMode(t) : "range" === this._selectMode ? this.changeInputInRangeMode(t) : this.changeInputInRangeFromToMode(t);
    }, e.prototype.handleChangeOnHost = function (e) {
      var t;
      this.isInSingleMode ? t = this.value : this.isInRangeMode && (t = this.values), this.dateTimeChange.emit({
        source: this,
        value: t,
        input: this.elmRef.nativeElement
      });
    }, e.prototype.formatNativeInputValue = function () {
      if (this.isInSingleMode) this.renderer.setProperty(this.elmRef.nativeElement, "value", this._value ? this.dateTimeAdapter.format(this._value, this.dtPicker.formatString) : "");else if (this.isInRangeMode) if (this._values && this.values.length > 0) {
        var e = this._values[0],
            t = this._values[1],
            i = e ? this.dateTimeAdapter.format(e, this.dtPicker.formatString) : "",
            n = t ? this.dateTimeAdapter.format(t, this.dtPicker.formatString) : "";
        i || n ? "range" === this._selectMode ? this.renderer.setProperty(this.elmRef.nativeElement, "value", i + " " + this.rangeSeparator + " " + n) : "rangeFrom" === this._selectMode ? this.renderer.setProperty(this.elmRef.nativeElement, "value", i) : "rangeTo" === this._selectMode && this.renderer.setProperty(this.elmRef.nativeElement, "value", n) : this.renderer.setProperty(this.elmRef.nativeElement, "value", null);
      } else this.renderer.setProperty(this.elmRef.nativeElement, "value", "");
    }, e.prototype.registerDateTimePicker = function (e) {
      e && (this.dtPicker = e, this.dtPicker.registerInput(this));
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, e.prototype.convertTimeStringToDateTimeString = function (e, t) {
      if (e) {
        var i = t || this.dateTimeAdapter.now();
        return this.dateTimeAdapter.format(i, this.dateTimeFormats.datePickerInput) + " " + e;
      }

      return null;
    }, e.prototype.changeInputInSingleMode = function (e) {
      var t = e;
      "timer" === this.dtPicker.pickerType && (t = this.convertTimeStringToDateTimeString(t, this.value));
      var i = this.dateTimeAdapter.parse(t, this.dateTimeFormats.parseInput);
      this.lastValueValid = !i || this.dateTimeAdapter.isValid(i), i = this.getValidDate(i), this.isSameValue(i, this._value) && null !== i || (this._value = i, this.valueChange.emit(i), this.onModelChange(i), this.dateTimeInput.emit({
        source: this,
        value: i,
        input: this.elmRef.nativeElement
      }));
    }, e.prototype.changeInputInRangeFromToMode = function (e) {
      var t = "rangeFrom" === this._selectMode ? this._values[0] : this._values[1];
      "timer" === this.dtPicker.pickerType && (e = this.convertTimeStringToDateTimeString(e, t));
      var i = this.dateTimeAdapter.parse(e, this.dateTimeFormats.parseInput);
      this.lastValueValid = !i || this.dateTimeAdapter.isValid(i), i = this.getValidDate(i), "rangeFrom" === this._selectMode && this.isSameValue(i, this._values[0]) && i || "rangeTo" === this._selectMode && this.isSameValue(i, this._values[1]) && i || (this._values = "rangeFrom" === this._selectMode ? [i, this._values[1]] : [this._values[0], i], this.valueChange.emit(this._values), this.onModelChange(this._values), this.dateTimeInput.emit({
        source: this,
        value: this._values,
        input: this.elmRef.nativeElement
      }));
    }, e.prototype.changeInputInRangeMode = function (e) {
      var t = e.split(this.rangeSeparator),
          i = t[0],
          n = t[1];
      "timer" === this.dtPicker.pickerType && (i = this.convertTimeStringToDateTimeString(i, this.values[0]), n = this.convertTimeStringToDateTimeString(n, this.values[1]));
      var r = this.dateTimeAdapter.parse(i, this.dateTimeFormats.parseInput),
          o = this.dateTimeAdapter.parse(n, this.dateTimeFormats.parseInput);
      this.lastValueValid = (!r || this.dateTimeAdapter.isValid(r)) && (!o || this.dateTimeAdapter.isValid(o)), r = this.getValidDate(r), o = this.getValidDate(o), this.isSameValue(r, this._values[0]) && this.isSameValue(o, this._values[1]) && (null !== r || null !== o) || (this._values = [r, o], this.valueChange.emit(this._values), this.onModelChange(this._values), this.dateTimeInput.emit({
        source: this,
        value: this._values,
        input: this.elmRef.nativeElement
      }));
    }, e.prototype.isSameValue = function (e, t) {
      return e && t ? 0 === this.dateTimeAdapter.compare(e, t) : e == t;
    }, fn([t.Input(), mn("design:type", un), mn("design:paramtypes", [un])], e.prototype, "owlDateTime", null), fn([t.Input(), mn("design:type", Function), mn("design:paramtypes", [Function])], e.prototype, "owlDateTimeFilter", null), fn([t.Input(), mn("design:type", Boolean)], e.prototype, "_disabled", void 0), fn([t.Input(), mn("design:type", Object), mn("design:paramtypes", [Object])], e.prototype, "min", null), fn([t.Input(), mn("design:type", Object), mn("design:paramtypes", [Object])], e.prototype, "max", null), fn([t.Input(), mn("design:type", Object), mn("design:paramtypes", [String])], e.prototype, "selectMode", null), fn([t.Input(), mn("design:type", Object)], e.prototype, "rangeSeparator", void 0), fn([t.Input(), mn("design:type", Object), mn("design:paramtypes", [Object])], e.prototype, "value", null), fn([t.Input(), mn("design:type", Object), mn("design:paramtypes", [Array])], e.prototype, "values", null), fn([t.Output(), mn("design:type", Object)], e.prototype, "dateTimeChange", void 0), fn([t.Output(), mn("design:type", Object)], e.prototype, "dateTimeInput", void 0), fn([t.HostBinding("attr.aria-haspopup"), mn("design:type", Boolean), mn("design:paramtypes", [])], e.prototype, "owlDateTimeInputAriaHaspopup", null), fn([t.HostBinding("attr.aria-owns"), mn("design:type", String), mn("design:paramtypes", [])], e.prototype, "owlDateTimeInputAriaOwns", null), fn([t.HostBinding("attr.min"), mn("design:type", String), mn("design:paramtypes", [])], e.prototype, "minIso8601", null), fn([t.HostBinding("attr.max"), mn("design:type", String), mn("design:paramtypes", [])], e.prototype, "maxIso8601", null), fn([t.HostBinding("disabled"), mn("design:type", Boolean), mn("design:paramtypes", [])], e.prototype, "owlDateTimeInputDisabled", null), fn([t.HostListener("keydown", ["$event"]), mn("design:type", Function), mn("design:paramtypes", [KeyboardEvent]), mn("design:returntype", void 0)], e.prototype, "handleKeydownOnHost", null), fn([t.HostListener("blur", ["$event"]), mn("design:type", Function), mn("design:paramtypes", [Event]), mn("design:returntype", void 0)], e.prototype, "handleBlurOnHost", null), fn([t.HostListener("input", ["$event"]), mn("design:type", Function), mn("design:paramtypes", [Object]), mn("design:returntype", void 0)], e.prototype, "handleInputOnHost", null), fn([t.HostListener("change", ["$event"]), mn("design:type", Function), mn("design:paramtypes", [Object]), mn("design:returntype", void 0)], e.prototype, "handleChangeOnHost", null), e = fn([t.Directive({
      selector: "input[owlDateTime]",
      exportAs: "owlDateTimeInput",
      providers: [gn, bn]
    }), yn(2, t.Optional()), yn(3, t.Optional()), yn(3, t.Inject(mi)), mn("design:paramtypes", [t.ElementRef, t.Renderer2, fi, Object])], e);
  }(),
      _n = function _n(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      wn = function wn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      On = function () {
    return function (e, t, i, n, r, o) {
      void 0 === r && (r = !1), void 0 === o && (o = ""), this.value = e, this.displayValue = t, this.ariaLabel = i, this.enabled = n, this.out = r, this.cellClass = o;
    };
  }(),
      kn = function () {
    function e(e, i) {
      this.elmRef = e, this.ngZone = i, this.activeCell = 0, this.numCols = 7, this.cellRatio = 1, this.select = new t.EventEmitter();
    }

    return Object.defineProperty(e.prototype, "owlDTCalendarBodyClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this.selectMode || "rangeFrom" === this.selectMode || "rangeTo" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.selectCell = function (e) {
      this.select.emit(e);
    }, e.prototype.isActiveCell = function (e, t) {
      return e * this.numCols + t === this.activeCell;
    }, e.prototype.isSelected = function (e) {
      if (!this.selectedValues || 0 === this.selectedValues.length) return !1;
      if (this.isInSingleMode) return e === this.selectedValues[0];

      if (this.isInRangeMode) {
        var t = this.selectedValues[0],
            i = this.selectedValues[1];
        return e === t || e === i;
      }
    }, e.prototype.isInRange = function (e) {
      if (this.isInRangeMode) {
        var t = this.selectedValues[0],
            i = this.selectedValues[1];
        return null !== t && null !== i ? e >= t && e <= i : e === t || e === i;
      }
    }, e.prototype.isRangeFrom = function (e) {
      if (this.isInRangeMode) {
        var t = this.selectedValues[0];
        return null !== t && e === t;
      }
    }, e.prototype.isRangeTo = function (e) {
      if (this.isInRangeMode) {
        var t = this.selectedValues[1];
        return null !== t && e === t;
      }
    }, e.prototype.focusActiveCell = function () {
      var e = this;
      this.ngZone.runOutsideAngular(function () {
        e.ngZone.onStable.asObservable().pipe(Se(1)).subscribe(function () {
          e.elmRef.nativeElement.querySelector(".owl-dt-calendar-cell-active").focus();
        });
      });
    }, _n([t.Input(), wn("design:type", Object)], e.prototype, "activeCell", void 0), _n([t.Input(), wn("design:type", Array)], e.prototype, "rows", void 0), _n([t.Input(), wn("design:type", Object)], e.prototype, "numCols", void 0), _n([t.Input(), wn("design:type", Object)], e.prototype, "cellRatio", void 0), _n([t.Input(), wn("design:type", Number)], e.prototype, "todayValue", void 0), _n([t.Input(), wn("design:type", Array)], e.prototype, "selectedValues", void 0), _n([t.Input(), wn("design:type", String)], e.prototype, "selectMode", void 0), _n([t.Output(), wn("design:type", Object)], e.prototype, "select", void 0), _n([t.HostBinding("class.owl-dt-calendar-body"), wn("design:type", Boolean), wn("design:paramtypes", [])], e.prototype, "owlDTCalendarBodyClass", null), e = _n([t.Component({
      selector: "[owl-date-time-calendar-body]",
      exportAs: "owlDateTimeCalendarBody",
      template: '<tr *ngFor="let row of rows; let rowIndex = index" role="row"><td *ngFor="let item of row; let colIndex = index" class="owl-dt-calendar-cell {{item.cellClass}}" [tabindex]="isActiveCell(rowIndex, colIndex) ? 0 : -1" [class.owl-dt-calendar-cell-active]="isActiveCell(rowIndex, colIndex)" [class.owl-dt-calendar-cell-disabled]="!item.enabled" [class.owl-dt-calendar-cell-in-range]="isInRange(item.value)" [class.owl-dt-calendar-cell-range-from]="isRangeFrom(item.value)" [class.owl-dt-calendar-cell-range-to]="isRangeTo(item.value)" [attr.aria-label]="item.ariaLabel" [attr.aria-disabled]="!item.enabled || null" [style.width.%]="100 / numCols" [style.paddingTop.%]="50 * cellRatio / numCols" [style.paddingBottom.%]="50 * cellRatio / numCols" (click)="selectCell(item)"><span class="owl-dt-calendar-cell-content" [ngClass]="{\n                \'owl-dt-calendar-cell-out\': item.out,\n                \'owl-dt-calendar-cell-today\': item.value === todayValue,\n                \'owl-dt-calendar-cell-selected\': isSelected(item.value)\n              }">{{item.displayValue}}</span></td></tr>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), wn("design:paramtypes", [t.ElementRef, t.NgZone])], e);
  }(),
      Tn = function Tn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Cn = function Cn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Dn = function Dn(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Mn = function () {
    function e(e, i, n) {
      this.cdRef = e, this.dateTimeAdapter = i, this.dateTimeFormats = n, this.hideOtherMonths = !1, this._firstDayOfWeek = 0, this._selectMode = "single", this._selecteds = [], this.localeSub = v.EMPTY, this.initiated = !1, this.selectedDates = [], this.selectedChange = new t.EventEmitter(), this.userSelection = new t.EventEmitter(), this.pickerMomentChange = new t.EventEmitter();
    }

    return Object.defineProperty(e.prototype, "firstDayOfWeek", {
      get: function get() {
        return this._firstDayOfWeek;
      },
      set: function set(e) {
        (e = Ye(e)) >= 0 && e <= 6 && e !== this._firstDayOfWeek && (this._firstDayOfWeek = e, this.initiated && (this.generateWeekDays(), this.generateCalendar(), this.cdRef.markForCheck()));
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selectMode", {
      get: function get() {
        return this._selectMode;
      },
      set: function set(e) {
        this._selectMode = e, this.initiated && (this.generateCalendar(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        var t = this._selected;
        e = this.dateTimeAdapter.deserialize(e), this._selected = this.getValidDate(e), this.dateTimeAdapter.isSameDay(t, this._selected) || this.setSelectedDates();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        var t = this;
        this._selecteds = e.map(function (e) {
          return e = t.dateTimeAdapter.deserialize(e), t.getValidDate(e);
        }), this.setSelectedDates();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._pickerMoment;
      },
      set: function set(e) {
        var t = this._pickerMoment;
        e = this.dateTimeAdapter.deserialize(e), this._pickerMoment = this.getValidDate(e) || this.dateTimeAdapter.now(), this.firstDateOfMonth = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this._pickerMoment), this.dateTimeAdapter.getMonth(this._pickerMoment), 1), !this.isSameMonth(t, this._pickerMoment) && this.initiated && this.generateCalendar();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dateFilter", {
      get: function get() {
        return this._dateFilter;
      },
      set: function set(e) {
        this._dateFilter = e, this.initiated && (this.generateCalendar(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minDate", {
      get: function get() {
        return this._minDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._minDate = this.getValidDate(e), this.initiated && (this.generateCalendar(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxDate", {
      get: function get() {
        return this._maxDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._maxDate = this.getValidDate(e), this.initiated && (this.generateCalendar(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "weekdays", {
      get: function get() {
        return this._weekdays;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "days", {
      get: function get() {
        return this._days;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "activeCell", {
      get: function get() {
        if (this.pickerMoment) return this.dateTimeAdapter.getDate(this.pickerMoment) + this.firstRowOffset - 1;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this.selectMode || "rangeFrom" === this.selectMode || "rangeTo" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTCalendarView", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {
      var e = this;
      this.generateWeekDays(), this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
        e.generateWeekDays(), e.generateCalendar(), e.cdRef.markForCheck();
      });
    }, e.prototype.ngAfterContentInit = function () {
      this.generateCalendar(), this.initiated = !0;
    }, e.prototype.ngOnDestroy = function () {
      this.localeSub.unsubscribe();
    }, e.prototype.selectCalendarCell = function (e) {
      !e.enabled || this.hideOtherMonths && e.out || this.selectDate(e.value);
    }, e.prototype.selectDate = function (e) {
      var t = e - 1,
          i = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, t);
      this.selectedChange.emit(i), this.userSelection.emit();
    }, e.prototype.handleCalendarKeydown = function (e) {
      var t;

      switch (e.keyCode) {
        case 37:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -1), this.pickerMomentChange.emit(t);
          break;

        case 39:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1), this.pickerMomentChange.emit(t);
          break;

        case 38:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, -7), this.pickerMomentChange.emit(t);
          break;

        case 40:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 7), this.pickerMomentChange.emit(t);
          break;

        case 36:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, 1 - this.dateTimeAdapter.getDate(this.pickerMoment)), this.pickerMomentChange.emit(t);
          break;

        case 35:
          t = this.dateTimeAdapter.addCalendarDays(this.pickerMoment, this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment) - this.dateTimeAdapter.getDate(this.pickerMoment)), this.pickerMomentChange.emit(t);
          break;

        case 33:
          t = e.altKey ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -1) : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1), this.pickerMomentChange.emit(t);
          break;

        case 34:
          t = e.altKey ? this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 1) : this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1), this.pickerMomentChange.emit(t);
          break;

        case 13:
          this.dateFilter && !this.dateFilter(this.pickerMoment) || this.selectDate(this.dateTimeAdapter.getDate(this.pickerMoment));
          break;

        default:
          return;
      }

      this.focusActiveCell(), e.preventDefault();
    }, e.prototype.generateWeekDays = function () {
      var e = this.dateTimeAdapter.getDayOfWeekNames("long"),
          t = this.dateTimeAdapter.getDayOfWeekNames("short"),
          i = this.dateTimeAdapter.getDayOfWeekNames("narrow"),
          n = this.firstDayOfWeek,
          r = e.map(function (e, n) {
        return {
          long: e,
          short: t[n],
          narrow: i[n]
        };
      });
      this._weekdays = r.slice(n).concat(r.slice(0, n)), this.dateNames = this.dateTimeAdapter.getDateNames();
    }, e.prototype.generateCalendar = function () {
      if (this.pickerMoment) {
        this.todayDate = null;
        var e = 0 - (this.dateTimeAdapter.getDay(this.firstDateOfMonth) + (7 - this.firstDayOfWeek)) % 7;
        this.firstRowOffset = Math.abs(e), this._days = [];

        for (var t = 0; t < 6; t++) {
          for (var i = [], n = 0; n < 7; n++) {
            var r = this.dateTimeAdapter.addCalendarDays(this.firstDateOfMonth, e),
                o = this.createDateCell(r, e);
            this.dateTimeAdapter.isSameDay(this.dateTimeAdapter.now(), r) && (this.todayDate = e + 1), i.push(o), e += 1;
          }

          this._days.push(i);
        }

        this.setSelectedDates();
      }
    }, e.prototype.createDateCell = function (e, t) {
      var i = this.dateTimeAdapter.getNumDaysInMonth(this.pickerMoment),
          n = this.dateTimeAdapter.getDate(e).toString(),
          r = this.dateTimeAdapter.format(e, this.dateTimeFormats.dateA11yLabel),
          o = this.isDateEnabled(e),
          s = t + 1,
          a = s < 1 || s > i,
          c = "owl-dt-day-" + this.dateTimeAdapter.getDay(e);
      return new On(s, n, r, o, a, c);
    }, e.prototype.isDateEnabled = function (e) {
      return !!e && (!this.dateFilter || this.dateFilter(e)) && (!this.minDate || this.dateTimeAdapter.compare(e, this.minDate) >= 0) && (!this.maxDate || this.dateTimeAdapter.compare(e, this.maxDate) <= 0);
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, e.prototype.isSameMonth = function (e, t) {
      return !!(e && t && this.dateTimeAdapter.isValid(e) && this.dateTimeAdapter.isValid(t) && this.dateTimeAdapter.getYear(e) === this.dateTimeAdapter.getYear(t) && this.dateTimeAdapter.getMonth(e) === this.dateTimeAdapter.getMonth(t));
    }, e.prototype.setSelectedDates = function () {
      var e = this;
      if (this.selectedDates = [], this.firstDateOfMonth) if (this.isInSingleMode && this.selected) {
        var t = this.dateTimeAdapter.differenceInCalendarDays(this.selected, this.firstDateOfMonth);
        this.selectedDates[0] = t + 1;
      } else this.isInRangeMode && this.selecteds && (this.selectedDates = this.selecteds.map(function (t) {
        return e.dateTimeAdapter.isValid(t) ? e.dateTimeAdapter.differenceInCalendarDays(t, e.firstDateOfMonth) + 1 : null;
      }));
    }, e.prototype.focusActiveCell = function () {
      this.calendarBodyElm.focusActiveCell();
    }, Tn([t.Input(), Cn("design:type", Boolean)], e.prototype, "hideOtherMonths", void 0), Tn([t.Input(), Cn("design:type", Number), Cn("design:paramtypes", [Number])], e.prototype, "firstDayOfWeek", null), Tn([t.Input(), Cn("design:type", String), Cn("design:paramtypes", [String])], e.prototype, "selectMode", null), Tn([t.Input(), Cn("design:type", Object), Cn("design:paramtypes", [Object])], e.prototype, "selected", null), Tn([t.Input(), Cn("design:type", Array), Cn("design:paramtypes", [Array])], e.prototype, "selecteds", null), Tn([t.Input(), Cn("design:type", Object), Cn("design:paramtypes", [Object])], e.prototype, "pickerMoment", null), Tn([t.Input(), Cn("design:type", Object), Cn("design:paramtypes", [Function])], e.prototype, "dateFilter", null), Tn([t.Input(), Cn("design:type", Object), Cn("design:paramtypes", [Object])], e.prototype, "minDate", null), Tn([t.Input(), Cn("design:type", Object), Cn("design:paramtypes", [Object])], e.prototype, "maxDate", null), Tn([t.Output(), Cn("design:type", Object)], e.prototype, "selectedChange", void 0), Tn([t.Output(), Cn("design:type", Object)], e.prototype, "userSelection", void 0), Tn([t.Output(), Cn("design:type", t.EventEmitter)], e.prototype, "pickerMomentChange", void 0), Tn([t.ViewChild(kn), Cn("design:type", kn)], e.prototype, "calendarBodyElm", void 0), Tn([t.HostBinding("class.owl-dt-calendar-view"), Cn("design:type", Boolean), Cn("design:paramtypes", [])], e.prototype, "owlDTCalendarView", null), e = Tn([t.Component({
      selector: "owl-date-time-month-view",
      exportAs: "owlYearView",
      template: '<table class="owl-dt-calendar-table owl-dt-calendar-month-table" [class.owl-dt-calendar-only-current-month]="hideOtherMonths"><thead class="owl-dt-calendar-header"><tr class="owl-dt-weekdays"><th *ngFor="let weekday of weekdays" [attr.aria-label]="weekday.long" class="owl-dt-weekday" scope="col"><span>{{weekday.short}}</span></th></tr><tr><th class="owl-dt-calendar-table-divider" aria-hidden="true" colspan="7"></th></tr></thead><tbody owl-date-time-calendar-body role="grid" [rows]="days" [todayValue]="todayDate" [selectedValues]="selectedDates" [selectMode]="selectMode" [activeCell]="activeCell" (keydown)="handleCalendarKeydown($event)" (select)="selectCalendarCell($event)"></tbody></table>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), Dn(1, t.Optional()), Dn(2, t.Optional()), Dn(2, t.Inject(mi)), Cn("design:paramtypes", [t.ChangeDetectorRef, fi, Object])], e);
  }(),
      In = function In(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Sn = function Sn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      An = function An(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      En = function () {
    function e(e, i, n) {
      this.cdRef = e, this.dateTimeAdapter = i, this.dateTimeFormats = n, this._selectMode = "single", this._selecteds = [], this.localeSub = v.EMPTY, this.initiated = !1, this.selectedMonths = [], this.change = new t.EventEmitter(), this.monthSelected = new t.EventEmitter(), this.pickerMomentChange = new t.EventEmitter(), this.keyboardEnter = new t.EventEmitter(), this.monthNames = this.dateTimeAdapter.getMonthNames("short");
    }

    return Object.defineProperty(e.prototype, "selectMode", {
      get: function get() {
        return this._selectMode;
      },
      set: function set(e) {
        this._selectMode = e, this.initiated && (this.generateMonthList(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._selected = this.getValidDate(e), this.setSelectedMonths();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        this._selecteds = [];

        for (var t = 0; t < e.length; t++) {
          var i = this.dateTimeAdapter.deserialize(e[t]);

          this._selecteds.push(this.getValidDate(i));
        }

        this.setSelectedMonths();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._pickerMoment;
      },
      set: function set(e) {
        var t = this._pickerMoment;
        e = this.dateTimeAdapter.deserialize(e), this._pickerMoment = this.getValidDate(e) || this.dateTimeAdapter.now(), !this.hasSameYear(t, this._pickerMoment) && this.initiated && this.generateMonthList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dateFilter", {
      get: function get() {
        return this._dateFilter;
      },
      set: function set(e) {
        this._dateFilter = e, this.initiated && this.generateMonthList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minDate", {
      get: function get() {
        return this._minDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._minDate = this.getValidDate(e), this.initiated && this.generateMonthList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxDate", {
      get: function get() {
        return this._maxDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._maxDate = this.getValidDate(e), this.initiated && this.generateMonthList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "months", {
      get: function get() {
        return this._months;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "activeCell", {
      get: function get() {
        if (this._pickerMoment) return this.dateTimeAdapter.getMonth(this._pickerMoment);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this.selectMode || "rangeFrom" === this.selectMode || "rangeTo" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTCalendarView", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {
      var e = this;
      this.localeSub = this.dateTimeAdapter.localeChanges.subscribe(function () {
        e.generateMonthList(), e.cdRef.markForCheck();
      });
    }, e.prototype.ngAfterContentInit = function () {
      this.generateMonthList(), this.initiated = !0;
    }, e.prototype.ngOnDestroy = function () {
      this.localeSub.unsubscribe();
    }, e.prototype.selectCalendarCell = function (e) {
      this.selectMonth(e.value);
    }, e.prototype.selectMonth = function (e) {
      var t = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), e, 1);
      this.monthSelected.emit(t);
      var i = this.dateTimeAdapter.getNumDaysInMonth(t),
          n = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), e, Math.min(i, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
      this.change.emit(n);
    }, e.prototype.handleCalendarKeydown = function (e) {
      var t;

      switch (e.keyCode) {
        case 37:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -1), this.pickerMomentChange.emit(t);
          break;

        case 39:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 1), this.pickerMomentChange.emit(t);
          break;

        case 38:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -3), this.pickerMomentChange.emit(t);
          break;

        case 40:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 3), this.pickerMomentChange.emit(t);
          break;

        case 36:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, -this.dateTimeAdapter.getMonth(this.pickerMoment)), this.pickerMomentChange.emit(t);
          break;

        case 35:
          t = this.dateTimeAdapter.addCalendarMonths(this.pickerMoment, 11 - this.dateTimeAdapter.getMonth(this.pickerMoment)), this.pickerMomentChange.emit(t);
          break;

        case 33:
          t = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, e.altKey ? -10 : -1), this.pickerMomentChange.emit(t);
          break;

        case 34:
          t = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, e.altKey ? 10 : 1), this.pickerMomentChange.emit(t);
          break;

        case 13:
          this.selectMonth(this.dateTimeAdapter.getMonth(this.pickerMoment)), this.keyboardEnter.emit();
          break;

        default:
          return;
      }

      this.focusActiveCell(), e.preventDefault();
    }, e.prototype.generateMonthList = function () {
      if (this.pickerMoment) {
        this.setSelectedMonths(), this.todayMonth = this.getMonthInCurrentYear(this.dateTimeAdapter.now()), this._months = [];

        for (var e = 0; e < 4; e++) {
          for (var t = [], i = 0; i < 3; i++) {
            var n = i + 3 * e,
                r = this.createMonthCell(n);
            t.push(r);
          }

          this._months.push(t);
        }
      }
    }, e.prototype.createMonthCell = function (e) {
      var t = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), e, 1),
          i = this.dateTimeAdapter.format(t, this.dateTimeFormats.monthYearA11yLabel),
          n = "owl-dt-month-" + e;
      return new On(e, this.monthNames[e], i, this.isMonthEnabled(e), !1, n);
    }, e.prototype.isMonthEnabled = function (e) {
      for (var t = this.dateTimeAdapter.createDate(this.dateTimeAdapter.getYear(this.pickerMoment), e, 1); this.dateTimeAdapter.getMonth(t) === e; t = this.dateTimeAdapter.addCalendarDays(t, 1)) {
        if (t && (!this.dateFilter || this.dateFilter(t)) && (!this.minDate || this.dateTimeAdapter.compare(t, this.minDate) >= 0) && (!this.maxDate || this.dateTimeAdapter.compare(t, this.maxDate) <= 0)) return !0;
      }

      return !1;
    }, e.prototype.getMonthInCurrentYear = function (e) {
      if (this.getValidDate(e) && this.getValidDate(this._pickerMoment)) {
        var t = this.dateTimeAdapter.compareYear(e, this._pickerMoment);
        return t < 0 ? -1 : t > 0 ? 12 : this.dateTimeAdapter.getMonth(e);
      }

      return null;
    }, e.prototype.setSelectedMonths = function () {
      this.selectedMonths = [], this.isInSingleMode && this.selected && (this.selectedMonths[0] = this.getMonthInCurrentYear(this.selected)), this.isInRangeMode && this.selecteds && (this.selectedMonths[0] = this.getMonthInCurrentYear(this.selecteds[0]), this.selectedMonths[1] = this.getMonthInCurrentYear(this.selecteds[1]));
    }, e.prototype.hasSameYear = function (e, t) {
      return !(!e || !t || this.dateTimeAdapter.getYear(e) !== this.dateTimeAdapter.getYear(t));
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, e.prototype.focusActiveCell = function () {
      this.calendarBodyElm.focusActiveCell();
    }, In([t.Input(), Sn("design:type", String), Sn("design:paramtypes", [String])], e.prototype, "selectMode", null), In([t.Input(), Sn("design:type", Object), Sn("design:paramtypes", [Object])], e.prototype, "selected", null), In([t.Input(), Sn("design:type", Array), Sn("design:paramtypes", [Array])], e.prototype, "selecteds", null), In([t.Input(), Sn("design:type", Object), Sn("design:paramtypes", [Object])], e.prototype, "pickerMoment", null), In([t.Input(), Sn("design:type", Object), Sn("design:paramtypes", [Function])], e.prototype, "dateFilter", null), In([t.Input(), Sn("design:type", Object), Sn("design:paramtypes", [Object])], e.prototype, "minDate", null), In([t.Input(), Sn("design:type", Object), Sn("design:paramtypes", [Object])], e.prototype, "maxDate", null), In([t.Output(), Sn("design:type", Object)], e.prototype, "change", void 0), In([t.Output(), Sn("design:type", Object)], e.prototype, "monthSelected", void 0), In([t.Output(), Sn("design:type", t.EventEmitter)], e.prototype, "pickerMomentChange", void 0), In([t.Output(), Sn("design:type", t.EventEmitter)], e.prototype, "keyboardEnter", void 0), In([t.ViewChild(kn), Sn("design:type", kn)], e.prototype, "calendarBodyElm", void 0), In([t.HostBinding("class.owl-dt-calendar-view"), Sn("design:type", Boolean), Sn("design:paramtypes", [])], e.prototype, "owlDTCalendarView", null), e = In([t.Component({
      selector: "owl-date-time-year-view",
      exportAs: "owlMonthView",
      template: '<table class="owl-dt-calendar-table owl-dt-calendar-year-table"><thead class="owl-dt-calendar-header"><tr><th class="owl-dt-calendar-table-divider" aria-hidden="true" colspan="3"></th></tr></thead><tbody owl-date-time-calendar-body role="grid" [rows]="months" [numCols]="3" [cellRatio]="3 / 7" [activeCell]="activeCell" [todayValue]="todayMonth" [selectedValues]="selectedMonths" [selectMode]="selectMode" (keydown)="handleCalendarKeydown($event)" (select)="selectCalendarCell($event)"></tbody></table>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), An(1, t.Optional()), An(2, t.Optional()), An(2, t.Inject(mi)), Sn("design:paramtypes", [t.ChangeDetectorRef, fi, Object])], e);
  }(),
      Pn = function Pn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      xn = function xn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      jn = function jn(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Rn = function () {
    function e(e, i, n) {
      this.cdRef = e, this.pickerIntl = i, this.dateTimeAdapter = n, this._selectMode = "single", this._selecteds = [], this.initiated = !1, this.change = new t.EventEmitter(), this.yearSelected = new t.EventEmitter(), this.pickerMomentChange = new t.EventEmitter(), this.keyboardEnter = new t.EventEmitter();
    }

    return Object.defineProperty(e.prototype, "selectMode", {
      get: function get() {
        return this._selectMode;
      },
      set: function set(e) {
        this._selectMode = e, this.initiated && (this.setSelectedYears(), this.cdRef.markForCheck());
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        var t = this._selected;
        e = this.dateTimeAdapter.deserialize(e), this._selected = this.getValidDate(e), this.dateTimeAdapter.isSameDay(t, this._selected) || this.setSelectedYears();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        var t = this;
        this._selecteds = e.map(function (e) {
          return e = t.dateTimeAdapter.deserialize(e), t.getValidDate(e);
        }), this.setSelectedYears();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "pickerMoment", {
      get: function get() {
        return this._pickerMoment;
      },
      set: function set(e) {
        var t = this._pickerMoment;
        e = this.dateTimeAdapter.deserialize(e), this._pickerMoment = this.getValidDate(e) || this.dateTimeAdapter.now(), t && this._pickerMoment && !this.isSameYearList(t, this._pickerMoment) && this.generateYearList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "dateFilter", {
      get: function get() {
        return this._dateFilter;
      },
      set: function set(e) {
        this._dateFilter = e, this.initiated && this.generateYearList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "minDate", {
      get: function get() {
        return this._minDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._minDate = this.getValidDate(e), this.initiated && this.generateYearList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "maxDate", {
      get: function get() {
        return this._maxDate;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), this._maxDate = this.getValidDate(e), this.initiated && this.generateYearList();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "todayYear", {
      get: function get() {
        return this._todayYear;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "years", {
      get: function get() {
        return this._years;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "selectedYears", {
      get: function get() {
        return this._selectedYears;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this.selectMode || "rangeFrom" === this.selectMode || "rangeTo" === this.selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "activeCell", {
      get: function get() {
        if (this._pickerMoment) return this.dateTimeAdapter.getYear(this._pickerMoment) % 21;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "tableHeader", {
      get: function get() {
        if (this._years && this._years.length > 0) return this._years[0][0].displayValue + " ~ " + this._years[6][2].displayValue;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "prevButtonLabel", {
      get: function get() {
        return this.pickerIntl.prevMultiYearLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "nextButtonLabel", {
      get: function get() {
        return this.pickerIntl.nextMultiYearLabel;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTCalendarView", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTCalendarMultiYearView", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {}, e.prototype.ngAfterContentInit = function () {
      this._todayYear = this.dateTimeAdapter.getYear(this.dateTimeAdapter.now()), this.generateYearList(), this.initiated = !0;
    }, e.prototype.selectCalendarCell = function (e) {
      this.selectYear(e.value);
    }, e.prototype.selectYear = function (e) {
      this.yearSelected.emit(this.dateTimeAdapter.createDate(e, 0, 1));
      var t = this.dateTimeAdapter.createDate(e, this.dateTimeAdapter.getMonth(this.pickerMoment), 1),
          i = this.dateTimeAdapter.getNumDaysInMonth(t),
          n = this.dateTimeAdapter.createDate(e, this.dateTimeAdapter.getMonth(this.pickerMoment), Math.min(i, this.dateTimeAdapter.getDate(this.pickerMoment)), this.dateTimeAdapter.getHours(this.pickerMoment), this.dateTimeAdapter.getMinutes(this.pickerMoment), this.dateTimeAdapter.getSeconds(this.pickerMoment));
      this.change.emit(n);
    }, e.prototype.prevYearList = function (e) {
      this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, -21), this.generateYearList(), e.preventDefault();
    }, e.prototype.nextYearList = function (e) {
      this._pickerMoment = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, 21), this.generateYearList(), e.preventDefault();
    }, e.prototype.generateYearList = function () {
      this._years = [];

      for (var e = this.dateTimeAdapter.getYear(this._pickerMoment), t = e % 21, i = 0; i < 7; i++) {
        for (var n = [], r = 0; r < 3; r++) {
          var o = e - t + (r + 3 * i),
              s = this.createYearCell(o);
          n.push(s);
        }

        this._years.push(n);
      }
    }, e.prototype.previousEnabled = function () {
      return !this.minDate || !this.minDate || !this.isSameYearList(this._pickerMoment, this.minDate);
    }, e.prototype.nextEnabled = function () {
      return !this.maxDate || !this.isSameYearList(this._pickerMoment, this.maxDate);
    }, e.prototype.handleCalendarKeydown = function (e) {
      var t;

      switch (e.keyCode) {
        case 37:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -1), this.pickerMomentChange.emit(t);
          break;

        case 39:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 1), this.pickerMomentChange.emit(t);
          break;

        case 38:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -3), this.pickerMomentChange.emit(t);
          break;

        case 40:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 3), this.pickerMomentChange.emit(t);
          break;

        case 36:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, -this.dateTimeAdapter.getYear(this._pickerMoment) % 21), this.pickerMomentChange.emit(t);
          break;

        case 35:
          t = this.dateTimeAdapter.addCalendarYears(this._pickerMoment, 21 - this.dateTimeAdapter.getYear(this._pickerMoment) % 21 - 1), this.pickerMomentChange.emit(t);
          break;

        case 33:
          t = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, e.altKey ? -210 : -21), this.pickerMomentChange.emit(t);
          break;

        case 34:
          t = this.dateTimeAdapter.addCalendarYears(this.pickerMoment, e.altKey ? 210 : 21), this.pickerMomentChange.emit(t);
          break;

        case 13:
          this.selectYear(this.dateTimeAdapter.getYear(this._pickerMoment)), this.keyboardEnter.emit();
          break;

        default:
          return;
      }

      this.focusActiveCell(), e.preventDefault();
    }, e.prototype.createYearCell = function (e) {
      var t = this.dateTimeAdapter.createDate(e, 0, 1),
          i = this.dateTimeAdapter.getYearName(t),
          n = "owl-dt-year-" + e;
      return new On(e, e.toString(), i, this.isYearEnabled(e), !1, n);
    }, e.prototype.setSelectedYears = function () {
      var e = this;
      this._selectedYears = [], this.isInSingleMode && this.selected && (this._selectedYears[0] = this.dateTimeAdapter.getYear(this.selected)), this.isInRangeMode && this.selecteds && (this._selectedYears = this.selecteds.map(function (t) {
        return e.dateTimeAdapter.isValid(t) ? e.dateTimeAdapter.getYear(t) : null;
      }));
    }, e.prototype.isYearEnabled = function (e) {
      if (void 0 === e || null === e || this.maxDate && e > this.dateTimeAdapter.getYear(this.maxDate) || this.minDate && e < this.dateTimeAdapter.getYear(this.minDate)) return !1;
      if (!this.dateFilter) return !0;

      for (var t = this.dateTimeAdapter.createDate(e, 0, 1); this.dateTimeAdapter.getYear(t) == e; t = this.dateTimeAdapter.addCalendarDays(t, 1)) {
        if (this.dateFilter(t)) return !0;
      }

      return !1;
    }, e.prototype.isSameYearList = function (e, t) {
      return Math.floor(this.dateTimeAdapter.getYear(e) / 21) === Math.floor(this.dateTimeAdapter.getYear(t) / 21);
    }, e.prototype.getValidDate = function (e) {
      return this.dateTimeAdapter.isDateInstance(e) && this.dateTimeAdapter.isValid(e) ? e : null;
    }, e.prototype.focusActiveCell = function () {
      this.calendarBodyElm.focusActiveCell();
    }, Pn([t.Input(), xn("design:type", String), xn("design:paramtypes", [String])], e.prototype, "selectMode", null), Pn([t.Input(), xn("design:type", Object), xn("design:paramtypes", [Object])], e.prototype, "selected", null), Pn([t.Input(), xn("design:type", Array), xn("design:paramtypes", [Array])], e.prototype, "selecteds", null), Pn([t.Input(), xn("design:type", Object), xn("design:paramtypes", [Object])], e.prototype, "pickerMoment", null), Pn([t.Input(), xn("design:type", Object), xn("design:paramtypes", [Function])], e.prototype, "dateFilter", null), Pn([t.Input(), xn("design:type", Object), xn("design:paramtypes", [Object])], e.prototype, "minDate", null), Pn([t.Input(), xn("design:type", Object), xn("design:paramtypes", [Object])], e.prototype, "maxDate", null), Pn([t.Output(), xn("design:type", Object)], e.prototype, "change", void 0), Pn([t.Output(), xn("design:type", Object)], e.prototype, "yearSelected", void 0), Pn([t.Output(), xn("design:type", t.EventEmitter)], e.prototype, "pickerMomentChange", void 0), Pn([t.Output(), xn("design:type", t.EventEmitter)], e.prototype, "keyboardEnter", void 0), Pn([t.ViewChild(kn), xn("design:type", kn)], e.prototype, "calendarBodyElm", void 0), Pn([t.HostBinding("class.owl-dt-calendar-view"), xn("design:type", Boolean), xn("design:paramtypes", [])], e.prototype, "owlDTCalendarView", null), Pn([t.HostBinding("class.owl-dt-calendar-multi-year-view"), xn("design:type", Boolean), xn("design:paramtypes", [])], e.prototype, "owlDTCalendarMultiYearView", null), e = Pn([t.Component({
      selector: "owl-date-time-multi-year-view",
      template: '<button class="owl-dt-control-button owl-dt-control-arrow-button" [disabled]="!previousEnabled()" [attr.aria-label]="prevButtonLabel" type="button" tabindex="0" (click)="prevYearList($event)"><span class="owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Left"> --\x3e <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 250.738 250.738" style="enable-background:new 0 0 250.738 250.738;" xml:space="preserve" width="100%" height="100%"><path style="fill-rule: evenodd; clip-rule: evenodd;" d="M96.633,125.369l95.053-94.533c7.101-7.055,7.101-18.492,0-25.546   c-7.1-7.054-18.613-7.054-25.714,0L58.989,111.689c-3.784,3.759-5.487,8.759-5.238,13.68c-0.249,4.922,1.454,9.921,5.238,13.681   l106.983,106.398c7.101,7.055,18.613,7.055,25.714,0c7.101-7.054,7.101-18.491,0-25.544L96.633,125.369z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button><table class="owl-dt-calendar-table owl-dt-calendar-multi-year-table"><thead class="owl-dt-calendar-header"><tr><th colspan="3">{{tableHeader}}</th></tr></thead><tbody owl-date-time-calendar-body role="grid" [rows]="years" [numCols]="3" [cellRatio]="3 / 7" [activeCell]="activeCell" [todayValue]="todayYear" [selectedValues]="selectedYears" [selectMode]="selectMode" (keydown)="handleCalendarKeydown($event)" (select)="selectCalendarCell($event)"></tbody></table><button class="owl-dt-control-button owl-dt-control-arrow-button" [disabled]="!nextEnabled()" [attr.aria-label]="nextButtonLabel" type="button" tabindex="0" (click)="nextYearList($event)"><span class="owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Right"> --\x3e <svg version="1.1" xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" x="0px" y="0px" viewBox="0 0 250.738 250.738" style="enable-background:new 0 0 250.738 250.738;" xml:space="preserve"><path style="fill-rule:evenodd;clip-rule:evenodd;" d="M191.75,111.689L84.766,5.291c-7.1-7.055-18.613-7.055-25.713,0\n                c-7.101,7.054-7.101,18.49,0,25.544l95.053,94.534l-95.053,94.533c-7.101,7.054-7.101,18.491,0,25.545\n                c7.1,7.054,18.613,7.054,25.713,0L191.75,139.05c3.784-3.759,5.487-8.759,5.238-13.681\n                C197.237,120.447,195.534,115.448,191.75,111.689z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), jn(2, t.Optional()), xn("design:paramtypes", [t.ChangeDetectorRef, ui, fi])], e);
  }(),
      Vn = function Vn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Fn = function Fn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Ln = function () {
    function e() {
      this.showDivider = !1, this.step = 1, this.valueChange = new t.EventEmitter(), this.inputChange = new t.EventEmitter(), this.inputStream = new E(), this.inputStreamSub = v.EMPTY;
    }

    return Object.defineProperty(e.prototype, "displayValue", {
      get: function get() {
        return this.boxValue || this.value;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(e.prototype, "owlDTTimerBoxClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), e.prototype.ngOnInit = function () {
      var e,
          t,
          i = this;
      this.inputStreamSub = this.inputStream.pipe(be(500), function (i) {
        return i.lift(new Oe(e, t));
      }).subscribe(function (e) {
        if (e) {
          var t = Ye(e, 0);
          i.updateValueViaInput(t);
        }
      });
    }, e.prototype.ngOnDestroy = function () {
      this.inputStreamSub.unsubscribe();
    }, e.prototype.upBtnClicked = function () {
      this.updateValue(this.value + this.step);
    }, e.prototype.downBtnClicked = function () {
      this.updateValue(this.value - this.step);
    }, e.prototype.handleInputChange = function (e) {
      this.inputStream.next(e);
    }, e.prototype.updateValue = function (e) {
      this.valueChange.emit(e);
    }, e.prototype.updateValueViaInput = function (e) {
      e > this.max || e < this.min || this.inputChange.emit(e);
    }, Vn([t.Input(), Fn("design:type", Object)], e.prototype, "showDivider", void 0), Vn([t.Input(), Fn("design:type", String)], e.prototype, "upBtnAriaLabel", void 0), Vn([t.Input(), Fn("design:type", Boolean)], e.prototype, "upBtnDisabled", void 0), Vn([t.Input(), Fn("design:type", String)], e.prototype, "downBtnAriaLabel", void 0), Vn([t.Input(), Fn("design:type", Boolean)], e.prototype, "downBtnDisabled", void 0), Vn([t.Input(), Fn("design:type", Number)], e.prototype, "boxValue", void 0), Vn([t.Input(), Fn("design:type", Number)], e.prototype, "value", void 0), Vn([t.Input(), Fn("design:type", Number)], e.prototype, "min", void 0), Vn([t.Input(), Fn("design:type", Number)], e.prototype, "max", void 0), Vn([t.Input(), Fn("design:type", Object)], e.prototype, "step", void 0), Vn([t.Input(), Fn("design:type", String)], e.prototype, "inputLabel", void 0), Vn([t.Output(), Fn("design:type", Object)], e.prototype, "valueChange", void 0), Vn([t.Output(), Fn("design:type", Object)], e.prototype, "inputChange", void 0), Vn([t.HostBinding("class.owl-dt-timer-box"), Fn("design:type", Boolean), Fn("design:paramtypes", [])], e.prototype, "owlDTTimerBoxClass", null), e = Vn([t.Component({
      exportAs: "owlDateTimeTimerBox",
      selector: "owl-date-time-timer-box",
      template: '<div *ngIf="showDivider" class="owl-dt-timer-divider" aria-hidden="true"></div><button class="owl-dt-control-button owl-dt-control-arrow-button" type="button" tabindex="-1" [disabled]="upBtnDisabled" [attr.aria-label]="upBtnAriaLabel" (click)="upBtnClicked()"><span class="owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Up"> --\x3e <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 451.847 451.846" style="enable-background:new 0 0 451.847 451.846;" xml:space="preserve" width="100%" height="100%"><path d="M248.292,106.406l194.281,194.29c12.365,12.359,12.365,32.391,0,44.744c-12.354,12.354-32.391,12.354-44.744,0\n                        L225.923,173.529L54.018,345.44c-12.36,12.354-32.395,12.354-44.748,0c-12.359-12.354-12.359-32.391,0-44.75L203.554,106.4\n                        c6.18-6.174,14.271-9.259,22.369-9.259C234.018,97.141,242.115,100.232,248.292,106.406z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button><label class="owl-dt-timer-content"><input class="owl-dt-timer-input" maxlength="2" [value]="displayValue | numberFixedLen : 2" (input)="handleInputChange(valueInput.value)" #valueInput> <span class="owl-hidden-accessible">{{inputLabel}}</span></label><button class="owl-dt-control-button owl-dt-control-arrow-button" type="button" tabindex="-1" [disabled]="downBtnDisabled" [attr.aria-label]="downBtnAriaLabel" (click)="downBtnClicked()"><span class="owl-dt-control-button-content" tabindex="-1">\x3c!-- <editor-fold desc="SVG Arrow Down"> --\x3e <svg xmlns="http://www.w3.org/2000/svg" xmlns:xlink="http://www.w3.org/1999/xlink" version="1.1" x="0px" y="0px" viewBox="0 0 451.847 451.846" style="enable-background:new 0 0 451.847 451.846;" xml:space="preserve" width="100%" height="100%"><path d="M225.923,354.706c-8.098,0-16.195-3.092-22.369-9.263L9.27,151.157c-12.359-12.359-12.359-32.397,0-44.751\n                        c12.354-12.354,32.388-12.354,44.748,0l171.905,171.915l171.906-171.909c12.359-12.354,32.391-12.354,44.744,0\n                        c12.365,12.354,12.365,32.392,0,44.751L248.292,345.449C242.115,351.621,234.018,354.706,225.923,354.706z"/></svg>\x3c!-- </editor-fold> --\x3e</span></button>',
      styles: [""],
      preserveWhitespaces: !1,
      changeDetection: t.ChangeDetectionStrategy.OnPush
    }), Fn("design:paramtypes", [])], e);
  }(),
      Bn = function Bn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Nn = function () {
    function e() {}

    return e.prototype.transform = function (e, t) {
      var i = Math.floor(e),
          n = Math.floor(t);
      if (null === e || isNaN(i) || isNaN(n)) return e;

      for (var r = i.toString(); r.length < n;) {
        r = "0" + r;
      }

      return r;
    }, e = Bn([t.Pipe({
      name: "numberFixedLen"
    })], e);
  }(),
      Yn = (an = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  }, function (e, t) {
    function i() {
      this.constructor = e;
    }

    an(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }),
      Hn = function Hn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      zn = function zn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Wn = function Wn(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      Xn = {
    provide: r.NG_VALUE_ACCESSOR,
    useExisting: t.forwardRef(function () {
      return Zn;
    }),
    multi: !0
  },
      Zn = function (e) {
    function i(i, n, r) {
      var o = e.call(this, n, r) || this;
      return o.changeDetector = i, o.dateTimeAdapter = n, o.dateTimeFormats = r, o._pickerType = "both", o._disabled = !1, o._selectMode = "single", o._values = [], o.yearSelected = new t.EventEmitter(), o.monthSelected = new t.EventEmitter(), o._selecteds = [], o.onModelChange = function () {}, o.onModelTouched = function () {}, o;
    }

    return Yn(i, e), Object.defineProperty(i.prototype, "pickerType", {
      get: function get() {
        return this._pickerType;
      },
      set: function set(e) {
        e !== this._pickerType && (this._pickerType = e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "disabled", {
      get: function get() {
        return !!this._disabled;
      },
      set: function set(e) {
        this._disabled = Ne(e);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selectMode", {
      get: function get() {
        return this._selectMode;
      },
      set: function set(e) {
        if ("single" !== e && "range" !== e && "rangeFrom" !== e && "rangeTo" !== e) throw Error("OwlDateTime Error: invalid selectMode value!");
        this._selectMode = e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "startAt", {
      get: function get() {
        return this._startAt ? this._startAt : "single" === this.selectMode ? this.value || null : "range" === this.selectMode || "rangeFrom" === this.selectMode ? this.values[0] || null : "rangeTo" === this.selectMode ? this.values[1] || null : null;
      },
      set: function set(e) {
        this._startAt = this.getValidDate(this.dateTimeAdapter.deserialize(e));
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "dateTimeFilter", {
      get: function get() {
        return this._dateTimeFilter;
      },
      set: function set(e) {
        this._dateTimeFilter = e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "minDateTime", {
      get: function get() {
        return this._min || null;
      },
      set: function set(e) {
        this._min = this.getValidDate(this.dateTimeAdapter.deserialize(e)), this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "maxDateTime", {
      get: function get() {
        return this._max || null;
      },
      set: function set(e) {
        this._max = this.getValidDate(this.dateTimeAdapter.deserialize(e)), this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "value", {
      get: function get() {
        return this._value;
      },
      set: function set(e) {
        e = this.dateTimeAdapter.deserialize(e), e = this.getValidDate(e), this._value = e, this.selected = e;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "values", {
      get: function get() {
        return this._values;
      },
      set: function set(e) {
        var t = this;
        e && e.length > 0 ? (e = e.map(function (e) {
          return e = t.dateTimeAdapter.deserialize(e), (e = t.getValidDate(e)) ? t.dateTimeAdapter.clone(e) : null;
        }), this._values = e.slice(), this.selecteds = e.slice()) : (this._values = [], this.selecteds = []);
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selected", {
      get: function get() {
        return this._selected;
      },
      set: function set(e) {
        this._selected = e, this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "selecteds", {
      get: function get() {
        return this._selecteds;
      },
      set: function set(e) {
        this._selecteds = e, this.changeDetector.markForCheck();
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "opened", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "pickerMode", {
      get: function get() {
        return "inline";
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "isInSingleMode", {
      get: function get() {
        return "single" === this._selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "isInRangeMode", {
      get: function get() {
        return "range" === this._selectMode || "rangeFrom" === this._selectMode || "rangeTo" === this._selectMode;
      },
      enumerable: !0,
      configurable: !0
    }), Object.defineProperty(i.prototype, "owlDTInlineClass", {
      get: function get() {
        return !0;
      },
      enumerable: !0,
      configurable: !0
    }), i.prototype.ngOnInit = function () {
      this.container.picker = this;
    }, i.prototype.writeValue = function (e) {
      this.isInSingleMode ? (this.value = e, this.container.pickerMoment = e) : (this.values = e, this.container.pickerMoment = this._values[this.container.activeSelectedIndex]);
    }, i.prototype.registerOnChange = function (e) {
      this.onModelChange = e;
    }, i.prototype.registerOnTouched = function (e) {
      this.onModelTouched = e;
    }, i.prototype.setDisabledState = function (e) {
      this.disabled = e;
    }, i.prototype.select = function (e) {
      this.disabled || (Array.isArray(e) ? this.values = e.slice() : this.value = e, this.onModelChange(e), this.onModelTouched());
    }, i.prototype.selectYear = function (e) {
      this.yearSelected.emit(e);
    }, i.prototype.selectMonth = function (e) {
      this.monthSelected.emit(e);
    }, Hn([t.ViewChild(Ii), zn("design:type", Ii)], i.prototype, "container", void 0), Hn([t.Input(), zn("design:type", String), zn("design:paramtypes", [String])], i.prototype, "pickerType", null), Hn([t.Input(), zn("design:type", Boolean), zn("design:paramtypes", [Boolean])], i.prototype, "disabled", null), Hn([t.Input(), zn("design:type", Object), zn("design:paramtypes", [String])], i.prototype, "selectMode", null), Hn([t.Input(), zn("design:type", Object), zn("design:paramtypes", [Object])], i.prototype, "startAt", null), Hn([t.Input("owlDateTimeFilter"), zn("design:type", Object), zn("design:paramtypes", [Function])], i.prototype, "dateTimeFilter", null), Hn([t.Input("min"), zn("design:type", Object), zn("design:paramtypes", [Object])], i.prototype, "minDateTime", null), Hn([t.Input("max"), zn("design:type", Object), zn("design:paramtypes", [Object])], i.prototype, "maxDateTime", null), Hn([t.Input(), zn("design:type", Object), zn("design:paramtypes", [Object])], i.prototype, "value", null), Hn([t.Input(), zn("design:type", Object), zn("design:paramtypes", [Array])], i.prototype, "values", null), Hn([t.Output(), zn("design:type", Object)], i.prototype, "yearSelected", void 0), Hn([t.Output(), zn("design:type", Object)], i.prototype, "monthSelected", void 0), Hn([t.HostBinding("class.owl-dt-inline"), zn("design:type", Boolean), zn("design:paramtypes", [])], i.prototype, "owlDTInlineClass", null), i = Hn([t.Component({
      selector: "owl-date-time-inline",
      template: "<owl-date-time-container></owl-date-time-container>",
      styles: [""],
      changeDetection: t.ChangeDetectionStrategy.OnPush,
      preserveWhitespaces: !1,
      providers: [Xn]
    }), Wn(1, t.Optional()), Wn(2, t.Optional()), Wn(2, t.Inject(mi)), zn("design:paramtypes", [t.ChangeDetectorRef, fi, Object])], i);
  }(xi),
      $n = function $n(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Kn = function () {
    function e() {}

    return e = $n([t.NgModule({
      imports: [i.CommonModule, ci, en, ft],
      exports: [vi, ki, hn, vn, un, Zn, Rn, En, Mn],
      declarations: [hn, vn, un, Ii, Rn, En, Mn, ki, Ln, vi, kn, Nn, Zn],
      providers: [ui, ln],
      entryComponents: [Ii]
    })], e);
  }(),
      Un = (cn = Object.setPrototypeOf || {
    __proto__: []
  } instanceof Array && function (e, t) {
    e.__proto__ = t;
  } || function (e, t) {
    for (var i in t) {
      t.hasOwnProperty(i) && (e[i] = t[i]);
    }
  }, function (e, t) {
    function i() {
      this.constructor = e;
    }

    cn(e, t), e.prototype = null === t ? Object.create(t) : (i.prototype = t.prototype, new i());
  }),
      Gn = Object.assign || function (e) {
    for (var t, i = 1, n = arguments.length; i < n; i++) {
      t = arguments[i];

      for (var r in t) {
        Object.prototype.hasOwnProperty.call(t, r) && (e[r] = t[r]);
      }
    }

    return e;
  },
      qn = function qn(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      Jn = function Jn(e, t) {
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.metadata) return Reflect.metadata(e, t);
  },
      Qn = function Qn(e, t) {
    return function (i, n) {
      t(i, n, e);
    };
  },
      er = {
    long: ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December"],
    short: ["Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec"],
    narrow: ["J", "F", "M", "A", "M", "J", "J", "A", "S", "O", "N", "D"]
  },
      tr = {
    long: ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday"],
    short: ["Sun", "Mon", "Tue", "Wed", "Thu", "Fri", "Sat"],
    narrow: ["S", "M", "T", "W", "T", "F", "S"]
  },
      ir = or(31, function (e) {
    return String(e + 1);
  }),
      nr = "undefined" != typeof Intl,
      rr = /^\d{4}-\d{2}-\d{2}(?:T\d{2}:\d{2}:\d{2}(?:\.\d+)?(?:Z|(?:(?:\+|-)\d{2}:\d{2}))?)?$/;

  function or(e, t) {
    for (var i = Array(e), n = 0; n < e; n++) {
      i[n] = t(n);
    }

    return i;
  }

  var sr = function (e) {
    function i(t, i) {
      var n = e.call(this) || this;
      return n.owlDateTimeLocale = t, e.prototype.setLocale.call(n, t), n.useUtcForDisplay = !i.TRIDENT, n._clampDate = i.TRIDENT || i.EDGE, n;
    }

    return Un(i, e), i.prototype.getYear = function (e) {
      return e.getFullYear();
    }, i.prototype.getMonth = function (e) {
      return e.getMonth();
    }, i.prototype.getDay = function (e) {
      return e.getDay();
    }, i.prototype.getDate = function (e) {
      return e.getDate();
    }, i.prototype.getHours = function (e) {
      return e.getHours();
    }, i.prototype.getMinutes = function (e) {
      return e.getMinutes();
    }, i.prototype.getSeconds = function (e) {
      return e.getSeconds();
    }, i.prototype.getTime = function (e) {
      return e.getTime();
    }, i.prototype.getNumDaysInMonth = function (e) {
      var t = this.createDateWithOverflow(this.getYear(e), this.getMonth(e) + 1, 0);
      return this.getDate(t);
    }, i.prototype.differenceInCalendarDays = function (e, t) {
      if (this.isValid(e) && this.isValid(t)) {
        var i = this.createDate(this.getYear(e), this.getMonth(e), this.getDate(e)),
            n = this.createDate(this.getYear(t), this.getMonth(t), this.getDate(t)),
            r = this.getTime(i) - i.getTimezoneOffset() * this.milliseondsInMinute,
            o = this.getTime(n) - n.getTimezoneOffset() * this.milliseondsInMinute;
        return Math.round((r - o) / this.millisecondsInDay);
      }

      return null;
    }, i.prototype.getYearName = function (e) {
      if (nr) {
        var t = new Intl.DateTimeFormat(this.locale, {
          year: "numeric",
          timeZone: "utc"
        });
        return this.stripDirectionalityCharacters(this._format(t, e));
      }

      return String(this.getYear(e));
    }, i.prototype.getMonthNames = function (e) {
      var t = this;

      if (nr) {
        var i = new Intl.DateTimeFormat(this.locale, {
          month: e,
          timeZone: "utc"
        });
        return or(12, function (e) {
          return t.stripDirectionalityCharacters(t._format(i, new Date(2017, e, 1)));
        });
      }

      return er[e];
    }, i.prototype.getDayOfWeekNames = function (e) {
      var t = this;

      if (nr) {
        var i = new Intl.DateTimeFormat(this.locale, {
          weekday: e,
          timeZone: "utc"
        });
        return or(7, function (e) {
          return t.stripDirectionalityCharacters(t._format(i, new Date(2017, 0, e + 1)));
        });
      }

      return tr[e];
    }, i.prototype.getDateNames = function () {
      var e = this;

      if (nr) {
        var t = new Intl.DateTimeFormat(this.locale, {
          day: "numeric",
          timeZone: "utc"
        });
        return or(31, function (i) {
          return e.stripDirectionalityCharacters(e._format(t, new Date(2017, 0, i + 1)));
        });
      }

      return ir;
    }, i.prototype.toIso8601 = function (e) {
      return e.toISOString();
    }, i.prototype.isEqual = function (e, t) {
      return !(!this.isValid(e) || !this.isValid(t)) && e.getTime() === t.getTime();
    }, i.prototype.isSameDay = function (e, t) {
      if (this.isValid(e) && this.isValid(t)) {
        var i = this.clone(e),
            n = this.clone(t);
        return i.setHours(0, 0, 0, 0), n.setHours(0, 0, 0, 0), i.getTime() === n.getTime();
      }

      return !1;
    }, i.prototype.isValid = function (e) {
      return e && !isNaN(e.getTime());
    }, i.prototype.invalid = function () {
      return new Date(NaN);
    }, i.prototype.isDateInstance = function (e) {
      return e instanceof Date;
    }, i.prototype.addCalendarYears = function (e, t) {
      return this.addCalendarMonths(e, 12 * t);
    }, i.prototype.addCalendarMonths = function (e, t) {
      var i = this.clone(e);
      t = Number(t);
      var n = i.getMonth() + t,
          r = new Date(0);
      r.setFullYear(i.getFullYear(), n, 1), r.setHours(0, 0, 0, 0);
      var o = this.getNumDaysInMonth(r);
      return i.setMonth(n, Math.min(o, i.getDate())), i;
    }, i.prototype.addCalendarDays = function (e, t) {
      var i = this.clone(e);
      return t = Number(t), i.setDate(i.getDate() + t), i;
    }, i.prototype.setHours = function (e, t) {
      var i = this.clone(e);
      return i.setHours(t), i;
    }, i.prototype.setMinutes = function (e, t) {
      var i = this.clone(e);
      return i.setMinutes(t), i;
    }, i.prototype.setSeconds = function (e, t) {
      var i = this.clone(e);
      return i.setSeconds(t), i;
    }, i.prototype.createDate = function (e, t, i, n, r, o) {
      if (void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === o && (o = 0), t < 0 || t > 11) throw Error('Invalid month index "' + t + '". Month index has to be between 0 and 11.');
      if (i < 1) throw Error('Invalid date "' + i + '". Date has to be greater than 0.');
      if (n < 0 || n > 23) throw Error('Invalid hours "' + n + '". Hours has to be between 0 and 23.');
      if (r < 0 || r > 59) throw Error('Invalid minutes "' + r + '". Minutes has to between 0 and 59.');
      if (o < 0 || o > 59) throw Error('Invalid seconds "' + o + '". Seconds has to be between 0 and 59.');
      var s = this.createDateWithOverflow(e, t, i, n, r, o);
      if (s.getMonth() !== t) throw Error('Invalid date "' + i + '" for month with index "' + t + '".');
      return s;
    }, i.prototype.clone = function (e) {
      return this.createDate(this.getYear(e), this.getMonth(e), this.getDate(e), this.getHours(e), this.getMinutes(e), this.getSeconds(e));
    }, i.prototype.now = function () {
      return new Date();
    }, i.prototype.format = function (e, t) {
      if (!this.isValid(e)) throw Error("JSNativeDate: Cannot format invalid date.");

      if (nr) {
        this._clampDate && (e.getFullYear() < 1 || e.getFullYear() > 9999) && (e = this.clone(e)).setFullYear(Math.max(1, Math.min(9999, e.getFullYear()))), t = Gn({}, t, {
          timeZone: "utc"
        });
        var i = new Intl.DateTimeFormat(this.locale, t);
        return this.stripDirectionalityCharacters(this._format(i, e));
      }

      return this.stripDirectionalityCharacters(e.toDateString());
    }, i.prototype.parse = function (e, t) {
      return "number" == typeof e ? new Date(e) : e ? new Date(Date.parse(e)) : null;
    }, i.prototype.deserialize = function (t) {
      if ("string" == typeof t) {
        if (!t) return null;

        if (rr.test(t)) {
          var i = new Date(t);
          if (this.isValid(i)) return i;
        }
      }

      return e.prototype.deserialize.call(this, t);
    }, i.prototype.createDateWithOverflow = function (e, t, i, n, r, o) {
      void 0 === n && (n = 0), void 0 === r && (r = 0), void 0 === o && (o = 0);
      var s = new Date(e, t, i, n, r, o);
      return e >= 0 && e < 100 && s.setFullYear(this.getYear(s) - 1900), s;
    }, i.prototype.stripDirectionalityCharacters = function (e) {
      return e.replace(/[\u200e\u200f]/g, "");
    }, i.prototype._format = function (e, t) {
      var i = new Date(Date.UTC(t.getFullYear(), t.getMonth(), t.getDate(), t.getHours(), t.getMinutes(), t.getSeconds(), t.getMilliseconds()));
      return e.format(i);
    }, i = qn([t.Injectable(), Qn(0, t.Optional()), Qn(0, t.Inject(pi)), Jn("design:paramtypes", [String, Fe])], i);
  }(fi),
      ar = {
    parseInput: null,
    fullPickerInput: {
      year: "numeric",
      month: "numeric",
      day: "numeric",
      hour: "numeric",
      minute: "numeric"
    },
    datePickerInput: {
      year: "numeric",
      month: "numeric",
      day: "numeric"
    },
    timePickerInput: {
      hour: "numeric",
      minute: "numeric"
    },
    monthYearLabel: {
      year: "numeric",
      month: "short"
    },
    dateA11yLabel: {
      year: "numeric",
      month: "long",
      day: "numeric"
    },
    monthYearA11yLabel: {
      year: "numeric",
      month: "long"
    }
  },
      cr = function cr(e, t, i, n) {
    var r,
        o = arguments.length,
        s = o < 3 ? t : null === n ? n = Object.getOwnPropertyDescriptor(t, i) : n;
    if ("object" == (typeof Reflect === "undefined" ? "undefined" : _typeof(Reflect)) && "function" == typeof Reflect.decorate) s = Reflect.decorate(e, t, i, n);else for (var a = e.length - 1; a >= 0; a--) {
      (r = e[a]) && (s = (o < 3 ? r(s) : o > 3 ? r(t, i, s) : r(t, i)) || s);
    }
    return o > 3 && s && Object.defineProperty(t, i, s), s;
  },
      lr = function () {
    function e() {}

    return e = cr([t.NgModule({
      imports: [Be],
      providers: [{
        provide: fi,
        useClass: sr
      }]
    })], e);
  }(),
      ur = function () {
    function e() {}

    return e = cr([t.NgModule({
      imports: [lr],
      providers: [{
        provide: mi,
        useValue: ar
      }]
    })], e);
  }();

  e.OwlDateTimeModule = Kn, e.OwlDateTimeIntl = ui, e.OwlNativeDateTimeModule = ur, e.OWL_DATE_TIME_LOCALE_PROVIDER = hi, e.OWL_DATE_TIME_LOCALE = pi, e.DateTimeAdapter = fi, e.OWL_DATE_TIME_FORMATS = mi, e.OwlDateTimeInlineComponent = Zn, e.OwlDateTimeComponent = un, Object.defineProperty(e, "__esModule", {
    value: !0
  });
});