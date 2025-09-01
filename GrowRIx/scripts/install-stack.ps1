<#
Interactive installer for GrowRIx-Clean Phase 8 (Install Stack & Dependencies)

Usage: run this in the new project root (PowerShell)
  cd f:\PROJECTS\GROWRIX PROJECT\GrowRIx-Clean
  .\scripts\install-stack.ps1

The script prompts before each step and logs output to ./install-log.txt
#>

Set-StrictMode -Version Latest
$LogFile = Join-Path -Path (Get-Location) -ChildPath "install-log.txt"
"Install started at $(Get-Date -Format o)" | Out-File -FilePath $LogFile -Encoding utf8

function Log {
    param($msg)
    $time = Get-Date -Format "HH:mm:ss"
    $line = "[$time] $msg"
    $line | Tee-Object -FilePath $LogFile -Append
}

function Invoke-RunCommand {
    param($cmd)
    Log "RUN: $cmd"
    try {
        Invoke-Expression $cmd 2>&1 | Tee-Object -FilePath $LogFile -Append
        Log "SUCCESS: $cmd"
    } catch {
        Log "ERROR running: $cmd"
        Log $_.Exception.Message
        Write-Host "Error encountered. See install-log.txt for details. Aborting." -ForegroundColor Red
        exit 1
    }
}

function Get-YesNoChoice($message, $defaultYes = $true) {
    $yn = Read-Host "$message (Y/n)"
    if ([string]::IsNullOrWhiteSpace($yn)) { return $defaultYes }
    return $yn.Trim().ToLower().StartsWith('y')
}

Write-Host "GrowRIx installer — Phase 8: Install Stack & Dependencies" -ForegroundColor Cyan
Log "Installer invoked in: $(Get-Location)"

# Pre-install validation
Write-Host "\nPre-install validation:" -ForegroundColor Yellow
Run-Command "node -v"
Run-Command "npm -v"

if (-not (Test-Path package.json)) {
    Write-Host "Warning: no package.json found in $(Get-Location). Make sure you're in the new project root." -ForegroundColor Red
    Log "No package.json found. Exiting."
    exit 1
}

if (Get-YesNoChoice "Backup package.json to package.json.bak now?") {
    Invoke-RunCommand "Copy-Item package.json package.json.bak -Force"
}

Write-Host "\nPhase 1: Clean install (remove node_modules & lockfile)" -ForegroundColor Yellow
if (Get-YesNoChoice "Proceed with cleaning node_modules and package-lock.json?") {
    Invoke-RunCommand "if (Test-Path node_modules) { Remove-Item -Recurse -Force node_modules }"
    Invoke-RunCommand "if (Test-Path package-lock.json) { Remove-Item -Force package-lock.json }"
    Invoke-RunCommand "npm cache clean --force"
}

Write-Host "\nPhase 2: Install React 19 and Next (pinning Next optional)" -ForegroundColor Yellow
if (Get-YesNoChoice "Install react@^19.0.0 and react-dom@^19.0.0 now?") {
    Invoke-RunCommand "npm install react@^19.0.0 react-dom@^19.0.0 --save"
}

if (Get-YesNoChoice "Install next@15.4.6 (project used this version)?", $false) {
    Invoke-RunCommand "npm install next@15.4.6 --save"
}

Write-Host "\nPhase 3: Install Payload core and Postgres adapter" -ForegroundColor Yellow
if (Get-YesNoChoice "Install payload, @payloadcms/db-postgres and pg now?") {
    Invoke-RunCommand "npm install payload@^3.53.0 @payloadcms/db-postgres@^3.53.0 pg --save"
}

Write-Host "\nPhase 4: Optional admin UI plugins (requires React 19)" -ForegroundColor Yellow
if (Get-YesNoChoice "Install admin UI plugins (@payloadcms/plugin-seo, plugin-search, richtext-lexical)?", $false) {
    Invoke-RunCommand "npm install @payloadcms/plugin-seo@^3.53.0 @payloadcms/plugin-search@^3.53.0 @payloadcms/richtext-lexical@^3.53.0 --save"
}

Write-Host "\nPhase 5: Install dev & testing tools (devDependencies)" -ForegroundColor Yellow
if (Get-YesNoChoice "Install Vitest, Testing Library, Cypress and TypeScript helpers as devDependencies?") {
    Invoke-RunCommand "npm install -D vitest@^3.2.4 @testing-library/react @testing-library/jest-dom cypress@^12.13.0"
    Invoke-RunCommand "npm install -D typescript@5.9.2 ts-node@^10.9.2 @types/node @types/react"
}

Write-Host "\nPhase 6: Verification (checks)" -ForegroundColor Yellow
Invoke-RunCommand "npm ls react || true"

if (Get-YesNoChoice "Run 'npm run build' now? (will run project build)") {
    Invoke-RunCommand "npm run build"
}

if (Get-YesNoChoice "Start dev server now (npm run dev)?", $false) {
    Write-Host "Starting dev server. Press Ctrl+C to stop." -ForegroundColor Green
    Log "Starting dev server"
    # Use Start-Process so the script doesn't block logging
    Start-Process -FilePath npm -ArgumentList "run dev" -NoNewWindow
}

Log "Install finished at $(Get-Date -Format o)"
Write-Host "\nInstaller finished. Logs: install-log.txt" -ForegroundColor Green
