# 网站部署配置检查脚本
# 使用方法: PowerShell -ExecutionPolicy Bypass -File check-deployment.ps1

Write-Host "🔍 网站部署配置检查" -ForegroundColor Cyan
Write-Host "=" * 50

# 检查网站目录
$distPath = "c:\Users\HUAWEI\Downloads\kimiOKC\app\dist"
if (Test-Path $distPath) {
    Write-Host "✅ 网站目录存在: $distPath" -ForegroundColor Green
    
    $files = Get-ChildItem $distPath -File
    Write-Host "   文件数量: $($files.Count)" -ForegroundColor Yellow
    
    # 检查关键文件
    $requiredFiles = @("index.html", "favicon.png", "logo.png")
    foreach ($file in $requiredFiles) {
        $fullPath = Join-Path $distPath $file
        if (Test-Path $fullPath) {
            Write-Host "   ✅ $file 存在" -ForegroundColor Green
        } else {
            Write-Host "   ⚠️  $file 缺失" -ForegroundColor Yellow
        }
    }
    
    # 检查 assets 目录
    $assetsPath = Join-Path $distPath "assets"
    if (Test-Path $assetsPath) {
        $assetFiles = Get-ChildItem $assetsPath -File
        Write-Host "   ✅ assets 目录存在，包含 $($assetFiles.Count) 个文件" -ForegroundColor Green
    } else {
        Write-Host "   ❌ assets 目录缺失" -ForegroundColor Red
    }
} else {
    Write-Host "❌ 网站目录不存在，请先构建项目" -ForegroundColor Red
}

Write-Host ""
Write-Host "📊 CloudBase 配置检查" -ForegroundColor Cyan
Write-Host "=" * 50

# 检查 cloudbaserc.json
$cloudbasercPath = "c:\Users\HUAWEI\Downloads\kimiOKC\cloudbaserc.json"
if (Test-Path $cloudbasercPath) {
    try {
        $config = Get-Content $cloudbasercPath | ConvertFrom-Json
        Write-Host "✅ cloudbaserc.json 配置文件存在" -ForegroundColor Green
        
        if ($config.envId) {
            Write-Host "   环境ID: $($config.envId)" -ForegroundColor Yellow
        } else {
            Write-Host "   ⚠️  环境ID未设置" -ForegroundColor Yellow
        }
        
        if ($config.envAlias) {
            Write-Host "   环境别名: $($config.envAlias)" -ForegroundColor Yellow
        }
    } catch {
        Write-Host "❌ cloudbaserc.json 配置文件格式错误: $_" -ForegroundColor Red
    }
} else {
    Write-Host "⚠️  cloudbaserc.json 配置文件缺失" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "📦 项目依赖检查" -ForegroundColor Cyan
Write-Host "=" * 50

# 检查 package.json
$packageJsonPath = "c:\Users\HUAWEI\Downloads\kimiOKC\app\package.json"
if (Test-Path $packageJsonPath) {
    Write-Host "✅ React 项目 package.json 存在" -ForegroundColor Green
} else {
    Write-Host "❌ React 项目 package.json 缺失" -ForegroundColor Red
}

Write-Host ""
Write-Host "🚀 部署准备就绪检查" -ForegroundColor Cyan
Write-Host "=" * 50

$allChecksPassed = $true

# 检查 CloudBase CLI
try {
    $tcbCheck = tcb --version 2>&1
    if ($LASTEXITCODE -eq 0 -or $tcbCheck -match "version") {
        Write-Host "✅ CloudBase CLI 已安装" -ForegroundColor Green
    } else {
        Write-Host "❌ CloudBase CLI 未安装" -ForegroundColor Red
        $allChecksPassed = $false
    }
} catch {
    Write-Host "❌ CloudBase CLI 未安装" -ForegroundColor Red
    $allChecksPassed = $false
}

Write-Host ""
Write-Host "📋 部署总结" -ForegroundColor Cyan
Write-Host "=" * 50

if ($allChecksPassed) {
    Write-Host "✅ 所有检查通过，可以开始部署！" -ForegroundColor Green
    Write-Host ""
    Write-Host "部署步骤：" -ForegroundColor Yellow
    Write-Host "1. tcb login                         # 登录 CloudBase" -ForegroundColor White
    Write-Host "2. tcb env:list                     # 查看可用环境" -ForegroundColor White
    Write-Host "3. cd app/dist                      # 进入网站目录" -ForegroundColor White
    Write-Host "4. tcb hosting:deploy . -e <envId>  # 部署网站" -ForegroundColor White
    Write-Host "5. 绑定域名 manyou-zhe.com          # 在控制台操作" -ForegroundColor White
} else {
    Write-Host "⚠️  部分检查未通过，请先解决以下问题：" -ForegroundColor Yellow
    Write-Host "1. 安装 CloudBase CLI: npm install -g @cloudbase/cli" -ForegroundColor White
    Write-Host "2. 确保网站目录存在: $distPath" -ForegroundColor White
}

Write-Host ""
Write-Host "💡 提示：" -ForegroundColor Cyan
Write-Host "- 域名绑定需要 CloudBase 控制台操作" -ForegroundColor White
Write-Host "- 域名解析可能需要 2-48 小时生效" -ForegroundColor White
Write-Host "- 部署后可通过 https://manyou-zhe.com 访问" -ForegroundColor White