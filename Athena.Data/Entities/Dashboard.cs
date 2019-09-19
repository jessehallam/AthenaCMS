using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    public class Dashboard
    {
        public string Config { get; set; }
        public virtual ContentType ContentType { get; set; }
        public int ContentTypeId { get; set; }
        public int Id { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<Dashboard>
        {
            public void Configure(EntityTypeBuilder<Dashboard> builder)
            {
                builder.Property(x => x.Config).IsUnicode(false).IsRequired();
            }
        }
    }
}