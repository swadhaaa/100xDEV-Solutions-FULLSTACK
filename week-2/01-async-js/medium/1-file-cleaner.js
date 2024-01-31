// ## File cleaner
// Read a file, remove all the extra spaces and write it back to the same file.

// For example, if the file input was
// ```
// hello     world    my    name   is       raman
// ```

// After the program runs, the output should be

// ```
// hello world my name is raman
// ```

const fs = require('fs');

fs.readFile('swa.txt', 'utf-8', (err, res) => {
    const result = res;
    const resultString = result.split(' ');
    let updateString = '';
    resultString.forEach((word) => {
        if (word.length > 0) {
            updateString += word + " ";
        }
    });

    console.log(updateString);
})