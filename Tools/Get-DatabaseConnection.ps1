[CmdletBinding()]

$FileName = Resolve-Path ".\.athenaconnection";

if (-not (Test-Path $FileName)) {
    Write-Error "Athena connection is not configured. Call Set-DatabaseConnection first.";
    return;
}

$ConnectionString = Get-Content -Path $FileName;
$Connection = New-Object System.Data.SqlClient.SqlConnection $ConnectionString;
$Connection.open();
return $Connection;