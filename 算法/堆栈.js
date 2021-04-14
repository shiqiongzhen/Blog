var reverseWords = function(s) {
    var result = []
    var stack = s.split(" ").filter(item => !!item)
    while(stack.length !== 0){
        result.push(stack.pop())
    }
    return result.join(" ")
};
console.log('reverseWords', reverseWords("  hello world!  "));