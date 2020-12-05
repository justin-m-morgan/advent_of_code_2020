class BinaryNode {
  constructor(value) {
    this.value = value || null;
    this[-1] = null;
    this[1] = null;
  }
}

class BinarySearchTree {
  constructor(rootValue) {
    this.root = new BinaryNode(rootValue);
  }
  insert(value) {
    let currentNode = this.root;
    while (currentNode) {
      const difference = currentNode.value - value;
      const differenceSign = Math.sign(difference);
      if (currentNode[differenceSign] || difference == 0) {
        currentNode = currentNode[differenceSign];
      } else {
        currentNode[differenceSign] = new BinaryNode(value);
        break;
      }
    }
  }

  search(value) {
    let currentNode = this.root;
    while (currentNode) {
      const difference = currentNode.value - value;
      const differenceSign = Math.sign(difference);

      if (difference == 0) return true;
      else if (currentNode[differenceSign]) {
        currentNode = currentNode[differenceSign];
      } else {
        return false;
      }
    }
  }
}
module.exports = BinarySearchTree;
