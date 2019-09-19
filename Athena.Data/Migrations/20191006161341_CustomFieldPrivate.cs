using Microsoft.EntityFrameworkCore.Migrations;

namespace Athena.Data.Migrations
{
    public partial class CustomFieldPrivate : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<bool>(
                name: "IsPrivate",
                table: "CustomFields",
                nullable: false,
                defaultValue: false);

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "a9c2458f-8ab8-4a6f-b577-981050100006");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "IsPrivate",
                table: "CustomFields");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "fb188c92-1671-4238-a295-597bdd5989f6");
        }
    }
}
