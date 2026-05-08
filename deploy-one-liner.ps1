# 单行部署命令脚本
# 功能：一键构建和部署网站到 CloudBase
# 使用方法:
#   1. 直接运行: PowerShell -ExecutionPolicy Bypass -File deploy-one-liner.ps1
#   2. 或使用命令行: .\deploy-one-liner.ps1

# 清空控制台
Clear-Host

# 显示标题
Write-Host "🚀 CloudBase 单行部署脚本" -ForegroundColor Cyan
Write-Host "部署目标: manyou-zhe.com" -ForegroundColor Yellow
Write-Host "部署时间: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor White
Write-Host ""

# 步骤1：检查依赖
Write-Host "步骤1: 检查环境依赖..." -ForegroundColor Green
$checks = @()

# 检查 Node.js
try {
    $node = node --version
    $checks += "✅ Node.js: $node"
} catch {
    $checks += "❌ Node.js: 未安装"
}

# 检查 npm
try {
    $npm = npm --version
    $checks += "✅ npm: $npm"
} catch {
    $checks += "❌ npm: 未安装"
}

# 检查 CloudBase CLI
try {
    $tcb = tcb --version 2>&1
    if ($LASTEXITCODE -eq 0) {
        $checks += "✅ CloudBase CLI: 已安装"
    } else {
        $checks += "❌ CloudBase CLI: 未安装"
    }
} catch {
    $checks += "❌ CloudBase CLI: 未安装"
}

# 显示检查结果
$checks | ForEach-Object { Write-Host $_ }
Write-Host ""

# 询问是否继续
$continue = Read-Host "是否继续部署? (y/n)"
if ($continue -ne "y") {
    Write-Host "部署已取消" -ForegroundColor Yellow
    exit 0
}

# 步骤2：构建项目
Write-Host "步骤2: 构建 React 项目..." -ForegroundColor Green
Set-Location "c:\Users\HUAWEI\Downloads\kimiOKC\app"

try {
    Write-Host "正在安装依赖..." -ForegroundColor White
    npm install --silent
    
    Write-Host "正在构建项目..." -ForegroundColor White
    npm run build
    
    Write-Host "✅ 项目构建成功" -ForegroundColor Green
} catch {
    Write-Host "❌ 项目构建失败: $_" -ForegroundColor Red
    exit 1
}

# 步骤3：获取环境信息
Write-Host "步骤3: 获取 CloudBase 环境信息..." -ForegroundColor Green
Set-Location "c:\Users\HUAWEI\Downloads\kimiOKC"

$envId = $null

# 尝试从配置文件读取
if (Test-Path "cloudbaserc.json") {
    try {
        $config = Get-Content "cloudbaserc.json" | ConvertFrom-Json
        if ($config.envId) {
            $envId = $config.envId
            Write-Host "✅ 从配置文件读取环境ID: $envId" -ForegroundColor Green
        }
    } catch {
        Write-Host "⚠️  配置文件读取失败" -ForegroundColor Yellow
    }
}

# 如果配置文件没有环境ID，让用户选择
if (!$envId) {
    Write-Host "正在获取可用环境列表..." -ForegroundColor White
    try {
        $envList = tcb env:list
        
        # 显示环境列表
        Write-Host "可用环境:" -ForegroundColor Yellow
        
        # 尝试解析环境列表
        if ($envList -match "EnvId.*") {
            # 简单的解析
            $envLines = $envList -split "`n" | Where-Object { $_ -match "EnvId" }
            for ($i = 0; $i -lt $envLines.Count; $i++) {
                Write-Host "  [$i] $($envLines[$i])" -ForegroundColor White
            }
            
            $choice = Read-Host "请选择环境编号 (0-$($envLines.Count-1))"
            if ($choice -match "^\d+$" -and [int]$choice -lt $envLines.Count) {
                # 提取环境ID（简化版本）
                $envLine = $envLines[$choice]
                if ($envLine -match "EnvId:\s*([^\s]+)") {
                    $envId = $matches[1]
                    Write-Host "✅ 选择环境: $envId" -ForegroundColor Green
                }
            }
        }
        
        # 如果解析失败，直接输入
        if (!$envId) {
            $envId = Read-Host "请输入环境ID"
            if (!$envId) {
                Write-Host "❌ 未提供环境ID，部署中止" -ForegroundColor Red
                exit 1
            }
        }
    } catch {
        Write-Host "❌ 获取环境列表失败，请手动输入环境ID" -ForegroundColor Red
        $envId = Read-Host "请输入环境ID"
    }
}

# 步骤4：部署网站
Write-Host "步骤4: 部署网站到 CloudBase..." -ForegroundColor Green
Set-Location "c:\Users\HUAWEI\Downloads\kimiOKC\app\dist"

Write-Host "正在上传文件..." -ForegroundColor White
try {
    tcb hosting:deploy . -e $envId
    Write-Host "✅ 网站部署成功" -ForegroundColor Green
} catch {
    Write-Host "❌ 网站部署失败: $_" -ForegroundColor Red
    exit 1
}

# 步骤5：显示部署结果
Write-Host "步骤5: 部署完成总结..." -ForegroundColor Cyan
Write-Host ""
Write-Host "✨ 部署成功!" -ForegroundColor Green
Write-Host "   环境ID: $envId" -ForegroundColor White
Write-Host "   网站目录: $(Get-Location)" -ForegroundColor White
Write-Host ""
Write-Host "🌐 后续操作:" -ForegroundColor Yellow
Write-Host "   1. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com" -ForegroundColor White
Write-Host "   2. 选择环境: $envId" -ForegroundColor White
Write-Host "   3. 进入 '静态网站托管' 页面" -ForegroundColor White
Write-Host "   4. 绑定域名: manyou-zhe.com" -ForegroundColor White
Write-Host "   5. 在域名服务商处添加 CNAME 记录" -ForegroundColor White
Write-Host ""
Write-Host "💡 提示:" -ForegroundColor Cyan
Write-Host "   - 部署后可通过 CloudBase 分配的临时域名访问" -ForegroundColor White
Write-Host "   - 域名绑定后可能需要 2-48 小时生效" -ForegroundColor White
Write-Host ""
Write-Host "⏰ 完成时间: $(Get-Date -Format 'HH:mm:ss')" -ForegroundColor Magenta