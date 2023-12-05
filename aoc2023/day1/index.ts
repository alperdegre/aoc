import { readFile } from "../utils";

function main() {
  partOne();
  partTwo();
}

function partOne() {
  const input = readFile("day1-input.txt");
  const lines = input.split("\n");
  let calibration = 0;

  for (const line of lines) {
    if (line.length === 0) {
      continue;
    }
    let first: string = "";
    let last: string = "";

    for (let i = 0; i < line.length; i++) {
      if (!isNaN(parseInt(line[i])) && first.length === 0) {
        first = line[i];
      }
      if (!isNaN(parseInt(line[line.length - 1 - i])) && last === "") {
        last = line[line.length - 1 - i];
      }
    }

    const lineNumber = parseInt(first + last);
    calibration += lineNumber;
  }

  console.log("Part One - Final answer is: " + calibration);
}

const numbers: string[] = [
  "0",
  "zero",
  "1",
  "one",
  "2",
  "two",
  "3",
  "three",
  "4",
  "four",
  "5",
  "five",
  "6",
  "six",
  "7",
  "seven",
  "8",
  "eight",
  "9",
  "nine",
];

function partTwo() {
  const input = readFile("day1-input.txt");
  const lines = input.split("\n");
  let calibration = 0;

  // Go through every line
  for (const line of lines) {
    // Just to make sure if we have a blank line
    if (line.length === 0) {
      continue;
    }

    let first: string = "";
    let last: string = "";
    let firstIndex: number | undefined = undefined;
    let lastIndex: number | undefined = undefined;

    // Loop through numbers array
    for (let i = 0; i < numbers.length; i++) {
      // Get the first and last occurrence indexes of current number
      const firstOccurrence = line.indexOf(numbers[i]);
      const lastOccurrence = line.lastIndexOf(numbers[i]);

      // This block handles the first occurrence
      // Check if the number exists in the array
      if (firstOccurrence !== -1) {
        // Set the initial value if indexes are undefined
        if (firstIndex === undefined) {
          firstIndex = firstOccurrence;
          first = setNumber(i);
        }

        // If new index is lower than the firstIndex we set, we update it
        if (firstOccurrence < firstIndex) {
          firstIndex = firstOccurrence;
          first = setNumber(i);
        }
      }

      // This block handles the last occurrence
      // Check if the number exists in the array
      if (lastOccurrence !== -1) {
        if (lastIndex === undefined) {
          lastIndex = lastOccurrence;
          last = setNumber(i);
        }

        // If new index is higher than the lastIndex we set, we update it
        if (lastOccurrence > lastIndex) {
          lastIndex = lastOccurrence;
          last = setNumber(i);
        }
      }
    }

    // Add together first and last number as a string, parse them to be a number
    const lineNumber = parseInt(first + last);

    // Add it to calibration
    calibration += lineNumber;
  }

  console.log("Part Two - Final answer is: " + calibration);
}

function setNumber(index: number) {
  return index % 2 !== 0 ? numbers[index - 1] : numbers[index];
}

main();
