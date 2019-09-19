using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    internal class RoleEntityConfiguration : IEntityTypeConfiguration<IdentityRole>
    {
        public void Configure(EntityTypeBuilder<IdentityRole> builder)
        {
            builder.HasData(new[]
            {
                new IdentityRole {Id = "fe4fb2a1-3dc3-4b75-82f7-c8c6f09d8397", Name = "Administrators", NormalizedName = "ADMINISTRATORS"}
            });
        }
    }
}