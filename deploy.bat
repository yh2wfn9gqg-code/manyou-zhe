@echo off
echo ==========================================
echo     CloudBase 网站自动部署工具
echo     部署到: manyou-zhe.com
echo     时间: %date% %time%
echo ==========================================
echo.

REM 检查是否以管理员身份运行
net session >nul 2>&1
if %errorLevel% neq 0 (
    echo ⚠️  建议以管理员身份运行此脚本
    echo.
)

REM 检查 PowerShell 版本
powershell -Command "if ($PSVersionTable.PSVersion.Major -lt 5) { Write-Host '❌ 需要 PowerShell 5.0 或更高版本' -ForegroundColor Red; exit 1 }"

echo.
echo 请选择部署模式:
echo 1) 完全自动部署（推荐）
echo 2) 仅构建项目
echo 3) 仅部署网站
echo 4) 检查部署环境
echo 5) 退出
echo.

set /p choice="请输入选项 (1-5): "

if "%choice%"=="1" goto full_deploy
if "%choice%"=="2" goto build_only
if "%choice%"=="3" goto deploy_only
if "%choice%"=="4" goto check_env
if "%choice%"=="5" goto exit_script
goto exit_script

:full_deploy
echo.
echo 执行完全自动部署...
powershell -ExecutionPolicy Bypass -File "%~dp0deploy-one-liner.ps1"
goto exit_script

:build_only
echo.
echo 仅构建项目...
powershell -ExecutionPolicy Bypass -Command "cd '%~dp0app'; npm install; npm run build"
echo ✅ 项目构建完成
goto exit_script

:deploy_only
echo.
echo 仅部署网站...
powershell -ExecutionPolicy Bypass -Command "cd '%~dp0app\dist'; $envId = Read-Host '请输入环境ID'; tcb hosting:deploy . -e $envId"
goto exit_script

:check_env
echo.
echo 检查部署环境...
powershell -ExecutionPolicy Bypass -File "%~dp0check-deployment.ps1"
goto exit_script

:exit_script
echo.
echo ==========================================
echo     部署工具执行完成
echo     查看日志: %~dp0deploy.log
echo ==========================================
echo.
pause