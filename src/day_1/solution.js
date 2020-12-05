const { pipe } = require("ramda");
const BST = require("../utils/binary_search_tree");
const readlineAsyncGenerator = require("../utils/generator_line_reader");

// ================================================================
//          Day 1 - Part 1
// ================================================================
function findTwoNumbersSumming(targetSum) {
  return function ({ tree, list }) {
    let soughtNumbers;
    list.some((testValue) => {
      let remainder = targetSum - testValue;
      let exists = tree.search(remainder);
      if (exists) {
        soughtNumbers = [testValue, remainder];
      }
      return exists;
    });

    return soughtNumbers;
  };
}

// To produce answer on console
processInput().then(pipe(findTwoNumbersSumming(2020), product, logIt));

// ================================================================
//          Day 1 - Part 2
// ================================================================
function findThreeNumbersSumming(targetSum) {
  return function ({ tree, list }) {
    let values;

    for (let i = 0; i < list.length; i++) {
      let currentValue = list[i];
      let remainder = targetSum - currentValue;
      let pair = findTwoNumbersSumming(remainder)({ tree, list });
      if (pair) {
        values = [currentValue, ...pair];
        break;
      }
    }
    return values;
  };
}

processInput().then(pipe(findThreeNumbersSumming(2020), product, logIt));

// ================================================================
//          Utils
// ================================================================
async function processInput() {
  const path = "./src/day_1/input.txt";

  const rl = readlineAsyncGenerator(path);

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

function product(input) {
  if (!input) return false;
  return input.reduce((acc, curr) => acc * curr, 1);
}
function logIt(it) {
  console.log(it);
  return it;
}
