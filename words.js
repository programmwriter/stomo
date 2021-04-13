function brackets(expr) {
  let res = true;
  const simbols = ["{", "(", "[", "}", ")", "]"];
  const simbObj = {
    "{": "}",
    "(": ")",
    "[": "]",
  };

  const filteredList = expr.split("").filter((s) => simbols.includes(s));
  if (filteredList.length % 2 !== 0) return false;

  const firstHalf = filteredList.slice(0, filteredList.length / 2);
  const lastHalf = filteredList
    .slice(filteredList.length / 2)
    .reverse()
    .map((el) => {
      switch (el) {
        case "}":
          return "{";
          break;
        case "]":
          return "[";
          break;
        case ")":
          return "(";
          break;

        default:
          break;
      }
    });
  console.log(" -----------------");
  console.log(`firstHalf  -> ${firstHalf}/ lastHalf  -> ${lastHalf}/ filteredList  -> ${filteredList}`);
  console.log(" -----------------");

  // filteredList.forEach((el, i) => {
  //   if (simbObj[el]) {
  //     const isNotSameNext = el !== filteredList[i + 1];
  //     const ind = filteredList.indexOf(simbObj[el], i);
  //     if ((ind - i) % 2 === 0) res = false;
  //   }
  // });

  // if (
  //   firstHalf.every((el, i) => {
  //     console.table(
  //       `simbObj[el]===lastHalf[i] -> ${simbObj[el] === lastHalf[i]}`);
  //       console.log(" -------------------------------------------------------")
  //       console.log("simbObj[el] === lastHalf[i]", simbObj[el] === lastHalf[i], `filteredList -> ${filteredList} res -> ${res} `)
  //       console.log(" -------------------------------------------------------")
  //     return simbObj[el] === lastHalf[i];
  //   })
  // ) {
  //   res = true;
  // }

  //console.table(`filteredList -> ${filteredList} `);

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
