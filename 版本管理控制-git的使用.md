- 常用命令
    - git pull
        - git pull: 拉取+合并所有远程分支代码
        - git pull origin BRANCHNAME：拉取+合并某个分支代码
    - git merge origin/BRANCHNAME: 合并某一分支代码
    - git checkout BRANCHNAME: 切换分支
        - -b 生成新分支并切换到新分支（代码会随着切换带进新分支）
    - git branch：查看最近的分支
        - BRANCHNAME: 新建分支
        - -a 查看所有分支
        - -D 删除本地分支
    - git init: 新建本地仓库
    - git add: 添加代码到本地暂存区
    - git commit: 添加代码到本地仓库
    - git push： 推送代码到远程仓库
        - origin --delete BRANCHNAME 删除远程分支
    - git log：查看提交日志
    - git remote -v：显示已建立连接的所有远程仓库
    - git stash
        - save "message..."：保存当前的工作进度。会分别对暂存区和工作区的状态进行保存
        - list：显示进度列表。此命令显然暗示了git stash 可以多次保存工作进度，并用在恢复时候进行选择
        - pop [--index] [<stash>]：如果不使用任何参数，会恢复最新保存的工作进度，并将恢复的工作进度从存储的工作进度列表中清除。
        - clear：删除所有存储的进度
- 回退命令
    - git reset 
        - --soft commitId：可逆回退到某一commit版本（变动代码存在本地暂存区）
        - --hard commitId：不可逆回退到某一commit版本
        - 注意：回退前一定要把进行到一半的代码备份，如切到另一个新分支并保存

- 注意区分概念
    1. 本地分支与远程分支，head游标指向
        - eg：master与origin/master
    2. 本地仓库与远程仓库
        - ![./img/git.png](./img/git.png)
    3. pull,fetch,merge的区别
    4. PR: push request
        - 程序员一般没有权限直接提交分支到远程master仓库，所以需要提交PR请求，让有权限的管理员审核通过之后，合并代码提交
