import path from 'path';
import { globSync } from 'glob';

const root = process.cwd() + `${path.sep}docs`;

function toTree(op) {
    op.path = op.path.replace(/\//g, path.sep);
    const onDir = path.join(root, op.path);
    const mdfiles = globSync([onDir + '/**/*.md'], { ignore: 'node_modules/**' })
    // console.log('-mdfiles-', mdfiles);
    const Tree = pathToTree(mdfiles, op.path + path.sep) as object;
    let dirItems: any[] = [];

    const deep = (pathTxt: string, obj: object) => {
        let arr: any[] = [];
        for (const item of Object.entries(obj)) {
            let data: Record<string, any> = { text: item[0] }
            if (typeof item[1] == "string") data.link = `${pathTxt}${path.sep}${item[0]}`
            else {
                data.collapsed = false;
                data.items = deep(`${pathTxt}${path.sep}${item[0]}`, item[1]);
            }
            arr.push(data);
        }
        return arr;
    }

    dirItems = deep(op.path, Tree);
    console.log('--目录生成成功--');

    return dirItems;
}

export default toTree;

/** 文件路径转树对象
 * @param pathArray 文件路径路径
 * @param splitPath 路径分割符
 * @param splitExt 文件分隔符
 */
function pathToTree(pathArray: string[], rep = '', splitPath = path.sep, splitExt = ".") {
    // console.log('-rep-', rep);

    const tree = {};
    // 构建树结构的辅助函数
    const buildTree = (pathTxt: string, node: object) => {
        if (rep) {
            let start = pathTxt.indexOf(rep) + rep.length;
            let end = pathTxt.length;
            pathTxt = pathTxt.substring(start, end);
        }
        const segments = pathTxt.split(splitPath);
        let currentLevel = node;
        segments.forEach(segment => {
            const dotI = segment.lastIndexOf(splitExt);
            if (splitExt && dotI !== -1) {// 文件
                let name = segment.slice(0, dotI);
                // let ext = segment.slice(dotI + 1, segment.length);
                currentLevel[name] = currentLevel[name] || segment;
                currentLevel = currentLevel[name];
            } else {// 目录
                currentLevel[segment] = currentLevel[segment] || {};
                currentLevel = currentLevel[segment];
            }
        })
    };
    // 遍历路径数组并构建树结构
    pathArray.forEach(path => buildTree(path, tree));
    // console.log('-pathToTree()-', tree);

    return tree;
}
