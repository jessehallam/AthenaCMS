using Microsoft.EntityFrameworkCore.Migrations;

namespace Athena.Data.Migrations
{
    public partial class ProtectionLevel : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsProtected",
                table: "CustomFields",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "19796336-61bd-4c5b-9b88-2d6e74435b52");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsProtected",
                table: "CustomFields");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "a9c2458f-8ab8-4a6f-b577-981050100006");
        }
    }
}
