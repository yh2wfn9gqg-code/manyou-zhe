@echo off
echo ==========================================
echo     网站一键部署工具
echo     部署到: manyou-zhe.com
echo ==========================================
echo.

echo 步骤1: 检查环境...
echo.

REM 检查 Node.js
echo 检查 Node.js...
node --version >nul 2>&1
if errorlevel 1 (
    echo ❌ Node.js 未安装
    echo 请先安装 Node.js: https://nodejs.org/
    pause
    exit /b 1
) else (
    echo ✅ Node.js 已安装
)

REM 检查 npm
echo 检查 npm...
npm --version >nul 2>&1
if errorlevel 1 (
    echo ❌ npm 未安装
    pause
    exit /b 1
) else (
    echo ✅ npm 已安装
)

REM 检查 CloudBase CLI
echo 检查 CloudBase CLI...
tcb --version >nul 2>&1
if errorlevel 1 (
    echo ⚠️  CloudBase CLI 未安装
    echo 正在安装 CloudBase CLI...
    npm install -g @cloudbase/cli
    if errorlevel 1 (
        echo ❌ CloudBase CLI 安装失败
        pause
        exit /b 1
    )
    echo ✅ CloudBase CLI 安装成功
) else (
    echo ✅ CloudBase CLI 已安装
)

echo.
echo 步骤2: 登录 CloudBase...
echo.
echo 请按以下步骤操作：
echo 1. 在命令提示符中运行: tcb login
echo 2. 使用微信扫码登录
echo 3. 登录成功后返回此窗口
echo.

set /p logged="是否已登录 CloudBase? (y/n): "
if /i "%logged%" neq "y" (
    echo 请先登录 CloudBase 再继续
    pause
    exit /b 1
)

echo.
echo 步骤3: 选择环境...
echo.
echo 正在获取环境列表...
tcb env:list

echo.
set /p envId="请输入要使用的环境ID: "
if "%envId%"=="" (
    echo ❌ 未输入环境ID
    pause
    exit /b 1
)

echo.
echo 步骤4: 部署网站...
echo.
cd "c:\Users\HUAWEI\Downloads\kimiOKC\app\dist"
echo 当前目录: %cd%
echo.

tcb hosting:deploy . -e %envId%
if errorlevel 1 (
    echo ❌ 部署失败
    pause
    exit /b 1
)

echo.
echo ✅ 部署成功!
echo.
echo ==========================================
echo     部署完成
echo ==========================================
echo.
echo 下一步操作:
echo 1. 登录 CloudBase 控制台: https://tcb.cloud.tencent.com
echo 2. 选择环境: %envId%
echo 3. 进入"静态网站托管"页面
echo 4. 绑定域名: manyou-zhe.com
echo 5. 在域名服务商处添加 CNAME 记录
echo.
echo 提示: 域名解析可能需要 2-48 小时生效
echo.
pause