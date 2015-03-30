"use strict";

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

var _defineProperty = function (obj, key, value) { return Object.defineProperty(obj, key, { value: value, enumerable: true, configurable: true, writable: true }); };

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * A simple cons/linked list with some extras for fun
 */

function iterate(f, xs) {
  return regeneratorRuntime.mark(function callee$1$0() {
    var current, next, key;
    return regeneratorRuntime.wrap(function callee$1$0$(context$2$0) {
      while (1) switch (context$2$0.prev = context$2$0.next) {
        case 0:
          current = xs;
          next = current.tail;
          key = 0;

        case 3:
          if (!(current && current.head)) {
            context$2$0.next = 11;
            break;
          }

          context$2$0.next = 6;
          return f(key, current.head);

        case 6:
          key++;
          current = next;
          next = current.tail;
          context$2$0.next = 3;
          break;

        case 11:
        case "end":
          return context$2$0.stop();
      }
    }, callee$1$0, this);
  });
}

var list = function () {
  var head = arguments[0] === undefined ? null : arguments[0];
  var tail = arguments[1] === undefined ? null : arguments[1];

  var list = Object.create((function () {
    var _Object$create = {};
    _Object$create[Symbol.iterator] = regeneratorRuntime.mark(function callee$2$0() {
      var _this = this;

      var current, next;
      return regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            current = _this;
            next = current.tail;

          case 2:
            if (!(current && current.head)) {
              context$3$0.next = 9;
              break;
            }

            context$3$0.next = 5;
            return current.head;

          case 5:
            current = next;
            next = current.tail;
            context$3$0.next = 2;
            break;

          case 9:
          case "end":
            return context$3$0.stop();
        }
      }, callee$2$0, this);
    });

    _defineProperty(_Object$create, "keys", regeneratorRuntime.mark(function keys() {
      var _this = this;

      var current, next, key;
      return regeneratorRuntime.wrap(function keys$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            current = _this;
            next = current.tail;
            key = 0;

          case 3:
            if (!(current && current.head)) {
              context$3$0.next = 11;
              break;
            }

            context$3$0.next = 6;
            return key;

          case 6:
            key++;
            current = next;
            next = current.tail;
            context$3$0.next = 3;
            break;

          case 11:
          case "end":
            return context$3$0.stop();
        }
      }, keys, this);
    }));

    _defineProperty(_Object$create, "entries", regeneratorRuntime.mark(function entries() {
      var _this = this;

      var current, next, key;
      return regeneratorRuntime.wrap(function entries$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            current = _this;
            next = current.tail;
            key = 0;

          case 3:
            if (!(current && current.head)) {
              context$3$0.next = 11;
              break;
            }

            context$3$0.next = 6;
            return [key, current.head];

          case 6:
            key++;
            current = next;
            next = current.tail;
            context$3$0.next = 3;
            break;

          case 11:
          case "end":
            return context$3$0.stop();
        }
      }, entries, this);
    }));

    _defineProperty(_Object$create, "values", regeneratorRuntime.mark(function values() {
      var _this = this;

      var current, next, key;
      return regeneratorRuntime.wrap(function values$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            current = _this;
            next = current.tail;
            key = 0;

          case 3:
            if (!(current && current.head)) {
              context$3$0.next = 11;
              break;
            }

            context$3$0.next = 6;
            return current.head;

          case 6:
            key++;
            current = next;
            next = current.tail;
            context$3$0.next = 3;
            break;

          case 11:
          case "end":
            return context$3$0.stop();
        }
      }, values, this);
    }));

    return _Object$create;
  })(), {
    head: { writeable: false, enumerable: false, value: head },
    tail: { writeable: false, enumerable: false, value: tail }
  });

  return list;
};

//+ List a
var emptyList = Object.freeze(list());

exports.emptyList = emptyList;
//+ a -> List a -> List a
var cons = function (x) {
  return function (xs) {
    return list(x, xs);
  };
};

exports.cons = cons;
//+ (a -> b -> b) -> b -> List a -> b
var foldr = function (f) {
  return function (a) {
    return function (xs) {
      return go(xs);

      function go(_ref) {
        var _ref2 = _toArray(_ref);

        var x = _ref2[0];

        var xs = _ref2.slice(1);

        if (x == undefined) {
          return a;
        }if (xs == undefined) {
          return f(a, x);
        }return f(x, go(xs));
      }
    };
  };
};

exports.foldr = foldr;
//+ (a -> b) -> List a -> List b
var map = function (f) {
  return foldr(function (x, a) {
    return cons(f(x))(a);
  })(emptyList);
};
exports.map = map;