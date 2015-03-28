import {cons, emptyList, foldr, map} from '../../dist/index';
import {expect} from 'chai';

var list;

beforeEach(function(){
  list = cons(3)(cons(2)(cons(1)(emptyList)));
});

describe('list', function(){
  //general list functions
  describe('cons', function(){
    it('constructs a list', function(){
      expect(list.head).to.equal(3);
    });
  });
});


describe('iterable', function(){
  describe('destructuring', function(){
    it('returns elements when non-empty', function(){
      var [a,b,c] = list;
      expect(a).to.equal(3);
      expect(b).to.equal(2);
      expect(c).to.equal(1);
    });

    it('returns undefined when empty', function(){
      var [a] = emptyList;
      expect(a).to.be.undefined;
    });

    it('can be used with rest', function(){
      var [x,...xs] = list;
      expect(x).to.equal(3);
      expect(xs.length).to.equal(2);
    })

    it('can use object destructuring', function(){
      var {head, tail} = list;
      expect(head).to.equal(3);
      expect(tail).to.not.be.undefined;
    });
  });

  describe('spread', function(){
    it('can be spread into an array', function(){
      var xs = [...list, 4, 5];
      expect(xs.length).to.equal(5);
      expect(xs[0]).to.equal(3);
      expect(xs[1]).to.equal(2);
      expect(xs[2]).to.equal(1);
    });
  });

  describe('for of loop', function(){
    it('iterates through a list', function(){
      var iterations = 0;
      for(var item of list){
       iterations++;
      }

      expect(iterations).to.equal(3);
    });
  });
});

describe('foldable', function(){
  it('returns the accumulator for an empty list', function(){
    var acc = foldr((x) => x)(0)(emptyList);
    expect(acc).to.equal(0);
  });

  it('applies f once for a singleton list', function(){
    var counter = 0;
    foldr((_) => counter++)(0)(cons(1)(emptyList));

    expect(counter).to.equal(1);
  });

  it('applies f for each item in the list', function(){
    var counter = 0;
    foldr((_) => counter++)(0)(list);

    expect(counter).to.equal(3);
  });

  it('folds a list', function(){
    var arr = foldr((x,a) => a.unshift(x) && a)([])(list);
    expect(arr.length).to.equal(3);
  });
});
