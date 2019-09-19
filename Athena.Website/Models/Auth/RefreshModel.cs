using System.ComponentModel.DataAnnotations;

namespace Athena.Website.Models.Auth
{
    public class RefreshModel
    {
        [Required]
        public string Token { get; set; }
    }
}