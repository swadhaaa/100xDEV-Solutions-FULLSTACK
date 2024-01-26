/*
 * Write 3 different functions that return promises that resolve after t1, t2, and t3 seconds respectively.
 * Write a function that uses the 3 functions to wait for all 3 promises to resolve using Promise.all,
 * Return a promise.all which return the time in milliseconds it takes to complete the entire operation.
 */

function delay(ms) {
    return new Promise((resolve) => setTimeout(resolve, ms));
  }
  
  function waitOneSecond() {
    return delay(1000);
  }
  
  function waitTwoSeconds() {
    return delay(2000);
  }
  
  function waitThreeSeconds() {
    return delay(3000);
  }
  
  function calculateTime() {
    const startTime = Date.now();
  
    return Promise.all([
      waitOneSecond(),
      waitTwoSeconds(),
      waitThreeSeconds(),
    ]).then(() => {
      const endTime = Date.now();
      const totalTime = endTime - startTime;
      console.log(`All promises resolved in ${totalTime} milliseconds`);
    });
  }
  
  calculateTime();