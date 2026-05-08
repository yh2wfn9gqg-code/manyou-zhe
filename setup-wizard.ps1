# CloudBase 部署配置向导
# 功能：引导用户完成 CloudBase 环境配置
# 使用方法: PowerShell -ExecutionPolicy Bypass -File setup-wizard.ps1

function Show-Wizard {
    Clear-Host
    Write-Host "==========================================" -ForegroundColor Cyan
    Write-Host "    CloudBase 部署配置向导" -ForegroundColor Cyan
    Write-Host "==========================================" -ForegroundColor Cyan
}

function Check-CloudBase {
    Write-Host "`n步骤1: 检查 CloudBase 环境" -ForegroundColor Green
    
    # 检查 CloudBase CLI
    $tcbInstalled = $false
    try {
        $tcbCheck = tcb --version 2>&1
        if ($LASTEXITCODE -eq 0) {
            $tcbInstalled = $true
            Write-Host "✅ CloudBase CLI 已安装: $tcbCheck" -ForegroundColor Green
        }
    } catch {
        Write-Host "❌ CloudBase CLI 未安装" -ForegroundColor Red
    }
    
    if (!$tcbInstalled) {
        $install = Read-Host "是否安装 CloudBase CLI? (y/n)"
        if ($install -eq "y") {
            Write-Host "正在安装 CloudBase CLI..." -ForegroundColor Yellow
            npm install -g @cloudbase/cli
            
            # 验证安装
            try {
                tcb --version > $null
                Write-Host "✅ CloudBase CLI 安装成功" -ForegroundColor Green
                $tcbInstalled = $true
            } catch {
                Write-Host "❌ CloudBase CLI 安装失败" -ForegroundColor Red
                return $false
            }
        } else {
            Write-Host "⚠️  需要 CloudBase CLI 才能继续" -ForegroundColor Yellow
            return $false
        }
    }
    
    return $true
}

function Login-CloudBase {
    Write-Host "`n步骤2: 登录 CloudBase" -ForegroundColor Green
    
    # 检查是否已登录
    try {
        $loginStatus = tcb login --status 2>&1
        if ($loginStatus -match "已登录") {
            Write-Host "✅ CloudBase 已登录" -ForegroundColor Green
            return $true
        }
    } catch {
        # 忽略错误
    }
    
    Write-Host "需要登录 CloudBase 账号..." -ForegroundColor Yellow
    Write-Host "请按照以下步骤操作:" -ForegroundColor White
    Write-Host "1. 打开命令提示符" -ForegroundColor White
    Write-Host "2. 运行: tcb login" -ForegroundColor White
    Write-Host "3. 使用微信扫码登录" -ForegroundColor White
    Write-Host ""
    
    $manualLogin = Read-Host "是否已登录? (y/n)"
    if ($manualLogin -ne "y") {
        Write-Host "请先登录 CloudBase 再继续" -ForegroundColor Yellow
        return $false
    }
    
    return $true
}

function Configure-Environment {
    Write-Host "`n步骤3: 配置环境" -ForegroundColor Green
    
    # 获取环境列表
    Write-Host "获取可用环境列表..." -ForegroundColor Yellow
    try {
        $envList = tcb env:list
        Write-Host "`n可用环境:" -ForegroundColor Cyan
        Write-Host $envList -ForegroundColor White
    } catch {
        Write-Host "❌ 获取环境列表失败: $_" -ForegroundColor Red
        return $false
    }
    
    # 选择环境
    $envId = Read-Host "`n请输入要使用的环境ID (或按 Enter 创建新环境)"
    
    if (!$envId) {
        Write-Host "`n创建新环境..." -ForegroundColor Yellow
        $envName = Read-Host "请输入环境名称"
        if ($envName) {
            try {
                tcb env:create $envName
                Write-Host "✅ 环境创建成功" -ForegroundColor Green
                $envId = $envName
            } catch {
                Write-Host "❌ 环境创建失败: $_" -ForegroundColor Red
                return $false
            }
        }
    }
    
    if (!$envId) {
        Write-Host "❌ 未提供环境ID" -ForegroundColor Red
        return $false
    }
    
    # 保存配置
    $config = @{
        envId = $envId
        envAlias = $envId
        version = "1.0"
        createdAt = Get-Date -Format "yyyy-MM-dd HH:mm:ss"
    }
    
    $configJson = $config | ConvertTo-Json
    Set-Content -Path "cloudbaserc.json" -Value $configJson
    
    Write-Host "✅ 配置文件已保存: cloudbaserc.json" -ForegroundColor Green
    Write-Host "   环境ID: $envId" -ForegroundColor White
    
    return $true
}

