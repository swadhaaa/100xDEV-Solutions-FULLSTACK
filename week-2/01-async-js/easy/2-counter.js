// ## Counter without setInterval
// Without using setInterval, try to code a counter in Javascript. There is a hint at the bottom of the file if you get stuck


function counterWithoutSetInterval() {
  let count = 0;

  function updateSrn() {
    console.clear();
    count++;
    console.log(count);
    setTimeout(updateSrn, 1000);
  }

  updateSrn();
}

counterWithoutSetInterval();













































