using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    public class Customization
    {
        public string Name { get; set; }
        public string Value { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<Customization>
        {
            public void Configure(EntityTypeBuilder<Customization> builder)
            {
                builder.HasKey(x => x.Name);
                builder.Property(x => x.Name).HasMaxLength(EntityConstants.ShortStringMaxLength).IsRequired().IsUnicode(false);
                builder.Property(x => x.Value).IsRequired();
            }
        }
    }
}