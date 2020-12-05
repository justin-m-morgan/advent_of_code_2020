const readline = require("readline");
const fs = require("fs");
const BST = require("../utils/binary_search_tree");

async function processLineByLine() {
  const filestream = fs.createReadStream("./src/day_1/input.txt");

  const rl = readline.createInterface({
    input: filestream,
    srlfDelay: Infinity,
  });

  // Gather Values from file
  let tree;
  let list = [];
  for await (const line of rl) {
    let value = parseInt(line);
    list.push(value);
    if (!tree) {
      tree = new BST(value);
    } else {
      tree.insert(value);
    }
  }
  return { tree, list };
}

// ================================================================
//          Day 1 - Part 1
// ================================================================
async function findTwoNumbersSumming(targetSum) {
  const { tree, list } = await processLineByLine();

  let soughtNumbers;
  const sumExists = list.some((value) => {
    let targetValue = targetSum - value;
    let exists = tree.search(targetValue);
    if (exists) {
      soughtNumbers = [value, targetValue];
    }
    return exists;
  });

  let result = sumExists ? soughtNumbers : false;
  let resultProduct;
  if (result) {
    resultProduct = result[0] * result[1];
  }
  console.log(resultProduct);
}

// To produce answer on console
// findTwoNumbersSumming(2020);

// ================================================================
//          Day 1 - Part 2
// ================================================================
