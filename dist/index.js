"use strict";

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

  var _list_ = { head: head, tail: tail };
  return (function () {
    var _ref = {
      head: head,
      tail: tail };
    _ref[Symbol.iterator] = iterate(function (_, v) {
      return v;
    }, _list_);

    _defineProperty(_ref, "keys", iterate(function (k, _) {
      return k;
    }, _list_));

    _defineProperty(_ref, "entries", iterate(function (k, v) {
      return [k, v];
    }, _list_));

    _defineProperty(_ref, "values", iterate(function (_, v) {
      return v;
    }, _list_));

    return _ref;
  })();
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
//+ (a -> b) -> List a -> List b
var map = function (f) {
  return foldr(function (x, a) {
    return cons(f(x))(a);
  })(emptyList);
};
exports.map = map;