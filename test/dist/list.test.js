"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _distIndex = require("../../dist/index");

var cons = _distIndex.cons;
var emptyList = _distIndex.emptyList;
var head = _distIndex.head;
var tail = _distIndex.tail;
var foldr = _distIndex.foldr;
var map = _distIndex.map;

var should = require("chai").should;

should = should(); //because should is a function and I don't know how to make import do this for me.

describe("List", function () {
  var list;
  beforeEach(function () {
    list = cons(3)(cons(2)(cons(1)(emptyList)));
  });

  it("can cons a list", function () {
    list.head.should.equal(3);
  });

  it("returns the head of the list", function () {
    var x = head(list);
    x.should.equal(3);
  });

  it("returns the tail of the list", function () {
    var xs = tail(list);

    xs.length.should.equal(2);
    xs[0].should.equal(2);
    xs[1].should.equal(1);
  });

  it("can be deconstructed", function () {
    var _list = _slicedToArray(list, 3);

    var a = _list[0];
    var b = _list[1];
    var c = _list[2];

    a.should.equal(3);
    b.should.equal(2);
    c.should.equal(1);
  });

  it("can be folded", function () {
    var sum = foldr(function (x, y) {
      return x + y;
    })(0)(list);
    sum.should.equal(6);
  });

  it("can be mapped", function () {
    var doubles = map(function (x) {
      return x * 2;
    })(list);
    var x = head(doubles);
    x.should.equal(6);
  });
});