### TCP
1. 应用场景：http，fcp，ssh
2. 优点：可靠，通过不断确认来确认包是否有序完整地到达
3. 反思
    1. 为什么要分片？传输包较大，容易丢失，分片后丢失只需要重发切分后的小包
    2. 怎么区分分片大小？慢启动过程可以让网络包的大小逐渐匹配网速
    3. http做了什么事？http 基于 TCP， 定制了解析的逻辑（F12，打开一个http请求即可即可看到解析后的信息，如请求头等v ）

### UDP
1. 应用场景：DNS（包较小，不需要分片），实时聊天通信
2. 优点：快