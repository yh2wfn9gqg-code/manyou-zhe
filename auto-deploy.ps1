# CloudBase 自动部署脚本
# 功能：自动构建并部署网站到 CloudBase，支持域名绑定
# 使用方法: PowerShell -ExecutionPolicy Bypass -File auto-deploy.ps1

param(
    [string]$envId,
    [string]$domain = "manyou-zhe.com",
    [string]$mode = "auto",  # auto, build-only, deploy-only
    [switch]$force,
    [switch]$skipBuild,
    [switch]$skipDomain,
    [switch]$interactive
)

# 配置
$ProjectRoot = "c:\Users\HUAWEI\Downloads\kimiOKC"
$AppDir = Join-Path $ProjectRoot "app"
$DistDir = Join-Path $AppDir "dist"
$CloudbasercPath = Join-Path $ProjectRoot "cloudbaserc.json"
$LogFile = Join-Path $ProjectRoot "deploy.log"

# 日志函数
function Write-Log {
    param($Message, $Level = "INFO")
    $timestamp = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    $logEntry = "[$timestamp] [$Level] $Message"
    Write-Host $logEntry -ForegroundColor $(switch ($Level) {
        "SUCCESS" { "Green" }
        "WARNING" { "Yellow" }
        "ERROR" { "Red" }
        default { "White" }
    })
    Add-Content -Path $LogFile -Value $logEntry
}

function Show-Header {
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "    CloudBase 自动部署脚本 v1.0" -ForegroundColor Cyan
    Write-Host "    部署目标: $domain" -ForegroundColor Cyan
    Write-Host "    时间: $(Get-Date -Format 'yyyy-MM-dd HH:mm:ss')" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host ""
}

function Check-Prerequisites {
    Write-Log "检查部署前提条件..."
    
    # 检查 Node.js
    try {
        $nodeVersion = node --version
        Write-Log "✅ Node.js 版本: $nodeVersion" "SUCCESS"
    } catch {
        Write-Log "❌ Node.js 未安装或未在 PATH 中" "ERROR"
        return $false
    }
    
    # 检查 npm
    try {
        $npmVersion = npm --version
        Write-Log "✅ npm 版本: $npmVersion" "SUCCESS"
    } catch {
        Write-Log "❌ npm 未安装或未在 PATH 中" "ERROR"
        return $false
    }
    
    # 检查 CloudBase CLI
    try {
        $tcbVersion = tcb --version 2>$null
        if ($LASTEXITCODE -eq 0) {
            Write-Log "✅ CloudBase CLI 已安装" "SUCCESS"
        } else {
            Write-Log "⚠️  CloudBase CLI 可能需要安装" "WARNING"
            if ($interactive -or $force) {
                $install = Read-Host "是否安装 CloudBase CLI? (y/n)"
                if ($install -eq "y") {
                    Write-Log "安装 CloudBase CLI..."
                    npm install -g @cloudbase/cli
                    if ($LASTEXITCODE -eq 0) {
                        Write-Log "✅ CloudBase CLI 安装成功" "SUCCESS"
                    } else {
                        Write-Log "❌ CloudBase CLI 安装失败" "ERROR"
                        return $false
                    }
                }
            }
        }
    } catch {
        Write-Log "⚠️  CloudBase CLI 未安装" "WARNING"
        if ($interactive -or $force) {
            Write-Log "自动安装 CloudBase CLI..."
            npm install -g @cloudbase/cli
        }
    }
    
    return $true
}

function Build-Project {
    Write-Log "构建项目..."
    
    if (!(Test-Path $AppDir)) {
        Write-Log "❌ 项目目录不存在: $AppDir" "ERROR"
        return $false
    }
    
    # 检查 package.json
    $packageJson = Join-Path $AppDir "package.json"
    if (!(Test-Path $packageJson)) {
        Write-Log "❌ package.json 不存在" "ERROR"
        return $false
    }
    
    # 检查是否需要安装依赖
    $nodeModules = Join-Path $AppDir "node_modules"
    if (!(Test-Path $nodeModules)) {
        Write-Log "安装项目依赖..."
        Set-Location $AppDir
        npm install
        if ($LASTEXITCODE -ne 0) {
            Write-Log "❌ 依赖安装失败" "ERROR"
            return $false
        }
        Write-Log "✅ 依赖安装成功" "SUCCESS"
    }
    
    # 构建项目
    Write-Log "执行构建命令..."
    Set-Location $AppDir
    npm run build
    
    if ($LASTEXITCODE -ne 0) {
        Write-Log "❌ 项目构建失败" "ERROR"
        return $false
    }
    
    # 验证构建结果
    if (!(Test-Path $DistDir)) {
        Write-Log "❌ 构建输出目录不存在" "ERROR"
        return $false
    }
    
    $distFiles = Get-ChildItem $DistDir -File | Measure-Object
    if ($distFiles.Count -eq 0) {
        Write-Log "❌ 构建输出目录为空" "ERROR"
        return $false
    }
    
    Write-Log "✅ 项目构建成功，生成 $($distFiles.Count) 个文件" "SUCCESS"
    return $true
}

