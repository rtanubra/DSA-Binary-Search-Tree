const {BinarySearchTree} = require('./BST_own')

function thirdLargestFaster(node){
    count = 0
    var currentlargest
    findLargest(node)
    function findLargest(node){
        if (node.right){
            findLargest(node.right)
        }
        else {
            currentlargest= node
        }
    }
    
    while (count<3){
        //do we have a sibling?
        if (currentlargest.parent.left){
            findLargest(currentlargest.parent.left)
            count +=1 
            break
        } else {
            currentlargest = currentlargest.parent
            count +=1
            break
        }
    }
    
    return currentlargest.key
}
function thirdLargest(node){
    const arr = []
    function thirdHelper(node){
        arr.push(node.key)
        if(node.left){
            thirdHelper(node.left)
        }
        if(node.right){
            thirdHelper(node.right)
        }
    }
    thirdHelper(node)
    arrSorted = arr.sort((a,b)=>{return a-b})
    if (arrSorted.length>=3){
        return arrSorted[arrSorted.length-3]
    }
    else {
        `Error there are less than 3 items on the BST`
    }
}

function main(){
    const BST = new BinarySearchTree()
    const arr = [50,100,5,90,1000,600,10000,99,60,66,58,2,1,40,45,44]
    for (i in arr){
        BST.insert(arr[i],arr[i])
    }
    //console.log(thirdLargest(BST))
    console.log(thirdLargestFaster(BST))

}

main()