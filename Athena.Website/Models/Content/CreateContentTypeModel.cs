using System;
using System.Collections.Generic;
using System.ComponentModel.DataAnnotations;
using System.Linq;
using System.Threading.Tasks;

namespace Athena.Website.Models.Content
{
    public class CreateContentTypeModel
    {
        [Required]
        public string Name { get; set; }
    }

    public class UpdateContentTypeModel
    {
        public int Id { get; set; }
        [Required]
        public string Name { get; set; }
    }
}
