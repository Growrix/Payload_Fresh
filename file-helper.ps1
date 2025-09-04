# Quick File Operations Helper Script
# Usage: .\file-helper.ps1 create "path/to/file.ts" "content"
# Usage: .\file-helper.ps1 update "path/to/file.ts" "old text" "new text"

param(
    [Parameter(Mandatory=$true)]
    [ValidateSet("create", "update", "stop")]
    [string]$Action,
    
    [string]$Path = "",
    [string]$Content = "",
    [string]$NewContent = ""
)

Import-Module ".\SafeFileOps.psm1" -Force

switch ($Action) {
    "create" {
        if (!$Path -or !$Content) {
            Write-Host " Usage: .\file-helper.ps1 create 'path/to/file.ts' 'content'"
            exit 1
        }
        New-SafeFile -Path $Path -Content $Content
    }
    "update" {
        if (!$Path -or !$Content -or !$NewContent) {
            Write-Host " Usage: .\file-helper.ps1 update 'path/to/file.ts' 'old text' 'new text'"
            exit 1
        }
        Update-SafeFile -Path $Path -OldValue $Content -NewValue $NewContent
    }
    "stop" {
        Stop-DevServer
    }
}
