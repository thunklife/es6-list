/*
 * A simple cons/linked list with some extras for fun
 */

const list = (head = null, tail = null) => {
  return {
    head,
    tail,
    [Symbol.iterator](){
      let current = this,
        next = this.tail;
      return {
        next(){
          if(current){
            var val = current.head;
            current = next;
            next = next.tail;
            return {value: val, done: false};
          }
          return {value: undefined, done: true};
        }
      };
    }
  };
};

//+ [a]
export const emptyList = Object.freeze(list());

//+ a -> [a] -> [a]
export const cons = (x) => (xs) => list(x,xs);

//+ [a] -> a
export const head = ({head}) => head;

//+ (b -> a -> b) -> b -> [a] -> [b]
export const foldr = (f) => (a) => ({head, tail}) => {
  if(!head) return a;
  return foldr(f)(f(a,head))(tail);
};

//+ [a] -> [a]
export const tail = (xs) => foldr((a,x) => a.push(x) && a)([])(xs.tail);

//+ (a->b) -> [a] -> [b]
export const map = foldr((a,x) => cons(x)(a))(emptyList);
