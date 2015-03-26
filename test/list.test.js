import {cons, emptyList, head, tail, foldr, map, toArray} from '../../dist/index';
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
  
  describe('head', function(){
    it('returns the head of the list', function(){
      var x = head(list);
      expect(x).to.equal(3);
    });
  });

  describe('tail', function(){
    it('returns the tail of the list', function(){
      var xs = tail(list);
      expect(head(xs)).to.equal(2);
    });
  });

  describe('toArray', function(){
    it('returns an array of all elements in order', function(){
      var arr = toArray(list);
      expect(arr.length).to.equal(3);
      expect(arr[0]).to.equal(3);
      expect(arr[1]).to.equal(2);
      expect(arr[2]).to.equal(1);
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
