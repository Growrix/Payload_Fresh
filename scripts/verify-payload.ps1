# Payload verification script
$baseUrl = "http://localhost:3001"
$endpoints = @(
    "/",
    "/admin",
    "/api/payload",
    "/api/graphql"
)

Write-Host "🚀 Testing Payload website template endpoints..." -ForegroundColor Green
Write-Host "Base URL: $baseUrl" -ForegroundColor Yellow
Write-Host ""

foreach ($endpoint in $endpoints) {
    try {
        $fullUrl = "$baseUrl$endpoint"
        $response = Invoke-WebRequest -Uri $fullUrl -UseBasicParsing -TimeoutSec 10
        Write-Host "✅ $endpoint -> HTTP $($response.StatusCode)" -ForegroundColor Green
    } catch {
        Write-Host "❌ $endpoint -> FAILED: $($_.Exception.Message)" -ForegroundColor Red
    }
}

Write-Host ""
Write-Host "📋 Quick Access URLs:" -ForegroundColor Cyan
Write-Host "🌐 Website:     $baseUrl/" -ForegroundColor White
Write-Host "⚙️  Admin Panel: $baseUrl/admin" -ForegroundColor White
Write-Host "🔌 API:         $baseUrl/api/payload" -ForegroundColor White
Write-Host "📊 GraphQL:     $baseUrl/api/graphql" -ForegroundColor White
