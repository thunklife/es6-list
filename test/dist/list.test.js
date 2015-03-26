"use strict";

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _distIndex = require("../../dist/index");

var cons = _distIndex.cons;
var emptyList = _distIndex.emptyList;
var head = _distIndex.head;
var tail = _distIndex.tail;
var foldr = _distIndex.foldr;
var map = _distIndex.map;

var expect = require("chai").expect;

var list;

beforeEach(function () {
  list = cons(3)(cons(2)(cons(1)(emptyList)));
});

describe("list", function () {
  //general list functions
  describe("cons", function () {
    it("constructs a list", function () {
      expect(list.head).to.equal(3);
    });
  });

  describe("head", function () {
    it("returns the head of the list", function () {
      var x = head(list);
      expect(x).to.equal(3);
    });
  });

  describe("tail", function () {
    it("returns the tail of the list", function () {
      var xs = tail(list);

      expect(xs.length).to.equal(2);
      expect(xs[0]).to.equal(2);
      expect(xs[1]).to.equal(1);
    });
  });
});

describe("iterable", function () {
  describe("destructuring", function () {
    it("returns elements when non-empty", function () {
      var _list = _slicedToArray(list, 3);

      var a = _list[0];
      var b = _list[1];
      var c = _list[2];

      expect(a).to.equal(3);
      expect(b).to.equal(2);
      expect(c).to.equal(1);
    });

    it("returns undefined when empty", function () {
      var _emptyList = _slicedToArray(emptyList, 1);

      var a = _emptyList[0];

      expect(a).to.be.undefined;
    });
  });
});

describe("foldable", function () {
  it("can be folded", function () {
    var sum = foldr(function (x, y) {
      return x + y;
    })(0)(list);
    expect(sum).to.equal(6);
  });
});

describe("functor", function () {
  it("can be mapped", function () {
    var doubles = map(function (x) {
      return x * 2;
    })(list);
    var x = head(doubles);
    expect(x).to.equal(6);
  });
});