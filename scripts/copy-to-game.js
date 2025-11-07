const fs = require('fs');
const path = require('path');

// 读取 build/fx/package.json 获取版本号
const packageJsonPath = path.join(__dirname, '..', 'build', 'fx', 'package.json');
const packageJson = JSON.parse(fs.readFileSync(packageJsonPath, 'utf8'));
const version = packageJson.version;

// 目标目录
const targetDir = 'D:\\game\\soon-magic-road-pixi-pure\\libs\\';

// 源文件名
const sourceFile = `soonfx-fx-${version}.tgz`;

// 检查源文件是否存在
const sourcePath = path.join(__dirname, '..', sourceFile);
if (!fs.existsSync(sourcePath)) {
    console.error(`错误: 源文件 ${sourceFile} 不存在`);
    process.exit(1);
}

// 检查目标目录是否存在，如果不存在则创建
// if (!fs.existsSync(targetDir)) {
//     console.log(`创建目标目录: ${targetDir}`);
//     fs.mkdirSync(targetDir, { recursive: true });
// }

// 复制文件
// const targetPath = path.join(targetDir, sourceFile);
// fs.copyFileSync(sourcePath, targetPath);

// console.log(`✅ 成功复制 ${sourceFile} 到 ${targetDir}`);
// console.log(`版本: ${version}`);
