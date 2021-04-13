function clg(str) {
  console.log(str);
}

function third(year) {
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];
  let res = [];
  for (let i = 0; i < 12; i++) {
    let date = new Date(year, i, 14);
    date.getDay() === 6 ? res.push(date.toUTCString()) : null;
  }
  return res[0];
}
clg(third(2019));
