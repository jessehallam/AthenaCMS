using System.ComponentModel.DataAnnotations;

namespace Athena.Website.Models.Auth
{
    public class SignInModel
    {
        [Required]
        public string Password { get; set; }

        [Required]
        public string Username { get; set; }
    }
}
