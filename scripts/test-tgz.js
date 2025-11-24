#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 测试 .tgz 包安装...');

const testDir = path.join(__dirname, '../test-tgz-install');
const tgzPath = path.join(__dirname, '../soonfx-engine-2.0.0.tgz');

// 清理旧的测试目录
if (fs.existsSync(testDir)) {
  execSync('rmdir /s /q "' + testDir + '"', { shell: true });
}

// 创建测试目录
fs.mkdirSync(testDir);
process.chdir(testDir);

// 初始化 package.json
execSync('npm init -y', { stdio: 'inherit' });

// 安装 .tgz 包
console.log('📦 安装 .tgz 包...');
execSync(`npm install "${tgzPath}"`, { stdio: 'inherit' });

// 创建测试文件
const testCode = `const { fx } = require('@soonfx/fx');

console.log('🎮 测试 .tgz 包安装');
console.log('版本检查:', typeof fx);

// 测试基本功能
const distance = fx.distance(0, 0, 3, 4);
console.log('距离计算:', distance);

const result = fx.evaluateExpression('2 + 3 * 4');
console.log('表达式计算:', result);

console.log('✅ .tgz 包测试通过！');
`;

fs.writeFileSync('test.js', testCode);

// 运行测试
console.log('🚀 运行测试...');
execSync('node test.js', { stdio: 'inherit' });

console.log('\n🎉 .tgz 包安装测试成功！');
