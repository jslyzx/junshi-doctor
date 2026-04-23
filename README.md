# 医生端

这是一个小程序，医生轻量化查看、管理患者信息。
核心原则是医生不需要承担繁重录入工作，只看与本人患者相关的关键状态，关键节点把控。

## 页面
- 登录
- 首页
- 患者管理
- 患者列表
- 患者详情
- AE/SAE处理
- 我的

1. 登录页：医生端和项目专员端共用，通过账号区分。小程序应该能获取到微信用户信息，通过手机号判断角色进入自己的首页。
2. 首页：参考 ![医生首页](https://im.gurl.eu.org/file/AgACAgEAAxkDAAEBf69p5h2ByrFVVTKGICgyD7zxhbvhJAACFQxrG6HcMUe8UfZBvCTDpQEAAwIAA3gAAzsE.png) 医生可以不要简介，因为医生不会需要查看自己的详细信息。然后首页也不要文章，可以补充一些医生关心的患者信息汇总和需要处理的任务。tab分为首页、患者管理和我的.
3. 患者管理：参考![患者管理](https://im.gurl.eu.org/file/AgACAgEAAxkDAAEBf7Np5h5lsqNW_dLBvEmOWskhY57qpAACGQxrG6HcMUeB5QFX_PZioQEAAwIAA3gAAzsE.png) 医生只看自己的患者.分所有患者，入组患者和数据统计
4. 患者列表参考 ![患者列表](https://im.gurl.eu.org/file/AgACAgEAAxkDAAEBf7Rp5h7bqkTWMesV4s4yzGwNWTBU8QACGgxrG6HcMUfFGHP2Y0L9NAEAAwIAA3gAAzsE.png) 不要上传知情同意书，录入操作统一放到项目专员端.加一个患者状态，如是否入组。点击可以查看患者详情。
5. 患者详情：这块我还没想好，你自由发挥，我看你能不能给我个惊喜。
6. 医生需要处理上报的AE，SAE事件。需要在合适的地方进行处理
7. 数据统计：可以参考 ![数据统计](https://im.gurl.eu.org/file/AgACAgEAAxkDAAEBf7Vp5h_cqdH-cXGKmnijgsUF-T2nlQACGwxrG6HcMUc9gmc-jagkegEAAwIAA3gAAzsE.png)
8. 我的：我的里面可以放消息中心等
9. AE/SAE处理：处理AE/SAE事件的页面，需要有处理AE/SAE事件的表单，尽量简单，做成选择的。