// 二分法
function treeNode (val) {
    this.val = val
}
function arrToTree(arr) {
    const len = arr.length
    if(len === 0) {
        return null
    }
    if(len === 1) {
        return new treeNode(arr[0])
    }
    const mid = Math.floor(len/2)
    const root = new treeNode(arr[mid])
    root.left = arrToTree(arr.slice(0, mid))
    root.right = arrToTree(arr.slice(mid+1))
    return root
}
console.log('result', arrToTree([-10, -3, 0, 5, 9]));