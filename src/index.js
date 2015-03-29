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
  }
}

const list = (head = null, tail = null) => {
  var _list_ = {head, tail};
  return {
    head,
    tail,
    [Symbol.iterator]: iterate((_, v) => v, _list_),
    keys: iterate((k, _) => k, _list_),
    entries: iterate((k, v) => [k, v], _list_),
    values: iterate((_, v) => v, _list_)
  };
};

//+ List a
export const emptyList = Object.freeze(list());

//+ a -> List a -> List a
export const cons = (x) => (xs) => list(x, xs);

//+ (a -> b -> b) -> b -> List a -> b
export const foldr = (f) => (a) => (xs) => {
  return go(xs);

  function go ({head, tail}){
    if (head == undefined) return a;
    if (tail == undefined) return f(a, head);
    return f(head, go(tail));
  }
};

//+ (a -> b) -> List a -> List b
export const map = (f) => foldr((x, a) => cons(f(x))(a))(emptyList);

//+ List a -> Generator[[Number, a]]

//+ List a -> Generator[a]
