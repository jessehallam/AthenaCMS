using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Athena.Data.Entities
{
    public class TaxonomyTerm
    {
        public int Id { get; set; }
        public string Name { get; set; }

        [JsonIgnore]
        public virtual TaxonomyTerm Parent { get; set; }

        public int? ParentId { get; set; }

        [JsonIgnore]
        public virtual Taxonomy Taxonomy { get; set; }

        public int TaxonomyId { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<TaxonomyTerm>
        {
            public void Configure(EntityTypeBuilder<TaxonomyTerm> builder)
            {
                builder.Property(x => x.Name).IsRequired().HasMaxLength(EntityConstants.ShortStringMaxLength);
                builder.HasIndex(x => new {TypeId = x.TaxonomyId, x.Name}).IsUnique();
            }
        }
    }
}