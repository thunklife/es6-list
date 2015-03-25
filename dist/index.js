"use strict";

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

    _ref[Symbol.iterator] = function () {
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
          if (current) {
            var val = current.head;
            current = next;
            next = next.tail;
            return { value: val, done: false };
          }
          return { value: undefined, done: true };
        })
      };
    };

    return _ref;
  })();
};

//+ [a]
var emptyList = Object.freeze(list());

exports.emptyList = emptyList;
//+ a -> [a] -> [a]
var cons = function (x) {
  return function (xs) {
    return list(x, xs);
  };
};

exports.cons = cons;
//+ [a] -> a
var head = function (_ref) {
  var head = _ref.head;
  return head;
};

exports.head = head;
//+ (b -> a -> b) -> b -> [a] -> [b]
var foldr = function (f) {
  return function (a) {
    return function (xs) {
      return go(xs);

      function go(_ref) {
        var head = _ref.head;
        var tail = _ref.tail;

        if (!head) {
          return a;
        }return f(go(tail), head);
      }
    };
  };
};

exports.foldr = foldr;
//+ [a] -> [a]
var tail = function (xs) {
  return foldr(function (a, x) {
    return a.unshift(x) && a;
  })([])(xs.tail);
};

exports.tail = tail;
//+ (a->b) -> [a] -> [b]
var map = function (f) {
  return foldr(function (a, x) {
    return cons(f(x))(a);
  })(emptyList);
};
exports.map = map;