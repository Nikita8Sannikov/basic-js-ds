const { NotImplementedError } = require('../extensions/index.js');

const { Node } = require('../extensions/list-tree.js');

/**
* Implement simple binary search tree according to task description
* using Node from extensions
*/
class BinarySearchTree {
  constructor() {
    this._root = null
  }

  root() {
    return this._root
  }

  add(data) {
    if (!this._root) {
      this._root = new Node(data)
      return
    }

    let curr = this._root;

    while (true) {
      if (data < curr.data) {
        if (!curr.left) {
          curr.left = new Node(data);
          return
        }
        curr = curr.left;
      } else {
        if (!curr.right) {
          curr.right = new Node(data);
          return
        }
        curr = curr.right;
      }
    }
  }

  has(data) {
    if (!this._root) return false;

    let curr = this._root;

    while(curr){
      if (data === curr.data) {
        return true;
      }

      if (data < curr.data) {
        curr = curr.left;  
      } else {
        curr = curr.right;
      }
    }
    return false; 
  }

  find(data) {
    if (!this._root) return false;

    let curr = this._root;
    
    while(curr){
      if (data === curr.data) {
        return curr;
      }

      if (data < curr.data) {
        curr = curr.left;  
      } else {
        curr = curr.right;
      }
    }
    return null;
  }

  remove(data) {
    if (!this._root) return false;

    let curr = this._root;
    let parent = null;
    
    while(curr){
      if (data === curr.data) {
        if(!curr.left && !curr.right) {
          if(!parent) this._root = null;
          else if(parent.left === curr) parent.left = null;
          else parent.right = null;
        } else if (curr.left && !curr.right) {
          if(!parent) this._root = curr.left;
          else if(parent.left === curr) parent.left = curr.left;
          else parent.right = curr.left;
          } else if (curr.right && !curr.left) {
            if(!parent) this._root = curr.right;
            else if(parent.left === curr) parent.left = curr.right;
            else parent.right = curr.right;
          } else {
            let minNode = curr.right;
            let minNodeParent = curr;
            while(minNode.left) {
              minNodeParent = minNode;
              minNode = minNode.left;
            }

            if (minNodeParent.left === minNode){
              minNodeParent.left = minNode.right;
            }else{
              minNodeParent.right = minNode.right;
            }


            minNode.left = curr.left;
            if (minNode !== curr.right) {
              minNode.right = curr.right;
            }

            if(!parent) this._root = minNode;
            else if(parent.left === curr) parent.left = minNode;
            else parent.right = minNode;
          }
        return;
      }

      parent = curr
      if (data < curr.data) {
        curr = curr.left;  
      } else {
        curr = curr.right;  
      }
    }
  }

  min() {
    if (!this._root) return false;
    let curr = this._root;
    while(curr.left){
        curr = curr.left;
    }
    return curr.data
  }

  max() {
    if (!this._root) return false;
    let curr = this._root;
    while(curr.right){
        curr = curr.right;
    }
    return curr.data
  }
}

module.exports = {
  BinarySearchTree
};