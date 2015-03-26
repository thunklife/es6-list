import {cons, emptyList, head, tail, foldr, map} from '../../dist/index';
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

      expect(xs.length).to.equal(2);
      expect(xs[0]).to.equal(2);
      expect(xs[1]).to.equal(1);
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
  it('can be folded', function(){
    var sum = foldr((x,y) => x + y)(0)(list);
    expect(sum).to.equal(6);
  });
});

describe('functor', function(){
  it('can be mapped', function(){
    var doubles = map((x) => x * 2)(list);
    var x = head(doubles);
    expect(x).to.equal(6);
  });
});
