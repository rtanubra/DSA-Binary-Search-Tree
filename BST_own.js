class BinarySearchTree {
    constructor(key = null, value = null, parent = null) {
        this.key = key;
        this.value = value;
        this.parent = parent;
        this.left = null;
        this.right = null;
    }
    insert(key,value){
        //no tree exists
        if (this.key == null) {
            this.key = key;
            this.value = value;
        }
        else{
            //use recursion
            //base case key is the same.
            if (this.key === key){
                this.value = value
            }
            //if this key is smaller we go right
            if (this.key < key){
                
                //need to check if we have a right child first.
                if (this.right === null){
                    this.right = new BinarySearchTree(key, value,this)
                } else {
                    //recursively call it on the right child
                    this.right.insert(key,value)
                }
            }
            //if this key is larger than the key we go right.
            if (this.key > key){
                //need to check if we have a left child first
                if (this.left === null){
                    this.left = new BinarySearchTree(key,value,this)
                } else {
                    //recursively call insert on the right child
                    this.left.insert(key,value)
                }
            }
            
        }
    }
    find(key){
        //no tree exists
        if(this.key===null){
            console.log(`Error this tree is null`)
        }
        //is key smaller than this key? we go left
        if (key< this.key){
            //check can we go left?
            if (this.left === null){
                return `Error ${key} not found`
            }
            else {
                return this.left.find(key)
            }
        }
        //if key is larger than this key? we go right
        else if (key>this.key){
            //can we go right?
            if (this.right === null){
                return `Error ${key} not found`
            }
            else {
                return this.right.find(key)
            }
        }
        else {
            return this.value
        }
    }
    remove(key){
        //are we null?
        if (this.key===null){
            console.log(`Error nothing to delete`)
        }
        //is this the key
        if(this.key === key){
            console.log(`Congratulations I have found ${key} to delete`)
            //do we have no children
            if (this.left ===null && this.right === null){       
                this._replaceWith(null);
            }
            //we have both left and right children hard case.
            else if (this.left !==null && this.right !== null){
                const smallestNode = this.right._findMin()
                const successor = this.right._findMin();
                this.key = successor.key;
                this.value = successor.value;
                //delete itself
                successor.remove(successor.key);

            }
            //single left child
            else if (this.left !== null){
                this._replaceWith(this.left)
            }
            //single right child
            else {
                this._replaceWith(this.right)
            }

        }
        //if we land on something smaller we go right
        else if(this.key< key){
            //can we go right?
            if (this.right === null){
                console.log(`Error nothing to delete`)
            }
            else{
                this.right.remove(key)
            }
        }
        //we landed on something where we must go left
        else {
            if (this.left === null){
                console.log(`Error nothing to delete`)
            } else {
                this.left.remove(key)
            }
        }
    }
    _findMin() {
        if (!this.left) {
            return this;
        }
        return this.left._findMin();
    }
    _replaceWith(node){
        //is the caller a root
        if (this.parent){
            //are we the left child ?
            if (this.parent.left == this){
                this.parent.left = node
            }
            //are we the right child?
            else{
                this.parent.right= node
            }
            if (node){
                //make sure to connect new node to parent not just the other way around.
                node.parent = this.parent
            }

        }
        //if a root
        else {
            //are we actually replacing or just removing
            if(node){
                this.key = node.key
                this.value = node.value 
                this.left = node.left
                this.right = node.right
            }
            //looks like we are just removing
            else {
                this.key = null
                this.value = null
                this.left = null
                this.right = null
            }
        }
        
    }
}

function main(){
    const myTree = new BinarySearchTree()
    myTree.insert(36,"Rey")
    myTree.insert(25,"Edith")
    myTree.insert(46,"Erick")
    myTree.insert(58,"Jeffrey")
    myTree.insert(52,"Rocky")
    myTree.insert(40,"Vivian")
    myTree.insert(50,"Andrew")
    myTree.insert(20,"Dewi")
    // console.log(myTree)
    // myTree.remove(36)
    // console.log(myTree)
    const BST = new BinarySearchTree()
    const arr = [50,100,5,90,1000,600,10000,99,60,66,58,2,1,40,45,44]
    for (i in arr){
        BST.insert(arr[i],arr[i])
    }


    //console.log(BST)
    console.log(treeHeight(BST))
    console.log(`Given a BST called BST should return true - ${isBST(BST)}`)
    BST.left.key =1000000
    console.log(`Just broke my BST`)
    console.log(`Given a broken BST called BST should return false - ${isBST(BST)}`)
}
function tree(t){
    if(!t){
        return 0;
    }
    return tree(t.left) + t.value + tree(t.right)
}

function treeHeight(node){
    const heights = []
    function nodeHeight(node){
        if (!node){
            return 0
        }
        var count = 1 
        var currentNode = node
        while (node.parent!==null){
            count +=1
            if (currentNode.parent){
                currentNode = currentNode.parent
            }
            else{
                return count-1
            }
            
        }
        return count
    }
    function traverse(node){

        if (node.left){
            traverse(node.left)
        }
        if (node.right){
            traverse(node.right)
        }
        if (node.left===null && node.right===null){
            //console.log(`Base case ${node.key} with height ${nodeHeight(node)}`)
            heights.push(nodeHeight(node))
        }
    }
    traverse(node)
    return Math.max(...heights)
}
function isBST(node){
    const checks = []
    function comparator(node){
        if (node.left===null && node.right===null){
            checks.push(true)
        }
        //checks left is smaller than parent
        if (node.left){
            if (node.left.key >= node.key){
                checks.push(false)
            }
            else {
                checks.push(true)
                comparator(node.left)
            }
        }
        //checks right is larger than parent
        if (node.right){
            if (node.right.key <= node.key){
                checks.push(false)
            }
            //recurrsive call
            else {
                checks.push(true)
                comparator(node.right)
            }
        }

    }
    comparator(node)
    return checks.indexOf(false)===-1
}

//main()

module.exports= {BinarySearchTree}