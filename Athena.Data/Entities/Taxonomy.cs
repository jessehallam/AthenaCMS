using System.Collections.Generic;
using Microsoft.EntityFrameworkCore;
using Microsoft.EntityFrameworkCore.Metadata.Builders;
using Newtonsoft.Json;

namespace Athena.Data.Entities
{
    /// <summary>
    /// A way of grouping content together based on a select number of relationships.
    /// </summary>
    public class Taxonomy
    {
        public bool AllowMultiple { get; set; }
        public int Id { get; set; }
        public bool IsHierarchical { get; set; }
        public string Name { get; set; }

        [JsonIgnore] public virtual ICollection<TaxonomyTerm> Terms { get; set; }

        internal class EntityConfiguration : IEntityTypeConfiguration<Taxonomy>
        {
            public void Configure(EntityTypeBuilder<Taxonomy> builder)
            {
                builder.Property(x => x.Name).IsRequired().HasMaxLength(EntityConstants.ShortStringMaxLength);
                builder.HasIndex(x => new {x.Name}).IsUnique();
                builder.HasData(new[]
                {
                    new Taxonomy {Id = 1, AllowMultiple = true, IsHierarchical = true, Name = "Category"},
                    new Taxonomy {Id = 2, AllowMultiple = true, Name = "Tag"}
                });
            }
        }
    }
}