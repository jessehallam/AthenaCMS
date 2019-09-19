using System;
using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    /// <summary>
    /// A content object, such as an Article, Image, or other type of content.
    /// </summary>
    public class ContentObject: ITrackable
    {
        public string CreatedById { get; set; }
        public AthenaUser CreatedBy { get; set; }
        public string Excerpt { get; set; }
        public int Id { get; set; }
        public string Content { get; set; }
        public DateTimeOffset? PublishedAt { get; set; }
        public string Title { get; set; }
        public ContentStatus Status { get; set; }
        public virtual ContentType Type { get; set; }
        public int TypeId { get; set; }

        public virtual ICollection<CustomField> CustomFields { get; set; }
        public virtual ICollection<ContentTaxonomyTerm> TaxonomyTerms { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<ContentObject>
        {
            public void Configure(EntityTypeBuilder<ContentObject> builder)
            {
                builder.Property(x => x.Excerpt).IsRequired();
                builder.Property(x => x.Content).IsRequired();
                builder.Property(x => x.Title).IsRequired();
                builder.Property(x => x.CreatedById).IsRequired().HasMaxLength(450);
            }
        }

        public DateTimeOffset CreatedAt { get; set; }
        public DateTimeOffset UpdatedAt { get; set; }
    }
}