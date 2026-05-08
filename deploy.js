#!/usr/bin/env node

/**
 * CloudBase 网站部署脚本
 * 使用方法: npm run deploy
 */

const fs = require('fs');
const path = require('path');
const { execSync } = require('child_process');

// 检查并安装依赖
const requiredDeps = ['@cloudbase/cli'];
const missingDeps = [];

console.log('🔍 检查 CloudBase 依赖...');

// 检查是否安装了 CloudBase CLI
try {
  execSync('tcb --version', { stdio: 'ignore' });
  console.log('✅ CloudBase CLI 已安装');
} catch (error) {
  console.log('❌ CloudBase CLI 未安装');
  missingDeps.push('@cloudbase/cli');
}

// 安装缺失的依赖
if (missingDeps.length > 0) {
  console.log(`📦 正在安装依赖: ${missingDeps.join(', ')}`);
  try {
    execSync(`npm install -g ${missingDeps.join(' ')}`, { stdio: 'inherit' });
    console.log('✅ 依赖安装完成');
  } catch (error) {
    console.error('❌ 依赖安装失败:', error.message);
    process.exit(1);
  }
}

// 显示帮助信息
console.log('\n🌐 CloudBase 网站部署指南');
console.log('='.repeat(50));
console.log('\n请按照以下步骤部署:');
console.log('\n1. 🔐 登录 CloudBase:');
console.log('   tcb login');
console.log('\n2. 📋 查看可用环境:');
console.log('   tcb env:list');
console.log('\n3. 🎯 选择环境:');
console.log('   tcb env:use');
console.log('   （或直接在命令中使用环境ID）');
console.log('\n4. 🏗️ 构建项目:');
console.log('   npm run build');
console.log('\n5. 🚀 部署网站:');
console.log('   进入 dist 目录: cd app/dist');
console.log('   部署: tcb hosting:deploy . -e <环境ID>');
console.log('\n6. 🌍 绑定域名 (manyou-zhe.com):');
console.log('   a. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com');
console.log('   b. 选择您的环境');
console.log('   c. 进入"静态网站托管"页面');
console.log('   d. 点击"域名绑定"，添加 manyou-zhe.com');
console.log('   e. 在域名服务商处添加 CNAME 记录');
console.log('\n' + '='.repeat(50));

// 检查是否已经有环境配置
const cloudbasercPath = path.join(__dirname, 'cloudbaserc.json');
if (fs.existsSync(cloudbasercPath)) {
  try {
    const config = JSON.parse(fs.readFileSync(cloudbasercPath, 'utf8'));
    console.log('\n📄 当前 CloudBase 配置:');
    console.log(`   环境ID: ${config.envId || '未设置'}`);
    console.log(`   环境别名: ${config.envAlias || '未设置'}`);
    
    if (config.envId) {
      console.log('\n💡 快速部署命令:');
      console.log(`   cd app/dist && tcb hosting:deploy . -e ${config.envId}`);
    }
  } catch (error) {
    console.log('⚠️  配置读取失败:', error.message);
  }
}

console.log('\n📁 项目结构:');
console.log(`   项目根目录: ${__dirname}`);
console.log(`   网站目录: ${path.join(__dirname, 'app/dist')}`);
console.log(`   index.html: ${path.join(__dirname, 'app/dist/index.html')}`);

console.log('\n✅ 部署指南生成完成');
console.log('💡 提示: 如需自动化部署，请配置环境ID并运行部署脚本');