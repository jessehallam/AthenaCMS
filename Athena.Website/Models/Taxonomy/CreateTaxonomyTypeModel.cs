using System.ComponentModel.DataAnnotations;

namespace Athena.Website.Models.Taxonomy
{
    public class CreateTaxonomyTypeModel
    {
        public bool? AllowMultiple { get; set; }
        public bool? IsHierarchical { get; set; }

        [Required]
        public string Name { get; set; }
    }

    public class UpdateTaxonomyModel
    {
        public bool AllowMultiple { get; set; }
        public int Id { get; set; }
        public bool IsHierarchical { get; set; }

        [Required]
        public string Name { get; set; }
    }
}