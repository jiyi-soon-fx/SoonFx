#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

const buildDir = path.join(__dirname, '../build/fx');
const rootDir = path.join(__dirname, '..');

console.log('📦 创建 npmjs .tgz 安装包...\n');

// 在打包之前，确保 LICENSE 和 README 是最新的
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

// 检查构建目录是否存在
if (!fs.existsSync(buildDir)) {
    console.error('❌ 构建目录不存在，请先运行 npm run build:complete');
    process.exit(1);
}

try {
    // 读取包信息
    const packageInfo = JSON.parse(fs.readFileSync(path.join(buildDir, 'package.json'), 'utf8'));
    console.log(`📦 包名: ${packageInfo.name}`);
    console.log(`📋 版本: ${packageInfo.version}\n`);

    // 进入构建目录
    process.chdir(buildDir);

    // 创建 .tgz 包
    console.log('🔨 正在打包...');
    const result = execSync('npm pack', { encoding: 'utf8' });
    const tgzFileName = result.trim();

    console.log(`✅ 打包完成: ${tgzFileName}`);

    // 移动 .tgz 文件到根目录
    const sourcePath = path.join(buildDir, tgzFileName);
    const targetPath = path.join(rootDir, tgzFileName);

    if (fs.existsSync(targetPath)) {
        fs.unlinkSync(targetPath);
    }

    fs.renameSync(sourcePath, targetPath);
    console.log(`📁 已移动到根目录: ${tgzFileName}`);

    // 获取文件大小
    const stats = fs.statSync(targetPath);
    const fileSizeKB = (stats.size / 1024).toFixed(1);

    console.log(`📊 包大小: ${fileSizeKB}KB`);

    console.log('\n🎉 .tgz 包创建成功！');
    console.log('\n📋 使用方法:');
    console.log(`1. 本地安装: npm install ${path.resolve(targetPath)}`);
    console.log(`2. 或者: npm install ./${tgzFileName}`);
    console.log('\n💡 测试安装:');
    console.log('   mkdir test-install && cd test-install');
    console.log('   npm init -y');
    console.log(`   npm install ../${tgzFileName}`);
    console.log('   node -e "const {fx} = require(\'@soonfx/fx\'); console.log(typeof fx);"');

    // 创建测试安装脚本
    const testInstallScript = `#!/usr/bin/env node

const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🧪 测试 .tgz 包安装...');

const testDir = path.join(__dirname, '../test-tgz-install');
const tgzPath = path.join(__dirname, '../${tgzFileName}');

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
execSync(\`npm install "\${tgzPath}"\`, { stdio: 'inherit' });

// 创建测试文件
const testCode = \`const { fx } = require('@soonfx/fx');

console.log('🎮 测试 .tgz 包安装');
console.log('版本检查:', typeof fx);

// 测试基本功能
const distance = fx.distance(0, 0, 3, 4);
console.log('距离计算:', distance);

const result = fx.evaluateExpression('2 + 3 * 4');
console.log('表达式计算:', result);

console.log('✅ .tgz 包测试通过！');
\`;

fs.writeFileSync('test.js', testCode);

// 运行测试
console.log('🚀 运行测试...');
execSync('node test.js', { stdio: 'inherit' });

console.log('\\n🎉 .tgz 包安装测试成功！');
`;

    fs.writeFileSync(path.join(__dirname, 'test-tgz.js'), testInstallScript);
    console.log(`\n🧪 测试脚本已创建: scripts/test-tgz.js`);
    console.log('   运行测试: npm run test:tgz');

    // 清理临时复制的文件
    console.log('\n🧹 清理临时文件...');
    if (fs.existsSync(licenseTarget)) {
        fs.unlinkSync(licenseTarget);
        console.log('  ✅ 已删除 build/fx/LICENSE');
    }
    if (fs.existsSync(readmeTarget)) {
        fs.unlinkSync(readmeTarget);
        console.log('  ✅ 已删除 build/fx/README.md');
    }

} catch (error) {
    console.error('❌ 创建 .tgz 包失败:', error.message);
    
    // 即使失败也要清理临时文件
    const licenseTarget = path.join(buildDir, 'LICENSE');
    const readmeTarget = path.join(buildDir, 'README.md');
    if (fs.existsSync(licenseTarget)) {
        fs.unlinkSync(licenseTarget);
    }
    if (fs.existsSync(readmeTarget)) {
        fs.unlinkSync(readmeTarget);
    }
    
    process.exit(1);
}
