/*
 * A simple cons/linked list with some extras for fun
 */

const list = (head = null, tail = null) => {
  return {
    head,
    tail,
    [Symbol.iterator]: function* (){
      var current = this;
      var next = this.tail;
      while(current && current.head){
        var val = current.head;
        current = next;
        next = next.tail;
        yield val;
      }
    }
  };
};

//+ List a
export const emptyList = Object.freeze(list());

//+ a -> List a -> List a
export const cons = (x) => (xs) => list(x, xs);

//+ List a -> a
export const head = ({head}) => head;

//+ List a -> List a
export const tail = ({head, tail}) => tail;

//+ (a -> b -> b) -> b -> List a -> b
export const foldr = (f) => (a) => (xs) => {
  return go(xs);

  function go ({head, tail}){
    if (head == undefined) return a;
    if (tail == undefined) return f(a, head);
    return f(head, go(tail));
  }
};

//+ List a -> [a]
export const toArray = foldr((x, a) => (a.unshift(x) && a))([]);

//+ (a -> b) -> List a -> List b
export const map = (f) => foldr((x, a) => cons(f(x))(a))(emptyList);
