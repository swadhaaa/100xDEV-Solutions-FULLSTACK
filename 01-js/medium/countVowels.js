/*
  Implement a function `countVowels` that takes a str as an argument and returns the number of vowels in the str.
  Note: Consider both uppercase and lowercase vowels ('a', 'e', 'i', 'o', 'u').

  Once you've implemented the logic, test your code by running
*/

function countVowels(str) {
  // Your code here
    let i = 0 ;
    for (let j = 0; j <= str.length; j++) {
      if (
        str.charAt(j) == 'a' ||
        str.charAt(j) == 'e' || 
        str.charAt(j) == 'i' ||
        str.charAt(j) == 'o' ||
        str.charAt(j) == 'u' ||
        str.charAt(j) == 'A' ||
        str.charAt(j) == 'E' ||
        str.charAt(j) == 'I' ||
        str.charAt(j) == 'O' ||
        str.charAt(j) == 'U'
      ) {
        i += 1;
      }
    }
    return(i);
  }


module.exports = countVowels;