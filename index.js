
const fs = require('fs-extra');
const Git = require('./lib/git');
const util = require('./lib/util');
const defalutConfig = {
    basePath:'build',//本地待移动文件夹路径
    fileName:'index.html',//本地待移动文件名
    registry:'git@git.jd.com:consumer-healthcare/jdh-healthcare-client.git',//要上传的地址
    branch:'dev',//要上传的分支
    originFilePath:'source/bjdpe',//文件夹路径
    message:'feat:auto-commit',//commit 信息
    depth:'1',
    remote: 'origin',
    git: 'git'
}
/**
 * 1.获取远程git路径下载至本地
 * 2.将本地文件放至指定路径下
 * 3.git 提交
 * @param {*} config 
 */
function publish(config,callback){
    const copyFileName = `copy${new Date().getTime()}`;
    const opts = Object.assign({},defalutConfig,config || {});
    if(!util.isDirExist(opts.basePath,opts.fileName)){
        callback(new Error(`未能找到${opts.fileName?`${opts.basePath}/${opts.fileName}`:opts.basePath}`));
        return;
    };
    Git.clone(opts,copyFileName).then(git =>{
        try {
            if(opts.fileName){
                fs.copyFileSync(`${opts.basePath}/${opts.fileName}`, `${copyFileName}/${opts.originFilePath}/${opts.fileName}`)
            }else{
                fs.copySync(opts.basePath, `${copyFileName}/${opts.originFilePath}`)
            }
            return git;
        } catch (err) {
            callback(err)
        }
    }).then(git=>{
        return git.add('.');
    }).then(git => {
        return git.commit(opts.message);
    }).then(git => {
        return git.push(opts.remote, opts.branch);
    }).then(
        () => {
            util.deleteFolderRecursive(copyFileName)
            callback()
        },
        error => {
            callback(error)
        }
    )
}
module.exports = {
    publish
}

publish({
    basePath:'build2',//本地路径
    fileName:'index.html',//获取文件名
    registry:'git@git.jd.com:consumer-healthcare/jdh-healthcare-client.git',//要上传的地址
    branch:'dev',//要上传的分支
    originFilePath:'source/bjdpe',//文件夹路径
},function(err){
    if(!err){
        console.log('html资源上传成功');
    }else{
        console.log('错误信息：',err.message);
    }
});