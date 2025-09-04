function Stop-DevServer {
    try {
        $nodeProcesses = Get-Process -Name "node" -ErrorAction SilentlyContinue
        foreach ($process in $nodeProcesses) {
            Write-Host "Stopping dev server process: $($process.Id)"
            Stop-Process -Id $process.Id -Force -ErrorAction SilentlyContinue
            Start-Sleep -Milliseconds 500
        }
        Write-Host " Dev server stopped"
    } catch {
        Write-Host "ℹ No dev server found or already stopped"
    }
}

function New-SafeFile {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path,
        
        [Parameter(Mandatory=$true)]
        [string]$Content,
        
        [switch]$Force
    )
    
    try {
        # Stop dev server
        Stop-DevServer
        
        # Ensure directory exists
        $directory = Split-Path $Path -Parent
        if (!(Test-Path $directory)) {
            New-Item -ItemType Directory -Path $directory -Force | Out-Null
        }
        
        # Create file with proper encoding
        Set-Content -Path $Path -Value $Content -Encoding UTF8 -Force:$Force
        
        # Verify creation
        if (Test-Path $Path) {
            $fileInfo = Get-Item $Path
            $size = $fileInfo.Length
            Write-Host " File created: $Path ($size bytes)"
            
            # Verify content
            $actualContent = Get-Content $Path -Raw
            if ($actualContent -and $actualContent.Trim().Length -gt 0) {
                Write-Host " Content verified: $($actualContent.Length) characters"
                return $true
            } else {
                Write-Host " File created but content is empty"
                return $false
            }
        } else {
            Write-Host " File creation failed"
            return $false
        }
    } catch {
        Write-Host " Error creating file: $($_.Exception.Message)"
        return $false
    }
}

function Update-SafeFile {
    param(
        [Parameter(Mandatory=$true)]
        [string]$Path,
        
        [Parameter(Mandatory=$true)]
        [string]$OldValue,
        
        [Parameter(Mandatory=$true)]
        [string]$NewValue
    )
    
    try {
        # Stop dev server
        Stop-DevServer
        
        if (!(Test-Path $Path)) {
            Write-Host " File not found: $Path"
            return $false
        }
        
        # Read current content
        $content = Get-Content $Path -Raw
        
        # Perform replacement
        $newContent = $content -replace [regex]::Escape($OldValue), $NewValue
        
        # Only write if content changed
        if ($newContent -ne $content) {
            Set-Content -Path $Path -Value $newContent -Encoding UTF8 -Force
            
            # Verify
            $verifyContent = Get-Content $Path -Raw
            if ($verifyContent -eq $newContent) {
                Write-Host " File updated: $Path"
                return $true
            } else {
                Write-Host " File update verification failed"
                return $false
            }
        } else {
            Write-Host "ℹ No changes needed in: $Path"
            return $true
        }
    } catch {
        Write-Host " Error updating file: $($_.Exception.Message)"
        return $false
    }
}

Export-ModuleMember -Function New-SafeFile, Update-SafeFile, Stop-DevServer
