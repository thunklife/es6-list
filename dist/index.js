"use strict";

var _core = require("babel-runtime/core-js")["default"];

var _regeneratorRuntime = require("babel-runtime/regenerator")["default"];

Object.defineProperty(exports, "__esModule", {
  value: true
});
/*
 * A simple cons/linked list with some extras for fun
 */

var list = function () {
  var head = arguments[0] === undefined ? null : arguments[0];
  var tail = arguments[1] === undefined ? null : arguments[1];

  return (function () {
    var _ref = {
      head: head,
      tail: tail };
    _ref[_core.Symbol.iterator] = _regeneratorRuntime.mark(function callee$2$0() {
      var _this = this;

      var current, next, val;
      return _regeneratorRuntime.wrap(function callee$2$0$(context$3$0) {
        while (1) switch (context$3$0.prev = context$3$0.next) {
          case 0:
            current = _this;
            next = _this.tail;

          case 2:
            if (!(current && current.head)) {
              context$3$0.next = 10;
              break;
            }

            val = current.head;

            current = next;
            next = next.tail;
            context$3$0.next = 8;
            return val;

          case 8:
            context$3$0.next = 2;
            break;

          case 10:
          case "end":
            return context$3$0.stop();
        }
      }, callee$2$0, this);
    });
    return _ref;
  })();
};

//+ List a
var emptyList = _core.Object.freeze(list());

exports.emptyList = emptyList;
//+ a -> List a -> List a
var cons = function (x) {
  return function (xs) {
    return list(x, xs);
  };
};

exports.cons = cons;
//+ List a -> a
var head = function (_ref) {
  var head = _ref.head;
  return head;
};

exports.head = head;
//+ List a -> List a
var tail = function (_ref) {
  var head = _ref.head;
  var tail = _ref.tail;
  return tail;
};

exports.tail = tail;
//+ (a -> b -> b) -> b -> List a -> b
var foldr = function (f) {
  return function (a) {
    return function (xs) {
      return go(xs);

      function go(_ref) {
        var head = _ref.head;
        var tail = _ref.tail;

        if (head == undefined) {
          return a;
        }if (tail == undefined) {
          return f(a, head);
        }return f(head, go(tail));
      }
    };
  };
};

exports.foldr = foldr;
//+ List a -> [a]
var toArray = foldr(function (x, a) {
  return a.unshift(x) && a;
})([]);

exports.toArray = toArray;
//+ (a -> b) -> List a -> List b
var map = function (f) {
  return foldr(function (x, a) {
    return cons(f(x))(a);
  })(emptyList);
};
exports.map = map;