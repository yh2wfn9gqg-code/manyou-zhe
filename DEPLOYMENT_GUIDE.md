# 网站部署指南 (manyou-zhe.com)

## 项目概述

这是一个使用 React + TypeScript + Vite 构建的网站，标题为 "AI Agent Hub"。网站文件位于 `app/dist/` 目录中。

## 部署到腾讯云 CloudBase

### 第1步：安装 CloudBase CLI

```bash
npm install -g @cloudbase/cli
```

### 第2步：登录 CloudBase

```bash
tcb login
```

按照提示扫码登录腾讯云账号。

### 第3步：查看可用环境

```bash
tcb env:list
```

记录您要使用的环境 ID。

### 第4步：部署网站

1. 进入网站目录：
   ```bash
   cd "c:\Users\HUAWEI\Downloads\kimiOKC\app\dist"
   ```

2. 部署到 CloudBase 静态托管：
   ```bash
   tcb hosting:deploy . -e <您的环境ID>
   ```

### 第5步：绑定域名 manyou-zhe.com

1. 登录 [CloudBase 控制台](https://tcb.cloud.tencent.com)
2. 选择您的环境
3. 在左侧菜单选择 "静态网站托管"
4. 点击 "域名绑定"
5. 添加自定义域名：`manyou-zhe.com`
6. 按照提示在域名服务商处添加 CNAME 记录

## 自动化部署脚本

项目已包含以下部署工具：

### 1. PowerShell 脚本
```bash
PowerShell -ExecutionPolicy Bypass -File deploy.ps1 -envId <环境ID>
```

### 2. Node.js 脚本
```bash
npm run deploy
```

## 网站文件结构

```
app/dist/
├── index.html          # 网站首页
├── assets/             # 资源文件
│   ├── index-*.css    # CSS 文件
│   └── index-*.js     # JavaScript 文件
├── favicon.png         # 网站图标
├── logo.png           # Logo
└── screenshot.png     # 截图
```

## 网站配置

### 基本配置
- 标题：AI Agent Hub
- 语言：中文
- 技术栈：React 19, TypeScript, Vite, Tailwind CSS, daisyUI

### 构建配置
构建命令：
```bash
cd app
npm install
npm run build
```

构建输出目录：`app/dist`

## 部署后测试

1. 访问您的域名：`https://manyou-zhe.com`
2. 检查页面是否正常加载
3. 测试导航功能
4. 验证响应式布局

## 故障排除

### 常见问题

1. **CNAME 记录未生效**
   - 等待 DNS 传播（通常需要 2-48 小时）
   - 检查域名解析是否正确

2. **网站无法访问**
   - 检查环境状态是否为 "运行中"
   - 确认静态网站托管已开启

3. **文件上传失败**
   - 检查网络连接
   - 确认账号有足够权限

### 联系支持

- CloudBase 技术支持：[文档中心](https://cloud.tencent.com/document/product/876)
- 域名服务商支持

## 更新网站

要更新网站内容，请执行以下步骤：

1. 修改源代码（位于 `app/src/` 目录）
2. 重新构建：
   ```bash
   cd app
   npm run build
   ```
3. 重新部署：
   ```bash
   cd dist
   tcb hosting:deploy . -e <您的环境ID>
   ```

## 重要提醒

1. 网站部署后，CDN 缓存可能需要几分钟时间刷新
2. 建议添加 HTTPS 证书（CloudBase 默认提供）
3. 定期备份重要数据
4. 监控网站性能和可用性

---
*最后更新: $(Get-Date)*