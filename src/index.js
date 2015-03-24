/*
 * A simple cons/linked list with some extras for fun
 */

//+ [a]
const emptyList = Object.freeze({});

//+ a -> [a] -> [a]
const cons = (x) => (xs) => ({head: x, tail: xs});

//+ [a] -> a
const head = ({head}) => head;

//+ (b -> a -> b) -> b -> [a] -> [b]
const foldr = (f) => (a) => ({head, tail}) => {
  if(!xs.head) return a;
  return foldr(f)(f(a,head))(tail);
};

//+ [a] -> [a]
const tail = foldr((a,x) => a.push(x) && a)([]);

//+ (a->b) -> [a] -> [b]
const map = foldr((a,x) => cons(x)(a))(emptyList);
