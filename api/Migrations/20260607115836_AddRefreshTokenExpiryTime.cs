using System;
using Microsoft.EntityFrameworkCore.Migrations;

#nullable disable

namespace NewsAppAPI.Migrations
{
    /// <inheritdoc />
    public partial class AddRefreshTokenExpiryTime : Migration
    {
        /// <inheritdoc />
        protected override void Up(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("62d65d24-32b2-4a43-beb6-d7945736fc8c"));

            migrationBuilder.DeleteData(
                table: "UsersAuth",
                keyColumn: "Id",
                keyValue: new Guid("62d65d24-32b2-4a43-beb6-d7945736fc8c"));

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "UserTag",
                keyValue: null,
                column: "UserTag",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "UserTag",
                table: "Users",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Name",
                keyValue: null,
                column: "Name",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "LastName",
                keyValue: null,
                column: "LastName",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.UpdateData(
                table: "Users",
                keyColumn: "Email",
                keyValue: null,
                column: "Email",
                value: "");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "longtext",
                nullable: false,
                oldClrType: typeof(string),
                oldType: "longtext",
                oldNullable: true)
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "LastName", "Name", "UserTag" },
                values: new object[] { new Guid("065a6c1d-2eac-4de9-ad11-aece4e7c68ed"), "test@gmail.com", "AdminLastName", "AdminName", "AdminTag" });

            migrationBuilder.InsertData(
                table: "UsersAuth",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime" },
                values: new object[] { new Guid("065a6c1d-2eac-4de9-ad11-aece4e7c68ed"), "test@gmail.com", "root", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }

        /// <inheritdoc />
        protected override void Down(MigrationBuilder migrationBuilder)
        {
            migrationBuilder.DeleteData(
                table: "Users",
                keyColumn: "Id",
                keyValue: new Guid("065a6c1d-2eac-4de9-ad11-aece4e7c68ed"));

            migrationBuilder.DeleteData(
                table: "UsersAuth",
                keyColumn: "Id",
                keyValue: new Guid("065a6c1d-2eac-4de9-ad11-aece4e7c68ed"));

            migrationBuilder.AlterColumn<string>(
                name: "UserTag",
                table: "Users",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Name",
                table: "Users",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "LastName",
                table: "Users",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.AlterColumn<string>(
                name: "Email",
                table: "Users",
                type: "longtext",
                nullable: true,
                oldClrType: typeof(string),
                oldType: "longtext")
                .Annotation("MySql:CharSet", "utf8mb4")
                .OldAnnotation("MySql:CharSet", "utf8mb4");

            migrationBuilder.InsertData(
                table: "Users",
                columns: new[] { "Id", "Email", "LastName", "Name", "UserTag" },
                values: new object[] { new Guid("62d65d24-32b2-4a43-beb6-d7945736fc8c"), "test@gmail.com", "AdminLastName", "AdminName", "AdminTag" });

            migrationBuilder.InsertData(
                table: "UsersAuth",
                columns: new[] { "Id", "Email", "Password", "RefreshToken", "RefreshTokenExpiryTime" },
                values: new object[] { new Guid("62d65d24-32b2-4a43-beb6-d7945736fc8c"), "test@gmail.com", "root", null, new DateTime(1, 1, 1, 0, 0, 0, 0, DateTimeKind.Unspecified) });
        }
    }
}
