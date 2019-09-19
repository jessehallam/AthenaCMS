using System.ComponentModel.DataAnnotations;

namespace Athena.Website.Models.Taxonomy
{
    public class CreateTermModel
    {
        [Required]
        public string Name { get; set; }

        public int? ParentId { get; set; }
        public int TaxonomyId { get; set; }
    }
}