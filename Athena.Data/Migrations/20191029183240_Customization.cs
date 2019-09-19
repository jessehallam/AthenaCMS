using Microsoft.EntityFrameworkCore.Migrations;

namespace Athena.Data.Migrations
{
    public partial class Customization : Migration
    {
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.CreateTable(
                name: "Customization",
                columns: table => new
                {
                    Name = table.Column<string>(unicode: false, maxLength: 256, nullable: false),
                    Value = table.Column<string>(nullable: false)
                },
                constraints: table =>
                {
                    table.PrimaryKey("PK_Customization", x => x.Name);
                });

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "b41df3f1-f205-4290-880a-fc4fe3043ec0");
        }

        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DropTable(
                name: "Customization");

            migrationBuilder.UpdateData(
                table: "AspNetRoles",
                keyColumn: "Id",
                keyValue: "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397",
                column: "ConcurrencyStamp",
                value: "bcccb44a-46ea-440f-ad0c-8b1acaa153c0");
        }
    }
}
