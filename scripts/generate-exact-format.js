#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

/**
 * 生成完全匹配参考文件格式的类型定义文件
 */

function generateExactFormat() {
    const inputFile = path.join(__dirname, '../build/fx/lib/index.d.ts');
    const outputFile = path.join(__dirname, '../build/fx/lib/index.d.ts');

    if (!fs.existsSync(inputFile)) {
        console.error('输入文件不存在:', inputFile);
        process.exit(1);
    }

    let content = fs.readFileSync(inputFile, 'utf8');

    // 移除 export as namespace 和 export {} 声明
    content = content.replace(/export as namespace fx;\s*\n\s*export \{\};\s*$/gm, '');

    // 移除 export 关键字，转换为全局声明
    content = content.replace(/^export declare /gm, 'declare ');
    content = content.replace(/^export /gm, '');

    // 写入文件
    fs.writeFileSync(outputFile, content, 'utf8');

    console.log('格式已调整为完全匹配参考文件格式');
    console.log('文件大小:', fs.statSync(outputFile).size, '字节');
}

// 运行脚本
if (require.main === module) {
    generateExactFormat();
}

module.exports = { generateExactFormat };

