using System;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    public class RefreshToken
    {
        public int Id { get; set; }
        public virtual AthenaUser User { get; set; }
        public string UserId { get; set; }
        public string Token { get; set; }
        public DateTimeOffset Expiration { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<RefreshToken>
        {
            public void Configure(EntityTypeBuilder<RefreshToken> builder)
            {
                builder.Property(x => x.UserId).HasMaxLength(450).IsRequired();
                builder.Property(x => x.Token).HasMaxLength(EntityConstants.ShortStringMaxLength).IsRequired();
            }
        }
    }
}