using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    /// <summary>
    /// A custom metadata field associated with a <see cref="ContentObject"/>.
    /// </summary>
    public class CustomField
    {
        public virtual ContentObject Content { get; set; }
        public int ContentId { get; set; }
        public string FieldKey { get; set; }
        public string FieldValue { get; set; }
        public int Id { get; set; }
        public bool IsPrivate { get; set; }
        public bool IsProtected { get; set; }

        public CustomField() { }

        public CustomField(string fieldKey, string fieldValue)
        {
            FieldKey = fieldKey;
            FieldValue = fieldValue;
        }

        internal class EntityConfiguration : IEntityTypeConfiguration<CustomField>
        {
            public void Configure(EntityTypeBuilder<CustomField> builder)
            {
                builder.Property(x => x.FieldKey).IsRequired().HasMaxLength(EntityConstants.ShortStringMaxLength);
                builder.Property(x => x.FieldValue).IsRequired();
                builder.HasIndex(x => new {x.ContentId, x.FieldKey}).IsUnique();
            }
        }
    }
}