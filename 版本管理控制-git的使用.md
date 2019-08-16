- 常用命令
    - git pull: 拉取+合并同一分支代码
    - git merge BRANCHNAME: 合并不同分支代码
    - git checkout BRANCHNAME: 切换分支
        - -b 生成新分支并切换到新分支（代码会随着切换带进新分支）
    - git branch BRANCHNAME: 新建分支
        - -a 查看所有分支
        - -d 删除分支
    - git add: 添加代码到本地暂存区
    - git commit: 添加代码到本地仓库
    - git push： 推送代码到远程仓库

- 注意区分概念
    1. 本地分支与远程分支，head游标指向
        - eg：master与origin/master
    2. 本地仓库与远程仓库
        - ![./img/git.png](./img/git.png)
    3. pull,fetch,merge的区别
    4. PR: push request
        - 程序员一般没有权限直接提交分支到远程master仓库，所以需要提交PR请求，让有权限的管理员审核通过之后，合并代码提交