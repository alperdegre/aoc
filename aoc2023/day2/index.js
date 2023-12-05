"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const utils_1 = require("../utils");
function main() {
    partOne();
    partTwo();
}
function partOne() {
    const input = (0, utils_1.readFile)("day2-input.txt");
    const lines = input.split("\n");
    const allowedBlue = 14;
    const allowedGreen = 13;
    const allowedRed = 12;
    let allowedIds = 0;
    for (let i = 0; i < lines.length; i++) {
        const games = lines[i].split(":").slice(1);
        for (const game of games) {
            const sets = game.split(";");
            let allowed = true;
            for (const set of sets) {
                const boxes = set.trim().split(",");
                for (const box of boxes) {
                    const number = +box.trim().split(" ")[0];
                    if (box.includes("green") && number > allowedGreen) {
                        allowed = false;
                    }
                    else if (box.includes("blue") && number > allowedBlue) {
                        allowed = false;
                    }
                    else if (box.includes("red") && number > allowedRed) {
                        allowed = false;
                    }
                }
            }
            if (allowed) {
                allowedIds += i + 1;
            }
        }
    }
    console.log("Part One - Sum of Allowed Ids : " + allowedIds);
}
function partTwo() {
    const input = (0, utils_1.readFile)("day2-input.txt");
    const lines = input.split("\n");
    let sumOfPowers = 0;
    for (let i = 0; i < lines.length; i++) {
        const games = lines[i].split(":").slice(1);
        for (const game of games) {
            const sets = game.split(";");
            let blue = 0;
            let green = 0;
            let red = 0;
            for (const set of sets) {
                const boxes = set.trim().split(",");
                for (const box of boxes) {
                    const number = +box.trim().split(" ")[0];
                    if (box.includes("green") && number > green) {
                        green = number;
                    }
                    else if (box.includes("blue") && number > blue) {
                        blue = number;
                    }
                    else if (box.includes("red") && number > red) {
                        red = number;
                    }
                }
            }
            const power = blue * green * red;
            sumOfPowers += power;
        }
    }
    console.log("Part Two - Sum of Powers : " + sumOfPowers);
}
main();
