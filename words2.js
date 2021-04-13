function brackets(expr) {
  let res = true;
  const simbols = ["{", "(", "[", "}", ")", "]"];
  const simbObj = {
    "{": "}",
    "(": ")",
    "[": "]",
  };
  const simbObjReverse = {
    "}": "{",
    ")": "(",
    "]": "[",
  };

  const filteredList = expr.split("").filter((s) => simbols.includes(s));

  if (filteredList.length % 2 !== 0) return false;
 
  const resList = filteredList.reduce((acc, el, i, arr) => {
    
    const length = acc.length - 1;
    if (simbObj[el]) {
      acc.push(el);
      return acc;
    } else if (simbObjReverse[el] === acc[ length ]) {
      acc.pop();
      return acc;
    } else {
      res = false;
      return acc;
    }
  }, []);
  return res;
}

// console.log('Example:');
// console.log(brackets("(5+3)*2+1)"));

// These "asserts" are used for self-checking
console.log(brackets("((5+3)*2+1)"), true);
console.log(brackets("{[(3+1)+2]+}"), true);
console.log(brackets("(3+{1-1)}"), false);
console.log(brackets("[1+1]+(2*2)-{3/3}"), true);
console.log(brackets("(({[(((1)-2)+3)-3]/3}-3)"), false);
console.log(brackets("[(3)+(-1)]*{3}"), true);
console.log(brackets("(((([[[{{{3}}}]]]]))))"), false);
console.log(brackets("[1+202]*3*({4+3)}"), false);
console.log(brackets("({[3]})-[4/(3*{1001-1000}*3)/4]"), true);
console.log(brackets("[[[1+[1+1]]])"), false);
console.log(brackets("(((1+(1+1))))]"), false);
console.log(brackets("2+3"), true);
