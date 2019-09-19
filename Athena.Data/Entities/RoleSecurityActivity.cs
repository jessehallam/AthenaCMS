using Microsoft.AspNetCore.Identity;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    public class RoleSecurityActivity
    {
        public virtual IdentityRole Role { get; set; }
        public string RoleId { get; set; }
        public virtual SecurityActivity Activity { get; set; }
        public string ActivityId { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<RoleSecurityActivity>
        {
            public void Configure(EntityTypeBuilder<RoleSecurityActivity> builder)
            {
                builder.HasKey(x => new {x.ActivityId, x.RoleId});
            }
        }
    }
}