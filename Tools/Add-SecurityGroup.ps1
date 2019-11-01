[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $true)] [String] $ActivityName,
    [Parameter(Position = 1, Mandatory = $true)] [String] $Description
)

$Conn = .\Get-DatabaseConnection.ps1;
$Cmd = $Conn.createCommand();
$Cmd.CommandText = "INSERT INTO SecurityActivities (Id, ActivityName, Description) VALUES (@Id, @ActivityName, @Description)";
$Cmd.Parameters.AddWithValue("@Id", [Guid]::NewGuid().ToString());
$Cmd.Parameters.AddWithValue("@ActivityName", $ActivityName);
$Cmd.Parameters.AddWithValue("@Description", $Description);
$Cmd.ExecuteNonQuery();