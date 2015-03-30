/*
 * A simple cons/linked list with some extras for fun
 */

function iterate (f, xs) {
  return function* (){
    var current = xs;
    var next = current.tail;
    var key = 0;
    while(current && current.head){
      yield f(key, current.head);
      key++;
      current = next;
      next = current.tail;
    }
  };
}

const list = (head = null, tail = null) => {
  var list = Object.create({
    [Symbol.iterator]: function* (){
      var current = this;
      var next = current.tail;
      while(current && current.head){
        yield current.head;
        current = next;
        next = current.tail;
      }
    },
    keys: function* (){
      var current = this;
      var next = current.tail;
      var key = 0;
      while(current && current.head){
        yield key;
        key++;
        current = next;
        next = current.tail;
      }
    },
    entries: function* (){
      var current = this;
      var next = current.tail;
      var key = 0;
      while(current && current.head){
        yield [key, current.head];
        key++;
        current = next;
        next = current.tail;
      }
    },
    values: function* (){
      var current = this;
      var next = current.tail;
      var key = 0;
      while(current && current.head){
        yield current.head;
        key++;
        current = next;
        next = current.tail;
      }
    }
  }, {
    head: {writeable: false, enumerable: false, value: head},
    tail: {writeable: false, enumerable: false, value: tail}
  });

  return list;
};

//+ List a
export const emptyList = Object.freeze(list());

//+ a -> List a -> List a
export const cons = (x) => (xs) => list(x, xs);

//+ (a -> b -> b) -> b -> List a -> b
export const foldr = (f) => (a) => (xs) => {
  return go(xs);

  function go ([x, ...xs]){
    if (x == undefined) return a;
    if (xs == undefined) return f(a, x);
    return f(x, go(xs));
  }
};

//+ (a -> b) -> List a -> List b
export const map = (f) => foldr((x, a) => cons(f(x))(a))(emptyList);
