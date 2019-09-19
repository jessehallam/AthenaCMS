using Athena.Data.Entities;

namespace Athena.Core.Mapping.Content
{
    /// <seealso cref="TaxonomyTerm"/>
    public class DetailedTermDto
    {
        public string Name { get; set; }
        public int? ParentId { get; set; }
        public int TaxonomyId { get; set; }
        public int Id { get; set; }
    }
}