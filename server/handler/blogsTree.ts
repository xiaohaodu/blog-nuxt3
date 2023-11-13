import fs from 'fs';
/**
 * @description  读取目录下所有目录文件  返回数组
 * @param path 文件目录
 * @returns
 */
function getFiles(path: string) {
  //读取目录下所有目录文件  返回数组
  const dirFiles = fs.readdirSync(path, {
    encoding: 'utf-8',
    withFileTypes: true,
  });
  return dirFiles;
}
// const files = getFiles('../blogs/');
// console.log(files);

/**
 * @description 判断是否是文件 Boolean
 * @param filepath
 * @returns
 */
function isFile(filepath: string) {
  //判断是否是文件 Boolean
  let stat = fs.statSync(filepath);
  return stat.isFile();
}
// const type = isFile('../blogs/blo.md');
// console.log(type);

/**
 * @description 判断是否是文件夹 Boolean
 * @param filepath
 * @returns
 */
function isDir(filepath: string) {
  //判断是否是文件夹 Boolean
  let stat = fs.statSync(filepath);
  return stat.isDirectory();
}

//递归遍历所有文件夹和文件
// param1:路径  param2:将结果存储到该数组中
/**
 * @description 结果将存储到arr数组中
 * @param path 路径
 * @param arr 将结果存储到该数组中
 */
function getAllFiles(path: string, arr: BlogsTree) {
  // 结果将存储到arr数组中
  const filesArr = getFiles(path); // 获取目录下所有文件
  if (path.slice(-1) == '/') {
    path = path.slice(0, -1);
  }
  filesArr.forEach((item) => {
    const fileName = item.name;
    const filePath = `${path}/${fileName}`;
    if (isDir(filePath)) {
      //如果是文件夹
      const itemFileArr = new Array() as BlogsTree;
      getAllFiles(filePath, itemFileArr);
      const dir = {
        name: fileName,
        type: 'dir',
        dirPath: `${filePath}/`,
        children: itemFileArr,
        expand: false,
      };
      arr.push(dir);
    } else if (isFile(filePath)) {
      // 如果是文件
      arr.push({ name: fileName, type: 'file', path: filePath });
    }
  });
}
// const arr = [];
// getAllFiles('../blogs', arr);
// console.log(arr);
const blogsTreeHandler = (blogsTree: BlogsTree) => {
  let obj;
  for (const key in blogsTree) {
    if (blogsTree[key].name == 'README.md') {
      obj = { ...blogsTree[key] };
      blogsTree.splice(Number(key), 1);
      blogsTree.unshift(obj);
      return;
    }
  }
};

export { getAllFiles, blogsTreeHandler };
