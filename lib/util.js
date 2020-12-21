const fs = require('fs-extra');
const path = require('path');
/**
 * 递归删除文件夹
 * @param {*} url 
 */
const deleteFolderRecursive =  function(dir) {
    var files = [];
    /**
     * 判断给定的路径是否存在
     */
    if (fs.existsSync(dir)) {
      /**
       * 返回文件和子目录的数组
       */
      files = fs.readdirSync(dir);
      files.forEach(file => {
        var curPath = path.join(dir, file);
        /**
         * fs.statSync同步读取文件夹文件，如果是文件夹，在重复触发函数
         */
        if (fs.statSync(curPath).isDirectory()) { // recurse
          deleteFolderRecursive(curPath);
        } else {
          fs.unlinkSync(curPath);
        }
      });
      /**
       * 清除文件夹
       */
      fs.rmdirSync(dir);
    } else {
      console.log("给定的路径不存在，请给出正确的路径");
    }
}
/**
 * 判断文件夹及指定文件是否存在
 * @param {*} path 
 */
const isDirExist  = function(basePath,fileName){
    try {
        if(!fileName){
            return fs.statSync(path.resolve(process.cwd(),basePath)).isDirectory();
        }else{
            return fs.existsSync(path.resolve(process.cwd(),`${basePath}/${fileName}`));
        }
    } catch (err) {
        console.log(err);
        return false;
    }
}
module.exports ={
    deleteFolderRecursive,
    isDirExist
}