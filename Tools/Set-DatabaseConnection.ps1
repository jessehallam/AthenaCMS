[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $true)] [String] $ConnectionString
)

Out-File -FilePath ".\.athenaconnection" -InputObject $ConnectionString