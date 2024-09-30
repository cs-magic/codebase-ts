# BugFix

- [ ] 关于邮箱与`next-auth-url`不同时的表现：
    - button、callback_url等都是next-auth-url，login_url则是请求地址
    - 如果是https，则地址不对时，sendVerificationRequest函数无法触发
- [ ] 关于 https build 下 streaming 失败的问题
    - 只build（或者不build），不用 https，测试可
    - build，则用 https，则不可
