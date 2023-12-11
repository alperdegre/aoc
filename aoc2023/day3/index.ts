import { readFile } from "../utils";

function main() {
  partOne();
}

function partOne() {
  const input = readFile("day3-input.txt");
  const lines = input.split("\n");

  const partNumbers = [];

  for (let i = 0; i < lines.length; i++) {
    // Extract numbers of the line using regexp
    let numbers = lines[i].match(/\d+/g);
    for (let j = 0; j < lines[i].length; j++) {
      // Check if we are at the start of the next number in the line
      if (numbers && "0" in numbers && numbers[0].startsWith(lines[i][j])) {
        let numAdded = false;
        const areaLength = numbers[0].length + 2;

        // Look at the start of the number and check if theres a symbol there
        if (j > 0) {
          // Check if the pointer is at a symbol
          if (
            isNaN(parseInt(lines[i][j - 1])) &&
            lines[i][j - 1] !== "." &&
            lines[i][j - 1] !== undefined &&
            !numAdded
          ) {
            // If so, add it to partNumbers array, set numAdded to true
            partNumbers.push(numbers[0]);
            numAdded = true;
          }
        }

        // Look at the end of the number and check if theres a symbol there
        if (j + numbers[0].length < lines[i].length && !numAdded) {
          // Check if the pointer is at a symbol
          if (
            isNaN(parseInt(lines[i][j + numbers[0].length])) &&
            lines[i][j + numbers[0].length] !== "." &&
            lines[i][j + numbers[0].length] !== undefined &&
            !numAdded
          ) {
            // If so, add it to partNumbers array, set numAdded to true
            partNumbers.push(numbers[0]);
            numAdded = true;
          }
        }

        // If the number still hasnt added to partNumbers
        if (!numAdded) {
          // Place 2 search indexes on top left and bottom left of the number, go through to the upper and lower end diagonal and check if there are symbols
          for (let k = 0; k < areaLength; k++) {
            // Check to make sure line isnt the first line
            if (i > 0) {
              // Place a search pointer on top left of the number
              const topSearch = lines[i - 1][j + k - 1];
              // Check if the pointer is at a symbol
              if (
                isNaN(parseInt(topSearch)) &&
                topSearch !== "." &&
                topSearch !== undefined &&
                !numAdded
              ) {
                // If so, add it to partNumbers array, set numAdded to true
                partNumbers.push(numbers[0]);
                numAdded = true;
                break;
              }
            }

            // Check to make sure line isnt the last line
            if (i < lines.length - 1) {
              // Place a search pointer on bottom left of the number
              const bottomSearch = lines[i + 1][j + k - 1];
              // Check if the pointer is at a symbol
              if (
                isNaN(parseInt(bottomSearch)) &&
                bottomSearch !== "." &&
                bottomSearch !== undefined &&
                !numAdded
              ) {
                // If so, add it to partNumbers array, set numAdded to true
                partNumbers.push(numbers[0]);
                numAdded = true;
                break;
              }
            }
          }
        }

        // After we are done searching for a symbol around the number, move the index by the length of the number so we can search through the next one
        if (numbers && numbers[0]) {
          j += numbers[0].length;
        }

        // Remove the first element of the numbers array, as we're done with that number on the line
        numbers.shift();
      }
    }
  }

  // Get the sum of part numbers from partNumbers array
  const sumOfPartNumbers = partNumbers.reduce((prev, curr) => {
    return +prev + +curr;
  }, 0);

  console.log("Part One - Sum of Allowed Ids : " + sumOfPartNumbers);
}

main();