import {cons, emptyList, head, tail, foldr, map} from '../../dist/index';
import {should} from 'chai';
should = should(); //because should is a function and I don't know how to make import do this for me.

describe('List', function(){
  var list;
  beforeEach(function(){
    list = cons(3)(cons(2)(cons(1)(emptyList)));
  });

  it('can cons a list', function(){
    list.head.should.equal(3);
  });

  it('returns the head of the list', function(){
    var x = head(list);
    x.should.equal(3);
  });

  it('returns the tail of the list', function(){
    var xs = tail(list);

    xs.length.should.equal(2);
    xs[0].should.equal(2);
    xs[1].should.equal(1);
  });

  it('can be deconstructed', function(){
    var [a,b,c] = list;
    a.should.equal(3);
    b.should.equal(2);
    c.should.equal(1);
  });

  it('can be folded', function(){
    var sum = foldr((x,y) => x + y)(0)(list);
    sum.should.equal(6);
  });

  it('can be mapped', function(){
    var doubles = map((x) => x * 2)(list);
    var x = head(doubles);
    x.should.equal(6);
  });
});
