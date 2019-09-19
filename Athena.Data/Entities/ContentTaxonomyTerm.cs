using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;

namespace Athena.Data.Entities
{
    /// <summary>
    /// A mapping between a <see cref="ContentObject"/> and a <see cref="TaxonomyTerm"/>
    /// </summary>
    public class ContentTaxonomyTerm
    {
        public virtual ContentObject Content { get; set; }
        public int ContentId { get; set; }
        public virtual TaxonomyTerm Term { get; set; }
        public int TermId { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<ContentTaxonomyTerm>
        {
            public void Configure(EntityTypeBuilder<ContentTaxonomyTerm> builder)
            {
                builder.HasKey(x => new {x.ContentId, x.TermId});
            }
        }
    }
}