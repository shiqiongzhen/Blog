// 层序遍历
var maxDepth = function(root) {
    let count = 0
    let step = []
    let leavesNum = 0
    do{
        step = root.splice(0, Math.pow(2, count))
        leavesNum = step.filter(item => !!item).length
        count++
    } while(leavesNum !== 0)
    return count - 1
};
console.log('result', maxDepth([3,9,20,null,null,15,7]));

// 后序遍历（转树结构, 再递归）
// function maxDepth(root) {
//     if(root.val) {
//         return Math.max(maxDepth(root.left), maxDepth(root.right)) + 1
//     }
// }
