import { readFile } from "../utils";

function main() {
  partOne();
  partTwo();
}

function partOne() {
  const input = readFile("day4-input.txt");
  const lines = input.split("\n");
  const totalNumbers: number[] = [];

  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i].split(":").slice(1);
    // Extract winning numbers and the numbers we have on the card
    const [winningNumbersString, myNumbersString] = numbers[0].split(" | ");
    const winningNumbers = winningNumbersString.trim().split(" ");
    const myNumbers = myNumbersString.trim().split(" ");
    const winsForCard = [];

    for (let i = 0; i < winningNumbers.length; i++) {
      // If muNumbers has the number and it isnt a blank string, it is a win!
      if (
        myNumbers.includes(winningNumbers[i]) &&
        winningNumbers[i].length > 0
      ) {
        winsForCard.push("win");
      }
    }

    // If the card has any wins, cardValue can be found with this formula
    const cardValue =
      winsForCard.length === 0 ? 0 : 2 ** (winsForCard.length - 1);
    totalNumbers.push(cardValue);
  }

  // We reduce the totalNumbers array to calculate total winnings
  const totalWinnings = totalNumbers.reduce((prev, curr, _) => {
    return +prev + +curr;
  }, 0);

  console.log("Part One - Total Scratch Card Winnings : " + totalWinnings);
}

function partTwo() {
  const input = readFile("day4-input.txt");
  const lines = input.split("\n");
  // Lets store our windata in a tuple array
  const winData: Array<[wins: number, cards: number]> = [];
  let totalCards = 0;

  for (let i = 0; i < lines.length; i++) {
    const numbers = lines[i].split(":").slice(1);
    const [winningNumbersString, myNumbersString] = numbers[0].split(" | ");
    const winningNumbers = winningNumbersString.trim().split(" ");
    const myNumbers = myNumbersString.trim().split(" ");
    const winsForCard = [];

    // Calculation for first winnings is the same as Part One
    for (let i = 0; i < winningNumbers.length; i++) {
      if (
        myNumbers.includes(winningNumbers[i]) &&
        winningNumbers[i].length > 0
      ) {
        winsForCard.push("win");
      }
    }

    winData.push([winsForCard.length, 1]);
  }

  // Lets go through the winData array of tuples
  for (let j = 0; j < winData.length; j++) {
    // We add the card amount to totalCards which is the second element of every tuple
    totalCards += winData[j][1];
    // Check if card has any winnings
    if (winData[j][0] > 0) {
      // If there are any winnings associated with the card,
      // Increment every value after this one by 1
      for (let k = 0; k < winData[j][0]; k++) {
        // This increment amount must by multipled by the card amount
        winData[j + k + 1][1] += 1 * winData[j][1];
      }
    }
  }

  console.log("Part Two - Total Amount of Scratch Cards : " + totalCards);
}

main();
