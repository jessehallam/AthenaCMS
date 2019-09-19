using System.Collections.Generic;
using System.Linq;
using Athena.Core.Security.Activities;
using Athena.Data.Context;
using Athena.Data.Entities;
using Athena.Website.Models;
using Athena.Website.Models.Taxonomy;
using Microsoft.AspNetCore.Mvc;

namespace Athena.Website.Controllers
{
    [ApiController]
    [Route("api/taxonomy")]
    public class TaxonomyController : ControllerBase
    {
        private readonly AthenaData data;

        public TaxonomyController(AthenaData data)
        {
            this.data = data;
        }

        /// <summary>
        /// Create a taxonomy.
        /// </summary>
        [HttpPost]
        [ProducesResponseType(200, Type = typeof(Taxonomy))]
        // [ProducesResponseType(409, Type = typeof(ClientErrorResponse))]
        [RequireActivity("Content.AdminWrite")]
        public IActionResult Create(CreateTaxonomyTypeModel model)
        {
            // Rule: name must be unique.
            if (data.Taxonomies.Any(x => x.Name == model.Name))
            {
                return this.Error("E_NAME_UNIQUE", "Name must be unique");
            }

            var entity = new Taxonomy
            {
                AllowMultiple = model.AllowMultiple == true,
                IsHierarchical = model.IsHierarchical == true,
                Name = model.Name
            };

            data.Add(entity);
            data.SaveChanges();

            return Ok(entity);
        }

        [HttpGet]
        public IEnumerable<Taxonomy> List()
        {
            return data.Taxonomies.OrderBy(x => x.Name).ToList();
        }

        [HttpPut]
        public IActionResult Update(UpdateTaxonomyModel model)
        {
            var entity = data.Taxonomies.Find(model.Id);

            if (entity == null)
            {
                return NotFound();
            }

            // rule: AllowMultiple cannot transition to False when its terms are multiply defined
            // on any contents.
            if (entity.AllowMultiple && !model.AllowMultiple)
            {
                if (AnyTermsMultiplyDefined(entity.Id))
                {
                    return this.Error("E_MULTIPLY_DEFINED_TERM", "Cannot change allowMultiple when contents have more than one term assigned.");
                }
            }

            // rule: IsHierarchical cannot transition to False when any term has a parent.
            if (entity.IsHierarchical && !model.IsHierarchical)
            {
                if (AnyTermsHaveParent(entity.Id))
                {
                    return this.Error("E_TERMS_HAVE_PARENTS", "Cannot change isHierarchical when terms have parents assigned.");
                }
            }

            entity.AllowMultiple = model.AllowMultiple;
            entity.IsHierarchical = model.IsHierarchical;
            entity.Name = model.Name;

            data.SaveChanges();

            return Ok(entity);
        }

        [HttpGet("counts")]
        public IActionResult GetCounts()
        {
            var query =
                from taxonomy in data.Taxonomies
                select new
                {
                    taxonomy.Id,
                    taxonomy.Name,
                    Count = data.TaxonomyTerms.Count(x => x.TaxonomyId == taxonomy.Id)
                };

            return Ok(query.ToList());
        }

        private bool AnyTermsMultiplyDefined(int taxonomyId)
        {
            var query =
                from contentTaxonomy in data.ContentTaxonomies
                where contentTaxonomy.Term.TaxonomyId == taxonomyId
                group contentTaxonomy by new {contentTaxonomy.ContentId, contentTaxonomy.Term.TaxonomyId}
                into g
                select g.Count();

            return query.Any(count => count > 1);
        }

        private bool AnyTermsHaveParent(int taxonomyId)
        {
            var query =
                from term in data.TaxonomyTerms
                where term.TaxonomyId == taxonomyId
                      && term.ParentId.HasValue
                select 1;

            return query.Any();
        }
    }
}