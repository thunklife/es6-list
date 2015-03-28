"use strict";

var _core = require("babel-runtime/core-js")["default"];

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

    _ref[_core.Symbol.iterator] = function () {
      var current = this,
          next = this.tail;
      return {
        next: (function (_next) {
          var _nextWrapper = function next() {
            return _next.apply(this, arguments);
          };

          _nextWrapper.toString = function () {
            return _next.toString();
          };

          return _nextWrapper;
        })(function () {
          if (!current || !current.head) return { value: undefined, done: true };
          var val = current.head;
          current = next;
          next = next.tail;
          return { value: val, done: false };
        })
      };
    };

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