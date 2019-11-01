[CmdletBinding()]
param (
    [Parameter(Position = 0, Mandatory = $true)]
    [string] $Role,

    [Parameter(Position = 1, Mandatory = $true)]
    [string] $ActivityName
)

$Conn = .\Get-DatabaseConnection.ps1;
$Cmd = $Conn.createCommand();
$Cmd.CommandText = "
    INSERT INTO [RoleSecurityActivities]
    (
        RoleId,
        ActivityId
    )
    VALUES
    (
        (
            SELECT Id FROM AspNetRoles
            WHERE Name = @Role
        ),
        (
            SELECT Id FROM SecurityActivities
            WHERE ActivityName = @ActivityName
        )
    );
";
$Cmd.Parameters.AddWithValue("@Role", $Role);
$Cmd.Parameters.AddWithValue("@ActivityName", $ActivityName);
$Cmd.ExecuteNonQuery();