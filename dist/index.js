/*
 * A simple cons/linked list with some extras for fun
 */

//+ [a]
"use strict";

var emptyList = Object.freeze({});

//+ a -> [a] -> [a]
var cons = function (x) {
  return function (xs) {
    return { head: x, tail: xs };
  };
};

//+ [a] -> a
var head = function (_ref) {
  var head = _ref.head;
  return head;
};

//+ (b -> a -> b) -> b -> [a] -> [b]
var foldr = function (f) {
  return function (a) {
    return function (_ref) {
      var head = _ref.head;
      var tail = _ref.tail;

      if (!xs.head) return a;
      return foldr(f)(f(a, head))(tail);
    };
  };
};

//+ [a] -> [a]
var tail = foldr(function (a, x) {
  return a.push(x) && a;
})([]);

//+ (a->b) -> [a] -> [b]
var map = foldr(function (a, x) {
  return cons(x)(a);
})(emptyList);