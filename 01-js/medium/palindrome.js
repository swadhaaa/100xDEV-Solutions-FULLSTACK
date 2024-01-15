/*
  Implement a function `isPalindrome` which takes a string as argument and returns true/false as its result.
  Note: the input string is case-insensitive which means 'Nan' is a palindrom as 'N' and 'n' are considered case-insensitive.
*/

function isPalindrome(str) {
  let str1;
  str = str.toLowerCase().replace(/[^a-z0-9]/gi, ''); 
  str1 = str.split('').reverse().join('');
  if(str==str1){
    return true;
  } else{
    return false;
  }
}

module.exports = isPalindrome;
