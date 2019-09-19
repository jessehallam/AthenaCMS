using System.ComponentModel.DataAnnotations;

namespace Athena.Website.Models.Setup
{
    public class SetupModel
    {
        [Required]
        public string AdminEmail { get; set; }

        [Required]
        public string AdminPassword { get; set; }

        [Required]
        public string AdminUsername { get; set; }
    }
}
