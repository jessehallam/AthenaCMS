using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    public class SecurityActivity
    {
        public string ActivityName { get; set; }
        public string Description { get; set; }
        public string Id { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<SecurityActivity>
        {
            public void Configure(EntityTypeBuilder<SecurityActivity> builder)
            {
                builder.Property(x => x.Id).HasMaxLength(36).IsUnicode(false).IsRequired();
                builder.Property(x => x.ActivityName).HasMaxLength(EntityConstants.ShortStringMaxLength).IsRequired();
                builder.Property(x => x.Description).HasMaxLength(EntityConstants.LongStringMaxLength).IsRequired();
                builder.HasIndex(x => new {x.ActivityName}).IsUnique();

                builder.HasData(new List<SecurityActivity>
                {
                    new SecurityActivity
                        {Id = "e2556530-5a39-4240-b91b-39bce9518d2e", ActivityName = "Admin.UserRead", Description = "Read list of users."},
                    new SecurityActivity
                        {Id = "00e8fd3f-840a-40bf-8be6-3a9ba18743bc", ActivityName = "Admin.UserWrite", Description = "Update users."}
                });
            }
        }
    }
}