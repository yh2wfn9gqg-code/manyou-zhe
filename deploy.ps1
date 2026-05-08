# CloudBase 网站部署脚本
# 使用方法: PowerShell -ExecutionPolicy Bypass -File deploy.ps1

param(
    [string]$envId,
    [string]$domain = "manyou-zhe.com"
)

Write-Host "=== CloudBase 网站部署脚本 ===" -ForegroundColor Cyan
Write-Host "部署时间: $(Get-Date)" -ForegroundColor Yellow
Write-Host "部署路径: $(Get-Location)" -ForegroundColor Yellow

# 检查 CloudBase CLI 是否安装
Write-Host "检查 CloudBase CLI 安装状态..." -ForegroundColor Cyan
try {
    $tcbVersion = tcb --version 2>&1
    Write-Host "✓ CloudBase CLI 已安装: $tcbVersion" -ForegroundColor Green
} catch {
    Write-Host "✗ CloudBase CLI 未安装" -ForegroundColor Red
    Write-Host "请执行以下命令安装: npm install -g @cloudbase/cli" -ForegroundColor Yellow
    exit 1
}

# 构建项目
Write-Host "构建 React 项目..." -ForegroundColor Cyan
cd "c:\Users\HUAWEI\Downloads\kimiOKC\app"
npm run build
Write-Host "✓ 项目构建完成" -ForegroundColor Green
cd ..

# 登录 CloudBase (如果需要)
Write-Host "登录 CloudBase..." -ForegroundColor Cyan
tcb login --force

if ([string]::IsNullOrEmpty($envId)) {
    # 显示可用环境列表
    Write-Host "可用环境列表:" -ForegroundColor Cyan
    tcb env:list
    
    $envId = Read-Host "请输入要使用的环境 ID"
    if ([string]::IsNullOrEmpty($envId)) {
        Write-Host "错误: 环境 ID 不能为空" -ForegroundColor Red
        exit 1
    }
}

# 部署到静态托管
Write-Host "部署网站到环境: $envId" -ForegroundColor Cyan
$distPath = "c:\Users\HUAWEI\Downloads\kimiOKC\app\dist"
Write-Host "部署路径: $distPath" -ForegroundColor Yellow

# 上传文件到静态托管
Write-Host "开始上传文件..." -ForegroundColor Cyan
tcb hosting:deploy $distPath -e $envId

# 显示部署结果
Write-Host "✓ 网站部署完成!" -ForegroundColor Green
Write-Host ""
Write-Host "下一步操作:" -ForegroundColor Cyan
Write-Host "1. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com" -ForegroundColor Yellow
Write-Host "2. 选择环境: $envId" -ForegroundColor Yellow
Write-Host "3. 进入 '静态网站托管' 页面" -ForegroundColor Yellow
Write-Host "4. 绑定您的域名: $domain" -ForegroundColor Yellow
Write-Host "5. 在域名服务商处添加 CNAME 记录" -ForegroundColor Yellow
Write-Host ""
Write-Host "部署完成时间: $(Get-Date)" -ForegroundColor Green