function Login-CloudBase {
    Write-Log "登录 CloudBase..."
    
    try {
        # 检查是否已登录
        $loginStatus = tcb login --status 2>&1
        if ($loginStatus -match "已登录") {
            Write-Log "✅ CloudBase 已登录" "SUCCESS"
            return $true
        }
        
        Write-Log "需要登录 CloudBase，请扫码登录..."
        tcb login
        if ($LASTEXITCODE -eq 0) {
            Write-Log "✅ CloudBase 登录成功" "SUCCESS"
            return $true
        } else {
            Write-Log "❌ CloudBase 登录失败" "ERROR"
            return $false
        }
    } catch {
        Write-Log "❌ CloudBase 登录出错: $_" "ERROR"
        return $false
    }
}

function Get-Environment {
    param([string]$preferredEnvId)
    
    Write-Log "获取 CloudBase 环境信息..."
    
    # 如果已指定环境ID，直接使用
    if ($preferredEnvId) {
        Write-Log "使用指定环境ID: $preferredEnvId"
        return $preferredEnvId
    }
    
    # 从配置文件读取
    if (Test-Path $CloudbasercPath) {
        try {
            $config = Get-Content $CloudbasercPath | ConvertFrom-Json
            if ($config.envId) {
                Write-Log "从配置文件读取环境ID: $($config.envId)" "SUCCESS"
                return $config.envId
            }
        } catch {
            Write-Log "配置文件读取失败，跳过" "WARNING"
        }
    }
    
    # 获取环境列表
    try {
        Write-Log "获取可用环境列表..."
        $envList = tcb env:list --json 2>$null
        if ($envList) {
            $envs = $envList | ConvertFrom-Json
            if ($envs.Count -gt 0) {
                Write-Log "找到 $($envs.Count) 个环境" "SUCCESS"
                
                # 显示环境列表
                Write-Host "可用环境列表:" -ForegroundColor Yellow
                for ($i = 0; $i -lt $envs.Count; $i++) {
                    $env = $envs[$i]
                    Write-Host "  [$i] $($env.EnvId) - $($env.Alias) ($($env.Status))" -ForegroundColor White
                }
                
                if ($interactive) {
                    $choice = Read-Host "请选择环境编号 (0-$($envs.Count-1))"
                    if ($choice -match "^\d+$" -and [int]$choice -lt $envs.Count) {
                        $selectedEnv = $envs[$choice].EnvId
                        Write-Log "选择环境: $selectedEnv" "SUCCESS"
                        return $selectedEnv
                    }
                }
                
                # 自动选择第一个可用环境
                $firstEnv = $envs[0].EnvId
                Write-Log "自动选择第一个环境: $firstEnv" "SUCCESS"
                return $firstEnv
            }
        }
    } catch {
        Write-Log "获取环境列表失败" "WARNING"
    }
    
    # 请求用户输入
    if ($interactive) {
        $manualEnvId = Read-Host "请输入环境ID"
        if ($manualEnvId) {
            Write-Log "使用手动输入环境ID: $manualEnvId" "SUCCESS"
            return $manualEnvId
        }
    }
    
    Write-Log "❌ 无法获取环境ID" "ERROR"
    return $null
}

function Deploy-Website {
    param([string]$targetEnvId)
    
    Write-Log "部署网站到环境: $targetEnvId"
    
    if (!(Test-Path $DistDir)) {
        Write-Log "❌ 构建目录不存在: $DistDir" "ERROR"
        return $false
    }
    
    # 检查 dist 目录内容
    $indexFile = Join-Path $DistDir "index.html"
    if (!(Test-Path $indexFile)) {
        Write-Log "❌ index.html 文件不存在" "ERROR"
        return $false
    }
    
    # 部署到 CloudBase
    try {
        Write-Log "上传文件到 CloudBase 静态托管..."
        Set-Location $DistDir
        tcb hosting:deploy . -e $targetEnvId
        
        if ($LASTEXITCODE -eq 0) {
            Write-Log "✅ 网站部署成功" "SUCCESS"
            return $true
        } else {
            Write-Log "❌ 网站部署失败" "ERROR"
            return $false
        }
    } catch {
        Write-Log "❌ 部署过程出错: $_" "ERROR"
        return $false
    }
}

