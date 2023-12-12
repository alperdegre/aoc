"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function main() {
    partOne();
    partTwo();
}
function partOne() {
    const input = (0, utils_1.readFile)("day3-input.txt");
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
                    if (isNaN(parseInt(lines[i][j - 1])) &&
                        lines[i][j - 1] !== "." &&
                        lines[i][j - 1] !== undefined &&
                        !numAdded) {
                        // If so, add it to partNumbers array, set numAdded to true
                        partNumbers.push(numbers[0]);
                        numAdded = true;
                    }
                }
                // Look at the end of the number and check if theres a symbol there
                if (j + numbers[0].length < lines[i].length && !numAdded) {
                    // Check if the pointer is at a symbol
                    if (isNaN(parseInt(lines[i][j + numbers[0].length])) &&
                        lines[i][j + numbers[0].length] !== "." &&
                        lines[i][j + numbers[0].length] !== undefined &&
                        !numAdded) {
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
                            if (isNaN(parseInt(topSearch)) &&
                                topSearch !== "." &&
                                topSearch !== undefined &&
                                !numAdded) {
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
                            if (isNaN(parseInt(bottomSearch)) &&
                                bottomSearch !== "." &&
                                bottomSearch !== undefined &&
                                !numAdded) {
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
function extractNumber(line, startIndex) {
    let startFound = false;
    let endFound = false;
    let startIx = 0;
    let endIx = line.length;
    for (let i = startIndex; i > 0; i--) {
        if (startFound)
            break;
        if (isNaN(parseInt(line[i - 1]))) {
            startIx = i;
            startFound = true;
        }
    }
    for (let i = startIndex; i < line.length; i++) {
        if (endFound)
            break;
        if (isNaN(parseInt(line[i]))) {
            endIx = i;
            endFound = true;
        }
    }
    const number = line.slice(startIx, endIx);
    const parsedNumber = parseInt(number);
    return parsedNumber;
}
function partTwo() {
    const input = (0, utils_1.readFile)("day3-input.txt");
    const lines = input.split("\n");
    const gearRatioArray = [];
    for (let i = 0; i < lines.length; i++) {
        for (let j = 0; j < lines[i].length; j++) {
            // Check if we are at a gear
            if (lines[i][j] === "*") {
                // Area length will be a constant around the gear
                const areaLength = 3;
                const numArray = [];
                // Look at the start of the gear and check if theres a number there
                // Make sure we're not at the start
                if (j > 0) {
                    // If the previous symbol is a number
                    if (!isNaN(parseInt(lines[i][j - 1]))) {
                        // Extract the number
                        const number = extractNumber(lines[i], j - 1);
                        numArray.push(number);
                    }
                }
                // Make sure we're not at the end
                if (j < lines[i].length) {
                    // If the next symbol is a number
                    if (!isNaN(parseInt(lines[i][j + 1]))) {
                        // Extract the number
                        const number = extractNumber(lines[i], j + 1);
                        numArray.push(number);
                    }
                }
                // Add two variables to see what the last added number for the row is
                let lastAddedTopNum = 0;
                let lastAddedBottomNum = 0;
                // Place 2 search indexes on top left and bottom left of the number, go through to the upper and lower end diagonal and check if there are symbols
                for (let k = 0; k < areaLength; k++) {
                    // Check if we are not the first line
                    if (i > 0) {
                        // Set the top index while keeping in mind if we're at the start of the row
                        const topIx = j === 0 ? j + k : j + k - 1;
                        // Place a search pointer on top left of the number
                        const topSearch = lines[i - 1][topIx];
                        if (!isNaN(parseInt(topSearch))) {
                            // Extract the number
                            const number = extractNumber(lines[i - 1], topIx);
                            if (number !== lastAddedTopNum) {
                                numArray.push(number);
                                lastAddedTopNum = +number;
                            }
                        }
                    }
                    if (i < lines.length - 1) {
                        // Set the bottom index while keeping in mind if we're at the start of the row
                        const bottomIx = j === lines[i].length - 1 ? j + k : j + k - 1;
                        // Place a search pointer on bottom left of the number
                        const bottomSearch = lines[i + 1][bottomIx];
                        if (!isNaN(parseInt(bottomSearch))) {
                            // Extract the number
                            const number = extractNumber(lines[i + 1], bottomIx);
                            if (number !== lastAddedBottomNum) {
                                numArray.push(number);
                                lastAddedBottomNum = +number;
                            }
                        }
                    }
                }
                // Check if for the given gear, there are exactly 2 numbers attached to it
                if (numArray.length === 2) {
                    // Get the multiplication of these gear numbers
                    const multiplicationOfGearNumbers = numArray.reduce((prev, curr, ix) => {
                        return prev * curr;
                    }, 1);
                    // Push them to gear ratio array for calculation
                    gearRatioArray.push(multiplicationOfGearNumbers);
                }
            }
        }
    }
    // Calculate the solution by adding up the gear ratios
    const solution = gearRatioArray.reduce((prev, curr, _) => {
        return prev + curr;
    });
    console.log("Part Two - Sum of All Gear Ratios : " + solution);
}
main();
