#!/usr/bin/env node

const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build/fx');
const rootDir = path.join(__dirname, '..');

console.log('🔍 验证 npm 包结构...\n');

// 在验证之前，确保 LICENSE 和 README 是最新的
console.log('📋 准备必要文件...');

// 复制 LICENSE
const licenseSource = path.join(rootDir, 'LICENSE');
const licenseTarget = path.join(buildDir, 'LICENSE');
if (fs.existsSync(licenseSource)) {
    fs.copyFileSync(licenseSource, licenseTarget);
    console.log('  ✅ 已复制 LICENSE');
} else {
    console.log('  ⚠️  根目录的 LICENSE 不存在');
}

// 复制 README.MD
const readmeSource = path.join(rootDir, 'README.MD');
const readmeTarget = path.join(buildDir, 'README.md');
if (fs.existsSync(readmeSource)) {
    fs.copyFileSync(readmeSource, readmeTarget);
    console.log('  ✅ 已复制 README.MD');
} else {
    console.log('  ⚠️  根目录的 README.MD 不存在');
}

console.log();

// 验证文件结构
const requiredFiles = [
    'package.json',
    'README.md',
    'LICENSE',
    'lib/index.mjs',
    'lib/index.d.ts'
];

const optionalFiles = [
    'CHANGELOG.md',
    'CONTRIBUTING.md'
];

console.log('📁 检查必需文件:');
let allRequired = true;
for (const file of requiredFiles) {
    const filePath = path.join(buildDir, file);
    const exists = fs.existsSync(filePath);
    const size = exists ? fs.statSync(filePath).size : 0;
    const status = exists ? '✅' : '❌';

    console.log(`  ${status} ${file} ${exists ? `(${(size / 1024).toFixed(1)}KB)` : '(缺失)'}`);

    if (!exists) allRequired = false;
}

console.log('\n📄 检查可选文件:');
for (const file of optionalFiles) {
    const filePath = path.join(buildDir, file);
    const exists = fs.existsSync(filePath);
    const status = exists ? '✅' : '⚪';
    console.log(`  ${status} ${file} ${exists ? '(存在)' : '(可选)'}`);
}

// 验证 package.json
if (fs.existsSync(path.join(buildDir, 'package.json'))) {
    console.log('\n📦 验证 package.json:');
    const packageInfo = JSON.parse(fs.readFileSync(path.join(buildDir, 'package.json'), 'utf8'));

    const checks = [
        ['name', packageInfo.name, packageInfo.name && packageInfo.name.length > 0],
        ['version', packageInfo.version, /^\d+\.\d+\.\d+/.test(packageInfo.version)],
        ['description', packageInfo.description, packageInfo.description && packageInfo.description.length > 10],
        ['main', packageInfo.main, packageInfo.main === 'lib/index.mjs'],
        ['types', packageInfo.types, packageInfo.types === 'lib/index.d.ts'],
        ['license', packageInfo.license, packageInfo.license === 'Apache-2.0'],
        ['keywords', JSON.stringify(packageInfo.keywords), Array.isArray(packageInfo.keywords) && packageInfo.keywords.length > 0],
        ['files', JSON.stringify(packageInfo.files), Array.isArray(packageInfo.files)]
    ];

    for (const [field, value, valid] of checks) {
        const status = valid ? '✅' : '❌';
        console.log(`  ${status} ${field}: ${value || '(未设置)'}`);
    }
}

// 验证类型定义文件
const dtsPath = path.join(buildDir, 'lib/index.d.ts');
if (fs.existsSync(dtsPath)) {
    console.log('\n🔤 验证类型定义:');
    const dtsContent = fs.readFileSync(dtsPath, 'utf8');
    const hasClass = dtsContent.includes('declare class fx');
    const hasExport = dtsContent.includes('export');

    console.log(`  ${hasClass ? '✅' : '❌'} 包含 fx 类定义`);
    console.log(`  ${hasExport ? '✅' : '❌'} 包含导出声明`);
    console.log(`  📊 类型定义大小: ${(dtsContent.length / 1024).toFixed(1)}KB`);
}

// 验证主模块文件
const mjsPath = path.join(buildDir, 'lib/index.mjs');
if (fs.existsSync(mjsPath)) {
    console.log('\n📜 验证主模块:');
    const mjsContent = fs.readFileSync(mjsPath, 'utf8');
    const hasExport = mjsContent.includes('export');
    const hasClass = mjsContent.includes('class fx') || mjsContent.includes('fx');

    console.log(`  ${hasExport ? '✅' : '❌'} 包含导出`);
    console.log(`  ${hasClass ? '✅' : '❌'} 包含 fx 实现`);
    console.log(`  📊 模块大小: ${(mjsContent.length / 1024).toFixed(1)}KB`);
}

console.log('\n📋 包摘要:');
if (fs.existsSync(path.join(buildDir, 'package.json'))) {
    const packageInfo = JSON.parse(fs.readFileSync(path.join(buildDir, 'package.json'), 'utf8'));
    console.log(`  📦 名称: ${packageInfo.name}`);
    console.log(`  📋 版本: ${packageInfo.version}`);
    console.log(`  📝 描述: ${packageInfo.description}`);
    console.log(`  📄 许可: ${packageInfo.license}`);
}

// 计算总包大小
const calculateDirSize = (dirPath) => {
    let totalSize = 0;
    const files = fs.readdirSync(dirPath, { withFileTypes: true });

    for (const file of files) {
        const filePath = path.join(dirPath, file.name);
        if (file.isDirectory()) {
            totalSize += calculateDirSize(filePath);
        } else {
            totalSize += fs.statSync(filePath).size;
        }
    }

    return totalSize;
};

const totalSize = calculateDirSize(buildDir);
console.log(`  📊 总大小: ${(totalSize / 1024).toFixed(1)}KB`);

if (allRequired) {
    console.log('\n🎉 包验证通过！可以发布。');
} else {
    console.log('\n❌ 包验证失败！请修复缺失的文件。');
    process.exit(1);
}
