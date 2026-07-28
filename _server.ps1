# Простой статический HTTP-сервер на PowerShell (.NET HttpListener)
# Раздаёт файлы из D:\Project на http://localhost:8000

$root = "D:\Project"
$port = 8000
$prefix = "http://localhost:$port/"

$mimes = @{
    ".html" = "text/html; charset=utf-8"
    ".css"  = "text/css; charset=utf-8"
    ".js"   = "application/javascript; charset=utf-8"
    ".json" = "application/json; charset=utf-8"
    ".svg"  = "image/svg+xml"
    ".png"  = "image/png"
    ".jpg"  = "image/jpeg"
    ".ico"  = "image/x-icon"
    ".md"   = "text/plain; charset=utf-8"
    ".sql"  = "text/plain; charset=utf-8"
}

$listener = New-Object System.Net.HttpListener
$listener.Prefixes.Add($prefix)
$listener.Start()
Write-Host "Сервер запущен: $prefix" -ForegroundColor Cyan
Write-Host "Корень: $root"
Write-Host "Нажми Ctrl+C для остановки." -ForegroundColor DarkGray

try {
    while ($listener.IsListening) {
        $ctx = $listener.GetContext()
        $req = $ctx.Request
        $res = $ctx.Response

        $path = $req.Url.AbsolutePath
        if ($path -eq "/" -or $path -eq "") { $path = "/index.html" }

        $relPath = $path.TrimStart("/").Replace("/", "\")
        $fullPath = Join-Path $root $relPath

        if (Test-Path $fullPath -PathType Leaf) {
            $ext = [System.IO.Path]::GetExtension($fullPath).ToLower()
            $mime = if ($mimes.ContainsKey($ext)) { $mimes[$ext] } else { "application/octet-stream" }
            $bytes = [System.IO.File]::ReadAllBytes($fullPath)
            $res.ContentType = $mime
            $res.ContentLength64 = $bytes.Length
            $res.OutputStream.Write($bytes, 0, $bytes.Length)
            Write-Host "200  $($req.HttpMethod)  $path" -ForegroundColor Green
        } else {
            $msg = [System.Text.Encoding]::UTF8.GetBytes("404 Not Found: $path")
            $res.StatusCode = 404
            $res.ContentType = "text/plain; charset=utf-8"
            $res.ContentLength64 = $msg.Length
            $res.OutputStream.Write($msg, 0, $msg.Length)
            Write-Host "404  $($req.HttpMethod)  $path" -ForegroundColor Red
        }
        $res.Close()
    }
}
finally {
    $listener.Stop()
    Write-Host "Сервер остановлен."
}
