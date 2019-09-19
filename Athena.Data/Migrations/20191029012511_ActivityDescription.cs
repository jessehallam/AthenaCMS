using Microsoft.EntityFrameworkCore.Migrations;

namespace Athena.Data.Migrations
{
    public partial class ActivityDescription : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.AddColumn<string>(
                name: "Description",
                table: "SecurityActivities",
                maxLength: 4000,
                nullable: false,
                defaultValue: "");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "bcccb44a-46ea-440f-ad0c-8b1acaa153c0");

            migrationBuilder.UpdateData(
                table: "SecurityActivities",
                keyColumn: "Id",
                keyValue: "00e8fd3f-840a-40bf-8be6-3a9ba18743bc",
                column: "Description",
                value: "Update users.");

            migrationBuilder.UpdateData(
                table: "SecurityActivities",
                keyColumn: "Id",
                keyValue: "e2556530-5a39-4240-b91b-39bce9518d2e",
                column: "Description",
                value: "Read list of users.");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropColumn(
                name: "Description",
                table: "SecurityActivities");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "19796336-61bd-4c5b-9b88-2d6e74435b52");
        }
    }
}