function Configure-Domain {
    Write-Host "`n步骤4: 配置域名" -ForegroundColor Green
    
    $domain = Read-Host "请输入您的域名 (例如: manyou-zhe.com)"
    if (!$domain) {
        $domain = "manyou-zhe.com"
        Write-Host "使用默认域名: $domain" -ForegroundColor Yellow
    }
    
    Write-Host "`n域名配置说明:" -ForegroundColor Cyan
    Write-Host "1. 部署完成后，需要手动绑定域名" -ForegroundColor White
    Write-Host "2. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com" -ForegroundColor White
    Write-Host "3. 选择您的环境" -ForegroundColor White
    Write-Host "4. 进入 '静态网站托管' 页面" -ForegroundColor White
    Write-Host "5. 点击 '域名绑定'，添加: $domain" -ForegroundColor White
    Write-Host "6. 在域名服务商处添加 CNAME 记录" -ForegroundColor White
    
    return $domain
}

function Show-Summary {
    param($envId, $domain)
    
    Write-Host "`n==========================================" -ForegroundColor Green
    Write-Host "           配置完成总结" -ForegroundColor Green
    Write-Host "==========================================" -ForegroundColor Green
    
    Write-Host "`n✅ 配置完成!" -ForegroundColor Green
    Write-Host ""
    Write-Host "📋 配置信息:" -ForegroundColor Cyan
    Write-Host "   环境ID: $envId" -ForegroundColor White
    Write-Host "   域名: $domain" -ForegroundColor White
    Write-Host "   配置文件: cloudbaserc.json" -ForegroundColor White
    
    Write-Host "`n🚀 下一步操作:" -ForegroundColor Yellow
    Write-Host "   1. 运行部署脚本: .\deploy.bat" -ForegroundColor White
    Write-Host "   2. 或运行: .\auto-deploy.ps1" -ForegroundColor White
    Write-Host "   3. 绑定域名到 CloudBase" -ForegroundColor White
    
    Write-Host "`n💡 提示:" -ForegroundColor Cyan
    Write-Host "   - 确保域名已解析到 CloudBase" -ForegroundColor White
    Write-Host "   - 部署后可通过临时域名测试" -ForegroundColor White
    Write-Host "   - 查看部署指南: DEPLOYMENT_GUIDE.md" -ForegroundColor White
}

# 主程序
function Main {
    Show-Wizard
    
    Write-Host "本向导将帮助您配置 CloudBase 部署环境" -ForegroundColor White
    Write-Host ""
    
    # 检查 CloudBase
    if (!(Check-CloudBase)) {
        Write-Host "配置中止" -ForegroundColor Red
        return
    }
    
    # 登录 CloudBase
    if (!(Login-CloudBase)) {
        Write-Host "配置中止" -ForegroundColor Red
        return
    }
    
    # 配置环境
    if (!(Configure-Environment)) {
        Write-Host "配置中止" -ForegroundColor Red
        return
    }
    
    # 读取配置
    $config = Get-Content "cloudbaserc.json" | ConvertFrom-Json
    $envId = $config.envId
    
    # 配置域名
    $domain = Configure-Domain
    
    # 显示总结
    Show-Summary -envId $envId -domain $domain
    
    Write-Host "`n按任意键退出..." -ForegroundColor Gray
    $null = $Host.UI.RawUI.ReadKey("NoEcho,IncludeKeyDown")
}

# 运行主程序
Main