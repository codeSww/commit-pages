## commit-pages

将指定页面从一个 git 提交至另外一个 git

## 使用说明

publish(options,function)

### options:

- basePath:本地待移动文件夹路径
- fileName:本地待移动文件名
- registry:远端要上传的 GIT 地址
- branch:'dev':远端要上传的分支
- originFilePath:远端要放置文件的文件夹路径
- message:远端 gitcommit 信息

### 示例：

```js
publish(
  {
    basePath: "dist", //本地路径
    fileName: "index.html", //获取文件名
    registry: "git@git.jd.com:consumer-healthcare/XXXX.git", //要上传的地址
    branch: "master", //要上传的分支
    originFilePath: "source/XXX", //文件夹路径
  },
  function (err) {
    if (!err) {
      console.log("html资源上传成功");
    } else {
      console.log("错误信息：", err.message);
    }
  }
);
```

### 本地运行环境

- node: v12.8.0
- npm: v6.14.8
