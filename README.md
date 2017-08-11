用于 NodeBB 的阿里云滑动验证
## 安装

    npm install nodebb-plugin-registration-aliverify
## 配置
申请 **[滑动验证服务](https://yundun.console.aliyun.com/?p=afs#/afs/app)** 后，在 [Access Key管理控制台](https://ak-console.aliyun.com/) 中创建 Access Key 并将 Access Key ID 和 Access Key Secret 复制到插件中。(该 Access Key 具有 **所有** 阿里云产品API的访问权限，一旦泄露将导致 **极大** 的安全风险！建议使用 **[子用户 Access Key](https://ram.console.aliyun.com/#/user/list?guide))**

> 参考:
> node-plugin-registration-question
> node-plugin-registration-verify