function Configure-Domain {
    param([string]$targetEnvId, [string]$targetDomain)
    
    Write-Log "配置域名: $targetDomain"
    
    # 显示域名配置指南
    Write-Host ""
    Write-Host "🌐 域名配置指南" -ForegroundColor Cyan
    Write-Host "=" * 50
    Write-Host "域名: $targetDomain" -ForegroundColor Yellow
    Write-Host "环境ID: $targetEnvId" -ForegroundColor Yellow
    Write-Host ""
    Write-Host "请按以下步骤操作:" -ForegroundColor White
    Write-Host "1. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com" -ForegroundColor White
    Write-Host "2. 选择环境: $targetEnvId" -ForegroundColor White
    Write-Host "3. 进入 '静态网站托管' 页面" -ForegroundColor White
    Write-Host "4. 点击 '域名绑定'" -ForegroundColor White
    Write-Host "5. 添加域名: $targetDomain" -ForegroundColor White
    Write-Host "6. 在域名服务商处添加 CNAME 记录" -ForegroundColor White
    Write-Host ""
    Write-Host "💡 提示: 域名解析可能需要 2-48 小时生效" -ForegroundColor Cyan
    Write-Host "=" * 50
    Write-Host ""
    
    return $true
}

function Show-Summary {
    param([string]$envId, [string]$domain, [bool]$buildSuccess, [bool]$deploySuccess)
    
    Write-Host ""
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host "           部署完成总结" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    Write-Host ""
    
    if ($buildSuccess) {
        Write-Host "✅ 项目构建: 成功" -ForegroundColor Green
        Write-Host "   构建目录: $DistDir" -ForegroundColor White
    } else {
        Write-Host "❌ 项目构建: 失败" -ForegroundColor Red
    }
    
    if ($deploySuccess) {
        Write-Host "✅ 网站部署: 成功" -ForegroundColor Green
        Write-Host "   环境ID: $envId" -ForegroundColor White
        
        # 尝试获取部署URL
        try {
            $hostingInfo = tcb hosting:detail -e $envId 2>$null
            if ($hostingInfo -match "https?://[^\s]+") {
                $matches[0] | ForEach-Object {
                    Write-Host "   访问地址: $_" -ForegroundColor White
                }
            }
        } catch {
            # 忽略错误
        }
    } else {
        Write-Host "❌ 网站部署: 失败" -ForegroundColor Red
    }
    
    Write-Host ""
    Write-Host "🌐 域名配置" -ForegroundColor Yellow
    Write-Host "   域名: $domain" -ForegroundColor White
    Write-Host "   配置指南: 请查看上方域名配置指南" -ForegroundColor White
    Write-Host ""
    Write-Host "📋 日志文件: $LogFile" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Green
}

# 主程序
function Main {
    Show-Header
    
    # 检查前提条件
    if (!(Check-Prerequisites)) {
        Write-Log "前提条件检查失败，部署中止" "ERROR"
        exit 1
    }
    
    # 登录 CloudBase
    if (!(Login-CloudBase)) {
        Write-Log "CloudBase 登录失败，部署中止" "ERROR"
        exit 1
    }
    
    # 获取环境ID
    $finalEnvId = Get-Environment $envId
    if (!$finalEnvId) {
        Write-Log "无法获取环境ID，部署中止" "ERROR"
        exit 1
    }
    
    # 构建项目
    $buildSuccess = $true
    if (!$skipBuild -and $mode -ne "deploy-only") {
        $buildSuccess = Build-Project
        if (!$buildSuccess) {
            Write-Log "项目构建失败" "ERROR"
            if (!$force) {
                exit 1
            }
        }
    }
    
    # 部署网站
    $deploySuccess = $true
    if ($mode -ne "build-only") {
        $deploySuccess = Deploy-Website -targetEnvId $finalEnvId
        if (!$deploySuccess) {
            Write-Log "网站部署失败" "ERROR"
            if (!$force) {
                exit 1
            }
        }
    }
    
    # 域名配置
    if (!$skipDomain) {
        Configure-Domain -targetEnvId $finalEnvId -targetDomain $domain
    }
    
    # 显示总结
    Show-Summary -envId $finalEnvId -domain $domain -buildSuccess $buildSuccess -deploySuccess $deploySuccess
    
    Write-Log "自动部署完成" "SUCCESS"
}

# 执行主程序
try {
    Main
} catch {
    Write-Log "部署过程中出现未预期错误: $_" "ERROR"
    exit 1
}