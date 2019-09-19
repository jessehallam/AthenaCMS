using System.IO;
using Athena.Data.Context;
using Athena.Data.Entities;
using Microsoft.AspNetCore.Mvc;
using Newtonsoft.Json.Linq;

namespace Athena.Website.Controllers.Admin
{
    [ApiController]
    [Route("api/admin/customization")]
    public class CustomizationController : ControllerBase
    {
        private readonly AthenaData data;
        public CustomizationController(AthenaData data)
        {
            this.data = data;
        }

        [HttpGet("{name}")]
        public IActionResult GetCustomization(string name)
        {
            var row = data.Customizations.Find(name);
            if (row == null) return NotFound();
            return Ok(new JRaw(row.Value));
        }

        [HttpPut("{name}")]
        public IActionResult SetCustomization(string name)
        {
            var row = data.Customizations.Find(name);
            if (row == null)
            {
                row = new Customization {Name = name};
                data.Customizations.Add(row);
            }

            using (var reader = new StreamReader(Request.Body))
            {
                row.Value = reader.ReadToEnd();
                data.SaveChanges();
            }

            return Ok();
        }
    }
}