# 网站部署验证脚本
# 使用方法: PowerShell -ExecutionPolicy Bypass -File verify-deployment.ps1 -domain "manyou-zhe.com"

param(
    [string]$domain = "manyou-zhe.com"
)

Write-Host "🌐 网站部署验证" -ForegroundColor Cyan
Write-Host "=" * 50

# 检查域名解析
Write-Host "🔍 检查域名解析: $domain" -ForegroundColor Yellow
try {
    $dnsResult = Resolve-DnsName -Name $domain -ErrorAction SilentlyContinue
    if ($dnsResult) {
        Write-Host "✅ 域名解析成功" -ForegroundColor Green
        foreach ($record in $dnsResult) {
            Write-Host "   - $($record.Type): $($record.IPAddress)" -ForegroundColor White
        }
    } else {
        Write-Host "⚠️  域名解析失败或未生效" -ForegroundColor Yellow
    }
} catch {
    Write-Host "⚠️  域名解析失败: $_" -ForegroundColor Yellow
}

Write-Host ""
Write-Host "🌐 检查网站访问" -ForegroundColor Cyan
Write-Host "=" * 50

# 尝试访问网站
$urls = @(
    "http://$domain",
    "https://$domain"
)

foreach ($url in $urls) {
    Write-Host "测试访问: $url" -ForegroundColor Yellow
    try {
        $response = Invoke-WebRequest -Uri $url -Method Head -TimeoutSec 10 -ErrorAction SilentlyContinue
        if ($response.StatusCode -in @(200, 301, 302)) {
            Write-Host "✅ $url 可访问 (状态码: $($response.StatusCode))" -ForegroundColor Green
        } else {
            Write-Host "⚠️  $url 返回状态码: $($response.StatusCode)" -ForegroundColor Yellow
        }
    } catch {
        $errorMsg = $_.Exception.Message
        if ($errorMsg -match "SSL") {
            Write-Host "⚠️  SSL 证书可能未配置: $errorMsg" -ForegroundColor Yellow
        } elseif ($errorMsg -match "timeout") {
            Write-Host "⚠️  连接超时: $errorMsg" -ForegroundColor Yellow
        } else {
            Write-Host "❌  无法访问: $errorMsg" -ForegroundColor Red
        }
    }
}

Write-Host ""
Write-Host "📊 CloudBase 环境检查" -ForegroundColor Cyan
Write-Host "=" * 50

# 检查 CloudBase 环境状态
try {
    $envList = tcb env:list 2>&1
    if ($LASTEXITCODE -eq 0) {
        Write-Host "✅ CloudBase 环境列表获取成功" -ForegroundColor Green
        Write-Host $envList -ForegroundColor White
    } else {
        Write-Host "⚠️  CloudBase 环境列表获取失败" -ForegroundColor Yellow
    }
} catch {
    Write-Host "❌  CloudBase CLI 未安装或不可用" -ForegroundColor Red
}

Write-Host ""
Write-Host "✅ 验证完成" -ForegroundColor Green
Write-Host "=" * 50
Write-Host ""
Write-Host "💡 建议：" -ForegroundColor Cyan
Write-Host "1. 如果域名解析未生效，请等待 2-48 小时" -ForegroundColor White
Write-Host "2. 如果 HTTPS 不可用，请检查 SSL 证书配置" -ForegroundColor White
Write-Host "3. 如果网站无法访问，请检查 CloudBase 静态托管状态" -ForegroundColor White
Write-Host "4. 访问 CloudBase 控制台查看部署状态" -ForegroundColor White
Write-Host ""
Write-Host "📞 支持：" -ForegroundColor Cyan
Write-Host "- CloudBase 文档: https://cloud.tencent.com/document/product/876" -ForegroundColor White
Write-Host "- 域名服务商技术支持" -ForegroundColor White