using System.Collections.Generic;
using System.Linq;
using Athena.Core.Security.Activities;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.Models;
using Athena.Website.Models.Content;
using Microsoft.AspNetCore.Authorization;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/content-type")]
    public class ContentTypeController : ControllerBase
    {
        private readonly AthenaData data;

        public ContentTypeController(AthenaData data)
        {
            this.data = data;
        }

        /// <summary>
        /// Create a content type.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(ContentType))]
        [RequireActivity("ContentType.Write.All")]
        public IActionResult Create(CreateContentTypeModel model)
        {
            // Rule: Name must be unique.
            if (data.ContentTypes.Any(x => x.Name == model.Name))
            {
                return this.Error("E_NAME_UNIQUE", "Name is not unique.");
            }

            var contentType = new ContentType {Name = model.Name};
            data.Add(contentType);
            data.SaveChanges();

            return Ok(contentType);
        }

        [HttpDelete("{id}")]
        public IActionResult Delete(int id)
        {
            var entity = data.ContentTypes.Find(id);

            if (entity == null) return NotFound();
            if (entity.Id == 1 || entity.Id == 2) return Forbid();

            data.ContentTypes.Remove(entity);
            data.SaveChanges();
            return Ok();
        }

        [HttpGet("{id}")]
        public ContentType Get(int id)
        {
            return data.ContentTypes.Find(id);
        }

        [HttpGet("by-name/{name}")]
        public ContentType GetByName(string name)
        {
            return data.ContentTypes.Where(x => x.Name == name).OrderBy(x => x.Name).FirstOrDefault();
        }

        [HttpGet]
        public IEnumerable<ContentType> List()
        {
            return data.ContentTypes.OrderBy(x => x.Name).ToList();
        }

        [HttpPut]
        public IActionResult Update(UpdateContentTypeModel model)
        {
            var entity = data.ContentTypes.Find(model.Id);

            if (entity == null) return NotFound();
            entity.Name = model.Name;
            data.SaveChanges();
            return Ok(entity);
        }
    }
}