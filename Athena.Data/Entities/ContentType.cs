using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Athena.Data.Entities
{
    /// <summary>
    /// Represents a type of content, such as an Article or Image.
    /// </summary>
    public class ContentType
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual ICollection<ContentObject> Contents { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<ContentType>
        {
            public void Configure(EntityTypeBuilder<ContentType> builder)
            {
                builder.Property(x => x.Name).IsRequired().HasMaxLength(EntityConstants.ShortStringMaxLength);
                builder.HasIndex(x => new {x.Name}).IsUnique();
                builder.HasData(new[]
                {
                    new ContentType {Id = 1, Name = "Article"},
                    new ContentType {Id = 2, Name = "Image"}
                });
            }
        }
    }
}