"use strict";

var _toArray = function (arr) { return Array.isArray(arr) ? arr : Array.from(arr); };

var _slicedToArray = function (arr, i) { if (Array.isArray(arr)) { return arr; } else if (Symbol.iterator in Object(arr)) { var _arr = []; for (var _iterator = arr[Symbol.iterator](), _step; !(_step = _iterator.next()).done;) { _arr.push(_step.value); if (i && _arr.length === i) break; } return _arr; } else { throw new TypeError("Invalid attempt to destructure non-iterable instance"); } };

var _toConsumableArray = function (arr) { if (Array.isArray(arr)) { for (var i = 0, arr2 = Array(arr.length); i < arr.length; i++) arr2[i] = arr[i]; return arr2; } else { return Array.from(arr); } };

var _distIndex = require("../../dist/index");

var cons = _distIndex.cons;
var emptyList = _distIndex.emptyList;
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

    it("can be used with rest", function () {
      var _list = _toArray(list);

      var x = _list[0];

      var xs = _list.slice(1);

      expect(x).to.equal(3);
      expect(xs.length).to.equal(2);
    });

    it("can use object destructuring", function () {
      var head = list.head;
      var tail = list.tail;

      expect(head).to.equal(3);
      expect(tail).to.not.be.undefined;
    });
  });

  describe("spread", function () {
    it("can be spread into an array", function () {
      var xs = [].concat(_toConsumableArray(list), [4, 5]);
      expect(xs.length).to.equal(5);
      expect(xs[0]).to.equal(3);
      expect(xs[1]).to.equal(2);
      expect(xs[2]).to.equal(1);
    });
  });

  describe("for of loop", function () {
    it("iterates through a list", function () {
      var iterations = 0;
      var _iteratorNormalCompletion = true;
      var _didIteratorError = false;
      var _iteratorError = undefined;

      try {
        for (var _iterator = list[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
          var item = _step.value;

          iterations++;
        }
      } catch (err) {
        _didIteratorError = true;
        _iteratorError = err;
      } finally {
        try {
          if (!_iteratorNormalCompletion && _iterator["return"]) {
            _iterator["return"]();
          }
        } finally {
          if (_didIteratorError) {
            throw _iteratorError;
          }
        }
      }

      expect(iterations).to.equal(3);
    });
  });

  describe("keys", function () {
    it("returns an iterator", function () {
      var iter = list.keys();
      expect(iter.next).to.not.be.undefined;
    });

    it("returns numeric keys", function () {
      var iter = list.keys();

      var _iter = _toArray(iter);

      var xs = _iter;

      xs.forEach(function (x, i) {
        expect(i).to.equal(x);
      });
    });
  });

  describe("entries", function () {
    it("returns an iterator", function () {
      var iter = list.entries();
      expect(iter.next).to.not.be.undefined;
    });

    it("returns a pair when iterating", function () {
      var val = list.entries().next().value;
      expect(val.length).to.equal(2);
      expect(val[0]).to.equal(0);
      expect(val[1]).to.equal(3);
    });
  });

  describe("values", function () {
    it("returns an iterator", function () {
      var iter = list.values();
      expect(iter.next).to.not.be.undefined;
    });

    it("returns only values", function () {
      var x = list.values().next().value;
      expect(x).to.equal(3);
    });
  });
});

describe("foldable", function () {
  it("returns the accumulator for an empty list", function () {
    var acc = foldr(function (x) {
      return x;
    })(0)(emptyList);
    expect(acc).to.equal(0);
  });

  it("applies f once for a singleton list", function () {
    var counter = 0;
    foldr(function (_) {
      return counter++;
    })(0)(cons(1)(emptyList));

    expect(counter).to.equal(1);
  });

  it("applies f for each item in the list", function () {
    var counter = 0;
    foldr(function (_) {
      return counter++;
    })(0)(list);

    expect(counter).to.equal(3);
  });

  it("folds a list", function () {
    var arr = foldr(function (x, a) {
      return a.unshift(x) && a;
    })([])(list);
    expect(arr.length).to.equal(3);
  });
});